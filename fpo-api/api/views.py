"""
    REST API Documentation for Family Protection Order

    OpenAPI spec version: v1


    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
"""

from datetime import datetime
from django.utils import timezone
from rest_framework import status
import logging

from django.http import HttpResponse, HttpResponseBadRequest
from django.template.loader import get_template
from django.middleware.csrf import get_token
from api.auth import get_efiling_auth_token
from api.serializers import ApplicationLookupSerializer, ApplicationSerializer, StepLookupSerializer
from rest_framework.parsers import JSONParser

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics

from api.auth import (
    get_login_uri,
    get_logout_uri
)
from api.models import User, Application, Step, Page
from api.pdf import render as render_pdf

LOGGER = logging.getLogger(__name__)


class AcceptTermsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        request.user.accepted_terms_at = datetime.now()
        request.user.save()
        return Response({'ok': True})


class UserStatusView(APIView):
    def get(self, request: Request):
        logged_in = isinstance(request.user, User)
        info = {
            "accepted_terms_at": logged_in and request.user.accepted_terms_at or None,
            "user_id": logged_in and request.user.authorization_id or None,
            "email": logged_in and request.user.email or None,
            "first_name": logged_in and request.user.first_name or None,
            "last_name": logged_in and request.user.last_name or None,
            "is_staff": logged_in and request.user.is_staff,
            "login_uri": get_login_uri(request),
            "logout_uri": get_logout_uri(request),
            "surveys": [],
        }
        if logged_in and request.auth == "demo":
            info["demo_user"] = True
        ret = Response(info)
        uid = request.META.get("HTTP_X_DEMO_LOGIN")
        if uid and logged_in:
            # remember demo user
            ret.set_cookie("x-demo-login", uid)
        elif request.COOKIES.get("x-demo-login") and not logged_in:
            # logout
            ret.delete_cookie("x-demo-login")
        ret.set_cookie("csrftoken", get_token(request))
        return ret


class SurveyPdfView(generics.GenericAPIView):
    # FIXME - restore authentication?
    permission_classes = ()  # permissions.IsAuthenticated,)

    def post(self, request, name=None):
        data = request.data
        name = request.query_params.get("name")
        template = '{}.html'.format(name)

        template = get_template(template)
        html_content = template.render(data)

        pdf_content = render_pdf(html_content)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="report.pdf"'

        response.write(pdf_content)

        return response


class SubmitFormView(generics.GenericAPIView):
    def get(self, request):
        token_res = get_efiling_auth_token()
        if token_res:
            LOGGER.debug("Token response is %s", token_res['access_token'])
            return Response({'Token': True})
        return Response({'Token': False})


class ApplicationListView(generics.ListAPIView):
    """
    List all application for a user
    """
    def get_app_object(self, id):
        try:
            return Application.objects.filter(user_id=id)
        except Application.DoesNotExist:
            return HttpResponse(status=404)

    def get(self, request, id, format=None):
        applications = self.get_app_object(id)
        serializer = ApplicationLookupSerializer(applications, many=True)
        return Response(serializer.data, safe=False)


class ApplicationDetailView(APIView):
    def get_app_object(self, pk):
        try:
            return Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return HttpResponse(status=404)

    def get(self, request, pk, format=None):
        application = self.get_app_object(pk)
        serializer = ApplicationLookupSerializer(application)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        application = self.get_app_object(pk)
        data = JSONParser().parse(request)
        data_ = {"app_type": data.get("type")}
        serializer = ApplicationSerializer(application, data=data_)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        application = self.get_app_object(pk)
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NewApplicationView(APIView):
    def post(self, request: Request):

        db_app = Application(
            last_updated=timezone.now(),
            app_type=request.data.get("type"),
            current_step=request.data.get("currentStep"),
            all_completed=request.data.get("allCompleted"),
            user_type=request.data.get("userType"),
            applicant_name=request.data.get("applicantName"),
            user_name=request.data.get("userName"),
            respondent_name=request.data.get("respondentName"),
            user_id=request.data.get("userId"))
        db_app.save()

        steps = request.data["steps"]
        if steps:
            for step in steps:
                db_step = Step(
                    application_id=db_app.pk,
                    last_updated=timezone.now(),
                    s_id=step["id"],
                    result=step["result"],
                    active=step["active"],
                    label=step["label"],
                    icon=step["icon"],
                    step_type=step["type"],
                    current_page=step["currentPage"]
                )
                db_step.save()
                pages = step["pages"]
                if pages:
                    for page in pages:
                        db_page = Page(
                            step_id=db_step.pk,
                            key=page['key'],
                            label=page['label'],
                            active=page['active'],
                            progress=page['progress']
                        )
                        db_page.save()

        return Response({"app_id": db_app.pk})
