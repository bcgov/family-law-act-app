import hashlib
import io
import json
from django.conf import settings

""" This is application specific to Family Law Act App.
    This maps from our Application, PreparedPdf, Document
    objects into the EFiling data structure."""


class EFilingParsing:
    def build_navigation_url(self, request, extra):
        if "HTTP_X_FORWARDED_HOST" in request.META:
            host = request.META["HTTP_X_FORWARDED_HOST"]
            proto = request.META["HTTP_X_FORWARDED_PROTO"]
        else:
            host = request.META["HTTP_HOST"]
            proto = "http"
        return f"{proto}://{host}{extra}"

    def convert_data_for_efiling(self, request, application, files, document_types):
        applicant = application.applicant_name
        respondent = application.respondent_name
        steps_json = json.loads(
            settings.ENCRYPTOR.decrypt(application.key_id, application.steps).decode(
                "utf-8"
            )
        )
        converted_data = {}
        converted_data["locationName"] = request.user.location
        converted_data["parties"] = [
            {
                "partyType": "IND",
                "roleType": "RES",
                "firstName": respondent["first"],
                "middleName": respondent["middle"],
                "lastName": respondent["last"],
            },
            {
                "partyType": "IND",
                "roleType": "APP",
                "firstName": applicant["first"],
                "middleName": applicant["middle"],
                "lastName": applicant["last"],
            }
        ]

        converted_data["documents"] = []
        for index, file in enumerate(files):
            converted_data["documents"].append(
                {
                    "name": file[1][0],
                    "type": document_types[index],
                    "data": "",  #steps_json if index + 1 == len(files) else "",
                    "md5": hashlib.md5(file[1][1]).hexdigest(),
                }
            )

        converted_data["successUrl"] = self.build_navigation_url(
            request, "/efiling/success"
        )
        converted_data["errorUrl"] = self.build_navigation_url(
            request, "/efiling/error"
        )
        converted_data["cancelUrl"] = self.build_navigation_url(
            request, "/efiling/cancelled"
        )

        return converted_data
