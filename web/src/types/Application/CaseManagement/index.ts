import { nameInfoType, otherPartyInfoType, questionInfoType } from "../CommonInformation";

export interface cmQuestionnaireSurveyInfoType {
    data: string[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface otherPersonsSurveyInfoType {
    data: otherPersonsSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface otherPersonsSurveyDataInfoType {
    otherPersonsExist: string;
    otherPersonsList: string;
}

export interface withoutNoticeOrAttendanceSurveyInfoType {
    data: withoutNoticeOrAttendanceSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface withoutNoticeOrAttendanceSurveyDataInfoType {
    needWithoutNotice: string;
    orderWithoutNoticeAcknowledgement?: string;        
}

export interface byConsentSurveyInfoType {
    data: byConsentSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface byConsentSurveyDataInfoType {
    givenConsent: string;
    giveConsentDirection: string;
}

export interface cmNoticeSurveyInfoType {
    data: cmNoticeSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface cmNoticeSurveyDataInfoType {
    acknowledgement: string;
}

export interface schedulingSurveyInfoType {
    data: schedulingSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface schedulingSurveyDataInfoType {
    informedOtherParties: string;
    agreeOnSchedule: string;
}

export interface aboutCaseManagementOrderSurveyInfoType {
    data: aboutCaseManagementOrderSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutCaseManagementOrderSurveyDataInfoType {
    orderDescription: string;
    applicationFacts: string;
}

export interface cmChildrenInfoSurveyInfoType {
    data: {childData:cmChildrenInfoSurveyDataInfoType[], childRelatedType:string };
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
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
    currentStep: number | string;
    currentPage: number | string;
}

export interface attendanceUsingElectronicCommunicationSurveyDataInfoType {
    attendessList: string[];
    appearanceType: string;
    appearanceTypeComment?:string;
    appearanceSchedule: string;    
    attendanceType: string;
    attendanceTypeComment?: string;
    telephoneNumber?: string;
    directPhone?: string;
    understandRequirements?: string;
    submittedDocuments?: string;
    attendanceTypeReason?: string;
}

export interface changingOrCancellingAServiceOrNoticeSurveyInfoType {
    data: changingOrCancellingAServiceOrNoticeSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface changingOrCancellingAServiceOrNoticeSurveyDataInfoType{
    changeOrCancelRequirementForService: string;
    documentList: string[];
    orderChangesDetail: string;
    applicationFacts: string;
    anotherMethodOfService: string;
    namesOfNeedToBeServed: string;
    documentListForAltMethod: string;
    altMethodServingDetails: string;
    applicationFactsAltMethod: string;
}

export interface changingOrCancellingAnyOtherRequirementSurveyInfoType{
    data: changingOrCancellingAnyOtherRequirementSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface changingOrCancellingAnyOtherRequirementSurveyDataInfoType{
    appliedRequirementsList: string[];
    appliedRequirementsListComment: string;
    dateOfOrder: string;
    judgeName: string;
    orderDetail: string;
    applicationFacts: string;
}

export interface requiringAccessToInformationSurveyInfoType{
    data: requiringAccessToInformationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface requiringAccessToInformationSurveyDataInfoType{
    officerSearch: string;
    orderDetail: string;
    applicationFacts: string;
}

export interface recognizingAnOrderFromOutsideBcSurveyInfoType{
    data: recognizingAnOrderFromOutsideBcSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface recognizingAnOrderFromOutsideBcSurveyDataInfoType{
    outsideBcOrder: string;
    dateOfOrder: string;
    orderPlace: string;
    applicationFacts: string;
}

export interface contactInformationOtherPartySurveyInfoType{
    data: contactInformationOtherPartySurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface contactInformationOtherPartySurveyDataInfoType{
    otherPartyInfo: otherPartyInfoType[];
}