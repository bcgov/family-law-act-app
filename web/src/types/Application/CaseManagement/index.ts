import { nameInfoType, questionInfoType } from "../CommonInformation";

export interface cmQuestionnaireSurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface otherPersonsSurveyInfoType {
    data: otherPersonsSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface otherPersonsSurveyDataInfoType {
    otherPersonsExist: string;
    otherPersonsList: string;
}

export interface withoutNoticeOrAttendanceSurveyInfoType {
    data: withoutNoticeOrAttendanceSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface withoutNoticeOrAttendanceSurveyDataInfoType {
    needWithoutNotice: string;
    orderWithoutNoticeAcknowledgement?: string;        
}

export interface byConsentSurveyInfoType {
    data: byConsentSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface byConsentSurveyDataInfoType {
    givenConsent: string;
    giveConsentDirection: string;
}

export interface cmNoticeSurveyInfoType {
    data: cmNoticeSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface cmNoticeSurveyDataInfoType {
    acknowledgement: string;
}

export interface schedulingSurveyInfoType {
    data: schedulingSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface schedulingSurveyDataInfoType {
    informedOtherParties: string;
    agreeOnSchedule: string;
}

export interface aboutCaseManagementOrderSurveyInfoType {
    data: aboutCaseManagementOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface aboutCaseManagementOrderSurveyDataInfoType {
    orderDescription: string;
    applicationFacts: string;
}

export interface cmChildrenInfoSurveyInfoType {
    data: cmChildrenInfoSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface cmChildrenInfoSurveyDataInfoType {
    dob: string;
    id: number;
    name: nameInfoType;
}

export interface attendanceUsingElectronicCommunicationSurveyInfoType {
    data: attendanceUsingElectronicCommunicationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface attendanceUsingElectronicCommunicationSurveyDataInfoType {
    attendessList: string[];
    appearanceType: string;
    appearanceTypeComment?:string;
    appearanceDate: string;
    appearanceTime: string;
    attendanceType: string;
    attendanceTypeComment?: string;
    telephoneNumber?: string;
    directPhone?: string;
    understandRequirements?: string;
    submittedDocuments?: string;
    attendanceTypeReason?: string;
}


