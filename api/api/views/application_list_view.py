import json
import logging
from django.http import (
    Http404
)
from api.efiling import EFilingRejection
from django.conf import settings
from rest_framework import permissions
from rest_framework import generics

from api.models.application import Application
from api.serializers import ApplicationListSerializer

LOGGER = logging.getLogger(__name__)

class ApplicationListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ApplicationListSerializer

    def __init__(self):
        self.efiling_rejection = EFilingRejection()


    def encrypt_submission_results(self, details):
        try:
            details_bin = json.dumps(details).encode("ascii")
            (details_key_id, details_enc) = settings.ENCRYPTOR.encrypt(details_bin)
            return (details_key_id, details_enc)
        except Exception as ex:
            LOGGER.error("ERROR! %s", ex)

    def get_application_list_for_user(self, id):
        try:            
            self.efiling_rejection.generate_header(self.request)
            apps = Application.objects.filter(user_id=id)
            for app in apps:
                if app.last_filed and app.last_efiling_submission and not app.last_efiling_submission.decision_made:
                    package_number=app.last_efiling_submission.package_number                   
                    # print(package_number)

                    submission_results = self.efiling_rejection.get_rejected_info( package_number )
                    if submission_results:
                        results = json.loads(submission_results)
                        decision = False                       
                        if "documents" in results:
                            decision_list = [doc["status"]["code"].upper() for doc in results["documents"] if ("status" in doc and "code" in doc["status"]) ]
                            if "REJ" in decision_list or "FILE" in decision_list:
                                decision = True
                            # print(decision_list)
                        (results_key_id, results_enc) = self.encrypt_submission_results(submission_results)
                        app.last_efiling_submission.submission_results = results_enc 
                        app.last_efiling_submission.key_id = results_key_id
                        app.last_efiling_submission.decision_made = decision
                        app.last_efiling_submission.save()

            return apps
        except Application.DoesNotExist:
            raise Http404

    def get_queryset(self, format=None):
        return self.get_application_list_for_user(self.request.user.id)
