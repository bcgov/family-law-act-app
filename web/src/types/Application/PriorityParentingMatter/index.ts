import { nameInfoType, questionInfoType } from "../CommonInformation"; 
  
export interface aboutPriorityParentingMatterOrderSurveyInfoType {
    data: aboutPriorityParentingMatterOrderSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutPriorityParentingMatterOrderSurveyDataInfoType {
    orderDescription: string;
    applicationFacts: string;
}

export interface ppmChildrenInfoSurveyInfoType {
    data: ppmChildrenInfoSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface ppmChildrenInfoSurveyDataInfoType {
    name:nameInfoType;
    dob: string;
    relation:string;
    opRelation:string;
    id:number;
}

export interface ppmBackgroundDataSurveyInfoType {
    data: ppmBackgroundDataSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface ppmBackgroundDataSurveyDataInfoType {
    ExistingOrdersFLM: string;
    existingCourtProceeding: string;
    existingCourtProceedingDetails?: string;
}

export interface ppmQuestionnaireSurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface priorityParentingMatterOrderSurveyInfoType {
    data: priorityParentingMatterOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface priorityParentingMatterOrderSurveyDataInfoType {
    delayMedicalRisk?: string;
    confirmMedicalRisk?: string[];
    delayPassportRisk?: string;
    delayTravelRisk?: string;
    travelWrongfullyDenied?: string;
    confirmTravelWrongfullyDenied?: string[];
    existingParentingArrangements?: string;
    impactOnRelationship?: string;
    confirmImpactOnRelationship?: string[];
    noReturnRisk?: string;
    childInBC?: string;
    harm?: string;
    confirmHarm?: string[];
    wrongfulInBC?: string;
    wrongfulReturn?: string;
    confirmDelayPassportRisk?: string[];
    confirmWrongfulReturn?: string[];
    confirmNoReturnRisk?: string[];
    confirmWrongfulInBC?: string[];
    childRemoved?: string;
    confirmChildServicesPathway?: string[];
    confirmChildServices?: string[];
}

export interface ppmAdditionalDocsDataInfoType {
    isFilingAdditionalDocs?: string;
    criminalChecked?: string;
    unableFileForms?: string[];
    fileApplicationFAQ?: boolean;
}

export interface ppmAdditionalDocumentsSurveyInfoType {
    data: ppmAdditionalDocsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

