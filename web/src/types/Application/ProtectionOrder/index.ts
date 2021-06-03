import { nameInfoType } from "..";
import { addressInfoType, contactInfoType, questionInfoType } from "../CommonInformation"; 
  

    export interface ExistingOrderInfoTypeInfoType {
        type: string;
        filingLocation: string;
        fileNumber: string;
    }

    export interface ProtectionOrderInfoType {
        required: string[];
        reminder: any[];
    }

    export interface RequiredDocumentsInfoType {
        protectionOrder: ProtectionOrderInfoType;
    }

    // export interface selectedPOOrderDataInfoType {
    //     orderType: string;
    //     explanationQualifying: boolean;
    //     unsafe: string;
    //     familyUnsafe: string;
    //     PORConfirmed: string[];
    // }

    // export interface selectedPOOrderInfoType {
    //     data: selectedPOOrderDataInfoType;
    //     questions?: any;
    //     pageName: string;
    //     currentStep: number;
    //     currentPage: number;
    // }

    export interface poQuestionnaireSurveyInfoType {
        orderType: string;
        explanationQualifying: boolean;
        unsafe: string;
        familyUnsafe: string;
        PORConfirmed: string[];
    }    

    export interface yourInformationSurveyPODataInfoType {
        ApplicantName: nameInfoType;
        ApplicantDOB: string;
        Lawyer: string;
        ExplanationServiceAddress: boolean;
        ApplicantAddress: addressInfoType;
        ApplicantContact: contactInfoType;
        ApplicantOccupation: string;
    }

    export interface yourInformationSurveyPOInfoType {
        data: yourInformationSurveyPODataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface noContactSurveyDataInfoType {
        needCommunication: string;
    }  

    export interface noContactSurveyInfoType {
        data: noContactSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface AllchildrenInfoType {
    }

    export interface AllAnotherAdultsSharingResiInfoType {
    }

    export interface protectionWhomSurveyDataInfoType {
        allchildren: AllchildrenInfoType[];
        allAnotherAdultsSharingResi: AllAnotherAdultsSharingResiInfoType[];
        RespondentName: nameInfoType;
        RespondentDOBExact: string;
        RespondentAddress: addressInfoType;
        RespondentContact: contactInfoType;
        ApplicantNeedsProtection: string;
        childPO: string;
    }   

    export interface protectionWhomSurveyInfoType {
        data: protectionWhomSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface poFilingLocationSurveyDataInfoType {
        ExistingFamilyCase: string;
        ExplanationCourtLocation: boolean;
        ExistingCourt: string;
        ExistingFileNumber?: string;
    }   

    export interface poFilingLocationSurveyInfoType {
        data: poFilingLocationSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface removeSurveyDataInfoType {
        RespondentLiveTogether: string;
        needPolice: string[];
    }    

    export interface removeSurveyInfoType {
        data: removeSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface noGoSurveyDataInfoType {
        RespondentNoGo: string;
    }

    export interface noGoSurveyInfoType {
        data: noGoSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface weaponsSurveyDataInfoType {
        RespondentFirearms: string;
        RespondentFirearmsYes: string;
        RespondentWeapons: string;
        RespondentWeaponsYes: string;
        RespondentNoWeapons: string[];
    }  

    export interface weaponsSurveyInfoType {
        data: weaponsSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface AllOtherChilderenInfoType {
    }

    export interface backgroundSurveyDataInfoType {
        allOtherChilderen: AllOtherChilderenInfoType[];
        howPartiesRelated: string;
        werePOPartiesMarried: string;
        isSeperatedPO: string;
        PartiesHasOtherChilderen: string;
        likeToAddCulturalExplanation: string;
        mentalHealthConcernPO: string;
        riskOfViolencePO: string;
        existingPOOrders: string;
        otherPartyDisobeyOrder: string;
        concernForNotObeying: string;
        reportedConcernsToPolice: string;
        reportedConcernsToSW: string;
    }  

    export interface backgroundSurveyInfoType {
        data: backgroundSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface yourStoryDataInfoType {
        isFamilyViolence: string;
        isNoneExplainedConcerns: string;
        recentIncidents: string;
    }    

    export interface yourStoryInfoType {
        data: yourStoryDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface urgencySurveyDataInfoType {
        PORNoNotice: string;
        PORWhyNoNotice: string;
    }


    export interface urgencySurveyInfoType {
        data: urgencySurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }    

    export interface filingOptionsInfoType {
        selectedFilingType: string;
    }

    export interface aboutPOSurveydataInfoType {
        dateOfPO: string;
        ExistingCourt: string;
        ExistingFileNumber: string;
        inCourtForPO: string;
        whyNotInCourt: string;
        kindofPartyIbPO: string[];
        whatChangesNeeded: string;
        whyChangesNeeded: string;
        changePOattachment: string[];
    }

    export interface aboutPOSurveyInfoType {
        data: aboutPOSurveydataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    // export interface resultInfoType {
    //     selectedForms: string[];
    //     pathwayCompleted: PathwayCompleted;
    //     applicantName: ApplicantName;
    //     respondentsPO: RespondentsPO[];
    //     respondents: Respondent[];
    //     protectedPartyName: ProtectedPartyName;
    //     protectedChildName: any[];
    //     existingOrders: ExistingOrder[];
    //     requiredDocuments: RequiredDocuments;
    //     selectedPOOrder: SelectedPOOrder;
    //     
    //    
    //     
    //    
    //     
    //     
    //    
    //    
    //     
    //    
    //     
    //     filingLocationSurvey: FilingLocationSurvey;
    //     filingOptions: FilingOptions;
    // }

    



