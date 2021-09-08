import copy
class Migration_1_0_to_1_1:
    def _should_fields_be_migrated(self, result, destination, source):
        return result.get(destination) is None and result.get(source) is not None

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

            if self._should_fields_be_migrated(result, 'aboutSurvey', 'aboutPOSurvey'):
                result['aboutSurvey'] = result.get('aboutPOSurvey')
                result.pop('aboutPOSurvey', None)

            if self._should_fields_be_migrated(result, 'poQuestionnaireSurvey', 'questionnaireSurvey'):
                result['poQuestionnaireSurvey'] = result.get('questionnaireSurvey')
            result.pop('questionnaireSurvey', None)     

            if result.get('poQuestionnaireSurvey') is not None:
                result['poQuestionnaireSurvey'].pop('FAQLegalAdvice', None)
                if result['poQuestionnaireSurvey'].get('data') is None:
                    move_to_data = copy.deepcopy(result['poQuestionnaireSurvey'])
                    result['poQuestionnaireSurvey']['data'] = move_to_data
                    result['poQuestionnaireSurvey'].pop('familyUnsafe', None)
                    result['poQuestionnaireSurvey'].pop('orderType', None)
                    result['poQuestionnaireSurvey'].pop('PORConfirmed', None)
                    result['poQuestionnaireSurvey'].pop('explanationQualifying', None)
                    result['poQuestionnaireSurvey'].pop('unsafe', None)
                    result['poQuestionnaireSurvey']['data'].pop('questions', None)

            if self._should_fields_be_migrated(result, 'protectionFromWhomSurvey', 'protectionWhomSurvey'):
                result['protectionFromWhomSurvey'] = result.get('protectionWhomSurvey')
                result.pop('protectionWhomSurvey', None)

            if self._should_fields_be_migrated(result, 'yourinformationPOSurvey', 'yourInformationSurveyPO'):
                result['yourinformationPOSurvey'] = result.get('yourInformationSurveyPO')
                result.pop('yourInformationSurveyPO', None)
            
            if self._should_fields_be_migrated(result, 'yourStorySurvey', 'yourStory'):
                result['yourStorySurvey'] = result.get('yourStory')
                result.pop('yourStory', None)

            if self._should_fields_be_migrated(result, 'removePersonSurvey', 'removeSurvey'):
                result['removePersonSurvey'] = result.get('removeSurvey')
                result.pop('removeSurvey', None)

            if self._should_fields_be_migrated(result, 'weaponsFirearmsSurvey', 'weaponsSurvey'):
                result['weaponsFirearmsSurvey'] = result.get('weaponsSurvey')
                result.pop('weaponsSurvey', None)

            if self._should_fields_be_migrated(result, 'safetyCheckSurvey', 'safetySurvey'):
                result['safetyCheckSurvey'] = result.get('safetySurvey')
                result.pop('safetySurvey', None)
                if result.get('safetyCheckSurvey') is not None:
                    if result['safetyCheckSurvey'].get('data') is None:
                        move_to_data = copy.deepcopy(result['safetyCheckSurvey'])
                        result['safetyCheckSurvey']['data'] = move_to_data
                        result['safetyCheckSurvey'].pop('unsafe', None)
                        result['safetyCheckSurvey']['data'].pop('questions', None)

            if self._should_fields_be_migrated(result, 'flmQuestionnaireSurvey', 'flmSelectedForm'):
                result['flmQuestionnaireSurvey'] = result.get('flmSelectedForm')
                result.pop('flmSelectedForm', None)

            if self._should_fields_be_migrated(result, 'childrenInfoSurvey', 'childData'):
                result['childrenInfoSurvey'] = result.get('childData')
                result.pop('childData', None)
            
            if self._should_fields_be_migrated(result, 'flmAdditionalDocumentsSurvey', 'flmAdditionalDocsSurvey'):
                result['flmAdditionalDocumentsSurvey'] = result.get('flmAdditionalDocsSurvey')
                result.pop('flmAdditionalDocsSurvey', None)

            if self._should_fields_be_migrated(result, 'bestInterestsOfChildSurvey', 'bestInterestOfChildSurvey'):
                result['bestInterestsOfChildSurvey'] = result.get('bestInterestOfChildSurvey')
                result.pop('bestInterestOfChildSurvey', None)

            if self._should_fields_be_migrated(result, 'otherParentingArrangementsSurvey', 'parentalArrangementsSurvey'):
                result['otherParentingArrangementsSurvey'] = result.get('parentalArrangementsSurvey')
                result.pop('parentalArrangementsSurvey', None)

            if self._should_fields_be_migrated(result, 'childSupportCurrentArrangementsSurvey', 'childSupportCurrentArrangementSurvey'):
                result['childSupportCurrentArrangementsSurvey'] = result.get('childSupportCurrentArrangementSurvey')
                result.pop('childSupportCurrentArrangementSurvey', None)

            if self._should_fields_be_migrated(result, 'incomeAndEarningPotentialSurvey', 'childSupportIncomeEarningSurvey'):
                result['incomeAndEarningPotentialSurvey'] = result.get('childSupportIncomeEarningSurvey')
                result.pop('childSupportIncomeEarningSurvey', None)

            if self._should_fields_be_migrated(result, 'aboutContactWithChildOrderSurvey', 'aboutContactWithChildSurvey'):
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

            if self._should_fields_be_migrated(result, 'contactWithChildBestInterestsOfChildSurvey', 'contactWithChildBestInterestOfChildSurvey'):
                result['contactWithChildBestInterestsOfChildSurvey'] = result.get('contactWithChildBestInterestOfChildSurvey')
                result.pop('contactWithChildBestInterestOfChildSurvey', None)

            if self._should_fields_be_migrated(result, 'contactWithChildOrderSurvey', 'contactOrderSurvey'):
                result['contactWithChildOrderSurvey'] = result.get('contactOrderSurvey')
                result.pop('contactOrderSurvey', None)
        
            if self._should_fields_be_migrated(result, 'guardianOfChildSurvey', 'GuardianOfChildSurvey'):
                result['guardianOfChildSurvey'] = result.get('GuardianOfChildSurvey')
                result.pop('GuardianOfChildSurvey', None)

            # fix applicantionType -> applicationType
            if result.get('guardianOfChildSurvey') and result.get('guardianOfChildSurvey').get('data') and result.get('guardianOfChildSurvey').get('data').get('applicantionType') is not None:
                result['guardianOfChildSurvey']['data']['applicationType'] = result['guardianOfChildSurvey']['data']['applicantionType']
                result['guardianOfChildSurvey']['data'].pop('applicantionType', None)

            if self._should_fields_be_migrated(result, 'guardianOfChildBestInterestsOfChildSurvey', 'GuardianOfChildBestInterestOfChildSurvey'):
                result['guardianOfChildBestInterestsOfChildSurvey'] = result.get('GuardianOfChildBestInterestOfChildSurvey')
                result.pop('GuardianOfChildBestInterestOfChildSurvey', None)

            if self._should_fields_be_migrated(result, 'filingOptionsSurvey', 'filingOptions'):
                result['filingOptionsSurvey'] = result.get('filingOptions')
                result.pop('filingOptions', None)

            # fix priotityParenting -> priorityParenting
            if result.get('pathwayCompleted') is not None and result['pathwayCompleted'].get('priotityParenting') is not None:
                result['pathwayCompleted']['priorityParenting'] = result['pathwayCompleted']['priotityParenting']
                result.get('pathwayCompleted').pop('priotityParenting', None)
            

        return self.clean_nones(steps)
