from django.db import models


class PreparedPdf(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    created_date = models.DateTimeField(auto_now_add=True)

    data = models.BinaryField(blank=True, null=True)
