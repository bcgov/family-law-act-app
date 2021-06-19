import json
import subprocess
import jsonschema

from django.conf import settings
from django.db import migrations
from jsonschema import validate
from api.models import Application
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('file_path')

    def migrate(self, data):
        for step in data:
            result = step.get('result')
            if result is None:
                continue
            result['aboutSurvey'] = result.get('aboutPOSurvey')
            result.pop('aboutPOSurvey', None)
            result['poQuestionnaireSurvey'] = result.get('questionnaireSurvey')
            result.pop('questionnaireSurvey', None)     

            if result.get('poQuestionnaireSurvey') is not None:
                # Use existing data or use defaults.
                result['poQuestionnaireSurvey']['questions'] = result['poQuestionnaireSurvey'].get('questions', [])
                result['poQuestionnaireSurvey']['pageName'] = result['poQuestionnaireSurvey'].get('pageName', '')
                result['poQuestionnaireSurvey']['currentStep'] = result['poQuestionnaireSurvey'].get('currentStep', 0)
                result['poQuestionnaireSurvey']['currentPage'] = result['poQuestionnaireSurvey'].get('currentPage', 0)
                if result['poQuestionnaireSurvey'].get('data') is None:
                    result['poQuestionnaireSurvey']['data'] = {}
                    result['poQuestionnaireSurvey']['data']['orderType'] = result['poQuestionnaireSurvey'].get('orderType')
                    result['poQuestionnaireSurvey'].pop('orderType', None)
                    result['poQuestionnaireSurvey']['data']['explanationQualifying'] = result['poQuestionnaireSurvey'].get('explanationQualifying')
                    result['poQuestionnaireSurvey'].pop('explanationQualifying', None)
                    result['poQuestionnaireSurvey']['data']['unsafe'] = result['poQuestionnaireSurvey'].get('unsafe')
                    result['poQuestionnaireSurvey'].pop('unsafe', None)
                    result['poQuestionnaireSurvey']['data']['familyUnsafe'] = result['poQuestionnaireSurvey'].get('familyUnsafe')
                    result['poQuestionnaireSurvey'].pop('familyUnsafe', None)
                    result['poQuestionnaireSurvey']['data']['PORConfirmed'] = result['poQuestionnaireSurvey'].get('PORConfirmed')
                    result['poQuestionnaireSurvey'].pop('PORConfirmed', None)

            result['protectionFromWhomSurvey'] = result.get('protectionWhomSurvey')
            result.pop('protectionWhomSurvey', None)
            result['yourinformationPOSurvey'] = result.get('yourInformationSurveyPO')
            result.pop('yourInformationSurveyPO', None)
            result['yourStorySurvey'] = result.get('yourStory')
            result.pop('yourStory', None)
            result['removePersonSurvey'] = result.get('removeSurvey')
            result.pop('removeSurvey', None)
            result['weaponsFirearmsSurvey'] = result.get('weaponsSurvey')
            result.pop('weaponsSurvey', None)

            result['safetyCheckSurvey'] = result.get('safetySurvey')
            result.pop('safetySurvey', None)
            if result.get('safetyCheckSurvey') is not None:
                result['safetyCheckSurvey']['questions'] = result['safetyCheckSurvey'].get('questions', [])
                result['safetyCheckSurvey']['pageName'] = result['safetyCheckSurvey'].get('pageName', '')
                result['safetyCheckSurvey']['currentStep'] = result['safetyCheckSurvey'].get('currentStep', 0)
                result['safetyCheckSurvey']['currentPage'] = result['safetyCheckSurvey'].get('currentPage', 0)
                if result['safetyCheckSurvey'].get('data') is None:
                    result['safetyCheckSurvey']['data'] = {}
                    result['safetyCheckSurvey']['data']['unsafe'] = result['safetyCheckSurvey']['unsafe']
                    result['safetyCheckSurvey'].pop('unsafe', None)


            result['flmQuestionnaireSurvey'] = result.get('flmSelectedForm')
            result.pop('flmSelectedForm', None)
            result['childrenInfoSurvey'] = result.get('childData')
            result.pop('childData', None)
            result['flmAdditionalDocumentsSurvey'] = result.get('flmAdditionalDocsSurvey')
            result.pop('flmAdditionalDocsSurvey', None)
            result['bestInterestsOfChildSurvey'] = result.get('bestInterestOfChildSurvey')
            result.pop('bestInterestOfChildSurvey', None)
            result['otherParentingArrangementsSurvey'] = result.get('parentalArrangementsSurvey')
            result.pop('parentalArrangementsSurvey', None)
            result['childSupportCurrentArrangementsSurvey'] = result.get('childSupportCurrentArrangementSurvey')
            result.pop('childSupportCurrentArrangementSurvey', None)
            result['incomeAndEarningPotentialSurvey'] = result.get('childSupportIncomeEarningSurvey')
            result.pop('childSupportIncomeEarningSurvey', None)

            result['aboutContactWithChildOrderSurvey'] = result.get('aboutContactWithChildSurvey')
            if result.get('aboutContactWithChildOrderSurvey') is not None and result['aboutContactWithChildOrderSurvey'].get('data') is None:
                result['aboutContactWithChildSurvey']['data'] = {}
                result['aboutContactWithChildSurvey']['data']['childrenRequireContactChoices'] = result['aboutContactWithChildOrderSurvey'].get('childrenRequireContactChoices')
                result['aboutContactWithChildSurvey']['data']['lastContactDate'] = result['aboutContactWithChildOrderSurvey'].get('lastContactDate')
                result['aboutContactWithChildSurvey']['data']['contactTypeChoices'] = result['aboutContactWithChildOrderSurvey'].get('contactTypeChoices')
                result['aboutContactWithChildSurvey']['data']['contactTypeChoicesComment'] = result['aboutContactWithChildOrderSurvey'].get('contactTypeChoicesComment')
                result['aboutContactWithChildSurvey']['data']['placeConditions'] = result['aboutContactWithChildOrderSurvey'].get('placeConditions')
                result['aboutContactWithChildSurvey']['data']['conditionsDescription'] = result['aboutContactWithChildOrderSurvey'].get('conditionsDescription')
            result.pop('aboutContactWithChildSurvey', None)

            result['contactWithChildBestInterestsOfChildSurvey'] = result.get('contactWithChildBestInterestOfChildSurvey')
            result.pop('contactWithChildBestInterestOfChildSurvey', None)
            result['contactWithChildOrderSurvey'] = result.get('contactOrderSurvey')
            result.pop('contactOrderSurvey', None)
        
            result['guardianOfChildSurvey'] = result.get('GuardianOfChildSurvey')
            result.pop('GuardianOfChildSurvey', None)
            result['guardianOfChildBestInterestsOfChildSurvey'] = result.get('GuardianOfChildBestInterestOfChildSurvey')
            result.pop('GuardianOfChildBestInterestOfChildSurvey', None)
            result['filingOptionsSurvey'] = result.get('filingOptions')
            result.pop('filingOptions', None)
        return data 

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
            steps_json = self.migrate(steps_json)
            validator = jsonschema.Draft7Validator(schema)           
            errors = validator.iter_errors({"steps" : steps_json}) 

            for error in errors:
                print(error)
                print('------')
        
