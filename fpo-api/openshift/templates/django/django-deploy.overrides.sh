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
  readParameter "OIDC_RP_PROVIDER_ENDPOINT - Please provide the url for the OIDC RP Provider.  The default is a blank string." OIDC_RP_PROVIDER_ENDPOINT "false"
  readParameter "OIDC_RP_CLIENT_SECRET - Please provide the OIDC RP Client Secret.  The default is a blank string." OIDC_RP_CLIENT_SECRET "false"
else
  # Secrets are removed from the configurations during update operations ...
  printStatusMsg "Update operation detected ...\nSkipping the prompts for OIDC_RP_PROVIDER_ENDPOINT, OIDC_RP_CLIENT_SECRET secrets ... \n"
  writeParameter "OIDC_RP_PROVIDER_ENDPOINT" "prompt_skipped" "false"
  writeParameter "OIDC_RP_CLIENT_SECRET" "prompt_skipped" "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}