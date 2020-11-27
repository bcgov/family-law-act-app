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
import json
from django.http import Http404
from django.conf import settings
from api.models.PreparedPdf import PreparedPdf

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden, HttpResponseNotFound
from django.template.loader import get_template
from django.middleware.csrf import get_token
from api.auth import get_efiling_auth_token
from api.serializers import ApplicationListSerializer

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics

from api.auth import (
    get_login_uri,
    get_logout_uri
)
from api.models.User import User
from api.models.Application import Application
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
            "universal_id": logged_in and request.user.universal_id,
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
    permission_classes = (permissions.IsAuthenticated,)

    def generate_pdf(self, name, data):
        template = '{}.html'.format(name)
        template = get_template(template)
        html_content = template.render(data)

        pdf_content = render_pdf(html_content)
        return pdf_content

    def get_pdf(self, pk):
        try:
            pdf_id = Application.objects.values_list("prepared_pdf_id", flat=True).get(pk=pk)
            pdf_result = PreparedPdf.objects.get(id=pdf_id)
            return pdf_result
        except (PreparedPdf.DoesNotExist, Application.DoesNotExist):
            LOGGER.debug("No record found")
            return

    def post(self, request, pk, name=None):
        data = request.data
        uid = request.user.id
        application = get_app_queryset(pk, uid)
        if not application:
            return HttpResponseNotFound("No record found")

        name = request.query_params.get("name")
        new_pdf = request.query_params.get("newPdf") == 'true'
        try:
            pdf_result = self.get_pdf(pk)
            if not pdf_result:
                pdf_content = self.generate_pdf(name, data)
                (pdf_key_id, pdf_content_enc) = settings.ENCRYPTOR.encrypt(pdf_content)
                pdf_response = PreparedPdf(data=pdf_content_enc, key_id=pdf_key_id)
                pdf_response.save()
                application.update(prepared_pdf_id=pdf_response.pk)
            elif new_pdf:
                pdf_queryset = PreparedPdf.objects.filter(id=pdf_result.id)
                pdf_content = self.generate_pdf(name, data)
                (pdf_key_id, pdf_content_enc) = settings.ENCRYPTOR.encrypt(pdf_content)
                pdf_queryset.update(data=pdf_content_enc)
                pdf_queryset.update(created_date=timezone.now())
            else:
                pdf_content = settings.ENCRYPTOR.decrypt(pdf_result.key_id, pdf_result.data)
            application.update(last_printed=timezone.now())
        except Exception as ex:
            LOGGER.error("ERROR: Pdf generation failed %s", ex)
            raise

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
    permission_classes = (permissions.IsAuthenticated,)
    """
    List all application for a user
    """
    def get_app_list(self, id):
        try:
            return Application.objects.filter(user_id=id)
        except Application.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        user_id = request.user.id
        if user_id:
            applications = self.get_app_list(request.user.id)
            serializer = ApplicationListSerializer(applications, many=True)
            return Response(serializer.data)
        return HttpResponseForbidden("User id not provided")


class ApplicationView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_app_object(self, pk, uid):
        try:
            return Application.objects.get(pk=pk, user_id=uid)
        except Application.DoesNotExist:
            raise Http404

    def encrypt_steps(self, steps):
        try:
            steps_bin = json.dumps(steps).encode("ascii")
            (steps_key_id, steps_enc) = settings.ENCRYPTOR.encrypt(steps_bin)
            return (steps_key_id, steps_enc)
        except Exception as ex:
            LOGGER.error("ERROR! %s", ex)

    def get(self, request, pk, format=None):
        uid = request.user.id
        application = self.get_app_object(pk, uid)
        steps_dec = settings.ENCRYPTOR.decrypt(application.key_id, application.steps)
        steps = json.loads(steps_dec)
        data = {"id": application.id,
                "type": application.app_type,
                "steps": steps,
                "lastUpdate": application.last_updated,
                "lastPrinted": application.last_printed,
                "currentStep": application.current_step,
                "allCompleted": application.all_completed,
                "userType": application.user_type,
                "userName": application.user_name,
                "userId": application.user_id,
                "applicantName": application.applicant_name,
                "respondentName": application.respondent_name}
        return Response(data)

    def post(self, request: Request):
        uid = request.user.id
        if not uid:
            return HttpResponseForbidden("Missing user ID")

        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        (steps_key_id, steps_enc) = self.encrypt_steps(body["steps"])

        db_app = Application(
            last_updated=body.get("lastUpdate"),
            last_printed=body.get("lastPrinted"),
            app_type=body.get("type"),
            current_step=body.get("currentStep"),
            all_completed=body.get("allCompleted"),
            steps=steps_enc,
            user_type=body.get("userType"),
            applicant_name=body.get("applicantName"),
            user_name=body.get("userName"),
            key_id=steps_key_id,
            respondent_name=body.get("respondentName"),
            user_id=uid)

        db_app.save()
        return Response({"app_id": db_app.pk})

    def put(self, request, pk, format=None):
        uid = request.user.id
        body = request.data
        if not body:
            return HttpResponseBadRequest("Missing request body")

        application_queryset = get_app_queryset(pk, uid)
        if not application_queryset:
            return HttpResponseNotFound("No record found")

        (steps_key_id, steps_enc) = self.encrypt_steps(body["steps"])

        application_queryset.update(last_updated=timezone.now())
        application_queryset.update(app_type=body.get("type"))
        application_queryset.update(current_step=body.get("currentStep"))
        application_queryset.update(steps=steps_enc)
        application_queryset.update(user_type=body.get("userType"))
        application_queryset.update(applicant_name=body.get("applicantName"))
        application_queryset.update(user_name=body.get("userName"))
        application_queryset.update(respondent_name=body.get("respondentName"))
        return Response("success")

    def delete(self, request, pk, format=None):
        uid = request.user.id
        application = self.get_app_object(pk, uid)
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def get_app_queryset(pk, uid):
    try:
        return Application.objects.filter(user_id=uid).filter(pk=pk)
    except Application.DoesNotExist:
        raise Http404
