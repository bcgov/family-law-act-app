from rest_framework import generics
from api.efiling import (    
    submit_efiling,
    build_efiling_body
)

from rest_framework.response import Response

from api.models.Application import Application
from django.http import Http404, HttpResponseBadRequest
import logging

LOGGER = logging.getLogger(__name__)

"""IN PROGRESS"""
class EfilingView(generics.GenericAPIView):
    #permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        location = request.data.get("location")
        documents = request.data.get("documents")
        transaction_id = request.data.get("transactionId")
        if not location:
            return HttpResponseBadRequest("Missing location.")
        if not transaction_id:
            return HttpResponseBadRequest("Missing transactionId from document upload.")

        uid = 1 # request.user.id
        app = get_app_object(pk, uid)

        efiling_body = build_efiling_body(
            location, documents, app.applicant_name, app.respondent_name, request
            )

        result = submit_efiling(transaction_id, efiling_body)

        # check if result is success.
        # app.filed = datenow
        return Response(efiling_body)


def get_app_object(pk, uid):
    try:
        return Application.objects.get(pk=pk, user_id=uid)
    except Application.DoesNotExist:
        raise Http404
