import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeRemoveLawyerPartyDataInfoType {
    ApplicantName?: nameInfoType;
    OtherPartyInfoNlpr?: noticeRemoveLawyerPartyOtherPartyInfoType[];    
    LawyerAddressNlpr?: addressInfoType;
    LawyerContact?: contactInfoType;
}

export interface noticeRemoveLawyerPartySurveyInfoType {
    data: noticeRemoveLawyerPartyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyNLPRConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface noticeRemoveLawyerPartyOtherPartyInfoType {
    name: nameInfoType;
}

export interface contactInformationDataInfoType {   
    lawyerName?: nameInfoType;    
    address: addressInfoType;
    contact: contactInfoType;
}