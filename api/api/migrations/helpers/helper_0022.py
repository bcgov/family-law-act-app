import copy
from api.migrations.helpers.clean_nones import clean_nones
class Migration_1_1_to_1_2_1:
    # Unfortunately can't easily use Typescript for this, because we need Python to interface with Django.
    # The plus side is we validate which should catch any typos.

    def migrate(self, steps):
        for step in steps:
            result = step.get('result')
            if result is None:
                continue
            #Typescript migrations
            if result.get('childSupportSurvey') is not None:
                if result['childSupportSurvey'].get('data') is not None:
                    if not isinstance(result['childSupportSurvey']['data']['applicantGuardianType'], list):
                        result['childSupportSurvey']['data']['applicantGuardianType'] = [result['childSupportSurvey']['data']['applicantGuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[0]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[0]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[0]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[0]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[1]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[1]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[1]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[1]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[2]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[2]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[2]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[2]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[3]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[3]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[3]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[3]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[4]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[4]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[4]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[4]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[5]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[5]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[5]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[5]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[6]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[6]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[6]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[6]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[7]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[7]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[7]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[7]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[8]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[8]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[8]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[8]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[9]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[9]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[9]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[9]GuardianType']]
                    if result['childSupportSurvey']['data'].get('otherParty[10]GuardianType') is not None and not isinstance(result['childSupportSurvey']['data']['otherParty[10]GuardianType'], list):
                        result['childSupportSurvey']['data']['otherParty[10]GuardianType'] = [result['childSupportSurvey']['data']['otherParty[10]GuardianType']]            
            
            if result.get('selectedPOOrder') is not None:
                result.pop('selectedPOOrder', None)
            
            if result.get('filingOptionsSurvey') is not None:                       
                if result['filingOptionsSurvey'].get('data') is None:
                    result['filingOptionsSurvey']['data'] = {}
                if result['filingOptionsSurvey'].get('selectedFilingType') is not None:
                    result['filingOptionsSurvey']['data']['selectedFilingType'] = result['filingOptionsSurvey'].get('selectedFilingType')
                    result['filingOptionsSurvey'].pop('selectedFilingType', None)

            #Bug on PROD, move to data.
            if result.get('otherPartyCommonSurvey') is not None and isinstance(result['otherPartyCommonSurvey'], list):
                move_to_data = copy.deepcopy(result['otherPartyCommonSurvey'])
                result['otherPartyCommonSurvey'] = {}
                result['otherPartyCommonSurvey']['data'] = move_to_data

        return clean_nones(steps)
