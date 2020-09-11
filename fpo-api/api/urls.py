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
import os
import logging
import sys
from django.urls import path, include
from django.conf import settings
from django.conf.urls import url
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework.views import APIView
from rest_framework_swagger import renderers

# generated views
from . import views

# custom views

from . import survey


class SwaggerSchemaView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [renderers.OpenAPIRenderer, renderers.SwaggerUIRenderer]
    _ignore_model_permissions = True
    exclude_from_schema = True

    def get(self, request):
        generator = SchemaGenerator()
        schema = generator.get_schema(request=request)
        return Response(schema)


urlpatterns = [
    # Swagger documentation
    # url(r'^$', SwaggerSchemaView.as_view()),
    url(r"^accept-terms$", views.AcceptTermsView.as_view()),
    url(
        r"^survey-result/(?P<collection>[a-zA-Z0-9_\-:]+)/(?P<type>[a-zA-Z0-9_\-:]+)$",
        survey.SurveyResultView.as_view(),
    ),
    url(
        r"^survey-result/(?P<collection>[a-zA-Z0-9_\-:]+)/(?P<type>[a-zA-Z0-9_\-:]+)/"
        r"(?P<id>[a-zA-Z0-9_\-:]+)$",
        survey.SurveyResultView.as_view(),
    ),
    #path("update-app/", views.ApplicationView.as_view()),
    path('app-detail/<int:pk>/', views.ApplicationDetailView.as_view()),
    path('app-list/<int:id>/', views.ApplicationListView.as_view()),
    path("new-app/", views.NewApplicationView.as_view()),
    path("survey-print/", views.SurveyPdfView.as_view()),
    path("user-info/", views.UserStatusView.as_view()),
    path("submit-form/", views.SubmitFormView.as_view()),
]

if settings.OIDC_ENABLED:
    urlpatterns.append(path("oidc/", include("oidc_rp.urls")))
# urlpatterns = format_suffix_patterns(urlpatterns)

"""
Usually in our Docker/Production environment the API server and the WEB server
are both on port 8080. If they are on the same port the "?next=" querystring for login
redirect will work correctly, otherwise OIDC_RP_AUTHENTICATION_REDIRECT_URI needs to
be set. EX. OIDC_RP_AUTHENTICATION_REDIRECT_URI = 
http://localhost:8080/choose-how-to-attend-your-traffic-hearing/admin
"""
LOGGER = logging.getLogger(__name__)
RUNNING_DEVSERVER = len(sys.argv) > 1 and sys.argv[1] == "runserver"
if (
    RUNNING_DEVSERVER
    and sys.argv[2] != "8080"
    and (
        os.getenv("OIDC_RP_AUTHENTICATION_REDIRECT_URI", "/") == "/"
        or os.getenv("OIDC_RP_AUTHENTICATION_FAILURE_REDIRECT_URI", "/") == "/"
    )
):
    LOGGER.warning(
        "DEVSERVER not matching webserver on port 8080 - Ensure "
        "OIDC_RP_AUTHENTICATION_REDIRECT_URI && "
        "OIDC_RP_AUTHENTICATION_FAILURE_REDIRECT_URI "
        "environment variables are set or login will only redirect to API."
    )
