import { nameInfoType, questionInfoType } from "../CommonInformation"; 
  
export interface enfrcQuestionnaireSurveySurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface aboutTheOrderEnforcementSurveyInfoType {
    data: aboutTheOrderEnforcementSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface aboutTheOrderEnforcementSurveyDataInfoType {
    orderDescription: string;
    applicationFacts1?: string;
    applicationFacts2?: string;
}

export interface enforceAgreementOrOrderSurveyInfoType {
    data: enforceAgreementOrOrderSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
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
    currentStep: number;
    currentPage: number;
}

export interface enforceChangeSetAsideDeterminationSurveyDataInfoType {
    filedOrder: string;
    appointedDetermination: appointedDeterminationDataInfoType;
    filedAgreement?: string;    
    existingDate?: string;
}

export interface appointedDeterminationDataInfoType {
    writtenAgreementDate?: string;
    courtOrderDate?: string;
    selected: string;
}



