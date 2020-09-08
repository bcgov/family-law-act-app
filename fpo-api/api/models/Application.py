from django.db import models


class Application(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    app_type = models.CharField(max_length=100, default="", blank=True)
    last_updated = models.DateTimeField(blank=True, null=True)
    current_step = models.CharField(max_length=100, default="", blank=True)
    current_page = models.CharField(max_length=100, default="", blank=True)
    all_completed = models.BooleanField(blank=True)
    last_printed = models.DateTimeField(blank=True, null=True)
    user_name = models.CharField(max_length=100, default="", blank=True)
    application_name = models.CharField(max_length=100, default="", blank=True)

    user = models.ForeignKey(
        "User",
        related_name="app_user_Id",
        on_delete=models.CASCADE
    )
    prepared_pdf = models.ForeignKey(
        "PreparedPdf",
        related_name="pdf_data",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )