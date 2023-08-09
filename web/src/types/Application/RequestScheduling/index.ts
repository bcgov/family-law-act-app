import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface requestForSchedulingDataInfoType {
    FiledDate?: string;
    Unresolved?: string;
    ReviewOrdered?: string;
    LastAppearanceDate?: string;
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

export interface reasonForSchedulingSurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface interimOrderSurveyDataInfoType {
    DescriptionOnChange?: string;
    FlmType?: string[];
    ReasonForChange?: string;
    family?: boolean;
    orderChanged?: boolean;
}

export interface interimOrderSurveyInfoType {
    data: interimOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface nextAppearanceSurveyDataInfoType {
    AppearanceType?: string;
    AppearanceTypeComment?: string;
}

export interface nextAppearanceSurveyInfoType {
    data: nextAppearanceSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface partyInformationRqsSurveyDataInfoType {   
    ApplicantName?: nameInfoType;    
    otherPartyInfoRqs?: partyInformationRqsOtherPartyInfoType[];   
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