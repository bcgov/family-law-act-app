# This tests it locally, with faked data.
import subprocess
import json
import os
from jsf import JSF
from jsonschema import validate, ValidationError

# Unfortunately can't easily use Typescript for this, because we need Python to interface with Django.
# The plus side is we validate which should catch any typos.

def migrate(data):
    steps = data['steps']
    for step in steps:
        result = step.get('result')
        if result is None:
            continue
        result['aboutSurvey'] = result.get('aboutPOSurvey')
        result.pop('aboutPOSurvey', None)
        result['poQuestionnaireSurvey'] = result.get('questionnaireSurvey')
        result.pop('questionnaireSurvey', None)     

        if result.get('poQuestionnaireSurvey') is not None:
            result['poQuestionnaireSurvey']['questions'] = result['poQuestionnaireSurvey'].get('questions', [])
            result['poQuestionnaireSurvey']['pageName'] = result['poQuestionnaireSurvey'].get('pageName', '')
            result['poQuestionnaireSurvey']['currentStep'] = result['poQuestionnaireSurvey'].get('currentStep', 1)
            result['poQuestionnaireSurvey']['currentPage'] = result['poQuestionnaireSurvey'].get('currentPage', 1)
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
    return steps


def validate_by_schema(migrated_data):
        validate_state = 'successful.'
        try:
            validate(instance= {"steps" : migrated_data}, schema=schema)
        except ValidationError as err:
            print(err)
            validate_state = 'failed.'
        print(f'Validation {validate_state}')

old_version = '1.0'
new_version = '1.1'
print('This application reads the old schema, generates data, does the migration and validates using the new schema.')
print('Hopefully this will prevent data loss when executing migrations due to application changes.')
print(f'Old version: {old_version}')
print(f'New version: {new_version}')
print(f'Ensure generate_schema was recently ran, so schema-{new_version}.json is up to date.')
print(f'Reading from schema_{new_version}.json')
f = open(f'schema_{new_version}.json',)
schema = json.load(f)
f.close()
max_runs = 20
for run in range(0,max_runs):   
    print(f'Generating fake data, migrating and validating migration {run+1} of {max_runs}')
    if os.name == 'nt':
        #This may require admin on windows.
        subprocess.run(['C:\\Program Files\\Git\\git-bash.exe', '-l', 'generate_fake_data', old_version])
    else:
        subprocess.run(['generate_fake_data', old_version], shell=True)
    f = open('fake_data.json',)
    fake_data = json.load(f)
    f.close()
    migrated_data = migrate(fake_data)
    validate_by_schema(migrated_data)
