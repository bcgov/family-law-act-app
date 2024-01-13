import { addressInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface certificateOfServiceDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface certificateOfServiceSurveyInfoType {
    data: certificateOfServiceDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantCsvDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantCsvSurveyInfoType {
    data: aboutAffiantCsvDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface yourStoryCsvDataInfoType {    
    storyCsv?: string[];
}

export interface yourStoryCsvSurveyInfoType {
    data: yourStoryCsvDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingCsvSurveyInfoType {
    data: filingCsvDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingCsvDataInfoType {    
    sworn?: string;
}

export interface storyDataInfoType {
    index?: number;
    content?: string;
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