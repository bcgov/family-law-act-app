import logging
import random
import re
import uuid
from string import ascii_lowercase, digits

from django.contrib.auth import login
from django.conf import settings
from django.db.models import Q
from rest_framework import authentication
from rest_framework import exceptions

from api.models.User import User


def get_firstname_lastname(display_name, user_type):
    # Extract first name and last name from a display name
    if user_type == "Internal":
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


def generate_random_username(
    length=16, chars=ascii_lowercase + digits, split=4, delimiter="-", prefix=""
):
    username = "".join([random.choice(chars) for i in range(length)])

    if split:
        username = delimiter.join(
            [
                username[start : start + split]
                for start in range(0, len(username), split)
            ]
        )
    username = prefix + username

    try:
        User.objects.get(username=username)
        return generate_random_username(
            length=length, chars=chars, split=split, delimiter=delimiter
        )
    except User.DoesNotExist:
        return username


class SiteMinderAuth(authentication.BaseAuthentication):
    """
    rest_framework authentication backend
    Authenticate a user based on SiteMinder headers
    """

    def __init__(self):
        self.__logger = logging.getLogger(__name__)

    def authenticate(self, request):
        header_username = request.META.get(
            "HTTP_SM_USER", request.META.get("HTTP_SM_UNIVERSALID")
        )
        guid = request.META.get("HTTP_SMGOV_USERGUID")
        header_user_guid = uuid.UUID(guid) if guid else None
        header_user_dir = request.META.get("HTTP_SM_AUTHDIRNAME")
        header_user_id = request.META.get("HTTP_SM_UNIVERSALID", "").lower()
        header_user_email = request.META.get("HTTP_SMGOV_USEREMAIL")
        header_user_displayname = request.META.get("HTTP_SMGOV_USERDISPLAYNAME", "")
        header_user_type = request.META.get("HTTP_SMGOV_USERTYPE", "")

        result = None

        if header_user_guid or header_user_id:
            self.__logger.info("Authenticating siteminder login ''", header_user_id)
            try:
                user = User.objects.get(
                    Q(authorization_guid=header_user_guid)
                    | Q(authorization_id=header_user_id)
                )
            except User.DoesNotExist:
                username = "_".join([header_user_type.lower(), header_username.lower()])
                user = User.objects.create_user(
                    username, email=header_user_email, password=None
                )

            # First time logging in, map the GUID to the user and set
            # fname & lname
            if user.authorization_guid is None:
                user.authorization_guid = header_user_guid
            elif user.authorization_guid != header_user_guid:
                raise exceptions.AuthenticationFailed(
                    "Invalid user identifier. " "Please contact your administrator."
                )

            first_name, last_name = get_firstname_lastname(
                header_user_displayname, header_user_type
            )
            user.first_name = first_name if first_name else ""
            user.last_name = last_name if last_name else ""
            if not user.username:
                user.username = "_".join(
                    [header_user_type.lower(), header_username.lower()]
                )

            user.authorization_email = header_user_email
            user.authorization_id = header_user_id
            user.authorization_directory = header_user_dir
            user.display_name = header_user_displayname

            user.save()

            result = (user, None)

        elif settings.DEMO_LOGIN:
            if "HTTP_X_DEMO_LOGIN" in request.META:
                custom_email = request.META["HTTP_X_DEMO_LOGIN"]
            else:
                custom_email = request.COOKIES.get("x-demo-login")
            if custom_email and re.match(r"[\w\.\-\+]+@[\w\.\-]+\.\w+", custom_email):
                self.__logger.info("Authenticating demo login '%s'", custom_email)
                try:
                    user = User.objects.get(email=custom_email)
                except User.DoesNotExist:
                    username = generate_random_username()
                    user = User.objects.create_user(
                        username=username,
                        email=custom_email,
                        password=None,
                        authorization_id=username,
                    )
                result = (user, "demo")

        return result
