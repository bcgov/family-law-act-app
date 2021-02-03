"""
    REST API Documentation for Family Law Act

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

from fla.models import SurveyResult, User, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]


class ApplicationListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = [
            "id",
            "app_type",
            "last_updated",
            "last_filed"
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    app_user_Id = UserSerializer(many=True, required=False)

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
