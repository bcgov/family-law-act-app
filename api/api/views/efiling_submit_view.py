import hashlib
import logging
import json
import uuid
from django.utils import timezone
from django.http import JsonResponse, HttpResponse
from rest_framework import permissions, generics
from api.efiling import EFilingPackaging, EFilingParsing, EFilingSubmission
from api.models import EFilingSubmission as EFilingSubmissionModel
from api.utils import (
    convert_document_to_multi_part,
    get_application_for_user,
    get_protection_order_content,
    is_valid_json,
)
from core.pdf import rotate_images_and_convert_pdf
from core.utils.json_message_response import JsonMessageResponse

logger = logging.getLogger(__name__)


class EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())
        self.file_byte_size_limit = 1024 * 1024 * 10  # 10 MBytes
        self.allowed_extensions = ["pdf", "jpg", "jpeg", "gif", "png"]

    def _file_size_too_large(self, size):
        return size > self.file_byte_size_limit

    def _invalid_file_extension(self, file):
        extension = file.name.split(".")[-1]
        return extension.lower() not in self.allowed_extensions

    def _get_validation_errors(self, request_files, documents):
        # TODO: check group of images isn't over 10MB
        if not is_valid_json(documents):
            return JsonMessageResponse("Invalid json data for documents.", status=400)
        if len(request_files) > 30:
            return JsonMessageResponse("Too many files.", status=400)
        for file in request_files:
            if file.size == 0:
                return JsonMessageResponse("One of the files was empty.", status=400)
            if self._file_size_too_large(file.size):
                return JsonMessageResponse(
                    "Filesize limit exceeded: 10 MB.", status=400
                )
            if self._invalid_file_extension(file):
                return JsonMessageResponse("Wrong file format.", status=400)
        return None

    """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def _process_incoming_files_and_documents(
        self, po_pdf_content, po_json, incoming_documents, incoming_files
    ):
        outgoing_documents = [
            {
                "type": "POR",
                "name": "fpo_generated.pdf",
                "file_data": po_pdf_content,
                "data": po_json,
                "md5": hashlib.md5(po_pdf_content).hexdigest(),
            }
        ]
        for incoming_document in incoming_documents:
            file_indexes = incoming_document["files"]
            files = [incoming_files[index] for index in file_indexes]
            if files[0].name.endswith(".pdf"):
                data = files[0].read()
                file_name = files[0].name
            else:
                rotations = incoming_document["rotations"]
                data = rotate_images_and_convert_pdf(files, rotations)
                file_name = f"{files[0].name.split('.')[0]}.pdf"
            outgoing_documents.append(
                {
                    "type": incoming_document["type"],
                    "name": file_name,
                    "file_data": data,
                    "data": "",
                    "md5": hashlib.md5(data).hexdigest(),
                }
            )
        return outgoing_documents

    def put(self, request, application_id):
        body = request.data
        application = get_application_for_user(application_id, request.user.id)
        efiling_submission = EFilingSubmissionModel.objects.filter(
            id=application.last_efiling_submission_id
        ).first()
        if not efiling_submission:
            return HttpResponse(status=404)
        efiling_submission.package_number = body.get("packageNumber")
        efiling_submission.package_url = body.get("packageUrl")
        efiling_submission.last_updated = timezone.now()
        efiling_submission.save()
        application.last_filed = timezone.now()
        application.save()
        return HttpResponse(status=204)

    def post(self, request, application_id):
        documents_string = request.POST.get("documents")
        request_files = request.FILES.getlist("files")

        # Validations.
        validations_errors = self._get_validation_errors(
            request_files, documents_string
        )
        if validations_errors:
            return validations_errors

        application = get_application_for_user(application_id, request.user.id)
        if application.prepared_pdf_id is None:
            return JsonMessageResponse("PO PDF is not generated.", status=400)

        # Data conversion.
        incoming_documents = json.loads(documents_string)
        po_pdf_content, po_json = get_protection_order_content(application)
        outgoing_documents = self._process_incoming_files_and_documents(
            po_pdf_content, po_json, incoming_documents, request_files
        )
        del request_files

        data = self.efiling_parsing.convert_data_for_efiling(
            request, application, outgoing_documents
        )

        # EFiling upload document.
        transaction_id = str(uuid.uuid4())
        efiling_submission = EFilingSubmissionModel(
            transaction_id=transaction_id,
            application_id=application.id,
        )
        efiling_submission.save()
        outgoing_files = convert_document_to_multi_part(outgoing_documents)
        del outgoing_documents
        upload_result = self.efiling_submission.upload_documents(
            request.user.universal_id, transaction_id, outgoing_files
        )

        if upload_result is None or "submissionId" not in upload_result:
            message = (
                upload_result["message"]
                if upload_result and "message" in upload_result
                else "Document Upload Failed."
            )
            return JsonMessageResponse(message, status=500)

        # EFiling package submission.
        submission_id = upload_result["submissionId"]
        redirect_url, message = self.efiling_submission.generate_efiling_url(
            request.user.universal_id, transaction_id, submission_id, data
        )

        if redirect_url is not None:
            efiling_submission.submission_id = submission_id
            efiling_submission.last_updated = timezone.now()
            efiling_submission.save()

            application.last_efiling_submission_id = efiling_submission.id
            application.save()
            return JsonResponse({"redirectUrl": redirect_url, "message": message})

        return JsonMessageResponse(message, status=500)
