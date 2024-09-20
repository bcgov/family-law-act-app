import { nameInfoType, questionInfoType } from "../CommonInformation";

export interface rflmQuestionnaireDataInfoType {    
    selectedParentingArrangementsForm?: string[];  
    selectedParentingArrangementsFormOrder?: string[];  
    selectedChildSupportForm?: string[];
    selectedChildSupportFormOrder?: string[];
    selectedContactWithChildForm?: string[];
    selectedContactWithChildFormOrder?: string[];
    selectedGuardianshipForm?: string[];
    selectedSpousalSupportForm?: string[];
    selectedSpousalSupportFormOrder?: string[];
    selectedCompanionAnimalForm?: string[];
    selectedCompanionAnimalFormOrder?: string[];
}

export interface rflmQuestionnaireSurveyInfoType {
    data: rflmQuestionnaireDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmCounterAppDataInfoType {
    counter: null | string;
    counterList?: string[];   
}

export interface rflmCounterAppSurveyInfoType {
    data: rflmCounterAppDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmBackgroundSurveyDataInfoType {
    ExistingOrdersFLM?: string;
    existingOrdersListFLM?: string[];
    otherPartyAttach?: string;
    existingPOOrdersAttached: string;    
    likeToAddCulturalExplanation: string;
    culturalExplain?: string;    
}

export interface rflmBackgroundSurveyInfoType {
    data: rflmBackgroundSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmChildDetailsDataInfoType {
    name: nameInfoType;
    dob: string;
    relation: string;
    opRelation: string;
    currentLiving: string;
    currentLivingComment?: string;
    ack?: string;
    additionalInfo?: string;
    additionalInfoDetails?: string;
    id?: number;
}
  
export interface rflmChildDetailsSurveyInfoType {
    data: rflmChildDetailsDataInfoType[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmAdditionalDocsDataInfoType {
    isFilingAdditionalDocs?: string;    
}

export interface rflmAdditionalDocumentsSurveyInfoType {
    data: rflmAdditionalDocsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}