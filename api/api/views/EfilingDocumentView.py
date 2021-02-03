import uuid
from django.http import HttpResponseBadRequest
from rest_framework import generics, permissions
from rest_framework.response import Response

from fla.efiling import (
    upload_documents
)


class EfilingDocumentView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        transaction_id = str(uuid.uuid4())
        if (len(request.FILES) == 0):
            return HttpResponseBadRequest("No files uploaded.")
        universal_id = request.user.universal_id
        result = upload_documents(
            universal_id, transaction_id, request.FILES
            )
        return Response({"transactionId": transaction_id, "result": result})
