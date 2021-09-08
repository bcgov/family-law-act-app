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
    lastUpdated?: number, 
    lastUpdatedDate?: string, 
    id?: number, 
    app_type?: string, 
    lastFiled?: number, 
    lastFiledDate?: string, 
    packageNum?: string, 
    listOfPdfs?: string[], 
    last_efiling_submission:{
        package_number?: string,
        package_url?: string
    }
};