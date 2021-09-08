import json
import datetime
import pytz
import subprocess
import jsonschema

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import migrations
from django.utils import timezone
from jsonschema import validate
import os
from api.models import Application
from api.migrations.helpers import Migration_1_0_to_1_1, Migration_1_1_to_1_2_1


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("file_path")

    def handle(self, *args, **options):
        file_path = options["file_path"]
        write_to_file = True  # for testing.
        print(f"Ensure generate_schema was recently ran, so your schema is up to date.")
        print(f"Reading schema from {file_path}")
        f = open(
            file_path,
        )
        schema = json.load(f)
        f.close()
        for application in Application.objects.filter(
            last_updated__gte=datetime.datetime(2021, 6, 14).astimezone(),
        ).order_by('id'):
            steps_json = json.loads(
                settings.ENCRYPTOR.decrypt(
                    application.key_id, application.steps
                ).decode("utf-8")
            )
            if write_to_file:
                filename = f"inspect\\before\\{application.id}.json"
                os.makedirs(os.path.dirname(filename), exist_ok=True)
                f = open(filename, "w")
                json.dump(steps_json, skipkeys=False, fp=f, sort_keys=True, indent=4)
                f.close()
            else:
                print('Before: ')
                print(json.dumps(steps_json, indent=4).replace('\r\n',''))
            

            print(f"Validating steps schema for application Id: {application.id}")
            steps_json = Migration_1_0_to_1_1().migrate(steps_json)
            steps_json = Migration_1_1_to_1_2_1().migrate(steps_json)

            if write_to_file:
                filename = f"inspect\\after\\{application.id}.json"
                os.makedirs(os.path.dirname(filename), exist_ok=True)
                f = open(filename, "w")
                json.dump(steps_json, fp=f, skipkeys=False, sort_keys=True, indent=4)
                f.close()
            else:
                print('After: ')
                print(json.dumps(steps_json, indent=4).replace('\r\n',''))

            validator = jsonschema.Draft7Validator(schema)
            errors = validator.iter_errors({"steps": steps_json})

            for error in errors:
                print(error)
                print("------")
