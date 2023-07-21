import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeLawyerPartyDataInfoType {
    Filed?: string;
    ApplicantName?: nameInfoType;    
    otherPartyInfoDis?: noticeLawyerPartyOtherPartyInfoType[];
    lawyerPartyDocs?: string[];
}  

export interface noticeLawyerPartyOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface noticeLawyerPartySurveyInfoType {
    data: noticeLawyerPartyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface lawyerPartyInformationSurveyDataInfoType {
    discontinueAllForm3?: string;
    discontinuePartForm3?: string;
    discontinueAllForm6?: string;
    discontinuePartForm6?: string;
    discontinueAllForm6Counter?: string;
    discontinuePartForm6Counter?: string;
    discontinueAllForm8?: string;
    discontinuePartForm8?: string;
}

export interface lawyerPartyInformationSurveyInfoType {
    data: lawyerPartyInformationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface moreInformationNlpSurveyDataInfoType {
    Form3FiledDate?: string;
    ReplyType?: string;
    ReplyFiledDate?: string;
    CounterFiledDate?: string;
    CourtAppearanceScheduled?: string;
    CourtAppearanceDate?: string;
    TrialPrep?: string;
    TrialDateScheduled?: string;
}

export interface moreInformationNlpSurveyInfoType {
    data: moreInformationNlpSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}