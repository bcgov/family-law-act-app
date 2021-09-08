import { requiredDocumentsInfoType } from "../Common";
import { nameInfoType, filingLocationSurveyInfoType, otherPartyCommonSurveyInfoType, safetyCheckSurveyInfoType, yourInformationSurveyInfoType, noticeSurveyInfoType, filingOptionsSurveyInfoType, otherPartyCommonConfirmationSurveyInfoType } from "./CommonInformation";
import { childDetailsSurveyInfoType, flmAdditionalDocumentsSurveyInfoType, flmBackgroundSurveyInfoType, flmQuestionnaireSurveyInfoType } from "./FamilyLawMatter";
import { aboutChildSupportChangesSurveyInfoType, aboutChildSupportOrderSurveyInfoType, aboutExistingChildSupportSurveyInfoType, calculatingChildSupportSurveyInfoType, childSupportCurrentArrangementsSurveyInfoType, incomeAndEarningPotentialSurveyInfoType, childSupportOrderAgreementSurveyInfoType, childSupportSurveyInfoType, specialAndExtraordinaryExpensesSurveyInfoType, undueHardshipSurveyInfoType, unpaidChildSupportSurveyInfoType } from "./FamilyLawMatter/ChildSupport";
import { aboutContactWithChildOrderSurveyInfoType, contactWithChildOrderSurveyInfoType, contactWithChildBestInterestsOfChildSurveyInfoType, contactWithChildSurveyInfoType } from "./FamilyLawMatter/ContactWithChild";
import { guardianOfChildBestInterestsOfChildSurveyInfoType, guardianOfChildSurveyInfoType, indigenousAncestryOfChildSurveyInfoType } from "./FamilyLawMatter/GuardianShip";
import { aboutParentingArrangementsSurveyInfoType, otherParentingArrangementsSurveyInfoType, parentalResponsibilitiesSurveyInfoType, parentingArrangementChangesSurveyInfoType, parentingArrangementsbestInterestsOfChildSurveyInfoType, parentingArrangementsSurveyInfoType, parentingOrderAgreementSurveyInfoType, parentingTimeSurveyInfoType } from "./FamilyLawMatter/ParentingArrangements";
import { aboutExistingSpousalSupportOrderSurveyInfoType, aboutSpousalSupportOrderSurveyInfoType, calculatingSpousalSupportSurveyInfoType, existingSpousalSupportAgreementSurveyInfoType, existingSpousalSupportFinalOrderSurveyInfoType, existingSpousalSupportOrderAgreementSurveyInfoType, spousalSupportIncomeAndEarningPotentialSurveyInfoType, spousalSupportSurveyInfoType, unpaidSpousalSupportSurveyInfoType } from "./FamilyLawMatter/SpousalSupport";
import { relocQuestionnaireSurveyInfoType, relocChildBestInterestSurveyInfoType, relocChildrenInfoSurveyInfoType } from "./RelocationOfChild";
import { aboutPriorityParentingMatterOrderSurveyInfoType, ppmChildrenInfoSurveyInfoType, ppmBackgroundDataSurveyInfoType, ppmQuestionnaireSurveyInfoType, priorityParentingMatterOrderSurveyInfoType } from "./PriorityParentingMatter";
import { aboutPOSurveyInfoType, allchildrenInfoType, backgroundSurveyInfoType, ExistingOrderInfoType, noContactSurveyInfoType, noGoSurveyInfoType, poFilingLocationSurveyInfoType, poQuestionnaireSurveyInfoType, protectionFromWhomSurveyInfoType, removePersonSurveyInfoType, urgencySurveyInfoType, weaponsFirearmsSurveyInfoType, yourinformationPOSurveyInfoType, yourStorySurveyInfoType } from "./ProtectionOrder";
import { aboutCaseManagementOrderSurveyInfoType, attendanceUsingElectronicCommunicationSurveyInfoType, byConsentSurveyInfoType, changingOrCancellingAnyOtherRequirementSurveyInfoType, changingOrCancellingAServiceOrNoticeSurveyInfoType, cmChildrenInfoSurveyInfoType, cmNoticeSurveyInfoType, cmQuestionnaireSurveyInfoType, contactInformationOtherPartySurveyInfoType, otherPersonsSurveyInfoType, recognizingAnOrderFromOutsideBcSurveyInfoType, requiringAccessToInformationSurveyInfoType, schedulingSurveyInfoType, withoutNoticeOrAttendanceSurveyInfoType } from "./CaseManagement";
import { aboutTheOrderEnforcementSurveyInfoType, determineAnAmountOwingForExpensesSurveyInfoType, detrermineArrearsSurveyInfoType, enforceAgreementOrOrderSurveyInfoType, enforceChangeSetAsideDeterminationSurveyInfoType, enfrcQuestionnaireSurveySurveyInfoType } from "./AgreementEnforcement";


//This is what our database saves.
export interface applicationStepOnlyInfoType {
  steps: stepInfoType[];
  types_version?: "1.2.1";
}

export interface applicationInfoType extends applicationStepOnlyInfoType {   
    id?: string;
    types: string[];
    lastUpdate?: Date | null;
    currentStep?: number | string;
    allCompleted: boolean;
    lastPrinted: Date;
    userType: string;
    userName: string;
    userId: string;
    applicantName: string;
    respondentName: string;
    protectedPartyName: nameInfoType;
    protectedChildName: allchildrenInfoType[];
    applicationLocation: string;
    version: string;
}

export interface stepInfoType {
    id?: string;
    name?: string;
    type: string;
    label: string;
    icon: string;
    result?: resultInfoType;    
    pages?: pageInfoType[];
    currentPage?: number | string;
    active: boolean;
    lastUpdate?: Date | null;
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
    aboutSurvey?: aboutPOSurveyInfoType;
    backgroundSurvey?: backgroundSurveyInfoType;
    poFilingLocationSurvey?: poFilingLocationSurveyInfoType;
    poQuestionnaireSurvey?: poQuestionnaireSurveyInfoType;
    protectionFromWhomSurvey?: protectionFromWhomSurveyInfoType;
    urgencySurvey?: urgencySurveyInfoType;
    yourinformationPOSurvey?: yourinformationPOSurveyInfoType;
    yourStorySurvey?: yourStorySurveyInfoType;
    noContactSurvey?: noContactSurveyInfoType;
    noGoSurvey?: noGoSurveyInfoType;
    removePersonSurvey?: removePersonSurveyInfoType;
    weaponsFirearmsSurvey?: weaponsFirearmsSurveyInfoType;
    otherPartySurvey?: otherPartyCommonSurveyInfoType;

    //_____Step 2 COMMON_____________
    otherPartyCommonSurvey?: otherPartyCommonSurveyInfoType;
    filingLocationSurvey?: filingLocationSurveyInfoType;
    yourInformationSurvey?: yourInformationSurveyInfoType;
    safetyCheckSurvey?: safetyCheckSurveyInfoType;
    noticeSurvey?: noticeSurveyInfoType;
    
    otherPartyCommonConfirmationSurvey? : otherPartyCommonConfirmationSurveyInfoType;
    

    //__Step 3 FLM
    flmQuestionnaireSurvey?: flmQuestionnaireSurveyInfoType;
    flmBackgroundSurvey?: flmBackgroundSurveyInfoType;
    childrenInfoSurvey?: childDetailsSurveyInfoType;
    flmAdditionalDocumentsSurvey?: flmAdditionalDocumentsSurveyInfoType;
    childBestInterestAcknowledgement?: boolean;

    aboutParentingArrangementsSurvey?: aboutParentingArrangementsSurveyInfoType;
    bestInterestsOfChildSurvey?: parentingArrangementsbestInterestsOfChildSurveyInfoType;
    otherParentingArrangementsSurvey?: otherParentingArrangementsSurveyInfoType;
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
    childSupportCurrentArrangementsSurvey?: childSupportCurrentArrangementsSurveyInfoType;
    childSupportOrderAgreementSurvey?: childSupportOrderAgreementSurveyInfoType;
    incomeAndEarningPotentialSurvey?: incomeAndEarningPotentialSurveyInfoType;
    specialAndExtraordinaryExpensesSurvey?: specialAndExtraordinaryExpensesSurveyInfoType;
    undueHardshipSurvey?: undueHardshipSurveyInfoType;
    unpaidChildSupportSurvey?: unpaidChildSupportSurveyInfoType;

    aboutContactWithChildOrderSurvey?: aboutContactWithChildOrderSurveyInfoType;
    contactWithChildSurvey?: contactWithChildSurveyInfoType;
    contactWithChildBestInterestsOfChildSurvey?: contactWithChildBestInterestsOfChildSurveyInfoType;
    contactWithChildOrderSurvey?: contactWithChildOrderSurveyInfoType;

    guardianOfChildSurvey?: guardianOfChildSurveyInfoType;
    guardianOfChildBestInterestsOfChildSurvey?: guardianOfChildBestInterestsOfChildSurveyInfoType;
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

    //__Step 4 CASE MANAGEMENT

    cmQuestionnaireSurvey?: cmQuestionnaireSurveyInfoType;
    otherPersonsSurvey?: otherPersonsSurveyInfoType;
    withoutNoticeOrAttendanceSurvey?: withoutNoticeOrAttendanceSurveyInfoType;
    byConsentSurvey?: byConsentSurveyInfoType;
    cmNoticeSurvey?: cmNoticeSurveyInfoType;
    schedulingSurvey?: schedulingSurveyInfoType;
    aboutCaseManagementOrderSurvey?: aboutCaseManagementOrderSurveyInfoType;
    cmChildrenInfoSurvey?: cmChildrenInfoSurveyInfoType;
    childRelatedTypeSurvey?:string;
    attendanceUsingElectronicCommunicationSurvey?: attendanceUsingElectronicCommunicationSurveyInfoType;

    changingOrCancellingAServiceOrNoticeSurvey?: changingOrCancellingAServiceOrNoticeSurveyInfoType;
    changingOrCancellingAnyOtherRequirementSurvey?: changingOrCancellingAnyOtherRequirementSurveyInfoType;
    requiringAccessToInformationSurvey?: requiringAccessToInformationSurveyInfoType;
    recognizingAnOrderFromOutsideBcSurvey?: recognizingAnOrderFromOutsideBcSurveyInfoType;
    contactInformationOtherPartySurvey?: contactInformationOtherPartySurveyInfoType;   

    //__Step 5 PRIORITY PARENTING
    ppmQuestionnaireSurvey?: ppmQuestionnaireSurveyInfoType;
    priorityParentingMatterOrderSurvey?: priorityParentingMatterOrderSurveyInfoType;
    ppmChildrenInfoSurvey?: ppmChildrenInfoSurveyInfoType;
    ppmBackgroundSurvey?: ppmBackgroundDataSurveyInfoType;
    aboutPriorityParentingMatterOrderSurvey?: aboutPriorityParentingMatterOrderSurveyInfoType;

    //__Step 6 RELOCATION OF CHILD
    relocQuestionnaireSurvey?: relocQuestionnaireSurveyInfoType;
    relocChildrenInfoSurvey?: relocChildrenInfoSurveyInfoType;
    relocChildBestInterestInfoSurvey?: relocChildBestInterestSurveyInfoType;

    //__Step 7 AGREEMENT ENFORCEMENT
    enfrcQuestionnaireSurvey?: enfrcQuestionnaireSurveySurveyInfoType;
    determineAnAmountOwingForExpensesSurvey?: determineAnAmountOwingForExpensesSurveyInfoType;
    enforceAgreementOrOrderSurvey?: enforceAgreementOrOrderSurveyInfoType;
    enforceChangeSetAsideDeterminationSurvey?: enforceChangeSetAsideDeterminationSurveyInfoType;
    detrermineArrearsSurvey?: detrermineArrearsSurveyInfoType;
    aboutTheOrderEnforcementSurvey?: aboutTheOrderEnforcementSurveyInfoType;

    //__Step 8 SUBMIT
    filingOptionsSurvey?: filingOptionsSurveyInfoType;
  }

  export interface pathwayCompletedInfoType { 
    protectionOrder?: boolean; 
    familyLawMatter?: boolean;
    caseMgmt?: boolean; 
    priorityParenting?: boolean; 
    childReloc?: boolean;
    agreementEnfrc?: boolean;
  } 





