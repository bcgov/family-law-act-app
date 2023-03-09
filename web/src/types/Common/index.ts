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
    users_registration_info: userInfoReportInfoType;
    application_details: applicationDetailsInfoType;
    efiling_submissions: eFilingInfoType; 
    logged_in_users: string[][];
 
}

export interface applicationDetailsInfoType {
    CA: formReportInfoType;
    CM: formReportInfoType;
    ENFRC: formReportInfoType;
    FLM: formReportInfoType;
    PO: formReportInfoType;
    PPM: formReportInfoType;
    RELOC: formReportInfoType;
    RFLM: formReportInfoType;
    WR: formReportInfoType;
    OTHER: formReportInfoType;
    NAC: formReportInfoType;
}

export interface eFilingInfoType {
    finalized_efile: number;
    total_applications: number;
    try_to_efile: number;
}

export interface formReportInfoType {    
    completed: number;
    draft: number;
    efiled: number;    
    started: number;
    total: number; 
}

export interface userInfoReportInfoType {
    total: number;
    active_in_period: number;
    joined_in_period: number;
} 