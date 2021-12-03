import { addressInfoType, contactInfoType, nameInfoType } from "../../CommonInformation";

export interface priorityParentingInformationDataInfoType {
    ExistingCase: boolean;
    existingProceeding: boolean;
    proceedingInfo: string;
    facts: string;
    orderdesc: string;
    noticeType: string;
    ppmList: string[];
}

export interface priorityParentingOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
    lawyer: string;
}

export interface schedule1DataInfoType {
    parentNames: string[];
    scheduleCompletionDate: string;
    partyNames: string[];
    beenAdvised: boolean;
    courtProceedingExists: boolean;
    proceedingLocation?: string;
    proceedingFileNumber?: string;
    nextCFCSADate?: string;
    allowChildReturn?: boolean;
    infoShared?: string;
}

export interface schedule2DataInfoType {
    isFirstNations: string;
    understandFirstNationsService?: boolean;
    ancestryType?: string[];
    understandFileForm5?: boolean;
    initiatedCriminalCheck?: boolean;
    filingRequiredDocs?: boolean;
    fileConsent?:boolean;
    fileRequest?:boolean;
}

export interface priorityParentingInfoProviderDataInfoType {
    name: nameInfoType;     
    address: addressInfoType;
    contactInfo: contactInfoType;    
}

export interface priorityParentingDirectorDataInfoType {
    name: nameInfoType;     
    address: addressInfoType;
    contactInfo: contactInfoType;    
}