from rest_framework import generics
import uuid
from api.efiling import (
    upload_documents
)

from rest_framework.response import Response
from rest_framework import permissions
from django.http import HttpResponseBadRequest


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
