from rest_framework.response import Response

from api.auth import (
    get_login_uri,
    get_logout_uri
)

from django.http import (
    HttpResponseForbidden
)

from rest_framework.views import APIView
from rest_framework.request import Request
from api.models.User import User
from django.middleware.csrf import get_token


class UserView(APIView):
    def put(self, request):
        if (not isinstance(request.user, User)):
            return HttpResponseForbidden()
        location = request.data.get("location")
        request.user.location = location
        request.user.save()
        return Response(status=204)

    def get(self, request: Request):
        logged_in = isinstance(request.user, User)
        info = {
            "accepted_terms_at": logged_in and request.user.accepted_terms_at or None,
            "user_id": logged_in and request.user.authorization_id or None,
            "email": logged_in and request.user.email or None,
            "first_name": logged_in and request.user.first_name or None,
            "last_name": logged_in and request.user.last_name or None,
            "display_name": logged_in and request.user.display_name or None,
            "is_staff": logged_in and request.user.is_staff,
            "universal_id": logged_in and request.user.universal_id,
            "login_uri": get_login_uri(request),
            "logout_uri": get_logout_uri(request),
            "location": logged_in and request.user.location
        }
        ret = Response(info)
        ret.set_cookie("csrftoken", get_token(request))
        return ret
