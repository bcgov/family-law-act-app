import { questionInfoType } from "../CommonInformation";

export interface otherFormsSurveyDataInfoType {
    selectedOtherForms: string[];
    filingMethod: string;
}

export interface otherFormsSurveyInfoType {
    data: otherFormsSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherFormsFilingLocationSurveyDataInfoType {
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

export interface otherFormsFilingLocationSurveyInfoType {
    data: otherFormsFilingLocationSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface completeOtherFormsSurveyDataInfoType {
    ExistingFamilyCase: string;      
}


export interface completeOtherFormsSurveyInfoType {
    data: completeOtherFormsSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}