export interface supportingDocumentInfoType {   
    fileName: string;
    file: File;
    documentType: string;
}

export interface requiredDocumentsInfoType {
    protectionOrder?: requiredReminederInfoTyp;
	familyLawMatter?: requiredReminederInfoTyp;
	caseMgmt?: requiredReminederInfoTyp;
	priotityParenting?: requiredReminederInfoTyp;
	childReloc?: requiredReminederInfoTyp;
	agreementEnfrc?: requiredReminederInfoTyp;
}

export interface requiredReminederInfoTyp{
    required: string[];
    reminder: string[];
}