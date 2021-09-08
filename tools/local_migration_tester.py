# This tests it locally, with faked data.
import subprocess
import json
import os
import jsonschema
from jsf import JSF
from jsonschema import validate, ValidationError
import sys
from pathlib import Path 

filepath = Path(__file__).resolve()
root_folder = filepath.parents[1]
sys.path.append(str(root_folder)+'/api')

from api.migrations.helpers import Migration_1_1_to_1_2

# Unfortunately can't easily use Typescript for this, because we need Python to interface with Django.
# The plus side is we validate which should catch any typos.

def validate_by_schema(migrated_data):
        validate_state = 'successful.'
        try:
            validate(instance= {"steps" : migrated_data}, schema=schema)
        except ValidationError as err:
            print(err)
            validate_state = 'failed.'
        print(f'Validation {validate_state}')

def validate_by_schema_print_all_errors(migrated_data):
    validator = jsonschema.Draft7Validator(schema)
    errors = validator.iter_errors({"steps": migrated_data})
    for error in errors:
        print(error)
        print("------")

write_to_file = True
old_version = '1.1'
new_version = '1.2'
print('This application reads the old schema, generates data, does the migration and validates using the new schema.')
print('Hopefully this will prevent data loss when executing migrations due to application changes.')
print(f'Old version: {old_version}')
print(f'New version: {new_version}')
print(f'Ensure generate_schema was recently ran, so schema-{new_version}.json is up to date.')
print(f'Reading from schema_{new_version}.json')
f = open(f'schema_{new_version}.json',)
schema = json.load(f)
f.close()
max_runs = 1
disable_migration = False
print_all_errors = True

for run in range(0,max_runs):   
    print(f'Generating fake data, migrating and validating migration {run+1} of {max_runs}')
    if os.name == 'nt':
        #This may require admin on windows.
        subprocess.run(['C:\\Program Files\\Git\\git-bash.exe', '-l', 'generate_fake_data', old_version], shell=True)
    else:
        subprocess.run(['generate_fake_data', old_version], shell=True)
    f = open('fake_data.json',)
    fake_data = json.load(f)
    f.close()

    if write_to_file:
        f = open(f"before-{run}.txt", "w")
        json.dump(fake_data, skipkeys=False, fp=f, sort_keys=True, indent=4)
        f.close()

    if disable_migration:
        migrated_data = fake_data['steps']
    else:
        migrated_data = Migration_1_1_to_1_2().migrate(fake_data['steps'])

    if write_to_file:
        f = open(f"after-{run}.txt", "w")
        json.dump({"steps":migrated_data}, skipkeys=False, fp=f, sort_keys=True, indent=4)
        f.close()

    if print_all_errors:
        validate_by_schema_print_all_errors(migrated_data)
    else:
        validate_by_schema(migrated_data)
