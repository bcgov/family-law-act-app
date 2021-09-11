import { questionInfoType } from "../../CommonInformation";


export interface spousalSupportDataInfoType {
    listOfSupportPayors: string[];
    currentSupport: string;
    listOfReasons: string[];
}

export interface spousalSupportSurveyInfoType {
    data: spousalSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface spousalSupportIncomeAndEarningPotentialDataInfoType {
    incomeInfo: string;
    knowIncome: string;
    incomeAmount?: string;
    knowFacts: string;
    factsExplanation?: string;
}

export interface spousalSupportIncomeAndEarningPotentialSurveyInfoType {
    data: spousalSupportIncomeAndEarningPotentialDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface howToPaySpousalSupportInfoType {
    monthlyAmount?: string;
    monthlyStartDate?: string;
    monthlyEndDate?: string;
    lumpsumAmount?: string;
    selected: string;
    otherComment?: string;
}

export interface aboutSpousalSupportOrderDataInfoType {
    howToPaySpousalSupport: howToPaySpousalSupportInfoType;
}

export interface valueInfoType {
    monthlyAmount: string;
    monthlyStartDate: string;
    monthlyEndDate: string;
    lumpsumAmount: string;
    selected: string;
    otherComment?: string;
}

export interface aboutSpousalSupportOrderSurveyInfoType {
    data: aboutSpousalSupportOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface calculatingSpousalSupportDataInfoType {
    attachingCalculations: string;
    whyNotAttachingCalculations?: string;
}

export interface calculatingSpousalSupportSurveyInfoType {
    data: calculatingSpousalSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface existingSpousalSupportOrderAgreementDataInfoType {
    existingType: string;
    filedWithDirector?: string;
    reviewableTerm?: string;
    fillOutForm?: string;
}

export interface existingSpousalSupportOrderAgreementSurveyInfoType {
    data: existingSpousalSupportOrderAgreementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface spousalChangesSinceOrderListInfoType {
    myEmploymentChangedComment?: string;
    partyEmploymentChangedComment?: string;
    myHouseholdChangedComment?: string;
    newInformationComment?: string;
    otherComment?: string;
    checked: string[];
}

export interface existingSpousalSupportFinalOrderDataInfoType {
    orderDate: string;
    changesSinceOrderList: spousalChangesSinceOrderListInfoType;
    orderDifferenceType: string;
}

export interface existingSpousalSupportFinalOrderSurveyInfoType {
    data: existingSpousalSupportFinalOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutExistingSpousalSupportOrderDataInfoType {
    changesSinceOrder: string;
}

export interface aboutExistingSpousalSupportOrderSurveyInfoType {
    data: aboutExistingSpousalSupportOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}
export interface spousalPaymentScheduleInfoType {
    monthlyAmount?: string;
    selected: string;
    otherComment?: string;
}

export interface unpaidSpousalSupportDataInfoType {
    unpaid?: string;
    unPaidAmount?: string;
    applyToReduce?: string;
    reduceAmount?: string;
    whyReduceAmount?: string;
    paymentSchedule?: spousalPaymentScheduleInfoType;
}

export interface unpaidSpousalSupportSurveyInfoType {
    data: unpaidSpousalSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface existingSpousalSupportAgreementDataInfoType {
    agreementDate?: string;
    changesReasoning?: string;
    agreementDifferenceType?: string;
}

export interface existingSpousalSupportAgreementSurveyInfoType {
    data: existingSpousalSupportAgreementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

