# Generated by Django 3.1.6 on 2021-02-26 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_preparedpdf_json_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='last_submission_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
