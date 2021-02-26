import hashlib

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

    def convert_data_for_efiling(self, request, application, po_json, files, document_types):
        applicant = application.applicant_name
        respondent = application.respondent_name
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
                    "data": "",  #po_json if index == 0 else "",  # First file is always generated.
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
