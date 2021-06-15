import { nameInfoType, questionInfoType } from "../CommonInformation"; 

export interface childDataRELOCInfoType {
    data: childDataRELOCDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface childDataRELOCDataInfoType {
    name:nameInfoType;
    dob: string;
    relation:string;
    opRelation:string;
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

}

export interface relocChildBestInterestSurveyInfoType {
    data: relocChildBestInterestSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface relocChildBestInterestSurveyDataInfoType {
    
}