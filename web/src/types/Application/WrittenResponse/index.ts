import { questionInfoType } from "../CommonInformation";

export interface aboutWrittenResponseOrderSurveyInfoType {
    data: aboutWrittenResponseOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutWrittenResponseOrderSurveyDataInfoType {
    orderDescription?: string;
    applicationFacts?: string;
    requiredChanges: string;
}

export interface agreeDisagreeSurveyInfoType {
    data: agreeDisagreeSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface agreeDisagreeSurveyDataInfoType {
    agreeDisagree: string[];
    agreeAdditionalDetailsYesNo: string[];
    agreeDetails?: string;
    disAgreeDetails?: string;
    agreeAdditionalDetails?:string;
    disAgreeDetailsOtherParty?:string;
}

export interface wrReplyingToApplicationSurveyInfoType {
    data: wrReplyingToApplicationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface wrReplyingToApplicationSurveyDataInfoType {
    acknowledgement: string[];
    partiesMakingApplication: string[];
    partiesMakingApplicationComment?: string;
    applicationFiledOn: string;
}

