import { questionInfoType } from "../CommonInformation";

export interface otherFormInfoType {
    formName: string;
    formNumber: string;
}

export interface otherFormPathwayInfoType {
    formName: string;
    formNumber: string;
    pathwayExists: boolean;
    formLink: string;
    pathwayState: boolean;
    manualState: boolean; 
    pathwayName: string;
}

export interface otherFormsSurveyDataInfoType {
    selectedOtherForms: otherFormInfoType[];
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
    Party1LastName?: string;
    Party2LastName?: string;
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

export interface otherFormsLastNamesOfThePartiesSurveyInfoType {
    data: otherFormsLastNamesOfThePartiesSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherFormsLastNamesOfThePartiesSurveyDataInfoType {
    party1?: string; 
    party2?: string;
}

export interface completeOtherFormsSurveyDataInfoType {
    selectedFormInfoList: otherFormPathwayInfoType[];
    requiresEFSP: boolean;      
}


export interface completeOtherFormsSurveyInfoType {
    data: completeOtherFormsSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}