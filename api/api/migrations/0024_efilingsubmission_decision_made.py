# Generated by Django 4.0.7 on 2023-08-14 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_application_application_reference_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='efilingsubmission',
            name='decision_made',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
