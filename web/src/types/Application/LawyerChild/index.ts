import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeLawyerChildDataInfoType {
    Filed?: string;
    ApplicantName?: nameInfoType;    
    otherChildInfoDis?: noticeLawyerChildOtherPartyInfoType[];
    lawyerChildDocs?: string[];
}  

export interface noticeLawyerChildOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface noticeLawyerChildSurveyInfoType {
    data: noticeLawyerChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface lawyerChildInformationSurveyDataInfoType {
    discontinueAllForm3?: string;
    discontinuePartForm3?: string;
    discontinueAllForm6?: string;
    discontinuePartForm6?: string;
    discontinueAllForm6Counter?: string;
    discontinuePartForm6Counter?: string;
    discontinueAllForm8?: string;
    discontinuePartForm8?: string;
}

export interface lawyerChildInformationSurveyInfoType {
    data: lawyerChildInformationSurveyDataInfoType;
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