_includeFile=$(type -p overrides.inc)
if [ ! -z ${_includeFile} ]; then
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
  readParameter "OIDC_RP_PROVIDER_ENDPOINT - Please provide the url for the OIDC RP Provider.  The default is a blank string." OIDC_RP_PROVIDER_ENDPOINT "false"
  readParameter "OIDC_RP_CLIENT_SECRET - Please provide the OIDC RP Client Secret.  The default is a blank string." OIDC_RP_CLIENT_SECRET "false"

  # Get the eFiling settings
  readParameter "EFILING_AUTH_URL - Please provide the url for the eFiling authentication.  The default is a blank string." EFILING_AUTH_URL "" "false"
  readParameter "EFILING_CLIENT_ID - Please provide the service client id for submitting the application.  The default is a blank string." EFILING_CLIENT_ID "" "false"
  readParameter "EFILING_CLIENT_SECRET - Please provide the service client secret to use with above id.  The default is a blank string." EFILING_CLIENT_SECRET "" "false"
  readParameter "EFILING_BASE_URL - Please provide base url for efiling.  The default is a blank string." EFILING_BASE_URL "" "false"

else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the prompts for DATA_SECURITY_KEY, OIDC_RP_PROVIDER_ENDPOINT, OIDC_RP_CLIENT_SECRET, EFILING_AUTH_URL, EFILING_CLIENT_ID, EFILING_CLIENT_SECRET secrets ... \n"
  writeParameter "DATA_SECURITY_KEY" "prompt_skipped" "false"
  writeParameter "OIDC_RP_PROVIDER_ENDPOINT" "prompt_skipped" "false"
  writeParameter "OIDC_RP_CLIENT_SECRET" "prompt_skipped" "false"

  writeParameter "EFILING_AUTH_URL" "prompt_skipped" "false"
  writeParameter "EFILING_CLIENT_ID" "prompt_skipped" "false"
  writeParameter "EFILING_CLIENT_SECRET" "prompt_skipped" "false"
  writeParameter "EFILING_BASE_URL" "prompt_skipped" "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}