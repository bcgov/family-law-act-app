# Special thanks to eDivorce for this.
import json
import logging
import requests
from .efiling_hub_caller_base import EFilingHubCallerBase

logger = logging.getLogger(__name__)


class EFilingSubmission(EFilingHubCallerBase):
    def __init__(self, packaging):
        self.packaging = packaging
        self.submission_id = None
        self.access_token = None
        EFilingHubCallerBase.__init__(self)

    def _clean_error_message(self, details):
        message = " ".join(details)
        message = (
            message.replace("[", "")
            .replace("]", "")
            .replace("FileNumber", "File number")
        )
        return message

    def _get_api(self, url, bceid_guid, data, headers, transaction_id=None, files=None):
        if not self.access_token:
            if not self._get_token():
                raise Exception("EFH - Unable to get API Token")

        for try_number in range(1):
            if try_number > 0:
                self._get_token()
            headers = self._set_headers(headers, bceid_guid, transaction_id)
            response = requests.post(url, headers=headers, json=data, files=files)
            logger.debug("EFH - Get API %d %s", response.status_code, response.text)
            if response.status_code != 401:
                return response
        return response

    def upload_documents(self, bceid_guid, transaction_id, files):
        try:
            response = self._get_api(
                url=f"{self.api_base_url}/submission/documents",
                data={},
                headers={},
                bceid_guid=bceid_guid,
                transaction_id=transaction_id,
                files=files,
            )
            if not (response.status_code == 200):
                logger.error(
                    f"Error submitting documents for: {bceid_guid}, {transaction_id}"
                )
                return response.json()
            return response.json()
        except Exception as e:
            logger.error("Error: {}".format(e))
            return None

    """ Note: transaction_id and submission_id come from previous
    requests (ie upload_documents).  """

    def generate_efiling_url(self, bceid_guid, transaction_id, submission_id, data):
        package_data = self.packaging.build_efiling_body(data)
        logger.debug(f"submission_id:{submission_id}")
        logger.debug("data:")
        logger.debug(json.dumps(package_data, indent=4))

        response = self._get_api(
            f"{self.api_base_url}/submission/{submission_id}/generateUrl",
            data=package_data,
            headers={"Content-Type": "application/json"},
            bceid_guid=bceid_guid,
            transaction_id=transaction_id,
        )

        if response.status_code == 200:
            response = json.loads(response.text)
            return response["efilingUrl"], "success"

        response = json.loads(response.text)

        if "details" in response and len(response["details"]) > 0:
            return None, self._clean_error_message(response["details"])

        return None, f"{response['error']} - {response['message']}"
