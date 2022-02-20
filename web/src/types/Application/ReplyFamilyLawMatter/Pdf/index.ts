
export interface locationInfoDataInfoType {
    courtLocation: string;
    existingFileNumber: string; 
    educationRegistry: boolean;
    familyJusticeRegistry: boolean;
    earlyResolutionRegistry: boolean;
    none: boolean;
}

export interface existingOrdersInfoType {
    existingFlm: boolean; 
    existingPO: boolean;
}

export interface agreeDisagreeInfoType {
    newParentResp: agreeDisagreeDataInfoType; 
    newParentTime: agreeDisagreeDataInfoType;
    newParentTimeConditions: agreeDisagreeDataInfoType;
    existingParentResp: agreeDisagreeDataInfoType; 
    existingParentTime: agreeDisagreeDataInfoType;
    existingParentTimeConditions: agreeDisagreeDataInfoType;
    newChildSupport: agreeDisagreeDataInfoType;
    existingChildSupport: agreeDisagreeDataInfoType;
    newChildContact: agreeDisagreeDataInfoType;
    existingChildContact: agreeDisagreeDataInfoType;
    appointGuardian: agreeDisagreeDataInfoType;
    cancelGuardian: agreeDisagreeDataInfoType;
    newSpouseSupport: agreeDisagreeDataInfoType;
    existingSpouseSupport: agreeDisagreeDataInfoType;
}   

export interface agreeDisagreeDataInfoType {
    opApplied: boolean;
    agree: boolean;
}

export interface schedule1DataInfoType {
    parentResp: parentResponsibilitiesInfoType;
    parentTime: parentTimeInfoType;
    parentTimeConditions: parentTimeConditionsInfoType;
}

export interface parentResponsibilitiesInfoType {
    applying: boolean;    
    disagreeExpl: string;
    askExpl: string;
    bestInterestExpl: string;
}

export interface parentTimeInfoType {
    applying: boolean;    
    disagreeExpl: string;
    askExpl: string;
    bestInterestExpl: string;
}

export interface parentTimeConditionsInfoType {
    applying: boolean;    
    disagreeExpl: string;
    askExpl: string;
    bestInterestExpl: string;    
}

export interface schedule2DataInfoType {
    existingType: string;
    agreeNeedsChanges: boolean;
    agreeBestInterest: boolean;
    disagreeExpl: string;
    noChange: boolean;
    change: boolean;
    changeExpl: string;
    bestInterestExpl: string;   
}

export interface schedule3DataInfoType {
    appType: childSupportApplicantTypeInfoType;    
    disagreeReason: childSupportDisagreeReasonInfoType;    
    filing: boolean;
    calculate: calculationsInfoType;  
}

export interface childSupportApplicantTypeInfoType {
    parent: boolean;
    notParent: boolean;
    standing: boolean;
    parentageTestReq: boolean;
    notStanding: boolean;               
}

export interface childSupportDisagreeReasonInfoType {
    appIncome: boolean;                
    opIncome: boolean;
    opIncomeDesc?: string;
    specialExpense: boolean;
    specialExpenseDesc?: string;
    livingArrangements: boolean;
    livingArrangementsDesc?: string;    
    undueHardship: boolean;
    undueHardshipDetails: undueHardshipDetailsInfoType;
    other: boolean;
    otherDesc?: string;                  
}

export interface undueHardshipDetailsInfoType {
    debt:boolean;
    highExpense: boolean;
    legalDutyOtherPerson: boolean;
    legalDutyOtherChild: boolean;
    otherHardship: boolean;
    otherHardshipDesc?: string;                                  
}

export interface calculationsInfoType {
    attaching: boolean;
    reason: string;                                           
}

export interface childSupportFinancialStatementInfoType {
    required: boolean;
}

export interface schedule4DataInfoType {
    agreeCircumstanceChanges: boolean;
    agreeSetAside: boolean;
    section150: boolean;
    disagreeReason: string;
    continue: boolean;    
    change: boolean;
    changeExpl: string;     
    calc: calculationsInfoType;
    unpaidDetails: childSupportUnpaidInfoType;
}

export interface childSupportUnpaidInfoType {
    agreeAmount: boolean;
    crntDate: string;
    unpaidAmnt: number; 
}

export interface schedule5DataInfoType {    
    abt: aboutContactWithChildDataInfoType; 
    bstIntrst: string;
}

export interface aboutContactWithChildDataInfoType {
    conType: contactTypeInfoType;
    inPrsn: string;
    otherComm: string;
    cond: string;    
}

export interface contactTypeInfoType {
    noContact: boolean;
    inPerson: boolean;
    tel: boolean;
    video: boolean;
    written: boolean;
    other: boolean;
}

export interface schedule6DataInfoType {
    agreeChanges: boolean;   
    agreeBestInterest: boolean;
    disagreeReason: string;
    continue: boolean;
    changeDetails: string;    
    bstIntrst: string;
}

export interface schedule7DataInfoType {
    opNotGuardian: boolean;
    opNotGuardianDesc?: string;
    opNotSuitable: boolean;
    opNotSuitableDesc?: string;
    other: boolean;
    otherDesc?: string;
}

export interface schedule8DataInfoType {
    ableGuardian: boolean;
    ableGuardianDesc?: string;
    suitableGuardian: boolean;
    suitableGuardianDesc?: string;
    noConsent: boolean;
    noConsentDesc?: string;
    other: boolean;
    otherDesc?: string;
    bstIntrst: string;
}

export interface schedule9DataInfoType {
    spouse: boolean;
    disagreeDetails: disagreeSposalSupportDetailsInfoType;   
    payDetails?: payDetailsInfoType;
    calc?: calculationsInfoType;   
    filingForm4: boolean;
}

export interface disagreeSposalSupportDetailsInfoType {
    entitled: boolean;
    entitledDesc?: string;
    correctIncomeClaim: boolean;
    correctEmploymentClaim: boolean;
    correctEmploymentClaimDesc?: string;
    correctOpFinancialClaim: boolean;
    correctOpFinancialClaimDesc?: string;
    correctOpEmploymentClaim: boolean;
    correctOpEmploymentClaimDesc?: string;
    correctOpExpenseClaim: boolean;
    correctOpExpenseClaimDesc?: string;
    other: boolean;
    otherDesc?: string;
}

export interface payDetailsInfoType {
    monthly?: boolean;
    start?: string;
    end?: string;
    rate?: string;
    lumpSum?: boolean;
    lumpSumAmount?: string;
    other?: boolean;
    otherComm?: string;
}

export interface schedule10DataInfoType {
    disagreeDetails: disagreeDetailsExistingSpousalSupportInfoType;
    about: aboutExistingSpousalSupportInfoType;   
    calc: calculationsInfoType;    
    filingForm4: boolean;    
}

export interface disagreeDetailsExistingSpousalSupportInfoType {    
    circumstancesChanged: boolean;
    correctCircumstances: boolean; 
    agreeUnpaidAmount: boolean;
    dateCalculatedUnpaid?: string;
    unpaidAmount?: string;   
}

export interface aboutExistingSpousalSupportInfoType {
    disagreeReason: string;
    continueOrder: boolean;
    changeReason?: string;
}