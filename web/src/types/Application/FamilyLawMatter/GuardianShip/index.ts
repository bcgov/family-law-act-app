import { questionInfoType } from "../../CommonInformation";

export interface cancelGuardianDetailInfoType {
    name: string;
    nameOther: string;
    date: string;
    relationship: string;
}

export interface guardianOfChildDataInfoType {
    applicationType: string[];
    childrenList?: string[];
    cancelGuardianDetails?: cancelGuardianDetailInfoType[];
}

export interface guardianOfChildSurveyInfoType {
    data: guardianOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface guardianOfChildBestInterestOfChildDataInfoType {
    cancelGuradianChildBestInterest: string;
}

export interface guardianOfChildBestInterestsOfChildSurveyInfoType {
    data: guardianOfChildBestInterestOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface indigenousAncestryOfChildDataInfoType {
    indigenousChild: string;
    indigenousAncestry?: string[];
    ServeAcknowledgement?: string;
}

export interface indigenousAncestryOfChildSurveyInfoType {
    data: indigenousAncestryOfChildDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}