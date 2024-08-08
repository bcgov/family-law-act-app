import { nameInfoType } from "../../CommonInformation";

export interface form19DataInfoType {
    otherPartiesList?: string;    
    applicationsList?:string;
    agreed?:boolean;
    disagree?:boolean;
    partialagreed?:boolean;
    partialdisagree?:boolean;
    agreeAdditionalDetailsYesNo?:boolean;
    agreeDetails?:string;
    disagreeDetails?:string;
    agreeAdditionalDetails?:string;
    disAgreeDetailsOtherParty?:string;    
    caseList: string[];
    orderDetails: string;
    orderFacts: string;
    applicationFiledOn?: string;
}

export interface writtenResponseOtherPartyDataInfoType {
    name: nameInfoType;    
}