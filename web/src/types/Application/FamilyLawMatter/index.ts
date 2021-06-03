import { nameInfoType, questionInfoType } from "../CommonInformation";

export interface flmBackgroundSurveyDataInfoType {
    ExistingOrdersFLM: string;
    existingOrdersListFLM: string[];
    existingPOOrders: string;
    howPartiesRelated: string;
    werePOPartiesMarried: string;
    liveTogetherPODate: string;
    dateOfMarriagePO: string;
    isSeperated: string;
    separationDate: string;
    likeToAddCulturalExplanation: string;
    culturalExplain: string;
}

export interface flmBackgroundSurveyInfoType {
    data: flmBackgroundSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface childDetailsDataInfoType {
    name: nameInfoType;
    dob: string;
    relation: string;
    opRelation: string;
    currentLiving: string;
    currentLivingComment?: string;
    ack?: string;
    additionalInfo?: string;
    additionalInfoDetails?: string;
    id?: number;
}
  
export interface childDetailsSurveyInfoType {
    data: childDetailsDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

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
    childrenRequestedResponsibilities: string[];
    parentalResponsibilitiesOrder: string;
    allResponsibilitiesOrder: string;
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
    applicantDesiredParentingTime: string;
    conditionedApplicantParentingTime: string;
    ApplicantParentingTimeConditions: string;
    respondentDesiredParentingTime: string;
    conditionedRespondentParentingTime: string;
    RespondentParentingTimeConditions: string;
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

export interface parentingArrangementsbestInterestOfChildDataInfoType {
    newParentingArrangementsChildBestInterestDescription: string;
}

export interface parentingArrangementsbestInterestOfChildSurveyInfoType {
    data: parentingArrangementsbestInterestOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}