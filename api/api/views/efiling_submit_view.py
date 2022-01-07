import hashlib
import logging
from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
import json
import uuid
from collections import Counter
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from numpy import unique
from api.models import PreparedPdf
from rest_framework import permissions, generics
from api.efiling import EFilingPackaging, EFilingParsing, EFilingSubmission
from api.models import EFilingSubmission as EFilingSubmissionModel
from api.utils import (
    convert_document_to_multi_part,
    get_application_for_user,
    is_valid_json,
)
from core.pdf import rotate_images_and_convert_pdf
from core.utils.json_message_response import JsonMessageResponse
from django.http.response import Http404
from rest_framework.exceptions import NotFound

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

    def _unique_file_names(self, request_files):
        file_names =  [file.name.split('.')[0] for file in request_files]
        dup = dict(Counter(file_names))
        l_uniq = unique(file_names)
        unique_names = [key if i == 0 else key + str(i+1) for key in l_uniq for i in range(dup[key])]
        for i, unique_name in enumerate(unique_names):
            request_files[i].name = f"{unique_name}.{request_files[i].name.split('.')[1]}"
        return request_files

    """ This inserts our generated file, iterates over files and converts to PDF if necessary. """

    def _get_pdf_content(self, application, application_steps):
        outgoing_documents = []
        for existing_orders in application_steps[0]["result"]["existingOrders"]:
            document_type = existing_orders["type"]
            try:
                prepared_pdf = PreparedPdf.objects.get(
                    application_id=application.id, pdf_type=f"{document_type}"
                )
            except PreparedPdf.DoesNotExist:
                raise NotFound(
                    detail=f"Missing document type {document_type} from database."
                )
            pdf_content = settings.ENCRYPTOR.decrypt(
                prepared_pdf.key_id, prepared_pdf.data
            )
            document_json = json.loads(
                settings.ENCRYPTOR.decrypt(
                    prepared_pdf.key_id, prepared_pdf.json_data
                ).decode("utf-8")
            )
            document_json.update({"applicationId": application.id})
            outgoing_documents.append(
                {
                    "type": f"{document_type}",
                    "name": f"{document_type}_generated.pdf",
                    "file_data": pdf_content,
                    "data": document_json,
                    "md5": hashlib.md5(pdf_content).hexdigest(),
                }
            )
        return outgoing_documents

    def _merge_sch1_with_form15(self, outgoing_documents, pdf_files, image_files, rotations):
        output = PdfFileWriter()
        non_AXP_doc =  [x for x in outgoing_documents if x["type"]!="AXP"]
        AXP_doc = next(x for x in outgoing_documents if x["type"]=="AXP")
        
        output = self._add_pdf_to_output(output, AXP_doc["file_data"])

        if len(image_files) > 0:
            rotations = rotations
            imagedata = rotate_images_and_convert_pdf(image_files, rotations)
            output = self._add_pdf_to_output(output, imagedata)

        for file in pdf_files:
            data = file.read()
            output = self._add_pdf_to_output(output, data)       
        
        in_memory = BytesIO()
        output.write(in_memory)
        in_memory.seek(0)
        pdf_content = in_memory.read()

        non_AXP_doc.append(
            {
                "type": AXP_doc["type"],
                "name": AXP_doc["name"],
                "file_data": pdf_content,
                "data": AXP_doc["data"],
                "md5": hashlib.md5( pdf_content).hexdigest(),
            }
        )

        return non_AXP_doc
       
    def _add_pdf_to_output(self, output, data_bytes):
        pdf_bytes = BytesIO(data_bytes)
        read_pdf = PdfFileReader(pdf_bytes)
        for pgno in range(0, read_pdf.getNumPages()):            
            output.addPage(read_pdf.getPage(pgno))
        return output

    def _process_incoming_files_and_documents(
        self, application, application_steps, incoming_documents, incoming_files
    ):
        outgoing_documents = self._get_pdf_content(application, application_steps)
        for incoming_document in incoming_documents:
            if "files" not in incoming_document:
                continue
            
            file_indexes = incoming_document["files"]
            files = [incoming_files[index] for index in file_indexes]

            # 1 PDF and 2 JPG for example, we need to split into 2 PDFs.
            pdf_files = [x for x in files if x.name.endswith(".pdf")]
            image_files = [x for x in files if not x.name.endswith(".pdf")]

            if ("type" in incoming_document and incoming_document["type"] == "Merge With Form15"):                
                outgoing_documents = self._merge_sch1_with_form15( outgoing_documents, pdf_files, image_files, incoming_document["rotations"] )
                continue

            
            for file in pdf_files:
                data = file.read()
                file_name = file.name
                outgoing_documents.append(
                    {
                        "type": incoming_document["type"],
                        "name": file_name,
                        "file_data": data,
                        "data": "",
                        "md5": hashlib.md5(data).hexdigest(),
                    }
                )
            if len(image_files) > 0:
                rotations = incoming_document["rotations"]
                data = rotate_images_and_convert_pdf(image_files, rotations)
                file_name = f"{image_files[0].name.split('.')[0]}.pdf"
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

        # Unique names.
        request_files = self._unique_file_names(request_files)

        application = get_application_for_user(application_id, request.user.id)
        application_steps = json.loads(
            settings.ENCRYPTOR.decrypt(application.key_id, application.steps).decode(
                "utf-8"
            )
        )

        # Data conversion.
        incoming_documents = json.loads(documents_string)

        outgoing_documents = self._process_incoming_files_and_documents(
            application, application_steps, incoming_documents, request_files
        )
        del request_files

        data = self.efiling_parsing.convert_data_for_efiling(
            request, application, application_steps, outgoing_documents
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
