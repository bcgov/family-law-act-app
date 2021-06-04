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