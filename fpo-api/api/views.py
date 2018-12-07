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
import json
import os

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import mixins
from rest_framework import generics
from . import serializers

from api.auth import SiteMinderAuth
from api.models import User
from api.pdf import render as render_pdf


class AcceptTermsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        request.user.accepted_terms_at = datetime.now()
        request.user.save()
        return Response({'ok': True})


class UserStatusView(APIView):
    def get(self, request):
        logged_in = isinstance(request.user, User)
        info = {
            'accepted_terms_at': logged_in and request.user.accepted_terms_at,
            'user_id': logged_in and request.user.authorization_id,
            'surveys': [],
        }
        if logged_in and request.auth == 'demo':
            info['demo_user'] = True
        ret = Response(info)
        uid = request.META.get('HTTP_X_DEMO_LOGIN')
        if uid and logged_in:
            # remember demo user
            ret.set_cookie('x-demo-login', uid)
        elif request.COOKIES.get('x-demo-login') and not logged_in:
            # logout
            ret.delete_cookie('x-demo-login')
        return ret


class SurveyPdfView(generics.GenericAPIView):
    # FIXME - restore authentication?
    permission_classes = () # permissions.IsAuthenticated,)

    def post(self, request, name=None):
        tpl_name = 'survey-{}.html'.format(name)
        #return HttpResponseBadRequest('Unknown survey name')

        responses = json.loads(request.POST['data'])
        # responses = {'question1': 'test value'}

        template = get_template(tpl_name)
        html_content = template.render(responses)

        pdf_content = render_pdf(html_content)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="report.pdf"'

        response.write(pdf_content)

        return response
