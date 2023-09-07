
import json
import logging
from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from api.utils import get_application_for_user, get_efiling_submission_for_application, get_reference_application_for_application
from core.utils.json_message_response import JsonMessageResponse
from api.efiling import EFilingRejection
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response


logger = logging.getLogger(__name__)


class EFilingRejectionView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)


    def __init__(self):
        self.efiling_rejection = EFilingRejection()
    

    def encrypt_previous_app_status(self, previous_app_status):
        try:
            previous_app_status_bin = json.dumps(previous_app_status).encode("ascii")
            (previous_app_status_key_id, previous_app_status_enc) = settings.ENCRYPTOR.encrypt(previous_app_status_bin)
            return (previous_app_status_key_id, previous_app_status_enc)
        except Exception as ex:
            logger.error("ERROR! %s", ex)


    def get(self, request, application_id, package_id): #Downloads Registry Notice
        self.efiling_rejection.generate_header(request)
        pdf_content=self.efiling_rejection.get_registry_notice( package_id )

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="Registry_Notice.pdf"'
        response.write(pdf_content)

        return response


    def post(self, request, application_id, package_id): #Create duplicate App. 
        uid = request.user.id
        application = get_application_for_user(application_id, uid)
        efiling = get_efiling_submission_for_application(application_id, package_id)
        if not application or not efiling:
            return HttpResponseNotFound("No record found")
        
        body = request.data
        if not body:    
            return HttpResponseBadRequest("Missing request body")
        
        ref_application = get_reference_application_for_application(application_id, uid)
        if ref_application:
            return Response({"app_id": ref_application.pk})
        else:
            (prv_app_status_key_id, prv_app_status_enc) = self.encrypt_previous_app_status(body.get("previousApp"))       
            db_app = application
            db_app.id = None
            db_app.last_updated = body.get("lastUpdate")
            db_app.last_printed = None
            db_app.last_filed = None
            db_app.last_efiling_submission = None
            db_app.application_reference = application_id
            db_app.previous_app_status = prv_app_status_enc
            db_app.previous_app_key_id = prv_app_status_key_id
            
            db_app.save()
            return Response({"app_id": db_app.pk})
        
        
        
