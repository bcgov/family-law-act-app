import { nameInfoType, questionInfoType } from "../CommonInformation"; 
  
export interface enfrcQuestionnaireSurveySurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface determineAnAmountOwingForExpensesSurveyInfoType{
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutTheOrderEnforcementSurveyInfoType {
    data: aboutTheOrderEnforcementSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutTheOrderEnforcementSurveyDataInfoType {
    orderDescription: string;
    applicationFacts?: string;    
}

export interface enforceAgreementOrOrderSurveyInfoType {
    data: enforceAgreementOrOrderSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface enforceAgreementOrOrderSurveyDataInfoType {
    enforceOrder: string;
    filedOrder?: string;
    existingType?: string;
    agreementType?: string[];
    orderType?: string[];
    existingDate?: string;
}

export interface enforceChangeSetAsideDeterminationSurveyInfoType {
    data: enforceChangeSetAsideDeterminationSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface enforceChangeSetAsideDeterminationSurveyDataInfoType {
    filedOrder: string;
    appointedDetermination: appointedDeterminationDataInfoType;
    filedAgreement?: string;    
    existingDate?: string;
    agreementParties?: string;
}

export interface appointedDeterminationDataInfoType {
    writtenAgreementDate?: string;
    courtOrderDate?: string;
    selected: string;
}

export interface detrermineArrearsSurveyInfoType {
    data: detrermineArrearsSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface detrermineArrearsSurveyDataInfoType {
    existingDate: string;   
}





