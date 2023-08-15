import { nameInfoType, questionInfoType } from "../CommonInformation";

export interface trialReadinessStatementDataInfoType {
    Scheduled?: string;
    FileTris?: string;
}  

export interface peopleAtTrialOtherPartyInfoType {
    name: nameInfoType;
}
  
export interface trialReadinessStatementSurveyInfoType {
    data: trialReadinessStatementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface peopleAtTrialSurveyDataInfoType {
    ApplicantName?: nameInfoType;  
    Lawyer?: string;  
    LawyerName?: nameInfoType; 
    otherPartyInfoTris?: peopleAtTrialOtherPartyInfoType[]; 
    CaseType?: string;    
}

export interface peopleAtTrialSurveyInfoType {
    data: peopleAtTrialSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface issuesForTrialSurveyDataInfoType {
    IssuesForTrial?: issuesForTrialInfoType;    
}

export interface issuesForTrialInfoType {   
    OtherComment?: string;    
    PpmComment?: string;
    checked?: string[];   
} 

export interface issuesForTrialSurveyInfoType {
    data: issuesForTrialSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface backgroundTrisSurveyDataInfoType {   
    AttendedConference?: string;    
    OngoingDiscussions?: string;
    Resolvable?: string;
    existingCourtOrder?: existingCourtOrderInfoType;
}  

export interface existingCourtOrderInfoType {
    name: nameInfoType;
}

export interface backgroundTrisSurveyInfoType {
    data: backgroundTrisSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface otherPartyRQSConfirmationSurveyInfoType {
    data: {confirmation: string};
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface disclosureOfInformationSurveyDataInfoType {
    FinancialOnFile?: string;
    InfoProvided?: string;
    DateProvided?: string;
    InfoRequired?: string;
    DescriptionInfoRequired?: string;
}

export interface disclosureOfInformationSurveyInfoType {
    data: disclosureOfInformationSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface witnessesSurveyDataInfoType {
    Witnesses?: string[];
    ExpertReportsExist?: string;
    ExpertReportProvided?: string;
    ExpertCalled?: string;
    ExpertTimeRequired?: string;
    ReportOrdered?: string;
    ReportCompleted?: string;
    OrderAttendTrial?: string;
    WitnessesConfirmed?: string;
}

export interface witnessesSurveyInfoType {
    data: witnessesSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface requirementsAndConsiderationsSurveyDataInfoType {
    specialReqList?: string[];
    techSpecs?: string;
    interpreterInfo?: interpreterDetailsDataInfoType;
    
}

export interface interpreterDetailsDataInfoType {
    name?: string;
    language?: string;
}

export interface requirementsAndConsiderationsSurveyInfoType {
    data: requirementsAndConsiderationsSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface aboutTheTrialSurveyDataInfoType {
    AppearanceType?: string;
    AppearanceTypeComment?: string;
}

export interface aboutTheTrialSurveyInfoType {
    data: aboutTheTrialSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface ordersAtTpcSurveyDataInfoType {
    AppearanceType?: string;
    AppearanceTypeComment?: string;
}

export interface ordersAtTpcSurveyInfoType {
    data: ordersAtTpcSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}