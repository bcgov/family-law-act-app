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

from django.conf.urls import url
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework.views import APIView
from rest_framework.urlpatterns import format_suffix_patterns
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
    url(
        r"^survey-print/(?P<collection>[a-zA-Z0-9_\-:])/(?P<type>[a-zA-Z0-9_\-:]+)$",
        views.SurveyPdfView.as_view(),
    ),
    url(r"^user-info$", views.UserStatusView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
