import { nameInfoType, questionInfoType } from "../CommonInformation"; 
  
export interface aboutPriorityParentingMatterOrderSurveyInfoType {
    data: aboutPriorityParentingMatterOrderSurveyDataInfoType[];
    questions: questionInfoType[];
    pageName: string;
    currentStep: number;
    currentPage: number;
}

export interface aboutPriorityParentingMatterOrderSurveyDataInfoType {
    orderDescription: string;
    applicationFacts: string;
}



