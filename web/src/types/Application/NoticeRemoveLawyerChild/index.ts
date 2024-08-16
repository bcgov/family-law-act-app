import { nameInfoType, otherPartyInfoType, otherPartyNameInfoType, questionInfoType } from "../CommonInformation";

export interface noticeRemoveLawyerChildDataInfoType {
    ApplicantName?: nameInfoType;
    ChildInfoNlcr?: noticeRemoveLawyerChildChildrenInfoType[];
    otherPartyNamesDynamicPanel: otherPartyNameInfoType[]   
}

export interface noticeRemoveLawyerChildSurveyInfoType {
    data: noticeRemoveLawyerChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyNLCRConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface noticeRemoveLawyerChildChildrenInfoType {
    name: nameInfoType;
    dateOfBirth: string;
}

export interface childInformationNlcrDataInfoType {   
    name: string;
    dob: string;
}