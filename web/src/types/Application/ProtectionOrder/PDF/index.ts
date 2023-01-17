
export interface urgencyInfoType {
    PORNoNotice?: string;
    PORWhyNoNotice?: string;
}

export interface schedule1ChildInfoType {
    name?: string;
    dob?: string;
    relation?: string;    
    living?: string;    
}


export interface schedule1OtherChildrenInfoType {
    name?: string;
    dob?: string;
    protectedRelation?: string;
    otherRelation?: string;    
    livingWith?: string;    
}

export interface schedule1SharingAdultInfoType {
    name?: string;
    dob?: string;
    relation?: string; 
}

export interface schedule1AnotherAdultInfoType {
    nameFull?: string;
    dobBeauty?: string;
    reason?: string;    
}

export interface schedule1BackgroundInfoType {
    married?: string;
    protectedSpouse?: string;
    liveTogetherDate?: string;
    marriageDate?: string;
    seperated?: string; 
    separationDate?: string;
    howPartiesRelated?: string;
    hasOtherChilderen?: string;
    existingOrders?: string;
    culturalExplain?: string;
    mentalHealthConcern?: string;
    mentalHealthConcernReasons?: string;
    riskOfViolence?: string;
    violenceCirumstances?: string;
    existingPOOrders?: string;
    disobeyOrder?: string;
    describeDisobeyOrder?: string;
    concernForNotObeying?: string;
    explainNotObeyingConcern?: string;
    reportedToPolice?: string;
    policeActions?: string;
    reportedToSW?: string;
    swAction?: string;        
}

export interface schedule1YourStoryInfoType {
    isViolence?: string; 
    whatViolence?: string; 
    isConcerns?: string; 
    whatConcerns?: string; 
    recentIncidents?: string;
}

export interface schedule1NoGoInfoType {
    places?: string[];
    otherComment?: string;
}

export interface schedule1NoContactInfoType {
    reasonForComm?: string[]; 
    otherComment?: string;
}

export interface schedule1WeaponsFirearmsInfoType {
    firearms?: string; 
    firearmsReason?: string; 
    firearmsYes?: string; 
    firearmsYesReason?: string; 
    weapons?: string; 
    weaponsReasons?: string; 
    weaponsYes?: string; 
    weaponsYesReason?: string; 
}

export interface schedule1RemovePersonInfoType {
    liveTogether?: string; 
    needPolice?: string[];  
    needPoliceComment?: string;
}

export interface schedule2AboutOrderInfoType {
    dateOfPO?: string; 
    inCourtForPO?: string; 
    whyNotInCourt?: string; 
    kindOfParty?: string[]; 
    whatChangesNeeded?: string; 
    whyChangesNeeded?: string;
}    

export interface schedule3AboutOrderInfoType {
    dateOfPO?: string; 
    inCourtForPO?: string; 
    whyNotInCourt?: string; 
    kindOfParty?: string[]; 
    whyTerminatePO?: string;
}