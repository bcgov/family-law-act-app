import { requiredDocumentsInfoType } from "../Common";
import { nameInfoType, filingLocationSurveyInfoType, otherPartyCommonSurveyInfoType, safetySurveyInfoType, yourInformationSurveyInfoType } from "./CommonInformation";
import { childDetailsSurveyInfoType, flmAdditionalDocsSurveyInfoType, flmBackgroundSurveyInfoType, flmSelectedFormInfoType } from "./FamilyLawMatter";
import { aboutChildSupportChangesSurveyInfoType, aboutChildSupportOrderSurveyInfoType, aboutExistingChildSupportSurveyInfoType, calculatingChildSupportSurveyInfoType, childSupportCurrentArrangementSurveyInfoType, childSupportIncomeEarningSurveyInfoType, childSupportOrderAgreementSurveyInfoType, childSupportSurveyInfoType, specialAndExtraordinaryExpensesSurveyInfoType, undueHardshipSurveyInfoType, unpaidChildSupportSurveyInfoType } from "./FamilyLawMatter/ChildSupport";
import { aboutContactWithChildSurveyInfoType, contactOrderSurveyInfoType, contactWithChildBestInterestOfChildSurveyInfoType, contactWithChildSurveyInfoType } from "./FamilyLawMatter/ContactWithChild";
import { guardianOfChildBestInterestOfChildSurveyInfoType, guardianOfChildSurveyInfoType, indigenousAncestryOfChildSurveyInfoType } from "./FamilyLawMatter/GuardianShip";
import { aboutParentingArrangementsSurveyInfoType, parentalArrangementsSurveyInfoType, parentalResponsibilitiesSurveyInfoType, parentingArrangementChangesSurveyInfoType, parentingArrangementsbestInterestOfChildSurveyInfoType, parentingArrangementsSurveyInfoType, parentingOrderAgreementSurveyInfoType, parentingTimeSurveyInfoType } from "./FamilyLawMatter/ParentingArrangements";
import { aboutExistingSpousalSupportOrderSurveyInfoType, aboutSpousalSupportOrderSurveyInfoType, calculatingSpousalSupportSurveyInfoType, existingSpousalSupportAgreementSurveyInfoType, existingSpousalSupportFinalOrderSurveyInfoType, existingSpousalSupportOrderAgreementSurveyInfoType, spousalSupportIncomeAndEarningPotentialSurveyInfoType, spousalSupportSurveyInfoType, unpaidSpousalSupportSurveyInfoType } from "./FamilyLawMatter/SpousalSupport";
import { aboutPriorityParentingMatterOrderSurveyInfoType, childDataPPMInfoType, ppmBackgroundDataSurveyInfoType, ppmQuestionnaireSurveyInfoType, priorityParentingOrderSurveyInfoType } from "./PriorityParentingMatter";
import { aboutPOSurveyInfoType, allchildrenInfoType, backgroundSurveyInfoType, ExistingOrderInfoType, noContactSurveyInfoType, noGoSurveyInfoType, poFilingLocationSurveyInfoType, poQuestionnaireSurveyInfoType, protectionWhomSurveyInfoType, removeSurveyInfoType, selectedPOOrderInfoType, urgencySurveyInfoType, weaponsSurveyInfoType, yourInformationSurveyPOInfoType, yourStoryInfoType } from "./ProtectionOrder";


//This is what our database saves.
export interface applicationStepOnlyInfoType {
  steps: stepInfoType[];
}

export interface applicationInfoType extends applicationStepOnlyInfoType {   
    id?: string;
    types: string[];
    lastUpdate: Date | null;
    currentStep: number;
    allCompleted: boolean;
    lastPrinted: Date;
    userType: string;
    userName: string;
    userId: string;
    applicantName: string;
    respondentName: string;
    protectedPartyName: string;
    protectedChildName: string;
    applicationLocation: string;
    version: "1.0";
}

export interface stepInfoType {
    id?: string;
    name?: string;
    type: string;
    label: string;
    icon: string;
    result?: resultInfoType;
    //metadata?: object;
    pages?: pageInfoType[];
    currentPage: number;
    active: boolean;
    lastUpdate: Date | null;
  }

  export interface pageInfoType {
    key: string;
    name?: string;
    label: string;
    progress: number;
    active: boolean;
    clickable?: boolean;
  }

  export interface stepResultInfoType {
    step: stepInfoType;
    data: any;
  }

  export interface resultInfoType{

    //______Step 0 GettingStarted
    selectedForms?: string[];
    pathwayCompleted?: pathwayCompletedInfoType;
    applicantName?: nameInfoType;
    respondentsCommon?: nameInfoType[];
    respondents?: nameInfoType[];
    existingOrders?: ExistingOrderInfoType[];    
    requiredDocuments?: requiredDocumentsInfoType;
    respondentsPO?: nameInfoType[];
    protectedPartyName?: nameInfoType;    
    protectedChildName?: allchildrenInfoType[];
    supportingDocumentForm4?: number[];

    //______Step 1 PO____
    aboutPOSurvey?: aboutPOSurveyInfoType;
    backgroundSurvey?: backgroundSurveyInfoType;
    poFilingLocationSurvey?: poFilingLocationSurveyInfoType;
    questionnaireSurvey?: poQuestionnaireSurveyInfoType;
    protectionWhomSurvey?: protectionWhomSurveyInfoType;
    urgencySurvey?: urgencySurveyInfoType;
    yourInformationSurveyPO?: yourInformationSurveyPOInfoType;
    yourStory?: yourStoryInfoType;
    noContactSurvey?: noContactSurveyInfoType;
    noGoSurvey?: noGoSurveyInfoType;
    removeSurvey?: removeSurveyInfoType;
    weaponsSurvey?: weaponsSurveyInfoType;
    otherPartySurvey?: otherPartyCommonSurveyInfoType;
    selectedPOOrder?: selectedPOOrderInfoType;

    //_____Step 2 COMMON_____________
    otherPartyCommonSurvey?: otherPartyCommonSurveyInfoType;
    filingLocationSurvey?: filingLocationSurveyInfoType;
    yourInformationSurvey?: yourInformationSurveyInfoType;
    safetySurvey?: safetySurveyInfoType;
    noticeSurvey?: any;

    //__Step 3 FLM
    flmSelectedForm?: flmSelectedFormInfoType;
    flmBackgroundSurvey?: flmBackgroundSurveyInfoType;
    childData?: childDetailsSurveyInfoType;
    flmAdditionalDocsSurvey?: flmAdditionalDocsSurveyInfoType;
    childBestInterestAcknowledgement?: boolean;

    aboutParentingArrangementsSurvey?: aboutParentingArrangementsSurveyInfoType;
    bestInterestOfChildSurvey?: parentingArrangementsbestInterestOfChildSurveyInfoType;
    parentalArrangementsSurvey?: parentalArrangementsSurveyInfoType;
    parentalResponsibilitiesSurvey?: parentalResponsibilitiesSurveyInfoType;
    parentingArrangementChangesSurvey?: parentingArrangementChangesSurveyInfoType;
    parentingArrangementsSurvey?: parentingArrangementsSurveyInfoType;
    parentingOrderAgreementSurvey?: parentingOrderAgreementSurveyInfoType;
    parentingTimeSurvey?: parentingTimeSurveyInfoType;

    aboutChildSupportChangesSurvey?: aboutChildSupportChangesSurveyInfoType;
    aboutChildSupportOrderSurvey?: aboutChildSupportOrderSurveyInfoType;
    aboutExistingChildSupportSurvey?: aboutExistingChildSupportSurveyInfoType;
    calculatingChildSupportSurvey?: calculatingChildSupportSurveyInfoType;
    childSupportSurvey?: childSupportSurveyInfoType;
    childSupportCurrentArrangementSurvey?: childSupportCurrentArrangementSurveyInfoType;
    childSupportOrderAgreementSurvey?: childSupportOrderAgreementSurveyInfoType;
    childSupportIncomeEarningSurvey?: childSupportIncomeEarningSurveyInfoType;
    specialAndExtraordinaryExpensesSurvey?: specialAndExtraordinaryExpensesSurveyInfoType;
    undueHardshipSurvey?: undueHardshipSurveyInfoType;
    unpaidChildSupportSurvey?: unpaidChildSupportSurveyInfoType;

    aboutContactWithChildSurvey?: aboutContactWithChildSurveyInfoType;
    contactWithChildSurvey?: contactWithChildSurveyInfoType;
    contactWithChildBestInterestOfChildSurvey?: contactWithChildBestInterestOfChildSurveyInfoType;
    contactOrderSurvey?: contactOrderSurveyInfoType;

    GuardianOfChildSurvey?: guardianOfChildSurveyInfoType;
    GuardianOfChildBestInterestOfChildSurvey?: guardianOfChildBestInterestOfChildSurveyInfoType;
    indigenousAncestryOfChildSurvey?: indigenousAncestryOfChildSurveyInfoType;

    aboutExistingSpousalSupportOrderSurvey?: aboutExistingSpousalSupportOrderSurveyInfoType;
    aboutSpousalSupportOrderSurvey?: aboutSpousalSupportOrderSurveyInfoType;
    calculatingSpousalSupportSurvey?: calculatingSpousalSupportSurveyInfoType;
    existingSpousalSupportAgreementSurvey?: existingSpousalSupportAgreementSurveyInfoType;
    existingSpousalSupportFinalOrderSurvey?: existingSpousalSupportFinalOrderSurveyInfoType;
    existingSpousalSupportOrderAgreementSurvey?: existingSpousalSupportOrderAgreementSurveyInfoType;
    spousalSupportSurvey?: spousalSupportSurveyInfoType;
    spousalSupportIncomeAndEarningPotentialSurvey?: spousalSupportIncomeAndEarningPotentialSurveyInfoType;
    unpaidSpousalSupportSurvey?: unpaidSpousalSupportSurveyInfoType;

    //__Step 5 PRIORITY PARENTING
    ppmQuestionnaireSurvey?: ppmQuestionnaireSurveyInfoType;
    priorityParentingOrderSurvey?: priorityParentingOrderSurveyInfoType;
    childDataPPM?: childDataPPMInfoType;
    ppmBackgroundSurvey?: ppmBackgroundDataSurveyInfoType;
    aboutPriorityParentingMatterOrderSurvey?: aboutPriorityParentingMatterOrderSurveyInfoType;

    //__Step 8 SUBMIT
    filingOptions?: any;
    

  }

  export interface pathwayCompletedInfoType { 
    protectionOrder: boolean; 
    familyLawMatter: boolean;
    caseMgmt: boolean; 
    priorityParenting: boolean; 
    childReloc: boolean;
    agreementEnfrc: boolean;
  } 





