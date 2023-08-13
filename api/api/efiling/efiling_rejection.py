import logging
import requests
from .efiling_hub_caller_base import EFilingHubCallerBase
from api.efiling.exceptions import KeycloakTokenError


logger = logging.getLogger(__name__)


class EFilingRejection(EFilingHubCallerBase):
    
    def __init__(self):
        self.access_token = None
        self.header = None
        EFilingHubCallerBase.__init__(self)


    def generate_header(self, request):        
        
        refresh_token=request.session['oidc_auth_refresh_token']
        if not self.access_token and not self._get_new_token(refresh_token):
            raise KeycloakTokenError("EFH - Unable to get API Token")
        
        bceid_guid=request.user.universal_id        
        headers={"Content-Type": "application/json"}
        self.headers = self._set_headers(headers, bceid_guid, None)

    
    def get_registry_notice(self, package_id):
        
        url=f"{self.api_base_url}/filingpackages/{package_id}/registryNotice"       
        response = requests.get(url, headers=self.headers)
        return response.content


    def get_rejected_info(self, package_id):
        
        url=f"{self.api_base_url}/filingpackages/{package_id}"      
        response = requests.get(url, headers=self.headers)
               
        # print("____________________")
        # print(url)
        # print(response.status_code)
        # print(response.content)
        if response.status_code==200 and response.content:
            return response.content.decode('utf8')
        else:
            return None
