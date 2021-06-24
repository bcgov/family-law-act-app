import json
from django.conf import settings
from django.db import migrations
from api.migrations.helpers import Migration_1_0_to_1_1

def update_survey_data(apps, schema_editor):
    migration = Migration_1_0_to_1_1()
    Application = apps.get_model("api", "Application")
    for application in Application.objects.all():   
        if application.version == '1.1':
            continue

        print(f'Migrating application: {application.id}')
        steps_json = json.loads(
            settings.ENCRYPTOR.decrypt(
                application.key_id, application.steps
            ).decode("utf-8")
        )
        steps_json = migration.migrate(steps_json)

        (steps_key_id, steps_enc) = settings.ENCRYPTOR.encrypt(json.dumps(steps_json).encode("ascii"))
        application.version = '1.1'
        application.steps = steps_enc
        application.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_hide_pi'),
    ]

    operations = [
        migrations.RunPython(update_survey_data)
    ]
