# Generated by Django 4.0.7 on 2023-08-05 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_efilingsubmission_key_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='application_reference',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='previous_app_key_id',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='previous_app_status',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
