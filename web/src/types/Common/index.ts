export interface supportingDocumentInfoType {
    fileName: string;
    file: File;
    documentType: string;
}

export interface requiredDocumentsInfoType {
    protectionOrder?: requiredReminderInfoType;
    familyLawMatter?: requiredReminderInfoType;
    caseMgmt?: requiredReminderInfoType;
    priorityParenting?: requiredReminderInfoType;
    childReloc?: requiredReminderInfoType;
    agreementEnfrc?: requiredReminderInfoType;
    agreementEnfrc26?: requiredReminderInfoType;
	agreementEnfrc27?: requiredReminderInfoType;
	agreementEnfrc28?: requiredReminderInfoType;
}

export interface requiredReminderInfoType {
    required: string[];
    reminder: string[];
}

export interface locationsInfoType {
    address: string;
    email: string;
    filingLocation: string;
    id: string;
    name: string;
    postalCode: string;
}

export interface documentTypesJsonInfoType {
    description: string;
    type: string;
}

export interface  applicationJsonInfoType {
    lastUpdated?: number; 
    lastUpdatedDate?: string; 
    id?: number; 
    app_type?: string[]; 
    lastFiled?: number; 
    lastFiledDate?: string; 
    packageNum?: string; 
    listOfPdfs?: string[]; 
    last_efiling_submission: {
        package_number?: string;
        package_url?: string;
    };
}

export interface dateRangeInfoType {
    startDate: string;
    endDate: string;
}

export interface reportInfoType {
    start_date: string;
    end_date: string;
    users_info: userInfoReportInfoType;
    manual_submission_info: manualSubmissionReportInfoType;
    form1: formReportInfoType;
    form3: formReportInfoType;
    form6: formReportInfoType;
    form10: formReportInfoType;
    form11: formReportInfoType;
    form12: formReportInfoType;
    form15: formReportInfoType;
    form16: formReportInfoType;
    form19: formReportInfoType;
    form26: formReportInfoType;
    form27: formReportInfoType;
    form28: formReportInfoType;
    form29: formReportInfoType;
}


export interface formReportInfoType {
    submitted: number;
    unsuccessful: number;
    completed: number;
    drafted: number;
    started: number;
    total: number;
    users: number;
    top_user: topUserReportInfoType;    
}

export interface topUserReportInfoType {
    submitted: number;
    unsuccessful: number;
    completed: number;
    drafted: number;
    started: number;
    total: number;
    first_name: string;
    last_name: string;
    display_name: string;
}

export interface manualSubmissionTopUserReportInfoType {
    total: number;
    first_name: string;
    last_name: string;
    display_name: string;
    forms: manuallySubmittedFormsReportInfoType[];
}

export interface manualSubmissionReportInfoType {
    total: number;
    users: number;
    top_user: manualSubmissionTopUserReportInfoType;
    forms: manuallySubmittedFormsReportInfoType[];
}

export interface manuallySubmittedFormsReportInfoType {
    form_type: string;
    submitted_count: number;
}

export interface userInfoReportInfoType {
    total: number;
    active_in_period: number;
    joined_in_period: number;
}    

