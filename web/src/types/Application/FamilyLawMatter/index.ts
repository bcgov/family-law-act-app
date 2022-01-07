import { nameInfoType, questionInfoType } from "../CommonInformation";
import { allOtherChilderenInfoType } from "../ProtectionOrder";

export interface flmQuestionnaireSurveyInfoType {
    data: string[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface flmBackgroundSurveyDataInfoType {
    ExistingOrdersFLM?: string;
    existingOrdersListFLM?: string[];
    existingPOOrders: string;
    howPartiesRelated: string;
    werePOPartiesMarried?: string;
    listOfSpouses?: string;
    liveTogetherPODate?: string;
    dateOfMarriagePO?: string;
    isSeperated?: string;
    separationDate?: string;
    likeToAddCulturalExplanation: string;
    culturalExplain?: string;
    spouseFAQ?: boolean;
    isSeperatedPO?: string;
    concernForNotObeying?: string;
    reportedConcernsToPolice?: string;
    reportedConcernsToSW?: string;
    riskOfViolencePO?: string; 
    otherPartyDisobeyOrder?: string;
    explainReasonsForConcern?: string;
    PartiesHasOtherChilderen?: string;
    describeCirumstancesPO?: string;
    mentalHealthConcernPO?: string;
    allOtherChilderen?: allOtherChilderenInfoType[];
    describeDisobeyOrder?: string;
    explainReasonsPO?: string;
    ExistingOrders?: string;
    desrcibeSWAction?: string;
    describeActionsByPolice?: string;
}

export interface flmBackgroundSurveyInfoType {
    data: flmBackgroundSurveyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childDetailsDataInfoType {
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
  
export interface childDetailsSurveyInfoType {
    data: childDetailsDataInfoType[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface flmAdditionalDocsDataInfoType {
    isFilingAdditionalDocs?: string;
    criminalChecked?: string;
    unableFileForms?: string[];
    fileApplicationFAQ?: boolean;
}

export interface flmAdditionalDocumentsSurveyInfoType {
    data: flmAdditionalDocsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}