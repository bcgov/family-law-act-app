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
    CaseTypeComment?: string;  
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
    ExistingCourtOrder?: existingCourtOrderInfoType;
}  

export interface existingCourtOrderInfoType {
    checked?: string[];
    bailOrderInput?: string;
    peaceBondInput?: string;
    probationOrderInput?: string;
    protectionOrderInput?: string;
    otherOrderComment?: string;
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

export interface witnessesInfoType {
    name: nameInfoType;
}

export interface witnessesSurveyDataInfoType {
    Witnesses?: witnessesInfoType[];
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
    safetySpecs?: string;
    trialSpecs?: string;
    disabilitySpecs?: string;    
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
    TrialScheduled?: string;
    TrialDate?: string;
    FeelReady?: string;
    FeelReadyExplanation?: string;
    TrialTimeStatement?: trialTimeStatementDataType;
    Reviewed?: string;
}

export interface trialTimeStatementDataType {
    dayCountOne?: string;
    dayCountTwo?: string;
}

export interface aboutTheTrialSurveyInfoType {
    data: aboutTheTrialSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}

export interface ordersAtTpcSurveyDataInfoType {
    ordersToAsk?: string;
    orders?: string;
}

export interface ordersAtTpcSurveyInfoType {
    data: ordersAtTpcSurveyDataInfoType;
    questions: questionInfoType[];
    pageName: string;
    currentStep: number | string;
    currentPage: number | string;
}