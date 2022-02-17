import { questionInfoType } from "../../CommonInformation";

export interface parentingArrangementsDataInfoType {
    guardianApplicant?: string;
    applyingGuardianApplicant?: string;
    FAQApplyingGuardian?: boolean;
    FAQGuardian?: boolean;
}

export interface parentingArrangementsSurveyInfoType {
    data: parentingArrangementsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface parentalResponsibilitiesDataInfoType {
    childrenRequestedResponsibilities?: string[];
    parentalResponsibilitiesOrder?: string;
    allResponsibilitiesOrder?: string;
    ExplainResponsibilities?:string;
}

export interface parentalResponsibilitiesSurveyInfoType {
    data: parentalResponsibilitiesDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface parentingTimeDataInfoType {
    parentingTimeOrder: string;
    applicantDesiredParentingTime?: string;
    conditionedApplicantParentingTime?: string;
    ApplicantParentingTimeConditions?: string;
    respondentDesiredParentingTime?: string;
    conditionedRespondentParentingTime?: string;
    RespondentParentingTimeConditions?: string;
}

export interface parentingTimeSurveyInfoType {
    data: parentingTimeDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface parentalArrangementsDataInfoType {
    parentalArrangements?: string;
    parentalArrangementsDescription?: string;
}

export interface otherParentingArrangementsSurveyInfoType {
    data: parentalArrangementsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface parentingOrderAgreementDataInfoType {
    FAQApplyingGuardian?: boolean;
    FAQGuardian?: boolean;
    guardianApplicant?: string;
    applyingGuardianApplicant?: string;
}

export interface parentingOrderAgreementSurveyInfoType {
    data: parentingOrderAgreementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutParentingArrangementsDataInfoType {
    existingType: string;
    agreementDate?: string;
    orderDate?: string;
    changesSinceAgreement?: string;
    changesSinceOrder?: string;
    agreementDifferenceType?: string;
    orderDifferenceType?: string;
}

export interface aboutParentingArrangementsSurveyInfoType {
    data: aboutParentingArrangementsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface parentingArrangementChangesDataInfoType {
    orderChangeList?: string[];
    existingOrderChangeParentalResponsibilitiesDescription?: string;
    existingOrderChangeParentingTimeDescription?: string;
    existingOrderChangeParentingTimeConditionsDescription?: string;
    existingOrderChangeOtherTermsDescription?: string;
}

export interface parentingArrangementChangesSurveyInfoType {
    data: parentingArrangementChangesDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}


export interface parentingArrangementsbestInterestOfChildDataInfoType {
    newParentingArrangementsChildBestInterestDescription?: string;
    existingParentingArrangementsChildBestInterestDescription?: string;
}

export interface parentingArrangementsbestInterestsOfChildSurveyInfoType {
    data: parentingArrangementsbestInterestOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}
