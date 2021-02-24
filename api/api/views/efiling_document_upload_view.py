import hashlib
from django import settings
from django.http import HttpResponseBadRequest, HttpResponse
from rest_framework import generics, permissions
from api.models import Document
from api.utils import get_application_for_user


class EFilingDocumentUploadView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.file_byte_size_limit = 1024 * 1024 * 10  # 10 MBytes
        self.allowed_extensions = ['pdf', 'jpg', 'jpeg', 'gif', 'png']

    def _file_size_too_large(self, size):
        return size > self.file_byte_size_limit

    def _invalid_file_extension(self, file):
        extension = file.name.split(".")[-1]
        return extension.lower() not in self.allowed_extensions

    def post(self, request, application_id):
        document_types = request.data.document_types
        if (len(request.FILES) == 0):
            return HttpResponseBadRequest("No files uploaded.")
        if (len(request.FILES) != len(document_types)):
            return HttpResponseBadRequest("Number of documents, does not match document types.")
        for file in request.FILES:
            if (self._file_size_too_large(file.size)):
                return HttpResponseBadRequest("Filesize limit exceeded: 10 MB.")
            if (self._invalid_file_extension(file)):
                return HttpResponseBadRequest("Wrong file format.")

        application = get_application_for_user(application_id, request.user.id)
        for id, file in request.FILES:
            file_content = file.read()
            md5 = hashlib.md5(file_content).hexdigest()
            (key_id, encrypted_data) = settings.ENCRYPTOR.encrypt(file_content)
            (key_id, encrypted_md5) = settings.ENCRYPTOR.encrypt(md5)
            (key_id, encrypted_file_name) = settings.ENCRYPTOR.encrypt(file.name)

            Document(
                data=encrypted_data,
                document_type=document_types[id],
                file_name=encrypted_file_name,
                md5=encrypted_md5,
                key_id=key_id,
                application_id=application.id).save()

        return HttpResponse(status=204)
