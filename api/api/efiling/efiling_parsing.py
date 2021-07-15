from django.conf import settings
from django.contrib.admin.utils import flatten

""" This is application specific to Family Law Act App.
    This maps from our Application, PreparedPdf, Document
    objects into the EFiling data structure."""


class EFilingParsing:
    def url_from_headers(self, request, extra):
        if "HTTP_X_FORWARDED_HOST" in request.META:
            host = request.META["HTTP_X_FORWARDED_HOST"]
            proto = request.META["HTTP_X_FORWARDED_PROTO"]
        else:
            host = request.META["HTTP_HOST"]
            proto = "http"
        return f"{proto}://{host}{settings.FORCE_SCRIPT_NAME}{extra}"

    def convert_data_for_efiling(
        self, request, application, application_steps, documents
    ):
        applicant = application_steps[0]["result"]["applicantName"]
        respondents = application_steps[0]["result"]["respondents"]
        file_number = (
            application_steps[0]["result"]["existingOrders"][0]["fileNumber"]
            if len(application_steps[0]["result"]["existingOrders"]) > 0
            else ""
        )
        converted_data = {
            "fileNumber": file_number,
            "locationName": application.application_location,
            "documents": documents,
            "organizationParties": [],
            "parties": flatten(
                [
                    {
                        "partyType": "IND",
                        "roleType": "PAR",
                        "firstName": applicant["first"],
                        "middleName": applicant["middle"],
                        "lastName": applicant["last"],
                    },
                    [
                        {
                            "partyType": "IND",
                            "roleType": "OPAR",
                            "firstName": respondent["first"],
                            "middleName": respondent["middle"],
                            "lastName": respondent["last"],
                        }
                        for respondent in respondents
                    ],
                ]
            ),
            "successUrl": self.url_from_headers(
                request, f"result/{application.id}/success"
            ),
            "errorUrl": self.url_from_headers(
                request, f"result/{application.id}/error"
            ),
            "cancelUrl": self.url_from_headers(
                request, f"result/{application.id}/cancel"
            ),
        }
        return converted_data
