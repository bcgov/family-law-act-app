from django.db import models


class EFilingSubmission(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    created_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(blank=True, null=True)
    submission_id = models.CharField(max_length=100, null=True)
    transaction_id = models.CharField(max_length=100, null=True)
    package_number = models.CharField(max_length=100, null=True)
    package_url = models.CharField(max_length=200, null=True)

    application = models.ForeignKey(
        "Application",
        related_name="efiling_submission_application_id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
