import { addressInfoType, contactInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface lastStepDataInfoType {
    resolveFlmDate?: string;
    needsAssessmentDate?: string;
    parentingEducationProgramDate?: string;
    consensualDisputeResolutionDate?: string;
    flmDate?: string;
    selected: string;
    otherDate?: string;
    otherDescription?: string;
}

export interface noticeIntentionProceedDataInfoType {
    lastStep?: lastStepDataInfoType;
    requiresForm39?: boolean;
    unresolvedFlm?: string;
    unresolvedLessThanYear?: boolean;
}
  
export interface noticeIntentionProceedSurveyInfoType {
    data: noticeIntentionProceedDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyNprConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface nprOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
    lawyer?: string;
}