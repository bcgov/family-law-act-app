_includeFile=$(type -p overrides.inc)
# Import ocFunctions.inc for getSecret
_ocFunctions=$(type -p ocFunctions.inc)
if [ ! -z ${_includeFile} ]; then
  . ${_ocFunctions}
  . ${_includeFile}
else
  _red='\033[0;31m'; _yellow='\033[1;33m'; _nc='\033[0m'; echo -e \\n"${_red}overrides.inc could not be found on the path.${_nc}\n${_yellow}Please ensure the openshift-developer-tools are installed on and registered on your path.${_nc}\n${_yellow}https://github.com/BCDevOps/openshift-developer-tools${_nc}"; exit 1;
fi

# ================================================================================================================
# Special deployment parameters needed for injecting a user supplied settings into the deployment configuration
# ----------------------------------------------------------------------------------------------------------------

if createOperation; then
  # Ask the user to supply the sensitive parameters ...
  readParameter "DATA_SECURITY_KEY - Please provide the encryption key for the application environment.  If left blank, a 32 character long base64 encoded value will be randomly generated using openssl:" DATA_SECURITY_KEY $(generateKey 32) "false"
  readParameter "OIDC_RP_PROVIDER_ENDPOINT - Please provide the url for the OIDC RP Provider.  The default is a blank string." OIDC_RP_PROVIDER_ENDPOINT "" "false"
  parseHostnameParameter "OIDC_RP_PROVIDER_ENDPOINT" "OIDC_RP_HOST"
  readParameter "OIDC_RP_CLIENT_SECRET - Please provide the OIDC RP Client Secret.  The default is a blank string." OIDC_RP_CLIENT_SECRET "" "false"

  # Get the eFiling settings
  readParameter "EFILING_HUB_KEYCLOAK_BASE_URL - Please provide the url for the eFiling authentication.  The default is a blank string." EFILING_HUB_KEYCLOAK_BASE_URL "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_REALM - Please provide the realm for the eFiling authentication.  The default is a blank string." EFILING_HUB_KEYCLOAK_REALM "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_CLIENT_ID - Please provide the service client id for submitting the application.  The default is a blank string." EFILING_HUB_KEYCLOAK_CLIENT_ID "" "false"
  readParameter "EFILING_HUB_KEYCLOAK_SECRET - Please provide the service client secret to use with above id.  The default is a blank string." EFILING_HUB_KEYCLOAK_SECRET "" "false"
  readParameter "EFILING_HUB_API_BASE_URL - Please provide base url for efiling.  The default is a blank string." EFILING_HUB_API_BASE_URL "" "false"

  readParameter "SITEMINDER_LOGOFF_URL - Please provide the SiteMinder Logoff URL for the application environment.  The default is a blank string." SITEMINDER_LOGOFF_URL "" "false"
else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the prompts for DATA_SECURITY_KEY, OIDC_RP_PROVIDER_ENDPOINT, OIDC_RP_CLIENT_SECRET, EFILING_HUB_KEYCLOAK_BASE_URL, EFILING_HUB_KEYCLOAK_CLIENT_ID, EFILING_HUB_KEYCLOAK_SECRET, and SITEMINDER_LOGOFF_URL secrets ... \n"
  writeParameter "DATA_SECURITY_KEY" "prompt_skipped" "false"
  writeParameter "OIDC_RP_PROVIDER_ENDPOINT" "prompt_skipped" "false"
  writeParameter "OIDC_RP_CLIENT_SECRET" "prompt_skipped" "false"

  writeParameter "EFILING_HUB_KEYCLOAK_BASE_URL" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_REALM" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_CLIENT_ID" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_KEYCLOAK_SECRET" "prompt_skipped" "false"
  writeParameter "EFILING_HUB_API_BASE_URL" "prompt_skipped" "false"

  writeParameter "SITEMINDER_LOGOFF_URL" "prompt_skipped" "false"

  # Get OIDC_RP_HOST from secret
  printStatusMsg "Getting OIDC_RP_HOST for the ExternalNetwork definition from secret ...\n"
  writeParameter "OIDC_RP_HOST" $(getSecret "${NAME}" "oidc-rp-host") "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}