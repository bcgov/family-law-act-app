from django.db import models


class Page(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )

    key = models.CharField(max_length=100, default="", blank=True)

    label = models.CharField(max_length=100, default="", blank=True)

    progress = models.IntegerField(blank=True, null=True)

    active = models.BooleanField(blank=True, default=False)

    clickable = models.BooleanField(blank=True, default=False)

    step = models.ForeignKey(
        "Step",
        related_name="step_id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
