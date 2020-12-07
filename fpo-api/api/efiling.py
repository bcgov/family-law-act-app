import logging
import requests
import hashlib

from django.conf import settings
from requests.auth import HTTPBasicAuth
from rest_framework.reverse import reverse

LOGGER = logging.getLogger(__name__)


def upload_documents(transaction_id, files) -> {}:
    token_res = get_efiling_auth_token()
    try:
        url = f"{settings.EFILING_BASE_URL}/api/submission/documents"
        header = {
                    "Authorization": f"Bearer {token_res['access_token']}",
                    "Content-Type": "multipart/form-data",
                    "X-Transaction-Id": transaction_id
                 }

        response = requests.post(
            url, files=files, headers=header, verify=True
            )

        if not response.status_code == 200:
            LOGGER.error("Error: Unexpected response %s", response.text.encode('utf8'))
            return
        return response.json()
    except requests.exceptions.RequestException as e:
        LOGGER.error("Error: {}".format(e))
        return


def build_efiling_body(location, documents, applicant, respondent, request) -> {}:
    return {
        "clientAppName": "Family Law Act App",
        "filingPackage": {
            "court": {
                "location": location,
                "level": "P",
                "courtClass": "F",
                "division": "I",
                "fileNumber": None
            },
            "documents": build_documents(documents),
            "parties": build_parties(applicant, respondent),
            "navigationUrls": {
                "success": reverse("", request=request) + 'success',
                "error": reverse("", request=request) + 'error',
                "cancel": reverse("", request=request) + 'cancel'
            }
        }
    }


def build_documents(documents) -> {}:
    built_documents = []
    for document in documents:
        built_documents.append({
            "name": document.name,
            "type": document.type,
            "isAmendment": False,
            "isSupremeCourtScheduling": False,  # change ?
            "data": document.data,
            "md5": hashlib.md5(document.data)
        })
    return built_documents


def build_parties(applicant, respondent) -> {}:
    built_parties = []
    built_parties.append(
        {
            "partyType": "IND",
            "roleType": "APP",
            "firstName": applicant["first"],
            "middleName": applicant["middle"],
            "lastName": applicant["last"]
        },
    )
    if (respondent is not None):
        built_parties.append(
            {
                "partyType": "IND",
                "roleType": "RES",
                "firstName": respondent["first"],
                "middleName": respondent["middle"],
                "lastName": respondent["last"]
            }
        )
    return built_parties


def submit_efiling(transaction_id, data) -> {}:
    token_res = get_efiling_auth_token()
    #if (token_res#print(token_res)

    """try:
        auth = HTTPBasicAuth(client_id, client_secret)
        token_rs = requests.post(url, data=payload, auth=auth,
                                 headers=header, verify=True)
        if not token_rs.status_code == 200:
            LOGGER.error("Error: Unexpected response %s", token_rs.text.encode('utf8'))
            return
        json_obj = token_rs.json()
        return json_obj
    except requests.exceptions.RequestException as e:
        LOGGER.error("Error: {}".format(e))
        return
    return"""


def get_efiling_auth_token() -> {}:
    client_id = settings.EFILING_CLIENT_ID
    client_secret = settings.EFILING_CLIENT_SECRET
    url = settings.EFILING_AUTH_URL
    if not client_id:
        LOGGER.error("eFiling service client id is not configured")
        return
    if not client_secret:
        LOGGER.error("eFiling service client secret is not configured")
        return
    if not url:
        LOGGER.error("eFiling authentication url is not configured")
        return
    payload = {"grant_type": "client_credentials"}
    header = {"content-type": "application/x-www-form-urlencoded"}
    try:
        auth = HTTPBasicAuth(client_id, client_secret)
        token_rs = requests.post(url, data=payload, auth=auth,
                                 headers=header, verify=True)
        if not token_rs.status_code == 200:
            LOGGER.error("Error: Unexpected response %s", token_rs.text.encode('utf8'))
            return
        json_obj = token_rs.json()
        return json_obj
    except requests.exceptions.RequestException as e:
        LOGGER.error("Error: {}".format(e))
        return
