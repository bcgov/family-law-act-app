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
from rest_framework import serializers

from api.models import SurveyResult, User, Application, Step, Page


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]


class PageLookupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            "key",
            "label",
            "active",
            "progress"
            ]


class StepLookupSerializer(serializers.ModelSerializer):
    pages = PageLookupSerializer(read_only=True, many=True)

    class Meta:
        model = Step
        fields = [
            "result",
            "pages",
            "active",
            "s_id",
            "label",
            "icon",
            "last_updated",
            "step_type",
            "current_page"
            ]


class ApplicationLookupSerializer(serializers.ModelSerializer):
    steps = StepLookupSerializer(read_only=True, many=True)

    class Meta:
        model = Application
        fields = [
            "app_type",
            "steps",
            "last_updated",
            "current_step",
            "all_completed",
            "user_type",
            "user_name",
            "applicant_name",
            "respondent_name"
        ]


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"


class StepSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True)

    class Meta:
        model = Step
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    steps = StepLookupSerializer(many=True, required=False)

    class Meta:
        model = Application
        fields = "__all__"


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResult
        fields = [
            "id",
            "create_timestamp",
            "update_timestamp",
            "collection",
            "survey_type",
            "result",
            "user_id",
        ]
