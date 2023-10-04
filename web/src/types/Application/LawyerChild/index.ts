import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeLawyerChildDataInfoType {    
    ApplicantName?: nameInfoType;  
    FirmName?: string;  
    ChildInfoNlc?: noticeLawyerChildChildrenInfoType[];
    IssuesList?: string[];
    IssuesListComment?: string;
    LawyerAddressNlc?: addressInfoType;
    LawyerContact?: contactInfoType;
    OtherPartyInfoNlc?: noticeLawyerChildOtherPartyInfoType[];
}  

export interface noticeLawyerChildOtherPartyInfoType {
    name: nameInfoType;
}

export interface noticeLawyerChildChildrenInfoType {
    name: nameInfoType;
    dateOfBirth: string;
}
  
export interface noticeLawyerChildSurveyInfoType {
    data: noticeLawyerChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyNLCConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface lawyerInformationInfoDataInfoType {   
    lawyerName: nameInfoType;
    firmName: string;
    address: addressInfoType;
    contact: contactInfoType;
}

export interface childInformationNlcInfoDataInfoType {   
    name: string;
    dob: string;
}