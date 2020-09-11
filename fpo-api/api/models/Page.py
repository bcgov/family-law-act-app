from django.db import models


class Page(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )

    key = models.CharField(max_length=100, default="", blank=True)

    label = models.CharField(max_length=100, default="", blank=True)

    progress = models.IntegerField(blank=True, null=True)

    active = models.BooleanField(blank=True, null=True)

    clickable = models.BooleanField(blank=True, null=True)

    step = models.ForeignKey(
        "Step",
        related_name="pages",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
