import { nameInfoType, addressInfoType, contactInfoType } from "../../CommonInformation";

export interface relocationOfChildInformationDataInfoType {
    existingOrder: boolean;
    existingOrderDate: string;
    receivedNotice: boolean;
    noticeDate?: string;
    foundOutDate?: string;
    foundOutDescription?: string;
    impactOnChild: boolean;
    presumedRelocationDate?: string;
    presumedLocation?: string;
    childBestInterestAcknowledgement?:boolean;
    childBestInterestReason?: string;
}

export interface relocationOfChildOtherPartyDataInfoType {
    name: nameInfoType;
    dob?: string;   
    address: addressInfoType;
    contactInfo: contactInfoType;
    lawyer: string;
}