import { questionInfoType } from "../../CommonInformation";

export interface replyAppointingGuardianOfChildDataInfoType {
    moreThanOneChild: string;
    agreeCourtOrderChild?: string;
    agreeCourtOrder?: string;
}

export interface replyAppointingGuardianOfChildSurveyInfoType {
    data: replyAppointingGuardianOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeAppointingGuardianOfChildDataInfoType {   
    disagreeReasonList?: disagreeReasonListInfoType;   
}

export interface disagreeReasonListInfoType {
    checked: string[];
    unableComment?: string;
    unsuitableComment?: string;
    otherComment?: string;
}

export interface disagreeAppointingGuardianOfChildSurveyInfoType {
    data: disagreeAppointingGuardianOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyCancellingGuardianOfChildDataInfoType {
    moreThanOneChild: string;
    agreeCourtOrderChild?: string;
    agreeCourtOrder?: string;
}

export interface replyCancellingGuardianOfChildSurveyInfoType {
    data: replyCancellingGuardianOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeCancellingGuardianOfChildDataInfoType {   
    disagreeReasonList: disagreeCancellationReasonListInfoType; 
    childBestInterestReason: string;  
}

export interface disagreeCancellationReasonListInfoType {
    checked: string[];
    ableComment?: string;
    suitableComment?: string;
    noConsentComment?: string;
    otherComment?: string;
}

export interface disagreeCancellingGuardianOfChildSurveyInfoType {
    data: disagreeCancellingGuardianOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}