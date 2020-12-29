_includeFile=$(type -p overrides.inc)
# Import ocFunctions.inc for getSecret
_ocFunctions=$(type -p ocFunctions.inc)
if [ ! -z ${_includeFile} ]; then
  . ${_ocFunctions}
  . ${_includeFile}
else
  _red='\033[0;31m'; _yellow='\033[1;33m'; _nc='\033[0m'; echo -e \\n"${_red}overrides.inc could not be found on the path.${_nc}\n${_yellow}Please ensure the openshift-developer-tools are installed on and registered on your path.${_nc}\n${_yellow}https://github.com/BCDevOps/openshift-developer-tools${_nc}"; exit 1;
fi

# ========================================================================================
# Special Deployment Parameters needed for proxy deployment
# ----------------------------------------------------------------------------------------
# The results need to be encoded as OpenShift template parameters for use with oc process.
# ========================================================================================

if createOperation; then
  readParameter "ALLOW_LIST - Please enter the list of trusted IP addresses that should be allowed to access the application's route (as a space delimited list of IP addresses):" "ALLOW_LIST" "" "false"
else
  # Get ALLOW_LIST from secret
  printStatusMsg "Getting allow list from secret ...\n"
  writeParameter "ALLOW_LIST" "$(getSecret "${NAME}" "allow-list")" "false"
fi

SPECIALDEPLOYPARMS="--param-file=${_overrideParamFile}"
echo ${SPECIALDEPLOYPARMS}