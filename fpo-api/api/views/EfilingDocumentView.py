from rest_framework import generics
import uuid
from api.efiling import (
    upload_documents
)

from rest_framework.response import Response
from django.http import Http404, HttpResponseBadRequest

"""IN PROGRESS"""
class EfilingDocumentView(generics.GenericAPIView):
    # permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        transaction_id = str(uuid.uuid4())
        if (len(request.FILES) == 0):
            return HttpResponseBadRequest("No files uploaded.")
        result = upload_documents(transaction_id, request.FILES)
        return Response({"transaction_id": transaction_id, "result": result})
