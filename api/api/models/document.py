from django.db import models


class Document(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    created_date = models.DateTimeField(auto_now_add=True)

    data = models.BinaryField(blank=True, null=True)

    md5 = models.CharField(max_length=32, blank=True, null=True)

    file_name = models.CharField(max_length=200)

    document_type = models.CharField(max_length=32)

    # encryption key identifier
    key_id = models.CharField(max_length=32, blank=True, null=True)

    application = models.ForeignKey("Application", on_delete=models.CASCADE)
