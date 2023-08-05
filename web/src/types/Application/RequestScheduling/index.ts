import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface requestForSchedulingDataInfoType {
    Filed?: string;
    ApplicantName?: nameInfoType;    
    otherPartyInfoDis?: requestForSchedulingOtherPartyInfoType[];
    discontinuanceDocs?: string[];
}  

export interface requestForSchedulingOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface requestForSchedulingSurveyInfoType {
    data: requestForSchedulingDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface reasonForSchedulingSurveyDataInfoType {
    discontinueAllForm3?: string;
    discontinuePartForm3?: string;
    discontinueAllForm6?: string;
    discontinuePartForm6?: string;
    discontinueAllForm6Counter?: string;
    discontinuePartForm6Counter?: string;
    discontinueAllForm8?: string;
    discontinuePartForm8?: string;
}

export interface reasonForSchedulingSurveyInfoType {
    data: reasonForSchedulingSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface interimOrderSurveyDataInfoType {
    Form3FiledDate?: string;
    ReplyType?: string;
    ReplyFiledDate?: string;
    CounterFiledDate?: string;
    CourtAppearanceScheduled?: string;
    CourtAppearanceDate?: string;
    TrialPrep?: string;
    TrialDateScheduled?: string;
}

export interface interimOrderSurveyInfoType {
    data: interimOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface nextAppearanceSurveyDataInfoType {
    Form3FiledDate?: string;
    ReplyType?: string;
    ReplyFiledDate?: string;
    CounterFiledDate?: string;
    CourtAppearanceScheduled?: string;
    CourtAppearanceDate?: string;
    TrialPrep?: string;
    TrialDateScheduled?: string;
}

export interface nextAppearanceSurveyInfoType {
    data: nextAppearanceSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface partyInformationRqsSurveyDataInfoType {
    Filed?: string;
    ApplicantName?: nameInfoType;    
    otherPartyInfoDis?: partyInformationRqsOtherPartyInfoType[];
    discontinuanceDocs?: string[];
}  

export interface partyInformationRqsOtherPartyInfoType {
    name: nameInfoType;
}

export interface partyInformationRqsSurveyInfoType {
    data: partyInformationRqsSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}