#!/bin/bash
export MSYS_NO_PATHCONV=1
set -e

S2I_EXE=s2i
if [ -z $(type -P "$S2I_EXE") ]; then
  echo -e "The ${S2I_EXE} executable is needed and not on your path."
  echo -e "It can be downloaded from here: https://github.com/openshift/source-to-image"
  echo -e "Make sure you place it in a directory on your path."
  exit 1
fi

SCRIPT_HOME="$( cd "$( dirname "$0" )" && pwd )"
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME-fpo}"

# =================================================================================================================
# Usage:
# -----------------------------------------------------------------------------------------------------------------
usage() {
  cat <<-EOF

  Usage: $0 {start|stop|build|rm}

  Options:

  build - Build the docker images for the project.
          You need to do this first, since the builds require
          a combination of Docker and S2I builds.

  start - Creates the application containers from the built images
          and starts the services based on the docker-compose.yml file.

          You can pass in a list of containers to start.  
          By default all containers will be started.
          
          The API_URL used by fpo-web can also be redirected.

          Examples:
          $0 start
          $0 start fpo-web
          $0 start fpo-web API_URL=http://docker.for.win.localhost:56325/api

  stop - Stops the services.  This is a non-destructive process.  The containers
         are not deleted so they will be reused the next time you run start.

  rm - Removes any existing application containers.

  loadFixtures - Load the data fixtures (sample data).  The application must be running.
EOF
exit 1
}
# -----------------------------------------------------------------------------------------------------------------
# Default Settings:
# -----------------------------------------------------------------------------------------------------------------
DEFAULT_CONTAINERS="fpo-pdf"
# -----------------------------------------------------------------------------------------------------------------
# Functions:
# -----------------------------------------------------------------------------------------------------------------
build-web() {
  #
  # fpo-web
  #
  # The nginx-runtime image is used for the final runtime image.
  # The angular-app image is used to build the artifacts for the angular distribution.
  # The angular-on-nginx image is copy of the nginx-runtime image complete with a copy of the build artifacts.
  #
  echo -e "\n\n===================================================================================================="
  echo -e "Building the nginx-runtime image using Docker ..."
  echo -e "----------------------------------------------------------------------------------------------------"
  docker build \
    -t 'nginx-runtime' \
    -f '../fpo-web/openshift/templates/nginx-runtime/Dockerfile' '../fpo-web/openshift/templates/nginx-runtime/'
  echo -e "===================================================================================================="
  
  echo -e "\n\n===================================================================================================="
  echo -e "Building the angular-app image using s2i ..."
  echo -e "----------------------------------------------------------------------------------------------------"
  ${S2I_EXE} build \
    --copy \
    '../fpo-web' \
    'centos/nodejs-10-centos7:10' \
    'angular-app'
  echo -e "===================================================================================================="

  echo -e "\n\n===================================================================================================="
  echo -e "Building the angular-on-nginx image using Docker ..."
  echo -e "----------------------------------------------------------------------------------------------------"
  docker build \
    -t 'fpo-angular-on-nginx' \
    -f '../fpo-web/openshift/templates/angular-on-nginx/Dockerfile' '../fpo-web/openshift/templates/angular-on-nginx/'
  echo -e "===================================================================================================="
}

build-web-dev() {
  echo -e "Building web-dev environment ..."
  docker build \
    -t 'nginx-runtime' \
    -f '../fpo-web/openshift/templates/nginx-runtime/Dockerfile' '../fpo-web/openshift/templates/nginx-runtime/'
  
#-v "${COMPOSE_PROJECT_NAME}_fpo-npm-cache:/opt/app-root/src/.npm" \
  ${S2I_EXE} build \
    --copy \
    -e "DEV_MODE=true" \
    '../fpo-web' \
    'centos/nodejs-10-centos7:10' \
    'fpo-angular-dev'

  #docker build \
  #  -t 'fpo-angular-on-nginx' \
  #  -f '../fpo-web/openshift/templates/angular-on-nginx/Dockerfile' '../fpo-web/openshift/templates/angular-on-nginx/'
}

build-db() {
  #
  # fpo-db
  #
  # Nothing to build here ...
  echo
}

build-schema-spy() {
  #
  # schema-spy
  #
  echo -e "\nBuilding schema-spy image ..."
  docker build \
    https://github.com/bcgov/SchemaSpy.git \
    -t 'schema-spy'
}

build-api() {
  #
  # fpo-api
  #
  echo -e "\nBuilding django image ..."
  ${S2I_EXE} build \
    -e "UPGRADE_PIP_TO_LATEST=true" \
    --copy \
    '../fpo-api' \
    'registry.fedoraproject.org/f32/python3' \
    'fpo-django'
}

build-pdf() {
  #
  # fpo-pdf
  #
  # Nothing to build here ...
  echo
}

buildImages() {
  #build-web
  #build-db
  #build-schema-spy
  #build-api
  build-pdf
}

build() {
  # Build all containers in the docker-compose file
  echo -e "\nBuilding containers ..."
  echo docker-compose build $@
  docker-compose build $@
}

configureEnvironment () {
  for arg in $@; do
    case "$arg" in
      *=*)
        export ${arg}
        ;;  
    esac
  done
  
  # fpo-db
  export POSTGRESQL_DATABASE="APP_DATABASE"
  export POSTGRESQL_USER="DB_USER"
  export POSTGRESQL_PASSWORD="DB_PASSWORD"

  # schema-spy
  export DATABASE_SERVICE_NAME="fpo-db"
  export POSTGRESQL_DATABASE=${POSTGRESQL_DATABASE}
  export POSTGRESQL_USER=${POSTGRESQL_USER}
  export POSTGRESQL_PASSWORD=${POSTGRESQL_PASSWORD}

  # fpo-api
  export API_HTTP_PORT=${API_HTTP_PORT-8081}
  export PDF_SERVICE_URL=${PDF_SERVICE_URL-http://fpo-pdf:5001}
  export OVERRIDE_USER_ID=${OVERRIDE_USER_ID-}
  export DATABASE_SERVICE_NAME="fpo-db"
  export DATABASE_ENGINE="postgresql"
  export DATABASE_NAME=${POSTGRESQL_DATABASE}
  export DATABASE_USER=${POSTGRESQL_USER}
  export DATABASE_PASSWORD=${POSTGRESQL_PASSWORD}
  export DJANGO_SECRET_KEY=wpn1GZrouOryH2FshRrpVHcEhMfMLtmTWMC2K5Vhx8MAi74H5y
  export DJANGO_DEBUG=True
  export DJANGO_LOG_LEVEL=${DJANGO_LOG_LEVEL:-DEBUG}
  export RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY}
  export RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
  
  export SMTP_SERVER_ADDRESS=${SMTP_SERVER_ADDRESS}
  
  export EMAIL_SERVICE_CLIENT_ID=${EMAIL_SERVICE_CLIENT_ID:-VTH_SERVICE_CLIENT}
  export EMAIL_SERVICE_CLIENT_SECRET=${EMAIL_SERVICE_CLIENT_SECRET:-08f8c75e-6d13-4983-a859-2a50b666860e}
  
  export CHES_AUTH_URL=${CHES_AUTH_URL:-https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token}
  export CHES_EMAIL_URL=${CHES_EMAIL_URL:-https://ches-master-9f0fbe-dev.pathfinder.gov.bc.ca/api/v1/email}
  
  export SENDER_EMAIL=${SENDER_EMAIL:-no-reply-localdev@gov.bc.ca}
  export SENDER_NAME=${SENDER_NAME:-Choose How to Attend Your Traffic Hearing Service}

  export FEEDBACK_TARGET_EMAIL=${FEEDBACK_TARGET_EMAIL}
  
  export DATA_SECURITY_KEY=${DATA_SECURITY_KEY} 

  # fpo-web
  export WEB_HTTP_PORT=${WEB_HTTP_PORT-8080}
  export API_URL=${API_URL-http://fpo-api:8080/api}
  export IpFilterRules='#allow all; deny all;'
  export RealIpFrom='127.0.0.0/16'
  export WEB_BASE_HREF=${WEB_BASE_HREF:-/choose-how-to-attend-your-traffic-hearing/}
}

getStartupParams() {
  CONTAINERS=""
  ARGS="--force-recreate"

  for arg in $@; do
    case "$arg" in
      *=*)
        # Skip it
        ;;  
     -*)
        ARGS+=" $arg";;
      *)
        CONTAINERS+=" $arg";;
    esac
  done

  if [ -z "$CONTAINERS" ]; then
    CONTAINERS="$DEFAULT_CONTAINERS"
  fi

  echo ${ARGS} ${CONTAINERS}
}

deleteVolumes() {
  _projectName=${COMPOSE_PROJECT_NAME:-docker}

  echo "Stopping and removing any running containers ..."
  docker-compose rm -svf >/dev/null

  _pattern="^${_projectName}_\|^docker_"
  _volumes=$(docker volume ls -q | grep ${_pattern})

  if [ ! -z "${_volumes}" ]; then
    echo "Removing project volumes ..."
    echo ${_volumes} |  xargs docker volume rm
  else
    echo "No project volumes exist."
  fi
}

toLower() {
  echo $(echo ${@} | tr '[:upper:]' '[:lower:]')
}


loadFixtures() {
  docker exec fpo_fpo-api_1 bash loadFixtures
}
# =================================================================================================================

pushd ${SCRIPT_HOME} >/dev/null
COMMAND=$(toLower ${1})
shift

case "$COMMAND" in
  start)
    _startupParams=$(getStartupParams $@)
    configureEnvironment $@
    docker-compose up ${_startupParams}
    ;;
  web-dev)
    _startupParams=$(getStartupParams $@)
    configureEnvironment $@
    [ -z "$SKIP_BUILD" ] && build-web-dev
    docker-compose run --rm --service-ports fpo-web-dev
    ;;
  stop)
    configureEnvironment
    docker-compose stop
    ;;
  rm)
    configureEnvironment
    deleteVolumes
    ;;
  loadfixtures)
    loadFixtures
    ;;
  build)
    case "$@" in
      fpo-api)
        build-api
        ;;
      fpo-web)
        build-web
        ;;
      fpo-solr)
        build-solr
        ;;
      *)
       buildImages
    esac
    ;;
  *)
    usage
esac

popd >/dev/null
