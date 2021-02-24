import io
import json
import logging
import uuid
from datetime import datetime
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.conf import settings
from django.http import HttpResponseBadRequest, HttpResponse
from rest_framework import permissions, generics
from rest_framework.response import Response
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

    def _convert_and_add_fpo_file(self, include_pdf_content, incoming_files):
        outgoing_files = []
        for incoming_file in incoming_files:
            outgoing_files.append(
                ("files", (incoming_file.name, incoming_file.read(), "application/pdf"))
            )
        outgoing_files.append(
            ("files", ("fpo.pdf", include_pdf_content, "application/pdf"))
        )
        return outgoing_files

    def post(self, request, application_id):
        document_types = request.POST.getlist("documentTypes")
        document_types.append("POR")
        incoming_files = request.FILES.getlist("files")
        if len(incoming_files)+1 != len(document_types):
            return HttpResponseBadRequest(
                "Number of documents, does not match document types."
            )
        for file in incoming_files:
            if file.size == 0:
                return HttpResponseBadRequest("One of the files was empty.")
            if self._file_size_too_large(file.size):
                return HttpResponseBadRequest("Filesize limit exceeded: 10 MB.")
            if self._invalid_file_extension(file):
                return HttpResponseBadRequest("Wrong file format.")

        application = get_application_for_user(application_id, request.user.id)
        if application.prepared_pdf_id is None:
            return HttpResponseBadRequest('PDF not generated.')

        prepared_pdf = PreparedPdf.objects.get(id=application.prepared_pdf_id)
        pdf_content = settings.ENCRYPTOR.decrypt(prepared_pdf.key_id, prepared_pdf.data)

        outgoing_files = self._convert_and_add_fpo_file(pdf_content, incoming_files)

        data = self.efiling_parsing.convert_data_for_efiling(
            request, application, outgoing_files, document_types
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
            return HttpResponseBadRequest(message)

        submission_id = upload_result["submissionId"]
        redirect_url, msg = self.efiling_submission.generate_efiling_url(
            request.user.universal_id, transaction_id, submission_id, data
        )

        if redirect_url is not None:
            application.filed = datetime.now()
            application.save()
            return HttpResponse({redirect_url, msg})

        return HttpResponse(msg, status=500)
