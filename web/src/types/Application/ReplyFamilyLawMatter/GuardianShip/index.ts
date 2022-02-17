import { questionInfoType } from "../../CommonInformation";

export interface cancelGuardianDetailInfoType {
    name: string;
    nameOther: string;
    date: string;
    relationship: string;
}

export interface guardianOfChildDataInfoType {
    FAQLegalAdvice?: boolean;
    applicationType?: string[];
    childrenList?: string[];
    cancelGuardianDetails?: cancelGuardianDetailInfoType[];
}

export interface guardianOfChildSurveyInfoType {
    data: guardianOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface guardianOfChildBestInterestOfChildDataInfoType {
    cancelGuradianChildBestInterest?: string;
}

export interface guardianOfChildBestInterestsOfChildSurveyInfoType {
    data: guardianOfChildBestInterestOfChildDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}