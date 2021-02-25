# Special thanks to eDivorce for this.
import json
import logging
import requests
from django.conf import settings

from django.core.cache import cache
from .efiling_hub_caller_base import EFilingHubCallerBase

logger = logging.getLogger(__name__)


class EFilingResources(EFilingHubCallerBase):
    def __init__(self):
        self.access_token = None
        self.court_level = settings.EFILING_COURT_LEVEL
        self.court_class = settings.EFILING_COURT_CLASS
        EFilingHubCallerBase.__init__(self)

    def _get_api(self, url, headers):
        if not self.access_token:
            if not self._get_token():
                raise Exception("EFHResources - Unable to get API Token")

        for try_number in range(1):
            if try_number > 0:
                self._get_token()
            headers = self._set_headers(headers)
            response = requests.get(url, headers=headers)
            logger.debug(
                "EFHResources - Get API %d %s", response.status_code, response.text
            )
            if response.status_code != 401:
                return response
        return response

    def get_document_types(self):
        query_string = (
            f"?courtLevel={self.court_level}&courtClassification={self.court_class}"
        )
        url = f"{self.api_base_url}/documents/types{query_string}"
        response = self._get_api(url, headers={})
        if response.status_code == 200:
            return response.json()
        logger.error("Error getting document types.")
        return None

    def get_courts(
        self,
    ):
        if cache.get("courts"):
            return cache.get("courts")

        url = f"{self.api_base_url}/courts?courtLevel=P"
        response = self._get_api(url, headers={})

        if response.status_code == 200:
            cso_locations = json.loads(response.text)
            locations = {}

            for location in cso_locations["courts"]:
                city = location["address"]["cityName"]
                locations[city] = {
                    "address_1": location["address"]["addressLine1"],
                    "address_2": location["address"]["addressLine2"],
                    "address_3": location["address"]["addressLine3"],
                    "postal": location["address"]["postalCode"],
                    "location_id": location["identifierCode"],
                }
            cache.set("courts", locations)
            return locations
        logger.error("Error getting locations.")
        return None
