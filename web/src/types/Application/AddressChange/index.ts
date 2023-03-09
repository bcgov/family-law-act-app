import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface addressChangeDataInfoType {
    ApplicantName?: nameInfoType;    
    Lawyer?: string;
    ExplanationServiceAddress?: boolean;
    ApplicantAddress?: addressInfoType;
    ApplicantContact?: contactInfoType;
    ApplicantOccupation?: string;
    LawyerName?: nameInfoType;
    LawyerAddress?: addressInfoType;
    LawyerContact?: contactInfoType;
    ChangeOfAddressDate?: string;
    FAQLawyer1?: boolean;
    FAQLawyer2?: boolean;
}
  
  
export interface addressChangeSurveyInfoType {
    data: addressChangeDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface addressChangeNoticeSurveyInfoType {
    data: addressChangeNoticeSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface addressChangeNoticeSurveyDataInfoType {
    acknowledgement: string;
}