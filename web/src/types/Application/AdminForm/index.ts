import { questionInfoType } from "../CommonInformation";

export interface adminFormsSurveyInfoType {
    data: string[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface adminFormsFilingLocationSurveyDataInfoType {
    ExistingFamilyCase: string;  
    ExistingFamilyCaseFAQ1?: boolean;
    ExistingFamilyCaseFAQ2?: boolean;    
    ExplanationCourtLocation?: boolean;
    ExistingCourt?: string;
    ExistingFileNumber?: string;        
    CourtLocationFAQ1?: boolean | string;
    CourtLocationFAQ2?: boolean | string;    
    // PreviouslyRejected: string;
    // ExplanationPreviouslyRejected?: boolean;
}   

export interface adminFormsFilingLocationSurveyInfoType {
    data: adminFormsFilingLocationSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}