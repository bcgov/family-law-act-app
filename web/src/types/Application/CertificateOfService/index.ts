import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface aboutAffiantCsvDataInfoType {    
    ApplicantName?: nameInfoType;
}

export interface aboutAffiantCsvSurveyInfoType {
    data: aboutAffiantCsvDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutServiceCsvDataInfoType {    
    ServedPersonName?: nameInfoType;   
    locationServed?: addressInfoType;   
    dateTimeServed?: string;
    documentListCsv?: string[];
    documentListCsvComment?: string;
    serviceContact?: contactInfoType;
    otherServiceLocation?: string;
    personalServiceMethod?: string;
    personalServiceMethodComment?: string;
    ordinaryServiceMethod?: ordinaryServiceMethodDataInfoType; 
}

export interface ordinaryServiceMethodDataInfoType {
    mailServiceDate?: string;
    selected?: string;
    otherComment?: string;
}

export interface aboutServiceCsvSurveyInfoType {
    data: aboutServiceCsvDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface electronicFilingStatementDataInfoType {
    Lawyer?: string;
    ApplicantName?: nameInfoType;
    PartyInfoEfsp?: efspPartyInfoType[];
    OtherPartyInfoEfsp?: efspPartyInfoType[];
    StatementConfirmation?: string[];
}

export interface efspPartyInfoType {
    name: nameInfoType;
}

export interface electronicFilingStatementCsvSurveyInfoType {
    data: electronicFilingStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}