import jsonfield.fields
from django.db import models


class Step(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )

    s_id = models.CharField(max_length=100, default="", blank=True)

    step_type = models.CharField(max_length=100, default="", blank=True)

    label = models.CharField(max_length=100, default="", blank=True)

    icon = models.CharField(max_length=100, default="", blank=True)

    result = jsonfield.fields.JSONField(blank=True, null=True)

    metadata = jsonfield.fields.JSONField(blank=True, null=True)

    current_page = models.IntegerField(blank=True, null=True)

    active = models.BooleanField(blank=True, null=True)

    last_updated = models.DateTimeField(auto_now=True, blank=True, null=True)

    application = models.ForeignKey(
        "Application",
        related_name="steps",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
