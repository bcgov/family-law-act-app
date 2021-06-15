export interface otherPartyInfoType {
  name: nameInfoType;
  knowDob: string;
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
  data: otherPartyInfoType[];
  questions: questionInfoType[];
  pageName: string;
  currentStep: number;
  currentPage: number;
}

export interface childInfoType {
  name: nameInfoType;
  dob: string;
  relation: string;
  opRelation: string;
  currentLiving: string;
  currentLivingComment?: string;
  ack: string;
  additionalInfo: string;
  additionalInfoDetails: string;
}

export interface nameInfoType {
  first: string;
  middle: string;
  last: string;
}

export interface contactInfoType {
  phone: string;
  fax: string;
  email: string;
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

export interface filingLocationDataInfoType {
  ExistingFamilyCase?: string;
  ExplanationCourtLocation?: boolean;
  ExistingCourt: string;
  ExistingFileNumber: string;
  MetEarlyResolutionRequirements?:string;
  registryLocationReason?: string;
  earlyResolutionRegistry?: boolean;
  familyJusticeRegistry?: boolean;
  familyEducationProgram?: boolean;
}

export interface filingLocationSurveyInfoType {
  data: filingLocationDataInfoType;
  questions: questionInfoType[];
  pageName: string;
  currentStep: number;
  currentPage: number;
}

export interface safetyCheckSurveyDataInfoType {
  unsafe: string;
}

export interface safetyCheckSurveyInfoType {
  data: safetyCheckSurveyDataInfoType;
  questions: questionInfoType[];
  pageName: string;
  currentStep: number;
  currentPage: number;
}

export interface yourInformationDataInfoType {
  ApplicantName: nameInfoType;
  ApplicantDOB: string;
  Lawyer: string;
  ExplanationServiceAddress?: boolean;
  ApplicantAddress?: addressInfoType;
  ApplicantContact?: contactInfoType;
  ApplicantOccupation?: string;
  LawyerName?: nameInfoType;
  LawyerAddress?: addressInfoType;
  LawyerContact?: contactInfoType;
  LawyerFillingOut?: string;
  lawyerStatement?: lawyerStatementInfoType;
}

export interface lawyerStatementInfoType {
  lawyerName: string;
  clientName: string;
}

export interface yourInformationSurveyInfoType {
  data: yourInformationDataInfoType;
  questions: questionInfoType[];
  pageName: string;
  currentStep: number;
  currentPage: number;
}