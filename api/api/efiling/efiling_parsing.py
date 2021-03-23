from django.conf import settings

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

    def convert_data_for_efiling(self, request, application, documents):
        applicant = application.applicant_name
        respondent = application.respondent_name
        converted_data = {
            "locationName": request.user.location,
            "documents": documents,
            "organizationParties": [],
            "parties": [
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
                },
            ],
            "successUrl": self.url_from_headers(
                request, f"result/{application.id}/success"
            ),
            "errorUrl": self.url_from_headers(request, f"result/{application.id}/error"),
            "cancelUrl": self.url_from_headers(
                request, f"result/{application.id}/cancel"
            ),
        }
        return converted_data
