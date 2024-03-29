"""
This is used to ensure there is no data loss or surprises 
when doing a schema migration from version 1.0 to version 1.1.
manage.py test api/tests/ should run this. 
"""

import django
import json
import jsonschema
import os
from api.migrations.helpers import Migration_1_0_to_1_1
from django.test import TestCase


class SchemaTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super(SchemaTest, cls).setUpClass()
        django.setup()

    def _load_schema(self):
        schema_file_path = "../tools/schema_1.1.json"
        print(f"Reading schema from {schema_file_path}")
        f = open(schema_file_path)
        schema = json.load(f)
        return schema

    def _validate_data(self, data):
        schema = self._load_schema()
        validator = jsonschema.Draft7Validator(schema)
        errors = validator.iter_errors({"steps": data})

        for error in errors:
            print(error)
            print("------")

        self.assertEqual(len(list(errors)), 0)

    # Uses real generated data.
    def test_schema_migration(self):
        write_to_file = os.environ.get('TEST_WRITE_TO_FILE', False)
        print('Using real application generated data for a test.')
        # load test_schema_data_1.1.json
        data_file_path = "./api/tests/data/test_schema_data_1.0.json"
        print(f"Reading data from {data_file_path}")
        f = open(data_file_path)
        data = json.load(f, strict=False)
        f.close()

        if write_to_file:
            f = open(f"before-unsorted.txt", "w")
            json.dump(data, fp=f, sort_keys=False, indent=4)
            f.close()

        if write_to_file:
            f = open(f"before.txt", "w")
            json.dump(data, fp=f, sort_keys=True, indent=4)
            f.close()

        migrated_steps = Migration_1_0_to_1_1().migrate(data)

        if write_to_file:
            f = open(f"after.txt", "w")
            json.dump(migrated_steps, fp=f, sort_keys=True, indent=4)
            f.close()

        self._validate_data(migrated_steps)

    # Uses created mock data
    def test_schema_migration_mock_data(self):
        print('Using mock data for a test.')
        steps = [
            {
                "active": True,
                "icon": "hgsgsd",
                "label": "dsfsdf",
                "type": "sdsds",
                "result": {
                    "aboutPOSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "questionnaireSurvey": {
                        "familyUnsafe": "gg",
                        "orderType": "zz",
                        "PORConfirmed": ["y"],
                        "explanationQualifying": True,
                        "unsafe": "y",
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "protectionWhomSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "yourInformationSurveyPO": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "yourStory": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "removeSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "weaponsSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "safetySurvey": {
                        "unsafe": "zz",
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "flmSelectedForm": {
                        "data": [],
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "childData": {
                        "data": [],
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "flmAdditionalDocsSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "bestInterestOfChildSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "parentalArrangementsSurvey": {
                        "data": {

                        },
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "childSupportCurrentArrangementSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "childSupportIncomeEarningSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "aboutContactWithChildSurvey": {
                        "childrenRequireContactChoices": ["y"],
                        "lastContactDate": "5252",
                        "contactTypeChoices": ["555"],
                        "contactTypeChoicesComment": "zzz",
                        "inPersonDetails": "zxcdsa",
                        "placeConditions": "dfsdfs",
                        "conditionsDescription": "dsfasdf",
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "contactWithChildBestInterestOfChildSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "contactOrderSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "GuardianOfChildSurvey": {
                        "data": {"applicantionType": ["applicantionType"]}
                    },
                    "GuardianOfChildBestInterestOfChildSurvey": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "filingOptions": {
                        "data": {},
                        "questions": [
                            {
                                "name": "name",
                                "value": "zz",
                                "title": "title",
                                "inputType": "inputType",
                            }
                        ],
                    },
                    "pathwayCompleted": {"priotityParenting": True},
                },
            }
        ]

        migrated_steps = Migration_1_0_to_1_1().migrate(steps)

        self._validate_data(migrated_steps)
