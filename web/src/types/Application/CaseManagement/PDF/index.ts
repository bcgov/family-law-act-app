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

export interface schedule2DataInfoType {
    isWaiveOrModify: boolean;
    isAltMethodService: boolean;
    waiveChangeRequirementList: string[];
    waiveChangeRequirementComment: string;
    orderChangesDetail: string;
    applicationFacts: string;
    nameOfPersonToBeServed: string[];
    altMethodDocList: string;
    altMethodApplicationFacts: string;
    altMethodServingDetails: string;    
}

export interface schedule3DataInfoType {
    appliedRequirementsList: string[];
    appliedRequirementsListComment: string
    orderDetail : string;
    applicationFacts: string;
    dateOfOrder: string;
    judgeName : string;
}

export interface schedule4DataInfoType {
    officerSearch : string;
    orderDetail : string;
    applicationFacts : string; 
}

export interface schedule5DataInfoType {
    name: string;
    address: addressInfoType;
    contact: contactInfoType;
    lawyer: string;
    dob: string;
}

export interface schedule5outsideBcInfoType{
    orderDate: string;
    orderPlace: string;
}

export interface form10DataInfoType {
    otherPersonsList?: string;
    givenConsent?: boolean;
    consentDirection?:string;
    understandNotice?:boolean;
    contactedOP?:boolean;
    oPAgreed?:boolean;
    caseList: string[];
    orderDetails: string;
    orderFacts: string;
}