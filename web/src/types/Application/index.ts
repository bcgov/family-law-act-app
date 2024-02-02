import { requiredDocumentsInfoType } from "../Common";
import { nameInfoType, filingLocationSurveyInfoType, otherPartyCommonSurveyInfoType, safetyCheckSurveyInfoType, yourInformationSurveyInfoType, noticeSurveyInfoType, filingOptionsSurveyInfoType, otherPartyCommonConfirmationSurveyInfoType, indigenousAncestryOfChildSurveyInfoType } from "./CommonInformation";
import { childDetailsSurveyInfoType, flmAdditionalDocumentsSurveyInfoType, flmBackgroundSurveyInfoType, flmQuestionnaireSurveyInfoType } from "./FamilyLawMatter";
import { aboutChildSupportChangesSurveyInfoType, aboutChildSupportOrderSurveyInfoType, aboutExistingChildSupportSurveyInfoType, calculatingChildSupportSurveyInfoType, childSupportCurrentArrangementsSurveyInfoType, incomeAndEarningPotentialSurveyInfoType, childSupportOrderAgreementSurveyInfoType, childSupportSurveyInfoType, specialAndExtraordinaryExpensesSurveyInfoType, undueHardshipSurveyInfoType, unpaidChildSupportSurveyInfoType } from "./FamilyLawMatter/ChildSupport";
import { aboutContactWithChildOrderSurveyInfoType, contactWithChildOrderSurveyInfoType, contactWithChildBestInterestsOfChildSurveyInfoType, contactWithChildSurveyInfoType } from "./FamilyLawMatter/ContactWithChild";
import { guardianOfChildBestInterestsOfChildSurveyInfoType, guardianOfChildSurveyInfoType } from "./FamilyLawMatter/GuardianShip";
import { aboutParentingArrangementsSurveyInfoType, otherParentingArrangementsSurveyInfoType, parentalResponsibilitiesSurveyInfoType, parentingArrangementChangesSurveyInfoType, parentingArrangementsbestInterestsOfChildSurveyInfoType, parentingArrangementsSurveyInfoType, parentingOrderAgreementSurveyInfoType, parentingTimeSurveyInfoType } from "./FamilyLawMatter/ParentingArrangements";
import { aboutExistingSpousalSupportOrderSurveyInfoType, aboutSpousalSupportOrderSurveyInfoType, calculatingSpousalSupportSurveyInfoType, existingSpousalSupportAgreementSurveyInfoType, existingSpousalSupportFinalOrderSurveyInfoType, existingSpousalSupportOrderAgreementSurveyInfoType, spousalSupportIncomeAndEarningPotentialSurveyInfoType, spousalSupportSurveyInfoType, unpaidSpousalSupportSurveyInfoType } from "./FamilyLawMatter/SpousalSupport";
import { companionAnimalExistingAgreementSurveyInfoType, companionAnimalFactsSurveyInfoType, propertyDivisionCompanionAnimalSurveyInfoType } from "./FamilyLawMatter/CompanionAnimal";
import { relocQuestionnaireSurveyInfoType, relocChildBestInterestSurveyInfoType, relocChildrenInfoSurveyInfoType } from "./RelocationOfChild";
import { aboutPriorityParentingMatterOrderSurveyInfoType, ppmChildrenInfoSurveyInfoType, ppmBackgroundDataSurveyInfoType, ppmQuestionnaireSurveyInfoType, priorityParentingMatterOrderSurveyInfoType, ppmAdditionalDocumentsSurveyInfoType } from "./PriorityParentingMatter";
import { aboutPOSurveyInfoType, allchildrenInfoType, backgroundSurveyInfoType, ExistingOrderInfoType, noContactSurveyInfoType, noGoSurveyInfoType, poFilingLocationSurveyInfoType, poQuestionnaireSurveyInfoType, protectionFromWhomSurveyInfoType, removePersonSurveyInfoType, urgencySurveyInfoType, weaponsFirearmsSurveyInfoType, yourinformationPOSurveyInfoType, yourStorySurveyInfoType } from "./ProtectionOrder";
import { aboutCaseManagementOrderSurveyInfoType, attendanceUsingElectronicCommunicationSurveyInfoType, byConsentSurveyInfoType, changingOrCancellingAnyOtherRequirementSurveyInfoType, changingOrCancellingAServiceOrNoticeSurveyInfoType, cmChildrenInfoSurveyInfoType, cmNoticeSurveyInfoType, cmQuestionnaireSurveyInfoType, contactInformationOtherPartySurveyInfoType, otherPersonsSurveyInfoType, recognizingAnOrderFromOutsideBcSurveyInfoType, requiringAccessToInformationSurveyInfoType, schedulingSurveyInfoType, withoutNoticeOrAttendanceSurveyInfoType } from "./CaseManagement";
import { aboutTheOrderEnforcementSurveyInfoType, determineAnAmountOwingForExpensesSurveyInfoType, detrermineArrearsSurveyInfoType, enforceAgreementOrOrderSurveyInfoType, enforceChangeSetAsideDeterminationSurveyInfoType, enfrcQuestionnaireSurveySurveyInfoType } from "./AgreementEnforcement";
import { aboutWrittenResponseOrderSurveyInfoType, agreeDisagreeSurveyInfoType, wrReplyingToApplicationSurveyInfoType } from "./WrittenResponse";
import { rflmQuestionnaireSurveyInfoType, rflmCounterAppSurveyInfoType, rflmBackgroundSurveyInfoType, rflmChildDetailsSurveyInfoType, rflmAdditionalDocumentsSurveyInfoType } from "./ReplyFamilyLawMatter";
import { replyExistingParentingArrangementsSurveyInfoType, replyNewConditionsParentingTimeSurveyInfoType, replyNewParentalResponsibilitiesSurveyInfoType, replyNewParentingTimeSurveyInfoType } from "./ReplyFamilyLawMatter/ParentingArrangements";
import { disagreeChildSupportSurveyInfoType, disagreeExistingChildSupportSurveyInfoType, relationshipToChildSurveyInfoType, replyExistingChildSupportSurveyInfoType, replyNewChildSupportSurveyInfoType, rflmCalculatingChildSupportSurveyInfoType, rflmUnpaidChildSupportSurveyInfoType } from "./ReplyFamilyLawMatter/ChildSupport";
import { replyNewContactWithChildSurveyInfoType, disagreeContactWithChildSurveyInfoType, replyExistingContactWithChildSurveyInfoType } from "./ReplyFamilyLawMatter/ContactWithChild";
import { replyAppointingGuardianOfChildSurveyInfoType, disagreeAppointingGuardianOfChildSurveyInfoType, disagreeCancellingGuardianOfChildSurveyInfoType, replyCancellingGuardianOfChildSurveyInfoType } from "./ReplyFamilyLawMatter/GuardianShip";
import { disagreeExistingSpouseSupportSurveyInfoType, disagreeSpouseSupportSurveyInfoType, relationshipToOtherPartySurveyInfoType, replyExistingSpouseSupportSurveyInfoType, replyNewSpouseSupportSurveyInfoType, rflmCalculatingSpouseSupportSurveyInfoType, rflmSpouseSupportOrderSurveyInfoType, rflmUnpaidSpouseSupportSurveyInfoType } from "./ReplyFamilyLawMatter/SpousalSupport";
import { completeOtherFormsSurveyInfoType, otherFormsFilingLocationSurveyInfoType, otherFormsSurveyInfoType } from "./OtherFamilyForm";
import { addressChangeNoticeSurveyInfoType, addressChangeSurveyInfoType } from "./AddressChange";
import { noticeDiscontinuanceSurveyInfoType, discontinuanceInformationSurveyInfoType, moreInformationSurveyInfoType } from "./Discontinuance";
import { noticeIntentionProceedSurveyInfoType, otherPartyNprConfirmationSurveyInfoType } from "./IntentionProceed";
import { interimOrderSurveyInfoType, nextAppearanceSurveyInfoType, otherPartyRQSConfirmationSurveyInfoType, partyInformationRQSSurveyInfoType, reasonForSchedulingSurveyInfoType, requestForSchedulingSurveyInfoType } from "./RequestScheduling";
import { aboutTheTrialSurveyInfoType, backgroundTrisSurveyInfoType, disclosureOfInformationSurveyInfoType, issuesForTrialSurveyInfoType, ordersAtTpcSurveyInfoType, peopleAtTrialSurveyInfoType, requirementsAndConsiderationsSurveyInfoType, trialReadinessStatementSurveyInfoType, witnessesSurveyInfoType } from "./TrialReadinessStatement";
import { noticeLawyerChildSurveyInfoType, otherPartyNLCConfirmationSurveyInfoType } from "./LawyerChild";
import { noticeRemoveLawyerChildSurveyInfoType, otherPartyNLCRConfirmationSurveyInfoType } from "./NoticeRemoveLawyerChild";
import { noticeLawyerPartySurveyInfoType, otherPartyNLPConfirmationSurveyInfoType } from "./LawyerParty";
import { noticeRemoveLawyerPartySurveyInfoType, otherPartyNLPRConfirmationSurveyInfoType } from "./NoticeRemoveLawyerParty";
import { aboutAffiantSurveyInfoType, affidavitSurveyInfoType, filingAffSurveyInfoType, yourStoryAffSurveyInfoType, electronicFilingStatementAffSurveyInfoType} from "./Affidavit";
import { aboutAffiantGaSurveyInfoType, backgroundCivilCourtProceedingsSurveyInfoType, backgroundCriminalHistorySurveyInfoType, backgroundFamilyViolenceSurveyInfoType, caringForChildGaSurveyInfoType, childrenDetailsGaSurveyInfoType, electronicFilingStatementGaSurveyInfoType, exhibitsDataInfoType, filingGaSurveyInfoType, guardianshipAffidavitSurveyInfoType } from "./GuardianshipAffidavit";
import { animalRelationshipToOtherPartySurveyInfoType, disagreeExistingPropertyDivisionOrderSurveyInfoType, disagreePropertyDivisionSurveyInfoType, propertyDivisionOrderSurveyInfoType, replyExistingPropertyDivisionSurveyInfoType, replyNewPropertyDivisionSurveyInfoType } from "./ReplyFamilyLawMatter/CompanionAnimal";
import { aboutAffiantApspSurveyInfoType, electronicFilingStatementApspSurveyInfoType, aboutServiceApspSurveyInfoType } from "./AffidavitPersonalServicePO";
import { aboutAffiantApsSurveyInfoType, aboutServiceApsSurveyInfoType, electronicFilingStatementApsSurveyInfoType} from "./AffidavitPersonalService";


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
    rejectedPathway: boolean;
    rejectedFileNumber?: string;
    rejectedFormsList?: any[];
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
    selectedActivity?: string[];
    otherForms?: boolean;
    selectedReplyApplications?: string[];
    selectedForms?: string[];
    selectedFlmOption?: string;
    selectedReplyForms?: string[];
    pathwayCompleted?: pathwayCompletedInfoType;
    applicantName?: nameInfoType;
    respondentsCommon?: nameInfoType[];
    respondents?: nameInfoType[];
    existingOrders?: ExistingOrderInfoType[];   
    submittedPdfList?: string[]; 
    requiredDocuments?: requiredDocumentsInfoType;
    respondentsPO?: nameInfoType[];
    protectedPartyName?: nameInfoType;    
    protectedChildName?: allchildrenInfoType[];
    supportingDocumentForm4?: number[];
    affEfsDocuments?: electronicFilingDocumentInfoType[];
    gaEfsDocuments?: electronicFilingDocumentInfoType[];
    apsEfsDocuments?: electronicFilingDocumentInfoType[];
    apspEfsDocuments?: electronicFilingDocumentInfoType[];
    gaExhibitList?: exhibitsDataInfoType[];

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

    //__Step 3 RFLM
    rflmQuestionnaireSurvey?: rflmQuestionnaireSurveyInfoType;
    rflmCounterAppSurvey?: rflmCounterAppSurveyInfoType;
    rflmBackgroundSurvey?: rflmBackgroundSurveyInfoType;
    selectedCounterApplications?: string[];
    correctChildInfo?: string;
    rflmChildBestInterestAcknowledgement?: boolean;
    replyNewParentalResponsibilitiesSurvey?: replyNewParentalResponsibilitiesSurveyInfoType;
    replyNewParentingTimeSurvey?: replyNewParentingTimeSurveyInfoType;
    replyNewConditionsParentingTimeSurvey?: replyNewConditionsParentingTimeSurveyInfoType;
    replyExistingParentingArrangementsSurvey?: replyExistingParentingArrangementsSurveyInfoType;
    replyNewChildSupportSurvey?: replyNewChildSupportSurveyInfoType;
    relationshipToChildSurvey?: relationshipToChildSurveyInfoType;
    disagreeChildSupportSurvey?: disagreeChildSupportSurveyInfoType;
    rflmCalculatingChildSupportSurvey?: rflmCalculatingChildSupportSurveyInfoType;

    replyExistingChildSupportSurvey?: replyExistingChildSupportSurveyInfoType;
    rflmUnpaidChildSupportSurvey?: rflmUnpaidChildSupportSurveyInfoType;
    disagreeExistingChildSupportSurvey?: disagreeExistingChildSupportSurveyInfoType;

    replyNewContactWithChildSurvey?: replyNewContactWithChildSurveyInfoType;
    disagreeContactWithChildSurvey?: disagreeContactWithChildSurveyInfoType;
    replyExistingContactWithChildSurvey?: replyExistingContactWithChildSurveyInfoType;

    replyAppointingGuardianOfChildSurvey?: replyAppointingGuardianOfChildSurveyInfoType;
    disagreeAppointingGuardianOfChildSurvey?: disagreeAppointingGuardianOfChildSurveyInfoType;

    replyCancellingGuardianOfChildSurvey?: replyCancellingGuardianOfChildSurveyInfoType;
    disagreeCancellingGuardianOfChildSurvey?: disagreeCancellingGuardianOfChildSurveyInfoType;
    
    replyNewSpouseSupportSurvey?: replyNewSpouseSupportSurveyInfoType;
    relationshipToOtherPartySurvey?: relationshipToOtherPartySurveyInfoType;
    disagreeSpouseSupportSurvey?: disagreeSpouseSupportSurveyInfoType;
    rflmSpouseSupportOrderSurvey?: rflmSpouseSupportOrderSurveyInfoType;
    rflmCalculatingSpouseSupportSurvey?: rflmCalculatingSpouseSupportSurveyInfoType;

    replyExistingSpouseSupportSurvey?: replyExistingSpouseSupportSurveyInfoType;
    rflmUnpaidSpouseSupportSurvey?: rflmUnpaidSpouseSupportSurveyInfoType;
    disagreeExistingSpouseSupportSurvey?: disagreeExistingSpouseSupportSurveyInfoType; 

    replyNewPropertyDivisionSurvey?: replyNewPropertyDivisionSurveyInfoType;
    animalRelationshipToOtherPartySurvey?: animalRelationshipToOtherPartySurveyInfoType;
    disagreePropertyDivisionSurvey?: disagreePropertyDivisionSurveyInfoType;
    propertyDivisionOrderSurvey?: propertyDivisionOrderSurveyInfoType;
    replyExistingPropertyDivisionSurvey?: replyExistingPropertyDivisionSurveyInfoType;
    disagreeExistingPropertyDivisionOrderSurvey?: disagreeExistingPropertyDivisionOrderSurveyInfoType;

    rflmAdditionalDocumentsSurvey?: rflmAdditionalDocumentsSurveyInfoType;

    //_____Step 4   WR_____________
    wrReplyingToApplicationSurvey?: wrReplyingToApplicationSurveyInfoType;
    agreeDisagreeSurvey?: agreeDisagreeSurveyInfoType;
    aboutWrittenResponseOrderSurvey?: aboutWrittenResponseOrderSurveyInfoType;   
    
    //__Step 5 FLM
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

    propertyDivisionCompanionAnimalSurvey?: propertyDivisionCompanionAnimalSurveyInfoType;    
    companionAnimalFactsSurvey?: companionAnimalFactsSurveyInfoType;
    companionAnimalExistingAgreementSurvey?: companionAnimalExistingAgreementSurveyInfoType;

    //__Step 6 CASE MANAGEMENT

    cmQuestionnaireSurvey?: cmQuestionnaireSurveyInfoType;
    otherPersonsSurvey?: otherPersonsSurveyInfoType;
    withoutNoticeOrAttendanceSurvey?: withoutNoticeOrAttendanceSurveyInfoType;
    byConsentSurvey?: byConsentSurveyInfoType;
    cmNoticeSurvey?: cmNoticeSurveyInfoType;
    schedulingSurvey?: schedulingSurveyInfoType;
    aboutCaseManagementOrderSurvey?: aboutCaseManagementOrderSurveyInfoType;
    cmChildrenInfoSurvey?: cmChildrenInfoSurveyInfoType;
    childRelatedTypeSurvey?: string;
    attendanceUsingElectronicCommunicationSurvey?: attendanceUsingElectronicCommunicationSurveyInfoType;

    changingOrCancellingAServiceOrNoticeSurvey?: changingOrCancellingAServiceOrNoticeSurveyInfoType;
    changingOrCancellingAnyOtherRequirementSurvey?: changingOrCancellingAnyOtherRequirementSurveyInfoType;
    requiringAccessToInformationSurvey?: requiringAccessToInformationSurveyInfoType;
    recognizingAnOrderFromOutsideBcSurvey?: recognizingAnOrderFromOutsideBcSurveyInfoType;
    contactInformationOtherPartySurvey?: contactInformationOtherPartySurveyInfoType;   

    //__Step 7 PRIORITY PARENTING
    ppmQuestionnaireSurvey?: ppmQuestionnaireSurveyInfoType;
    priorityParentingMatterOrderSurvey?: priorityParentingMatterOrderSurveyInfoType;
    ppmChildrenInfoSurvey?: ppmChildrenInfoSurveyInfoType;
    ppmBackgroundSurvey?: ppmBackgroundDataSurveyInfoType;
    aboutPriorityParentingMatterOrderSurvey?: aboutPriorityParentingMatterOrderSurveyInfoType;

    ppmIndigenousAncestryOfChildSurvey?: indigenousAncestryOfChildSurveyInfoType;
    ppmAdditionalDocumentsSurvey?: ppmAdditionalDocumentsSurveyInfoType;

    //__Step 8 RELOCATION OF CHILD
    relocQuestionnaireSurvey?: relocQuestionnaireSurveyInfoType;
    relocChildrenInfoSurvey?: relocChildrenInfoSurveyInfoType;
    relocChildBestInterestInfoSurvey?: relocChildBestInterestSurveyInfoType;

    //__Step 9 AGREEMENT ENFORCEMENT
    enfrcQuestionnaireSurvey?: enfrcQuestionnaireSurveySurveyInfoType;
    determineAnAmountOwingForExpensesSurvey?: determineAnAmountOwingForExpensesSurveyInfoType;
    enforceAgreementOrOrderSurvey?: enforceAgreementOrOrderSurveyInfoType;
    enforceChangeSetAsideDeterminationSurvey?: enforceChangeSetAsideDeterminationSurveyInfoType;
    detrermineArrearsSurvey?: detrermineArrearsSurveyInfoType;
    aboutTheOrderEnforcementSurvey?: aboutTheOrderEnforcementSurveyInfoType;

    //__Step 10 OTHER FORMS
    otherFormsSurvey?: otherFormsSurveyInfoType;
    completeOtherFormsSurvey?: completeOtherFormsSurveyInfoType;
    otherFormsFilingLocationSurvey?: otherFormsFilingLocationSurveyInfoType;

    //_____Step 11 ADDRESS CHANGE_____________    
    addressChangeSurvey?: addressChangeSurveyInfoType;    
    addressChangeNoticeSurvey?: addressChangeNoticeSurveyInfoType;

    //_____Step 12 NOTICE OF DISCONTINUANCE_____________    
    noticeDiscontinuanceSurvey?: noticeDiscontinuanceSurveyInfoType;    
    discontinuanceInformationSurvey?: discontinuanceInformationSurveyInfoType;
    moreInformationSurvey?: moreInformationSurveyInfoType;

    //_____Step 13 NOTICE OF INTENTION TO PROCEED_____________    
    noticeIntentionProceedSurvey?: noticeIntentionProceedSurveyInfoType;    
    yourInformationNprSurvey?: yourInformationSurveyInfoType; 
    otherPartyNprSurvey?: otherPartyCommonSurveyInfoType;
    otherPartyNprConfirmationSurvey? : otherPartyNprConfirmationSurveyInfoType; 
         
    
    //_____Step 14 REQUEST FOR SCHEDULING_____________    
    requestForSchedulingSurvey?: requestForSchedulingSurveyInfoType;
    reasonForSchedulingSurvey?: reasonForSchedulingSurveyInfoType;
    interimOrderSurvey?: interimOrderSurveyInfoType;    
    nextAppearanceSurvey?: nextAppearanceSurveyInfoType;
    partyInformationRQSSurvey?: partyInformationRQSSurveyInfoType;
    otherPartyRQSConfirmationSurvey? : otherPartyRQSConfirmationSurveyInfoType;

    //_____Step 15 TRIAL READINESS STATEMENT_____________ 
    trialReadinessStatementSurvey?: trialReadinessStatementSurveyInfoType;
    peopleAtTrialSurvey?: peopleAtTrialSurveyInfoType;
    issuesForTrialSurvey?: issuesForTrialSurveyInfoType;
    backgroundTrisSurvey?: backgroundTrisSurveyInfoType;
    disclosureOfInformationSurvey?: disclosureOfInformationSurveyInfoType;
    witnessesSurvey?: witnessesSurveyInfoType;
    requirementsAndConsiderationsSurvey?: requirementsAndConsiderationsSurveyInfoType;
    aboutTheTrialSurvey?: aboutTheTrialSurveyInfoType;
    ordersAtTpcSurvey?: ordersAtTpcSurveyInfoType; 

    //_____Step 16 NOTICE OF LAWYER FOR CHILD_____________    
    noticeLawyerChildSurvey?: noticeLawyerChildSurveyInfoType; 
    otherPartyNLCConfirmationSurvey? : otherPartyNLCConfirmationSurveyInfoType;       

    //_____Step 17 NOTICE OF REMOVAL OF LAWYER FOR CHILD_____________    
    noticeRemoveLawyerChildSurvey?: noticeRemoveLawyerChildSurveyInfoType;
    otherPartyNLCRConfirmationSurvey? : otherPartyNLCRConfirmationSurveyInfoType;

    
    //_____Step 18 NOTICE OF LAWYER FOR PARTY_____________    
    noticeLawyerPartySurvey?: noticeLawyerPartySurveyInfoType;
    otherPartyNLPConfirmationSurvey? : otherPartyNLPConfirmationSurveyInfoType;   


    //_____Step 19 NOTICE OF REMOVAL OF LAWYER FOR PARTY_____________    
    noticeRemoveLawyerPartySurvey?: noticeRemoveLawyerPartySurveyInfoType; 
    otherPartyNLPRConfirmationSurvey? : otherPartyNLPRConfirmationSurveyInfoType;

    //_____Step 20 AFFIDAVIT_____________    
    affidavitSurvey?: affidavitSurveyInfoType;    
    aboutAffiantSurvey?: aboutAffiantSurveyInfoType;
    yourStoryAffSurvey?: yourStoryAffSurveyInfoType;
    filingAffSurvey?: filingAffSurveyInfoType;
    electronicFilingStatementAffSurvey?: electronicFilingStatementAffSurveyInfoType;

    //_____Step 22 GUARDIANSHIP AFFIDAVIT_____________    
    guardianshipAffidavitSurvey?: guardianshipAffidavitSurveyInfoType;   
    aboutAffiantGaSurvey?: aboutAffiantGaSurveyInfoType; 
    childrenDetailsGaSurvey?: childrenDetailsGaSurveyInfoType; 
    caringForChildGaSurvey?: caringForChildGaSurveyInfoType; 
    backgroundFamilyViolenceSurvey?: backgroundFamilyViolenceSurveyInfoType;
    backgroundCivilCourtProceedingsSurvey?: backgroundCivilCourtProceedingsSurveyInfoType;
    backgroundCriminalHistorySurvey?: backgroundCriminalHistorySurveyInfoType;    
    filingGaSurvey?: filingGaSurveyInfoType;
    electronicFilingStatementGaSurvey?: electronicFilingStatementGaSurveyInfoType;

    //_____Step 23 AFFIDAVIT OF PERSONAL SERVICE_____________    
    aboutAffiantApsSurvey?: aboutAffiantApsSurveyInfoType;
    aboutServiceApsSurvey?: aboutServiceApsSurveyInfoType;
    electronicFilingStatementApsSurvey?: electronicFilingStatementApsSurveyInfoType;

    //_____Step 25 AFFIDAVIT OF PERSONAL SERVICE PO_____________    
    aboutAffiantApspSurvey?: aboutAffiantApspSurveyInfoType;
    aboutServiceApspSurvey?: aboutServiceApspSurveyInfoType;
    electronicFilingStatementApspSurvey?: electronicFilingStatementApspSurveyInfoType;

    // //_____Step 26 CERTIFICATE OF SERVICE_____________    
    // certificateOfServiceSurvey?: certificateOfServiceSurveyInfoType;    
    // aboutAffiantCsvSurvey?: aboutAffiantCsvpSurveyInfoType;
    // yourStoryCsvSurvey?: yourStoryCsvSurveyInfoType;
    // filingCsvSurvey?: filingCsvSurveyInfoType;
    // electronicFilingStatementCsvSurvey?: electronicFilingStatementCsvSurveyInfoType;
    
    //__Step 27 SUBMIT
    filingOptionsSurvey?: filingOptionsSurveyInfoType;
  }

  export interface pathwayCompletedInfoType { 
    protectionOrder?: boolean;
    replyFlm?: boolean;
    writtenResponse?: boolean;
    replyCounterApplication?: boolean;    
    familyLawMatter?: boolean;
    caseMgmt?: boolean; 
    priorityParenting?: boolean; 
    childReloc?: boolean;
    agreementEnfrc?: boolean;
    other?: boolean;
    noticeOfAddressChange?: boolean;
    noticeDiscontinuance?: boolean;
    noticeIntentionProceed?: boolean;   
    requestScheduling?: boolean;
    trialReadinessStatement?: boolean;
    noticeLawyerChild?: boolean;
    noticeRemoveLawyerChild?: boolean;
    noticeLawyerParty?: boolean;
    noticeRemoveLawyerParty?: boolean; 
    affidavit?: boolean;
    guardianshipAffidavit?: boolean;
    affidavitPersonalService?: boolean;
    affidavitPersonalServicePO?: boolean;
  }

  export interface electronicFilingDocumentInfoType {
    efsApplicantName?: nameInfoType;
    documentName?: string;
  }