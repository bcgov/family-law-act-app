import json
import subprocess

from django.conf import settings
from django.db import migrations
from jsonschema import validate
from api.models import Application
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('file_path')
        
    def handle(self, *args, **options):
        file_path =  options['file_path']
        print(f'Ensure generate_schema was recently ran, so your schema is up to date.')
        print(f'Reading schema from {file_path}')
        f = open(file_path,)
        schema = json.load(f)
        f.close()
        for application in Application.objects.all():
            steps_json = json.loads(
                settings.ENCRYPTOR.decrypt(
                    application.key_id, application.steps
                ).decode("utf-8")
            )
            #print(json.dumps(steps_json, indent=4).replace('\r\n',''))
            print(f'Validating steps schema for application Id: {application.id}')
            validate(instance= {"steps" : steps_json}, schema=schema)
            print(f'Validation successful for application Id: {application.id}')
        
