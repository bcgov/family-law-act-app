import jsonfield.fields
from django.db import models


class Step(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )

    survey_type = models.CharField(max_length=100, default="", blank=True)

    result = jsonfield.fields.JSONField(blank=True, null=True)

    metadata = jsonfield.fields.JSONField(blank=True, null=True)

    active = models.BooleanField(blank=True, default=False)

    lastUpdate = models.DateTimeField(auto_now=True, blank=True, null=True)

    application = models.ForeignKey(
        "Application",
        related_name="application_id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
