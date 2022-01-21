import { nameInfoType } from "../../CommonInformation";

export interface form19DataInfoType {
    otherPartiesList?: string;    
    applicationsList?:string;
    agreed?:boolean;
    disagree?:boolean;
    agreeDetails?:string;
    disagreeDetails?:string;
    caseList: string[];
    orderDetails: string;
    orderFacts: string;
}

export interface writtenResponseOtherPartyDataInfoType {
    name: nameInfoType;    
}