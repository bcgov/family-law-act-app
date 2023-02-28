import { questionInfoType } from "../CommonInformation";

export interface adminFormsSubmissionSurveyDataInfoType {
    ExistingFamilyCaseFAQ1?: boolean;
    ExistingFamilyCaseFAQ2?: boolean;
    ExistingFamilyCase: string;  
    // PreviouslyRejected: string;
    // ExplanationPreviouslyRejected?: boolean;
}   

export interface adminFormsSurveyInfoType {
    data: string[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface adminFormsSubmissionSurveyInfoType {
    data: adminFormsSubmissionSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface adminFormsFilingLocationSurveyDataInfoType {
    CourtLocationFAQ1?: boolean | string;
    CourtLocationFAQ2?: boolean | string;
    // ExistingFamilyCase: string;
    ExplanationCourtLocation?: boolean;
    ExistingCourt?: string;
    // ExistingFamilyCaseFAQ1?: boolean;
    // ExistingFamilyCaseFAQ2?: boolean;
    ExistingFileNumber?: string;        
}   

export interface adminFormsFilingLocationSurveyInfoType {
    data: adminFormsFilingLocationSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}