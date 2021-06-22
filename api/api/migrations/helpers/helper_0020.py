import copy
class Migration_1_0_to_1_1:
    def clean_nones(self, value):
        if isinstance(value, list):
            return [self.clean_nones(x) for x in value if x is not None]
        elif isinstance(value, dict):
            return {
                key: self.clean_nones(val)
                for key, val in value.items()
                if val is not None
            }
        else:
            return value

    # Unfortunately can't easily use Typescript for this, because we need Python to interface with Django.
    # The plus side is we validate which should catch any typos.

    def migrate(self, steps):
        for step in steps:
            result = step.get('result')
            if result is None:
                continue
            result['aboutSurvey'] = result.get('aboutPOSurvey')
            result.pop('aboutPOSurvey', None)
            result['poQuestionnaireSurvey'] = result.get('questionnaireSurvey')
            result.pop('questionnaireSurvey', None)     

            if result.get('poQuestionnaireSurvey') is not None:
                if result['poQuestionnaireSurvey'].get('data') is None:
                    move_to_data = copy.deepcopy(result['poQuestionnaireSurvey'])
                    result['poQuestionnaireSurvey']['data'] = move_to_data
                    result['poQuestionnaireSurvey'].pop('familyUnsafe', None)
                    result['poQuestionnaireSurvey'].pop('orderType', None)
                    result['poQuestionnaireSurvey'].pop('PORConfirmed', None)
                    result['poQuestionnaireSurvey'].pop('explanationQualifying', None)
                    result['poQuestionnaireSurvey'].pop('unsafe', None)
                    result['poQuestionnaireSurvey']['data'].pop('questions', None)

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
                if result['safetyCheckSurvey'].get('data') is None:
                    move_to_data = copy.deepcopy(result['safetyCheckSurvey'])
                    result['safetyCheckSurvey']['data'] = move_to_data
                    result['safetyCheckSurvey'].pop('unsafe', None)
                    result['safetyCheckSurvey']['data'].pop('questions', None)

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
                move_to_data = copy.deepcopy(result['aboutContactWithChildOrderSurvey'])
                result['aboutContactWithChildOrderSurvey']['data'] = move_to_data
                result['aboutContactWithChildOrderSurvey'].pop('childrenRequireContactChoices', None)
                result['aboutContactWithChildOrderSurvey'].pop('lastContactDate', None)
                result['aboutContactWithChildOrderSurvey'].pop('contactTypeChoices', None)
                result['aboutContactWithChildOrderSurvey'].pop('contactTypeChoicesComment', None)
                result['aboutContactWithChildOrderSurvey'].pop('inPersonDetails', None)
                result['aboutContactWithChildOrderSurvey'].pop('placeConditions', None)
                result['aboutContactWithChildOrderSurvey'].pop('conditionsDescription', None)
                result['aboutContactWithChildOrderSurvey']['data'].pop('questions', None)
            result.pop('aboutContactWithChildSurvey', None)

            result['contactWithChildBestInterestsOfChildSurvey'] = result.get('contactWithChildBestInterestOfChildSurvey')
            result.pop('contactWithChildBestInterestOfChildSurvey', None)
            result['contactWithChildOrderSurvey'] = result.get('contactOrderSurvey')
            result.pop('contactOrderSurvey', None)
        
            result['guardianOfChildSurvey'] = result.get('GuardianOfChildSurvey')
            result.pop('GuardianOfChildSurvey', None)

            # fix applicantionType -> applicationType
            if result.get('guardianOfChildSurvey') and result.get('guardianOfChildSurvey').get('data') and result.get('guardianOfChildSurvey').get('data').get('applicantionType') is not None:
                result['guardianOfChildSurvey']['data']['applicationType'] = result['guardianOfChildSurvey']['data']['applicantionType']
                result['guardianOfChildSurvey']['data'].pop('applicantionType', None)

            result['guardianOfChildBestInterestsOfChildSurvey'] = result.get('GuardianOfChildBestInterestOfChildSurvey')
            result.pop('GuardianOfChildBestInterestOfChildSurvey', None)
            result['filingOptionsSurvey'] = result.get('filingOptions')
            result.pop('filingOptions', None)

            # fix priotityParenting -> priorityParenting
            if result.get('pathwayCompleted') is not None and result['pathwayCompleted'].get('priotityParenting') is not None:
                result['pathwayCompleted']['priorityParenting'] = result['pathwayCompleted']['priotityParenting']
                result.get('pathwayCompleted').pop('priotityParenting', None)
            
        return self.clean_nones(steps)
