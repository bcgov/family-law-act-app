import { addressInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface financialStatementDataInfoType {    
    spousalAppExists?: string;
    childAppExists?: string;
    situationType?: string[];
}
  
export interface financialStatementSurveyInfoType {
    data: financialStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface incomeAmountsDataInfoType {    
    income: boolean;
    incomeName: string;
    monthlyAmount: number;
    yearlyAmount: number;   
}

export interface incomeInformationDataInfoType {    
    incomeAmounts: incomeAmountsDataInfoType[];    
    nameOfEmployer?: string;
    govSource?: string;
    otherDesc?: string;
}
  
export interface incomeInformationSurveyInfoType {
    data: incomeInformationDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface changesIncomeFSDataInfoType {    
    changesExist?: string;
    expectedIncome?: string;    
    changeReason?: string;
}
  
export interface changesIncomeFSSurveyInfoType {
    data: changesIncomeFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface incomeSummaryAmountsFSDataInfoType {    
    lineNumber: number;
    amountName: string;
    yearlyAmount: number;   
}

export interface incomeSummaryFSDataInfoType {    
    totalIncome: incomeSummaryAmountsFSDataInfoType[]; 
    deduction: incomeSummaryAmountsFSDataInfoType[];
    addition: incomeSummaryAmountsFSDataInfoType[];
    childSupportFund: incomeSummaryAmountsFSDataInfoType[];
    extraExpenses: incomeSummaryAmountsFSDataInfoType[];
    spouseExpenses: incomeSummaryAmountsFSDataInfoType[];
}
  
export interface incomeSummaryFSSurveyInfoType {
    data: incomeSummaryFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disclosureInformationFSDataInfoType {    
    incomeAcknowledgement?: boolean;
    corporation?: string;
    incomeProofAcknowledgement?: boolean;
    otherIncomeProofDocs?: string;
}
  
export interface disclosureInformationFSSurveyInfoType {
    data: disclosureInformationFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface expensesFSDataInfoType {
    amountName: string;
    monthlyAmount: number;
    yearlyAmount: number;
}

export interface expensesFSDataInfoType {    
    housing: expensesFSDataInfoType[]; 
    food: expensesFSDataInfoType[];
    transport: expensesFSDataInfoType[];
    clothing: expensesFSDataInfoType[];
    health: expensesFSDataInfoType[];
    children: expensesFSDataInfoType[];
    miscellaneous: expensesFSDataInfoType[];
    premiums: expensesFSDataInfoType[];
    tax: expensesFSDataInfoType[];
    other: expensesFSDataInfoType[];
    total: expensesFSDataInfoType[];
    otherDesc?: string;
}
  
export interface expensesFSSurveyInfoType {
    data: expensesFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface debtsFSDataInfoType {    
    creditorName?: string;
    reasonForBorrowing?: string;
    balanceOwing?: number;
    id?: number;
}
  
export interface debtsFSSurveyInfoType {
    data: debtsFSDataInfoType[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface assetsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface assetsFSSurveyInfoType {
    data: assetsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface realEstateFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface realEstateFSSurveyInfoType {
    data: realEstateFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface carsBoatsVehiclesFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface carsBoatsVehiclesFSSurveyInfoType {
    data: carsBoatsVehiclesFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface cashAssetsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface cashAssetsFSSurveyInfoType {
    data: cashAssetsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface investmentsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface investmentsFSSurveyInfoType {
    data: investmentsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface loansCreditsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface loansCreditsFSSurveyInfoType {
    data: loansCreditsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherAssetsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface otherAssetsFSSurveyInfoType {
    data: otherAssetsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface dispositionAssetsFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface dispositionAssetsFSSurveyInfoType {
    data: dispositionAssetsFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface incomeOtherPersonHouseholdFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface incomeOtherPersonHouseholdFSSurveyInfoType {
    data: incomeOtherPersonHouseholdFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface contributionTowardExpensesFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface contributionTowardExpensesFSSurveyInfoType {
    data: contributionTowardExpensesFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface undueHardshipFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface undueHardshipFSSurveyInfoType {
    data: undueHardshipFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface unusuallyHighExpensesFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface unusuallyHighExpensesFSSurveyInfoType {
    data: unusuallyHighExpensesFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface legalDutyDependentChildFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface legalDutyDependentChildFSSurveyInfoType {
    data: legalDutyDependentChildFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface legalDutyAnotherPersonFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface legalDutyAnotherPersonFSSurveyInfoType {
    data: legalDutyAnotherPersonFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface otherCircumstancesFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface otherCircumstancesFSSurveyInfoType {
    data: otherCircumstancesFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface affidavitFSDataInfoType {    
    affidavitReason?: string;
    applicationType?: string[];
    applicationTypeComment?: string;
}
  
export interface affidavitFSSurveyInfoType {
    data: affidavitFSDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantFsDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantFsSurveyInfoType {
    data: aboutAffiantFsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingFsSurveyInfoType {
    data: filingFsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingFsDataInfoType {    
    sworn?: string;
}

export interface storyDataInfoType {
    index?: number;
    content?: string;
}

export interface electronicFilingStatementDataInfoType {
    Lawyer?: string;
    ApplicantName?: nameInfoType;
    PartyInfoEfsp?: efspPartyInfoType[];
    OtherPartyInfoEfsp?: efspPartyInfoType[];
    StatementConfirmation?: string[];
}

export interface efspPartyInfoType {
    name: nameInfoType;
}

export interface electronicFilingStatementFsSurveyInfoType {
    data: electronicFilingStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}