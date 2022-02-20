import { questionInfoType } from "../../CommonInformation";

export interface disagreeChildSupportDataInfoType {
    incorrectIncome: string;
    incorrectOpIncome: string;
    incorrectDescription?: string;
    incorrectSpecialAndExtraordinaryExpenses: string;
    incorrectSpecialAndExtraordinaryDescription?: string;
    incorrectTimeWithChild: string;
    incorrectTimeWithChildDescription?: string;
    causeUndueHardship: string;
    undueHardshipReason?: string[];
    undueHardshipReasonComment?: string; 
    disagreeOtherReason: string;
    OtherReasonDescription?: string;    
}

export interface disagreeChildSupportSurveyInfoType {
    data: disagreeChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmCalculatingChildSupportDataInfoType {
    attachingCalculations: string;
    notAttachingCalculationsReason?: string;  
}

export interface rflmCalculatingChildSupportSurveyInfoType {
    data: rflmCalculatingChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface relationshipToChildDataInfoType {
    listOfRelationshipTypes: string[];
    parentageTest?: string;   
}

export interface relationshipToChildSurveyInfoType {
    data: relationshipToChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyNewChildSupportDataInfoType {
    agreeCourtOrder: string;
}

export interface replyNewChildSupportSurveyInfoType {
    data: replyNewChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}