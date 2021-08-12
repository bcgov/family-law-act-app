import { addressInfoType, contactInfoType, nameInfoType } from "../../CommonInformation";

export interface form29InformationDataInfoType {  
    determinationDate?: string;
    writtenAgreementOrderDate?: string;
    facts: string;
    orderdesc: string;
    arrearsDate: string;
    orderList: string[];
    expenseList: string[];
    foreignNotice?: boolean;
    otherPartyNotice?: boolean;
    attachRequiredDocuments?: boolean;
}

export interface form26InformationDataInfoType {
    agreementDate: string;
    agreementList: string[];
    filed: boolean;
}

export interface form27InformationDataInfoType {
    existingDate: string;
    type: string;
    agreementDate?: string;
    orderDate?: string; 
    filed: boolean;
    partiesToAgreement: string[];
}

export interface form28InformationDataInfoType {
    orderDate: string;
    orderList: string[];
    filed: boolean;
}

export interface enfrcOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
    lawyer?: string;
}