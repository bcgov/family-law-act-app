# Special thanks to eDivorce for this.
import logging
from django.conf import settings
from .efiling_resources import EFilingResources

logger = logging.getLogger(__name__)


class EFilingPackaging:
    def __init__(self):
        self.app_name = settings.EFILING_APP_NAME
        self.court_level = settings.EFILING_COURT_LEVEL
        self.court_class = settings.EFILING_COURT_CLASS
        self.court_division = settings.EFILING_COURT_DIVISION

    def _resolve_location_code(self, location_name) -> {}:
        court_locations = EFilingResources().get_courts()
        return court_locations.get(location_name, {"location_id": "0000"}).get(
            "location_id"
        )

    def build_efiling_body(self, data) -> {}:
        return {
            "clientAppName": self.app_name,
            "filingPackage": {
                "court": {
                    "location": self._resolve_location_code(data["locationName"]),
                    "level": self.court_level,
                    "courtClass": self.court_class,
                    "division": self.court_division,
                    "fileNumber": "",
                },
                "documents": [
                    {
                        "name": document["name"],
                        "type": document["type"],
                        "isAmendment": False,
                        "isSupremeCourtScheduling": False,
                        "data": document["data"],
                        "md5": document["md5"],
                    }
                    for document in data["documents"]
                ],
                "parties": [
                    {
                        "partyType": party["partyType"],
                        "roleType": party["roleType"],
                        "firstName": party["firstName"],
                        "middleName": party["middleName"],
                        "lastName": party["lastName"],
                    }
                    for party in data["parties"]
                ],
                "organizationParties": [
                    {
                        "roleType": organizationParty["roleType"],
                        "name": organizationParty["name"]
                    }
                    for organizationParty in data["organizationParties"]
                ]
            },
            "navigationUrls": {
                "success": data["successUrl"],
                "error": data["errorUrl"],
                "cancel": data["cancelUrl"],
            }
        }
