import { questionInfoType } from "../../CommonInformation";
import { howToPaySpousalSupportInfoType } from "../../FamilyLawMatter/SpousalSupport";


export interface replyNewSpouseSupportDataInfoType {    
    agreeCourtOrder: string;    
}

export interface replyNewSpouseSupportSurveyInfoType {
    data: replyNewSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface relationshipToOtherPartyDataInfoType {
    spouse: string;
}

export interface relationshipToOtherPartySurveyInfoType {
    data: relationshipToOtherPartyDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeSpouseSupportDataInfoType {
    noEntitlement: string;
    noEntitlementDescription?: string;
    incorrectIncomeAndAbilityToWork: string;
    incorrectEmployment: string;
    incorrectEmploymentDescription?: string;
    opIncorrectFinances: string;
    opIncorrectFinancesDescription?: string;
    opIncorrectEmployment: string;
    opIncorrectEmploymentDescription?: string;
    opIncorrectExpenses: string;
    opIncorrectExpensesDescription?: string;
    disagreeOtherReason: string;
    otherReasonDescription?: string;
}

export interface disagreeSpouseSupportSurveyInfoType {
    data: disagreeSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmSpouseSupportOrderDataInfoType {
    howToPaySpousalSupport: howToPaySpousalSupportInfoType;
}

export interface rflmSpouseSupportOrderSurveyInfoType {
    data: rflmSpouseSupportOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmCalculatingSpouseSupportDataInfoType {
    attachingCalculations: string;
    notAttachingCalculationsReason?: string;
}

export interface rflmCalculatingSpouseSupportSurveyInfoType {
    data: rflmCalculatingSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyExistingSpouseSupportDataInfoType {
    agreeCourtOrder: string;
    existingType?: string;
    agreeFinalOrder?: string;
    agreeAgreement?: string;
}

export interface replyExistingSpouseSupportSurveyInfoType {
    data: replyExistingSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface rflmUnpaidSpouseSupportDataInfoType {
    agreeSpouseSupportAmount: string;
    calculationDate?: string; 
    unPaidAmount?: string; 
}

export interface rflmUnpaidSpouseSupportSurveyInfoType {
    data: rflmUnpaidSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disagreeExistingSpouseSupportDataInfoType {
    disagreeReason: string;
    requestedOrder?: string;
    requestedChangeDescription?: string;   
}

export interface disagreeExistingSpouseSupportSurveyInfoType {
    data: disagreeExistingSpouseSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}


