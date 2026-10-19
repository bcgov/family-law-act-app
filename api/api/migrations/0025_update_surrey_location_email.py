from django.db import migrations

SURREY_LOCATION_CODE = "3585"
OLD_EMAIL = "CSBSurreyProvincialCourt.CriminalRegistry@gov.bc.ca"
NEW_EMAIL = "CSBSurreyProvincialCourt.FamilyRegistry@gov.bc.ca"


def update_email(apps, schema_editor):
    Location = apps.get_model("api", "Location")
    Location.objects.filter(location_code=SURREY_LOCATION_CODE).update(email=NEW_EMAIL)


def revert_email(apps, schema_editor):
    Location = apps.get_model("api", "Location")
    Location.objects.filter(location_code=SURREY_LOCATION_CODE).update(email=OLD_EMAIL)


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0024_efilingsubmission_decision_made"),
    ]

    operations = [
        migrations.RunPython(update_email, revert_email),
    ]
