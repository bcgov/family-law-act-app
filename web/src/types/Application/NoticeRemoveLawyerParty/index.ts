import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeRemoveLawyerPartyDataInfoType {
    ApplicantName?: nameInfoType;
    ApplicantType?: string;
    OtherPartyInfoNlpr?: noticeRemoveLawyerPartyOtherPartyInfoType[];   
    OtherOtherPartyInfoNlpr?: noticeRemoveLawyerPartyOtherPartyInfoType[];
    LawyerName?: string; 
    EffectiveDate?: string;
    AddressChanges?: string[];    
    LawyerAddressNlpr?: addressInfoType;
    LawyerContactNlpr?: contactInfoType;
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