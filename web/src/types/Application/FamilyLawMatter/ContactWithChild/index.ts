import { questionInfoType } from "../../CommonInformation";

export interface contactWithChildDataInfoType {
    parentGuardianApplicant: string;
}

export interface contactWithChildSurveyInfoType {
    data: contactWithChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface aboutContactWithChildDataInfoType {
    childrenRequireContactChoices?: string[];
    lastContactDate: string;
    contactTypeChoices?: string[];
    contactTypeChoicesComment?: string;
    inPersonDetails?: string;
    placeConditions: string;
    conditionsDescription?: string;
}

export interface aboutContactWithChildOrderSurveyInfoType {
    data: aboutContactWithChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface contactWithChildBestInterestOfChildDataInfoType {
    newChildBestInterestDescription?: string;
    existingChildBestInterestDescription?: string;
}

export interface contactWithChildBestInterestsOfChildSurveyInfoType {
    data: contactWithChildBestInterestOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface contactOrderDataInfoType {
    roleType: string;
    existingType: string;
    orderDate?: string;
    changesSinceOrder?: string;
    orderDifferenceType?: string;
    agreementDate?: string;
    changesSinceAgreement?: string;
    agreementDifferenceType?: string;
}

export interface contactWithChildOrderSurveyInfoType {
    data: contactOrderDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}