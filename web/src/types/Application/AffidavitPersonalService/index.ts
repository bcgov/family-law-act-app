import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface affidavitPersonalServiceDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface affidavitPersonalServiceSurveyInfoType {
    data: affidavitPersonalServiceDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantApsDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantApsSurveyInfoType {
    data: aboutAffiantApsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutServiceApsDataInfoType {    
    ServedPersonName?: nameInfoType;   
    locationServed?: addressInfoType;
    idMethod?: string;
    idMethodComment?: string;
    dateTimeServed?: string;
    documentListAps?: exhibitsApsDataInfoType[];
}

export interface exhibitsApsDataInfoType {    
    exhibitIndex?: number;
    exhibitName?: string;
    fileName?: string;   
}

export interface aboutServiceApsSurveyInfoType {
    data: aboutServiceApsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
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

export interface electronicFilingStatementApsSurveyInfoType {
    data: electronicFilingStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}