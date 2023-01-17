import json
from django.conf import settings
from django.db import migrations
from api.migrations.helpers import Migration_1_0_to_1_1, Migration_1_1_to_1_2_1

def update_survey_data(apps, schema_editor):
    migration_1 = Migration_1_0_to_1_1()
    migration_2 = Migration_1_1_to_1_2_1()
    applications = apps.get_model("api", "Application")
    for application in applications.objects.all():   
        print(f'Migrating application: {application.id}')
        steps_json = json.loads(
            settings.ENCRYPTOR.decrypt(
                application.key_id, application.steps
            ).decode("utf-8")
        )
        steps_json = migration_1.migrate(steps_json)
        steps_json = migration_2.migrate(steps_json)
        
        (steps_key_id, steps_enc) = settings.ENCRYPTOR.encrypt(json.dumps(steps_json).encode("ascii"))
        application.version = '1.2.1'
        application.steps = steps_enc
        application.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_user_has_efiling_early_adopters'),
    ]

    operations = [
        migrations.RunPython(update_survey_data)
    ]