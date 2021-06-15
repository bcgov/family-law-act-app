import json
import subprocess

from django.conf import settings
from django.db import migrations
from jsonschema import validate
from api.models import Application
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    def handle(self, *args, **options):
        print(f'Ensure generate_schema was recently ran, so schema.json is up to date.')
        print(f'Reading from ../tools/schema.json')
        f = open('../tools/schema.json',)
        schema = json.load(f)
        f.close()
        for application in Application.objects.all():
            steps_json = json.loads(
                settings.ENCRYPTOR.decrypt(
                    application.key_id, application.steps
                ).decode("utf-8")
            )
            print(f'Validating steps schema for application Id: {application.id}')
            validate(instance= {"steps" : steps_json}, schema=schema)
            print(f'Validation successful for application Id: {application.id}')
        
