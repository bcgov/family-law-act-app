import { aboutPOSurveydataInfoType } from "../ProtectionOrder";

export interface otherPartyInfoType {
  name: nameInfoType;
  knowDob: string;
  lawyer?: string;
  dob?: string;
  opRelation?: string;
  livedTogether?: string;
  dateOfLivedTogether?: string;
  married?: string;
  dateOfMarriage?: string;
  separated?: string;
  dateSeparated?: string;
  address: addressInfoType;
  contactInfo: contactInfoType;
  id?: number;
}

export interface otherPartyCommonSurveyInfoType {
  data?: otherPartyInfoType[];
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}

export interface childInfoType {
  name?: nameInfoType;
  dob?: string;
  relation?: string;
  opRelation?: string;
  currentLiving?: string;
  currentLivingComment?: string;
  ack?: string;
  additionalInfo?: string;
  additionalInfoDetails?: string;
}

export interface nameInfoType {
  first: string;
  middle: string;
  last: string;
}

export interface contactInfoType {
  phone?: string;
  fax?: string;
  email?: string;
}

export interface addressInfoType {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export interface questionInfoType {
  name: string;
  value: any;
  title: string;
  inputType?: string;
}

export interface filingLocationDataInfoType extends aboutPOSurveydataInfoType {
  CourtLocation?: string;
  ExistingFamilyCase?: string;
  ExplanationCourtLocation?: boolean;
  ExistingCourt?: string;
  ExistingFileNumber?: string;
  MetEarlyResolutionRequirements?:string;
  registryLocationReason?: string;
  earlyResolutionRegistry?: boolean;
  familyJusticeRegistry?: boolean;
  familyEducationProgram?: boolean;
  CourtLocationFAQ1?: boolean;
  CourtLocationFAQ2?: boolean;
  ExistingFamilyCaseFAQ1?: boolean;
  ExistingFamilyCaseFAQ2?: boolean;
}

export interface filingLocationSurveyInfoType {
  data: filingLocationDataInfoType;
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}

export interface safetyCheckSurveyDataInfoType {
  unsafe?: string;
}

export interface safetyCheckSurveyInfoType {
  data: safetyCheckSurveyDataInfoType;
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}

export interface yourInformationDataInfoType {
  ApplicantName?: nameInfoType;
  ApplicantDOB?: string;
  Lawyer?: string;
  ExplanationServiceAddress?: boolean;
  ApplicantAddress?: addressInfoType;
  ApplicantContact?: contactInfoType;
  ApplicantOccupation?: string;
  LawyerName?: nameInfoType;
  LawyerAddress?: addressInfoType;
  LawyerContact?: contactInfoType;
  LawyerFillingOut?: string;
  lawyerStatement?: lawyerStatementInfoType;
  FAQLawyer1?: boolean;
  FAQLawyer2?: boolean;
}

export interface lawyerStatementInfoType {
  lawyerName?: string;
  clientName?: string;
}

export interface yourInformationSurveyInfoType {
  data: yourInformationDataInfoType;
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}

export interface noticeSurveyDataInfoType {
  noticeType: string;
}

export interface noticeSurveyInfoType {
  data: noticeSurveyDataInfoType;
  questions: questionInfoType[];
  pageName: string;
  currentStep: number | string;
  currentPage: number | string;
}

export interface filingOptionsInfoType {
  selectedFilingType?: string;
}

export interface filingOptionsSurveyInfoType {
  data: filingOptionsInfoType;
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}

export interface otherPartyCommonConfirmationSurveyInfoType {
  data: {confirmation: string};
  questions?: questionInfoType[];
  pageName?: string;
  currentStep?: number | string;
  currentPage?: number | string;
}