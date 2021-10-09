from rest_framework import exceptions, status

class KeycloakTokenError(exceptions.APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = "Service unavailable."
