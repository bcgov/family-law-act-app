import { filingLocationSurveyInfoType, otherPartyCommonSurveyInfoType, yourInformationSurveyInfoType } from "./CommonInformation";
import { backgroundSurveyInfoType, noContactSurveyInfoType, noGoSurveyInfoType, poFilingLocationSurveyInfoType, poQuestionnaireSurveyInfoType, protectionWhomSurveyInfoType, removeSurveyInfoType, urgencySurveyInfoType, weaponsSurveyInfoType, yourInformationSurveyPOInfoType, yourStoryInfoType } from "./ProtectionOrder";

export interface applicationInfoType {   
    id?: string;
    types: string[];
    steps: stepInfoType[];
    lastUpdate: Date;
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
}

export interface stepInfoType {
    id?: string;
    type: string;
    label: string;
    icon: string;
    result?: resultInfoType;
    metadata?: object;
    pages?: pageInfoType[];
    currentPage: number;
    active: boolean;
    lastUpdate: Date;
  }

  export interface pageInfoType {
    key: string;
    label: string;
    progress: number;
    active: boolean;
    clickable: boolean;
  }

  export interface stepResultInfoType {
    step: stepInfoType;
    data: any;
  }

  export interface resultInfoType{
    flmSelectedForm?: any;
    flmBackgroundSurvey?: any;
    childData?: any;
    flmAdditionalDocsSurvey?: any;

    aboutParentingArrangementsSurvey?: any;
    bestInterestOfChildSurvey?: any;
    parentalArrangementsSurvey?: any;
    parentalResponsibilitiesSurvey?: any;
    parentingArrangementChangesSurvey?: any;
    parentingArrangementsSurvey?: any;
    parentingOrderAgreementSurvey?: any;
    parentingTimeSurvey?: any;

    aboutChildSupportChangesSurvey?: any;
    aboutChildSupportOrderSurvey?: any;
    aboutExistingChildSupportSurvey?: any;
    calculatingChildSupportSurvey?: any;
    childSupportSurvey?: any;
    childSupportCurrentArrangementSurvey?: any;
    childSupportOrderAgreementSurvey?: any;
    childSupportIncomeEarningSurvey?: any;
    specialAndExtraordinaryExpensesSurvey?: any;
    undueHardshipSurvey?: any;
    unpaidChildSupportSurvey?: any;

    aboutContactWithChildSurvey?: any;
    contactWithChildSurvey?: any;
    contactWithChildBestInterestOfChildSurvey?: any;
    contactOrderSurvey?: any;

    GuardianOfChildSurvey?: any;
    GuardianOfChildBestInterestOfChildSurvey?: any;
    indigenousAncestryOfChildSurvey?: any;

    aboutExistingSpousalSupportOrderSurvey?: any;
    aboutSpousalSupportOrderSurvey?: any;
    calculatingSpousalSupportSurvey?: any;
    existingSpousalSupportAgreementSurvey?: any;
    existingSpousalSupportFinalOrderSurvey?: any;
    existingSpousalSupportOrderAgreementSurvey?: any;
    spousalSupportSurvey?: any;
    spousalSupportIncomeAndEarningPotentialSurvey?: any;
    unpaidSpousalSupportSurvey?: any;


    //__________
    aboutPOSurvey?: any;
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

    //__________________
    otherPartyCommonSurvey?: otherPartyCommonSurveyInfoType;
    filingLocationSurvey?: filingLocationSurveyInfoType;
    yourInformationSurvey?: yourInformationSurveyInfoType;
    safetySurvey?: any;

  }

  export interface nameInfoType {
    first: string;
    middle: string;
    last: string;
  }

  export interface pathwayCompletedInfoType { 
    protectionOrder: boolean; 
    familyLawMatter: boolean;
    caseMgmt: boolean; 
    priorityParenting: boolean; 
    childReloc: boolean;
    agreementEnfrc: boolean;
  } 





