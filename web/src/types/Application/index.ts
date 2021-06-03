export interface applicationInfoType {   
    id?: string;
    types: string[];
    steps: stepInfoType[];
    lastUpdate: Date;
    currentStep: number;
    allCompleted: boolean;
    lastPrinted: Date;
    userType: string;
    userName: string;
    userId: string;
    applicantName: string;
    respondentName: string;
    protectedPartyName: string;
    protectedChildName: string;
    applicationLocation: string;
}

export interface stepInfoType {
    id?: string;
    type: string;
    label: string;
    icon: string;
    result?: Object;
    metadata?: object;
    pages?: pageInfoType[];
    currentPage: number;
    active: boolean;
    lastUpdate: Date;
  }

  export interface pageInfoType {
    key: string;
    label: string;
    progress: number;
    active: boolean;
    clickable: boolean;
  }

  export interface stepResultInfoType {
    step: stepInfoType;
    data: any;
  }

  export interface nameInfoType {
    first: string;
    middle: string;
    last: string;
  }

  export interface pathwayCompletedInfoType { 
    protectionOrder: boolean; 
    familyLawMatter: boolean;
    caseMgmt: boolean; 
    priorityParenting: boolean; 
    childReloc: boolean;
    agreementEnfrc: boolean;
  } 





