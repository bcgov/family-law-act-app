import { questionInfoType } from "../../CommonInformation";

export interface replyNewPropertyDivisionDataInfoType {
    agreeCourtMakeOrder?: string;
}
export interface replyNewPropertyDivisionSurveyInfoType {
    data: replyNewPropertyDivisionDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface animalRelationshipToOtherPartyDataInfoType {
    otherPartyIsSpouse?: string;
    otherPartyRelationshipDesc?: string;
}
export interface animalRelationshipToOtherPartySurveyInfoType {
    data: animalRelationshipToOtherPartyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreePropertyDivisionDataInfoType {
    disagreeCompanionAnimalOrder?: string;
}
export interface disagreePropertyDivisionSurveyInfoType {
    data: disagreePropertyDivisionDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface propertyDivisionOrderDataInfoType {
    propertyDivisionCourtOrderBelief?: string;
}
export interface propertyDivisionOrderSurveyInfoType {
    data: propertyDivisionOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyExistingPropertyDivisionDataInfoType {
    agreeCourtMakeOrder?: string;
}
export interface replyExistingPropertyDivisionSurveyInfoType {
    data: replyExistingPropertyDivisionDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeExistingPropertyDivisionOrderDataInfoType {
    disagreeExistingCompanionAnimalOrder?: string;
    existingOrderContinue?: string;
    replaceExistingAgreementChanges?: string;
}
export interface disagreeExistingPropertyDivisionOrderSurveyInfoType {
    data: disagreeExistingPropertyDivisionOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}


