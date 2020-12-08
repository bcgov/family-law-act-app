import logging
import urllib
import random
from string import ascii_lowercase, digits

from rest_framework.request import Request
from django.conf import settings
from django.urls.exceptions import NoReverseMatch

from rest_framework.reverse import reverse

from api.models.User import User
from oidc_rp.models import OIDCUser

LOGGER = logging.getLogger(__name__)


def get_login_uri(request: Request = None, next: str = None) -> str:
    uri = None
    if request:
        query_dictionary = {"next": next, "kc_idp_hint": settings.OIDC_RP_KC_IDP_HINT}
        query_dictionary = {k: v for k, v in query_dictionary.items() if v is not None}
        try:
            uri = "{base_url}?{querystring}".format(
                base_url=reverse("oidc_auth_request", request=request),
                querystring=urllib.parse.urlencode(query_dictionary),
            )
        except NoReverseMatch:
            pass
    return uri


def get_logout_uri(request: Request = None) -> str:
    uri = None
    if request:
        try:
            uri = reverse("oidc_end_session", request=request)
        except NoReverseMatch:
            pass
    return uri


def sync_keycloak_user(oidc_user: OIDCUser, claims: dict):
    """Copy attributes from JWT claims."""
    oidc_user.user.universal_id = claims.get("universal-id")
    oidc_user.user.authorization_id = claims.get("sub")
    oidc_user.user.first_name = claims.get("given_name")
    oidc_user.user.last_name = claims.get("family_name")
    oidc_user.user.email = claims.get("email")
    oidc_user.user.save()


def get_firstname_lastname(display_name, user_type):
    # Extract first name and last name from a display name
    if user_type == 'Internal':
        names = display_name.split(",")
        if len(names) > 1:
            last_name = names[0]
            first_name = names[1].strip().split(" ")[0]

            return first_name, last_name

    names = display_name.split(" ")
    if len(names) > 1:
        last_name = names[1]
        first_name = names[0]

        return first_name, last_name

    if len(names) > 0:
        return names[0], None

    return None, None


def generate_random_username(length=16, chars=ascii_lowercase+digits, split=4, delimiter='-', prefix=''):
    username = ''.join([random.choice(chars) for i in range(length)])

    if split:
        username = delimiter.join([username[start:start+split] for start in range(0, len(username), split)])
    username = prefix + username

    try:
        User.objects.get(username=username)
        return generate_random_username(length=length, chars=chars, split=split, delimiter=delimiter)
    except User.DoesNotExist:
        return username
