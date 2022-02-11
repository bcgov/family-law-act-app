import { nameInfoType, questionInfoType } from "../CommonInformation";
import { allOtherChilderenInfoType } from "../ProtectionOrder";

export interface rflmQuestionnaireDataInfoType {    
    selectedParentingArrangementsForm?: string[];  
    selectedChildSupportForm?: string[];
    selectedContactWithChildForm?: string[];
    selectedGuardianshipForm?: string[];
    selectedSpousalSupportForm?: string[]; 
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
    criminalChecked?: string;
    unableFileForms?: string[];
    fileApplicationFAQ?: boolean;
}

export interface rflmAdditionalDocumentsSurveyInfoType {
    data: rflmAdditionalDocsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}