import { addressInfoType, contactInfoType, nameInfoType } from "../../CommonInformation";

export interface caseManagementInformationDataInfoType {
    // ExistingCase: boolean;
    // existingProceeding: boolean;
    // proceedingInfo: string;
    // facts: string;
    // orderdesc: string;
    // noticeType: string;
    // ppmList: string[];
}

export interface caseManagementOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
}