import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface affidavitDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface affidavitSurveyInfoType {
    data: affidavitDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantSurveyInfoType {
    data: aboutAffiantDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface yourStoryAffDataInfoType {    
    storyAff?: string[];
}

export interface yourStoryAffSurveyInfoType {
    data: yourStoryAffDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingAffSurveyInfoType {
    data: filingAffDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingAffDataInfoType {    
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
  
export interface electronicFilingStatementAffSurveyInfoType {
    data: electronicFilingStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}