import logging
import json
import uuid
from datetime import datetime
from django.conf import settings
from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse
from rest_framework import permissions, generics
from api.models import PreparedPdf
from api.efiling import EFilingPackaging, EFilingParsing, EFilingSubmission
from api.utils import get_application_for_user

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

    def _convert_and_add_fpo_file(self, po_pdf_content, incoming_files):
        outgoing_files = [
            ("files", ("fpo_generated.pdf", po_pdf_content, "application/pdf"))
        ]
        for incoming_file in incoming_files:
            outgoing_files.append(
                ("files", (incoming_file.name, incoming_file.read(), "application/pdf"))
            )
        return outgoing_files

    def _get_prepared_pdf(self, prepared_pdf_id):
        prepared_pdf = PreparedPdf.objects.get(id=prepared_pdf_id)
        po_pdf_content = settings.ENCRYPTOR.decrypt(
            prepared_pdf.key_id, prepared_pdf.data
        )
        po_json = json.loads(
            settings.ENCRYPTOR.decrypt(
                prepared_pdf.key_id, prepared_pdf.json_data
            ).decode("utf-8")
        )
        return (po_pdf_content, po_json)

    def post(self, request, application_id):
        document_types = request.POST.getlist("documentTypes")
        document_types.insert(0, "POR")
        incoming_files = request.FILES.getlist("files")
        for file in incoming_files:
            if file.size == 0:
                return JsonResponse(
                    {"message": "One of the files was empty."}, status=400
                )
            if self._file_size_too_large(file.size):
                return JsonResponse(
                    {"message": "Filesize limit exceeded: 10 MB."}, status=400
                )
            if self._invalid_file_extension(file):
                return JsonResponse({"message": "Wrong file format."}, status=400)

        application = get_application_for_user(application_id, request.user.id)
        if application.prepared_pdf_id is None:
            return JsonResponse({"message": "PDF is not generated."}, status=400)

        (po_pdf_content, po_json) = self._get_prepared_pdf(application.prepared_pdf_id)
        outgoing_files = self._convert_and_add_fpo_file(po_pdf_content, incoming_files)

        data = self.efiling_parsing.convert_data_for_efiling(
            request, application, po_json, outgoing_files, document_types
        )

        transaction_id = str(uuid.uuid4())
        upload_result = self.efiling_submission.upload_documents(
            request.user.universal_id, transaction_id, outgoing_files
        )

        if upload_result is None or "submissionId" not in upload_result:
            message = (
                upload_result["message"]
                if upload_result and "message" in upload_result
                else "Document Upload Failed."
            )
            return JsonResponse({"message": message}, status=500)

        submission_id = upload_result["submissionId"]
        redirect_url, msg = self.efiling_submission.generate_efiling_url(
            request.user.universal_id, transaction_id, submission_id, data
        )

        if redirect_url is not None:
            application.filed = datetime.now()
            application.save()
            return JsonResponse({"redirectUrl": redirect_url, "message": msg})

        return JsonResponse({"message": message}, status=500)
