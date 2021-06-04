import { questionInfoType } from "../../CommonInformation";

export interface parentingArrangementsDataInfoType {
    guardianApplicant: string;
    applyingGuardianApplicant: string;
}

export interface parentingArrangementsSurveyInfoType {
    data: parentingArrangementsDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface parentalResponsibilitiesDataInfoType {
    childrenRequestedResponsibilities?: string[];
    parentalResponsibilitiesOrder?: string;
    allResponsibilitiesOrder?: string;
    ExplainResponsibilities?:string;
}

export interface parentalResponsibilitiesSurveyInfoType {
    data: parentalResponsibilitiesDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
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
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface parentalArrangementsDataInfoType {
    parentalArrangements: string;
    parentalArrangementsDescription: string;
}

export interface parentalArrangementsSurveyInfoType {
    data: parentalArrangementsDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface parentingOrderAgreementDataInfoType {
    guardianApplicant: string;
    applyingGuardianApplicant: string;
}

export interface parentingOrderAgreementSurveyInfoType {
    data: parentingOrderAgreementDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
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
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface parentingArrangementChangesDataInfoType {
    orderChangeList: string[];
    existingOrderChangeParentalResponsibilitiesDescription?: string;
    existingOrderChangeParentingTimeDescription?: string;
    existingOrderChangeParentingTimeConditionsDescription?: string;
    existingOrderChangeOtherTermsDescription?: string;
}

export interface parentingArrangementChangesSurveyInfoType {
    data: parentingArrangementChangesDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}


export interface parentingArrangementsbestInterestOfChildDataInfoType {
    newParentingArrangementsChildBestInterestDescription?: string;
    existingParentingArrangementsChildBestInterestDescription?: string;
}

export interface parentingArrangementsbestInterestOfChildSurveyInfoType {
    data: parentingArrangementsbestInterestOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}
