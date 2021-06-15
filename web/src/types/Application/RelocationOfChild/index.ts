import { nameInfoType, questionInfoType } from "../CommonInformation"; 

export interface RelocChildrenInfoSurveyInfoType {
    data: relocChildrenInfoCDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface relocChildrenInfoCDataInfoType {
    name: nameInfoType;
    dob: string;
    currentLiving:string;
    id:number;
}

export interface relocQuestionnaireSurveyInfoType {
    data: relocQuestionnaireSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface relocQuestionnaireSurveyDataInfoType {
    ExistingParentingArrangements: string;
    orderDate: string;
    impactOnChild: string;
    receiveNotice: string;
    noticeDate: string;
}

export interface relocChildBestInterestSurveyInfoType {
    data: relocChildBestInterestSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface relocChildBestInterestSurveyDataInfoType {
    childBestInterestAcknowledgement: string;
    childBestInterestDescription: string;   
}