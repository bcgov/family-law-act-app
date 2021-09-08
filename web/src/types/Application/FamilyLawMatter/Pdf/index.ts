import { addressInfoType, contactInfoType, lawyerStatementInfoType, nameInfoType } from "../../CommonInformation";

export interface locationInfoDataInfoType {
    courtLocation: string;
    existingFileNumber: string; 
    educationRegistry: boolean;
    familyJusticeRegistry: boolean;
    earlyResolutionRegistry: boolean;
    none: boolean;
}

export interface relationshipBetweenPartiesInfoType {
    description: string; 
    spouses: boolean;
    startDate: string; 
    marriageDate: string; 
    separationDate?: string; 
    nameOfSpouse: string; 
};

export interface existingOrdersInfoType {
    existingFlm: boolean; 
    existingPO: boolean;
}
        

export interface schedule1DataInfoType {
    parentResp: parentResponsibilitiesInfoType;
    parentTime: parentTimeInfoType;
    parentalArr: parentalArrangementInfoType; 
    childBestInterest: string;
}

export interface parentResponsibilitiesInfoType {
    applying: boolean;
    allResp: boolean;
    children: string[];
    allKids: boolean;
    expl: string;
}

export interface parentTimeInfoType {
    applying: boolean;
    desired: string;
    conditionMe: boolean;
    myConditions: string;
    conditionOp: boolean;
    opConditions: string;
    opDesired: string;
}

export interface parentalArrangementInfoType {
    applying: boolean;
    desc: string;    
}

export interface schedule2DataInfoType {
    type: string;
    subType: string; 
    existingDate: string; 
    changesSince: string; 
    parentResp: parentalArrangementInfoType; 
    parentTime: parentalArrangementInfoType; 
    parentCond: parentalArrangementInfoType; 
    parentalArr: parentalArrangementInfoType;    
    childBestInterest: string;
}

export interface schedule3DataInfoType {
    appType: childSupportApplicantTypeInfoType;
    opType: childSupportApplicantTypeInfoType;
    currCond: childSupportCurrentConditionsInfoType;
    opInfo: childSupportOtherPartyDataInfoType;
    desiredSup: childSupportDesiredInfoType;
    calc: calculationsInfoType;
    ndHard: childSupportUndueHardshipInfoType;
    specExp: childSupportExtraordinaryExpensesInfoType;
    finStmnt: childSupportFinancialStatementInfoType;
    applyForCaseManagement: boolean;
}

export interface childSupportApplicantTypeInfoType {
    guardian: boolean;
    standing: boolean;
    other: boolean;
    otherCom?: string;               
}

export interface childSupportCurrentConditionsInfoType {
    splitShared: boolean;                
    timeDesc?: string;
    supArr?: string;                         
}

export interface childSupportOtherPartyDataInfoType {
    facts: boolean; 
    income:  boolean;              
    factsDesc?: string;
    incomeAmt?: string;                                   
}

export interface childSupportDesiredInfoType {
    payor: string;
    applicantPayor: boolean;
    payees: string[];              
    over19: boolean;
    payorErnsHigh: boolean;
    startDate: string;
    reason: string;                                               
}

export interface calculationsInfoType {
    attaching: boolean;
    reason: string;                                           
}

export interface childSupportUndueHardshipInfoType {
    change: boolean;
    reasons: childSupportUndueHardshipReasonInfoType;
    otherCom: string;                                                       
}

export interface childSupportUndueHardshipReasonInfoType {
    excessive: boolean;
    high: boolean;
    another: boolean;
    dependent: boolean;
    other: boolean;
}

export interface childSupportExtraordinaryExpensesInfoType {
    applying: boolean;                                        
}

export interface childSupportFinancialStatementInfoType {
    required: boolean;
}

export interface schedule4DataInfoType {
    abtEx: childSupportAboutExistingInfoType;
    abtOrg: childSupportAboutOriginalInfoType; 
    unpdChSup?: childSupportUnpaidInfoType;
    calc: calculationsInfoType;  
    finStmnt: childSupportFinancialStatementInfoType;
    applyForCaseManagement: boolean;
}

export interface childSupportUnpaidInfoType {
    crntDate: string;   
    unpaid: boolean;
    reduce: boolean;
    reduceAmount: string;
    whyReduceAmount: string;
    paySchd: string;
    monthlyAmount: string;
    amnt: number; 
    otherComm: string;
}

export interface childSupportAboutOriginalInfoType {
    newOrderDesc: string;
    startDate: string;
    startReason: string;
    situationList: string[];
    situation: situationInfoType;
}

export interface childSupportAboutExistingInfoType {
    payor: boolean;
    payee: boolean;
    other: boolean;
    otherComm: string;
    orderDate: string;
    exstngOrdr: boolean;
    fldDrctr: boolean;
    cancelOrdr: boolean;
    changeOrdr: boolean;
    changeList: string[];
    changes: changesinfoType;
    newInfo: string;
    expChangeInfo: string;
    lvngChangeInfo: string;
    otherInfo: string;
    exstngAgrmnt: boolean;
    setAsideAgrmnt: boolean;
    replaceAgrmnt: boolean;
    changesSinceAgrmnt: string;
}

export interface changesinfoType {
    myfin: boolean;
    opfin: boolean;
    spcl: boolean;
    lvng: boolean;
    newInfo: boolean;
    other: boolean;
}

export interface situationInfoType {
    payor: boolean;
    split: boolean;
    over19: boolean;
    partyParentOfOther: boolean;
    payorEarnsHigh: boolean;
    specialClaim: boolean;
    undueHardship: boolean;
    none: boolean;
}

export interface schedule5DataInfoType {
    guardian: boolean;
    abt: aboutContactWithChildDataInfoType; 
    bstIntrst: string;
}

export interface aboutContactWithChildDataInfoType {
    conChList: string[];
    conType: contactTypeInfoType;
    inPrsn: string;
    otherComm: string;
    cond: string;
    lastCont: string;
}

export interface contactTypeInfoType {
    inPerson: boolean;
    tel: boolean;
    video: boolean;
    written: boolean;
    other: boolean;
}

export interface schedule6DataInfoType {
    guardian: boolean;
    date: string;
    order: boolean;
    abtExOrdr: aboutExistingContactWithChildInfoType;
    abtExAgrmnt: aboutExistingContactWithChildInfoType;
    abt: aboutExistingContactOrderInfoType;
    bstIntrst: string;
}

export interface aboutExistingContactOrderInfoType {
    conChList: string[];
    conType: existingContactTypeInfoType;
    inPrsn: string;
    otherComm: string;
    cond: string;
}

export interface existingContactTypeInfoType {
    noContact: boolean;
    inPerson: boolean;
    tel: boolean;
    video: boolean;
    written: boolean;
    other: boolean;
}

export interface aboutExistingContactWithChildInfoType {
    change: string;
    agrmntdiff?: string;
    ordrdiff?: string;
}

export interface schedule7DataInfoType {
    guardian: boolean;
    cancel: boolean;
    abtGuardian: aboutGuardianInfoType, 
    abtCancel: aboutCancelGuardianInfoType; 
    indigenous: boolean;
    nonIndigenous: boolean;
    unKnownAncestry: boolean;
    ancestry: ancestryGuardianshipInfoType;
    becomeGuardian?: boolean;
    criminalCheck?: boolean;
    applyForCaseManagement?: string;
}

export interface aboutGuardianInfoType {
    children: string[];
}

export interface aboutCancelGuardianInfoType {
    bestInterest: string;
    cancelDetails: cancelGuardianshipDetailsInfoType[];
}

export interface ancestryGuardianshipInfoType {
    firstNation: boolean;
    nisga: boolean;
    treatyFirstNation: boolean;
    under12: boolean;
    over12: boolean;
    acknowledge: boolean;
}

export interface cancelGuardianshipDetailsInfoType {
    guardianName?: string;
    childName?: string;
    guardianSince: string;
    relationship?: string;
}

export interface schedule9DataInfoType {
    current?: currentSpousalSupportInfoType;
    incomeInfo?: incomeInfoDataInfoType;
    payDetails?: payDetailsInfoType;
    calc?: calculationsInfoType;
    applyForCaseManagement?: boolean;
}

export interface currentSpousalSupportInfoType {
    adv?: boolean;
    share?: boolean;
    hardship?: boolean;
    bcmIndpndnt?: boolean;
    crntArrngmnt?: string;
    payors?: string[];
}

export interface incomeInfoDataInfoType {
    myIncome?: string;
    knowOpIncome?: boolean;
    opIncome?: string;
    knowFacts?: boolean;
    facts?: string;
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
    current: currentExistingSpousalSupportInfoType;
    orderInfo: existingSpousalSupportOrderInfoDataInfoType;
    agreementInfo: existingSpousalSupportAgreementInfoType;
    payDetails: existingSpousalSupportPayDetails;
    calc: calculationsInfoType;
    about: aboutExistingSpousalSupportInfoType;
    applyForCaseManagement: boolean;    
}

export interface currentExistingSpousalSupportInfoType {
    date: string;
    order: boolean;
    agreement: boolean;
    directors: boolean;
    reviewable: boolean;
    fillForm: boolean;
    description: string;
}

export interface existingSpousalSupportOrderInfoDataInfoType {
    changes: existingSpousalSupportOrderChangesInfoType;
    myEmp: string;
    opEmp: string;
    houseHold: string;
    newInfo: string;
    otherChange: string;
    change: boolean;
    cancel: boolean;
}

export interface existingSpousalSupportOrderChangesInfoType {    
    myfin: boolean;
    opfin: boolean;
    myEmp: boolean;
    opEmp: boolean;
    houseHold: boolean;
    newInfo: boolean;
    other: boolean;
}

export interface existingSpousalSupportAgreementInfoType {
    replace: boolean;
    setAside: boolean;
    reason: string;
}

export interface existingSpousalSupportPayDetails {
    currentDate: string;
    unpaid: boolean;
    unPaidAmount: string;
    reduce: boolean;
    reduceAmount: string;
    reduceReason: string;
    monthly: boolean;               
    rate: string;
    lumpSum: boolean;                
    other: boolean;
    otherComm: string;
}

export interface aboutExistingSpousalSupportInfoType {
    chSinceOrder: string;
}