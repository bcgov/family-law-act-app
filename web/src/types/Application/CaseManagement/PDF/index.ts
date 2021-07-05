import { addressInfoType, contactInfoType, nameInfoType } from "../../CommonInformation";

export interface caseManagementOtherPartyDataInfoType {
    name: nameInfoType;    
}

export interface cmLocationInfoDataInfoType {
    courtLocation: string;
    existingFileNumber: string;
   
}

export interface schedule1DataInfoType {
    attendees: string[];
    lawyerName?: string;
    eventType: string;
    eventTypeComment?:string;
    eventDate: string; 
    eventTime: string;
    attendanceType: string;
    attendanceTypeComment?: string;
    phoneNumber?: string;
    directLine?: boolean;
    understandPhoneRequirements?: boolean;
    documentsSubmitted?: boolean;
    virtualAttendanceReason?: string;
}

export interface form10DataInfoType {
    otherPersonsList?: string;
    givenConsent?: boolean;
    consentDirection?:string;
    contactedOP?:boolean;
    oPAgreed?:boolean;
    caseList: string[];
    orderDetails: string;
    orderFacts: string;
}