import { nameInfoType, questionInfoType } from "../CommonInformation"; 

export interface relocChildrenInfoSurveyInfoType {
    data: relocChildrenInfoDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface relocChildrenInfoDataInfoType {
    name: nameInfoType;
    dob: string;
    currentLiving:string;
    id:number;
}

export interface relocQuestionnaireSurveyInfoType {
    data: relocQuestionnaireSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface relocQuestionnaireSurveyDataInfoType {
    ExistingParentingArrangements: string;
    orderDate: string;
    impactOnChild: string;
    receiveNotice: string;
    noticeDate: string;
    foundOutDate: string;
    foundOutAboutRelocationDescription: string;
    relocationDate: string;
    childProposedLocation: string;
}

export interface relocChildBestInterestSurveyInfoType {
    data: relocChildBestInterestSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface relocChildBestInterestSurveyDataInfoType {
    childBestInterestAcknowledgement: string[];
    childBestInterestDescription: string;   
}