import { questionInfoType } from "../../CommonInformation";

export interface replyNewContactWithChildDataInfoType {
    agreeCourtOrder: string;
}

export interface replyNewContactWithChildSurveyInfoType {
    data: replyNewContactWithChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeContactWithChildDataInfoType {   
    contactTypeChoices?: string[];
    contactTypeChoicesComment?: string; 
    inPersonDetails?: string;
    placeConditions?: string;    
    conditionsDescription?: string;
    childBestInterestReason?: string;
}

export interface disagreeContactWithChildSurveyInfoType {
    data: disagreeContactWithChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyExistingContactWithChildDataInfoType {
    agreeCourtOrder: string;
    existingType?: string;
    agreeFinalOrder?: string;
    agreeAgreement?: string;
    disagreeReason: string;
    requestedOrder?: string;
    requestedChangeDescription?: string;
    childBestInterestReason?: string;
}

export interface replyExistingContactWithChildSurveyInfoType {
    data: replyExistingContactWithChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}