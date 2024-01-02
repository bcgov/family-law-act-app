import { questionInfoType } from "../../CommonInformation";

export interface animalInfoType {
    animalName?: string;
    animalType?: string;
    animalOwnership?: string;  
}

export interface propertyDivisionCompanionAnimalSurveyInfoType {
    data: animalInfoType[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface companionAnimalFactsSurveyInfoType {
    data: companionAnimalFactsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface companionAnimalFactsDataInfoType {
    animalFacts?: string;
}

export interface companionAnimalExistingAgreementSurveyInfoType {
    data: companionAnimalExistingAgreementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface companionAnimalExistingAgreementDataInfoType {
    agreementDate?: string;
    setAsideReason?: string;
    existingAgreementDecision?: string;
    agreementReplacement?: string;
}
