from django.http import HttpResponse
from django.http import HttpResponseRedirect
from core.auth import get_login_uri, get_logout_uri
from django.conf import settings
from api.models.user import User


def health(request):
    """
    Health check for OpenShift
    """
    return HttpResponse(User.objects.count())


def login(request):
    """
    Check if we are already logged in. If we are don't redirect to SSO.
    """
    logged_in = isinstance(request.user, User)
    if logged_in:
        return HttpResponseRedirect(settings.FORCE_SCRIPT_NAME)
    return HttpResponseRedirect(get_login_uri(request, next=request.GET["next"]))


def logout(request):
    return HttpResponseRedirect(get_logout_uri(request))
