import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeDiscontinuanceDataInfoType {
    Filed?: string;
    ApplicantName?: nameInfoType;    
    otherPartyInfoDis?: noticeDiscontinuanceOtherPartyInfoType[];
    discontinuanceDocs?: string[];
}  

export interface noticeDiscontinuanceOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface noticeDiscontinuanceSurveyInfoType {
    data: noticeDiscontinuanceDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface discontinuanceInformationSurveyDataInfoType {
    discontinueAllForm3?: string;
    discontinuePartForm3?: string;
    discontinueAllForm6?: string;
    discontinuePartForm6?: string;
    discontinueAllForm6Counter?: string;
    discontinuePartForm6Counter?: string;
    discontinueAllForm8?: string;
    discontinuePartForm8?: string;
}

export interface discontinuanceInformationSurveyInfoType {
    data: discontinuanceInformationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface moreInformationRqsSurveyDataInfoType {
    Form3FiledDate?: string;
    ReplyType?: string;
    ReplyFiledDate?: string;
    CounterFiledDate?: string;
    CourtAppearanceScheduled?: string;
    CourtAppearanceDate?: string;
    TrialPrep?: string;
    TrialDateScheduled?: string;
}

export interface moreInformationRqsSurveyInfoType {
    data: moreInformationRqsSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}