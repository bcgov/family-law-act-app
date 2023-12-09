import { addressInfoType, fullNameInfoType, nameInfoType, questionInfoType } from "../CommonInformation";

export interface guardianshipAffidavitDataInfoType {    
    haveBrcResults?: string;
    mcfdRecordCheckDate?: string;
    porsRecordCheckDate?: string;
    policeDept?: string;
    criminalRecordCheckDate?: string;
}
  
export interface guardianshipAffidavitSurveyInfoType {
    data: guardianshipAffidavitDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface aboutAffiantGaDataInfoType {    
    ApplicantName?: nameInfoType;
    ApplicantOccupation?: string;
    Dob?: string;
    inCareOf?: string[];
    ApplicantAddress?: addressInfoType;
}

export interface aboutAffiantGaSurveyInfoType {
    data: aboutAffiantGaDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childGaInfoType {
    name?: nameInfoType;
    dob?: string;
    currentGuardiansToChild?: fullNameInfoType[];
    parentsNotGuardiansExist?: string;
    parentsNotGuardians?: fullNameInfoType[];
    relationWithchild?: string;
    lengthOfRelationship?: string;
    relationStartDate?: string;
    currentLiving?: string;
}

export interface childrenDetailsGaSurveyInfoType {
    data: childGaInfoType[];
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface caringForChildGaChildInfoDataInfoType { 
    name?: nameInfoType;
    dob?: string;
    relation?: string;
}

export interface caringForChildGaDataType {
    careDetails?: string;
    parentOtherChild?: string;
}

export interface caringForChildGaDataInfoType {    
    childInfo?: caringForChildGaChildInfoDataInfoType[];
    caringForChildGa?: caringForChildGaDataType;
    
}

export interface caringForChildGaSurveyInfoType {
    data: caringForChildGaDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}


export interface backgroundFamilyViolenceDataInfoType {    
    familyViolenceExists?: string;
    familyViolenceDesc?: string;
}

export interface backgroundFamilyViolenceSurveyInfoType {
    data: backgroundFamilyViolenceDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface orderDataInfoType {    
    orderDate?: string;
}

export interface courtProceedingsDataInfoType {    
    partyNames?: string;
    courtLocation?: string;
    courtOrdersExist?: string;
    courtOrderDates?: orderDataInfoType[];
}

export interface backgroundCivilCourtProceedingsDataInfoType {    
    courtProceedingsExist?: string;
    courtProceedings?: courtProceedingsDataInfoType[];
}

export interface backgroundCivilCourtProceedingsSurveyInfoType {
    data: backgroundCivilCourtProceedingsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface chargesDataInfoType {    
    chargeNature?: string;
    chargeDate?: string;
    chargeCourtLocation?: string;
}

export interface backgroundCriminalHistoryDataInfoType {   
    pastConviction?: string;
    convictionDetails?: string;
    currentlyConvicted?: string; 
    currentCharges?: chargesDataInfoType[];
}

export interface backgroundCriminalHistorySurveyInfoType {
    data: backgroundCriminalHistoryDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}


export interface exhibitsDataInfoType {    
    exhibitIndex?: number;
    exhibitName?: string;
    fileName?: string;
    fileDate?: string;
    partyNames?: string;
    courtLocation?: string;
    itemNo?: number;
}

export interface filingGaSurveyInfoType {
    data: filingGADataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface filingGADataInfoType {    
    sworn?: string;
}

export interface electronicFilingStatementGaDataInfoType {
    Lawyer?: string;
    ApplicantName?: nameInfoType;
    PartyInfoEfsp?: efspPartyInfoType[];
    OtherPartyInfoEfsp?: efspPartyInfoType[];
    StatementConfirmation?: string[];
}

export interface efspPartyInfoType {
    name: nameInfoType;
}
  
export interface electronicFilingStatementGaSurveyInfoType {
    data: electronicFilingStatementGaDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}