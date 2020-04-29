from django.contrib.postgres.fields import JSONField
from django.db import models


class SurveyResult(models.Model):
    create_timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    update_timestamp = models.DateTimeField(auto_now=True, blank=True, null=True)
    completed_timestamp = models.DateTimeField(auto_now=True, blank=True, null=True)

    collection = models.CharField(max_length=100, default="", blank=True)
    survey_type = models.CharField(max_length=100)
    result = JSONField(blank=True)

    user = models.ForeignKey(
        "User", related_name="survey_results", on_delete=models.CASCADE
    )
