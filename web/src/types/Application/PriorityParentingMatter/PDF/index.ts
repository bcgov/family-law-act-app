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