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
import json
from rest_framework import serializers
from django.conf import settings
from api.models import SurveyResult, User, Application, EFilingSubmission, PreparedPdf


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]


class EFilingSubmissionSerializer(serializers.ModelSerializer):
    submission_results = serializers.SerializerMethodField()
    class Meta:
        model = EFilingSubmission
        fields = ["package_number", "package_url", "submission_results"]

    def get_submission_results(self, obj):
        
        if obj.submission_results:
            results_dec = settings.ENCRYPTOR.decrypt(obj.key_id, obj.submission_results)        
            return json.loads(json.loads(results_dec))
        else:
            return None


class PreparedPdfSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreparedPdf
        fields = ["id", "pdf_type", "version", "created_date"]


class ApplicationListSerializer(serializers.ModelSerializer):
    last_efiling_submission = EFilingSubmissionSerializer()
    prepared_pdfs = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            "id",
            "app_type",
            "last_updated",
            "last_filed",
            "last_efiling_submission",
            "application_reference",
            "prepared_pdfs",
        ]

    def get_prepared_pdfs(self, obj):
        return PreparedPdfSerializer(
            PreparedPdf.objects.filter(application_id=obj.id).exclude(version='Delete'), many=True
        ).data


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
