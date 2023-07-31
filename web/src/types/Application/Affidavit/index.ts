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

export interface affidavitDataInfoType {
    lastStep?: lastStepDataInfoType;
    requiresForm39?: boolean;
    unresolvedFlm?: string;
    unresolvedLessThanYear?: boolean;
}
  
export interface affidavitSurveyInfoType {
    data: affidavitDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherPartyAffConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface affOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
    lawyer?: string;
}