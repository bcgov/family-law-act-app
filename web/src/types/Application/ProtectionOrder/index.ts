import { nameInfoType, addressInfoType, contactInfoType, questionInfoType } from "../CommonInformation"; 
  

    export interface ExistingOrderInfoType {
        type: string;
        filingLocation: string;
        fileNumber: string;
    }

    export interface poQuestionnaireSurveyInfoType {
        orderType: string;
        explanationQualifying?: boolean;
        unsafe?: string;
        familyUnsafe?: string;
        PORConfirmed?: string[];
    }    

    export interface yourInformationSurveyPODataInfoType {
        ApplicantName: nameInfoType;
        ApplicantDOB: string;
        Lawyer: string;
        ExplanationServiceAddress?: boolean;
        ApplicantAddress?: addressInfoType;
        ApplicantContact?: contactInfoType;
        LawyerName?: nameInfoType;
        LawyerAddress?: addressInfoType;
        LawyerContact?: contactInfoType;
        ApplicantOccupation?: string;
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
        reasonForCommunication?: string[];
        reasonForCommunicationComment?: string;
    }  

    export interface noContactSurveyInfoType {
        data: noContactSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface allchildrenInfoType {
        childName?: nameInfoType;
        childDOB?: string;
        childRelationship?: string;
        childLivingWith?: string;
    }

    export interface allAnotherAdultsSharingResiInfoType {
        anotherAdultSharingResiName?: nameInfoType;
        anotheradultSharingResiDOB?: string;
        anotherAdultSharingResiRelation?: string;
    }

    export interface protectionWhomSurveyDataInfoType {
        allchildren?: allchildrenInfoType[];
        allAnotherAdultsSharingResi?: allAnotherAdultsSharingResiInfoType[];
        RespondentName: nameInfoType;
        RespondentDOBExact: string;
        RespondentDOB?: string;
        RespondentAddress: addressInfoType;
        RespondentContact: contactInfoType;
        ApplicantNeedsProtection: string;
        anotherAdultPO?: string;
        anotherAdultName?: string;
        anotherAdultDOB?: string;
        anotherAdultReasonForPO?: string;
        childPO: string;
        anotherAdultSharingResi?: string;
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
        ExistingCourt?: string;
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
        needPoliceComment?: string;
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
        RespondentNoGoPlaces?: string[];
        RespondentNoGoPlacesComment?: string;
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
        firearmsReason?: string;
        RespondentFirearmsYes: string;
        firearmsYesReason?: string;
        RespondentWeapons: string;
        weaponsReasons?: string;
        RespondentWeaponsYes: string;
        weaponsYesReason?: string;
        RespondentNoWeapons?: string[];
    }  

    export interface weaponsSurveyInfoType {
        data: weaponsSurveyDataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface allOtherChilderenInfoType {
        childName: nameInfoType;
        childDOB: string;
        childRelationshipWithProtected: string;
        childRelationshipWithOther: string;
        childLivingWith: string;
    }

    export interface backgroundSurveyDataInfoType {
        allOtherChilderen?: allOtherChilderenInfoType[];
        howPartiesRelated: string;
        werePOPartiesMarried: string;
        liveTogetherPODate?: string;
        dateOfMarriagePO?: string;
        isSeperatedPO: string;
        separationDate?: string;
        PartiesHasOtherChilderen?: string;
        ExistingOrders?: string;
        likeToAddCulturalExplanation: string;
        culturalExplain?: string;
        mentalHealthConcernPO: string;
        explainReasonsPO?: string;
        riskOfViolencePO: string;
        describeCirumstancesPO?: string;
        existingPOOrders: string;
        otherPartyDisobeyOrder: string;
        describeDisobeyOrder?: string;
        concernForNotObeying: string;
        explainReasonsForConcern?: string;
        reportedConcernsToPolice: string;
        describeActionsByPolice?: string;
        reportedConcernsToSW: string;
        desrcibeSWAction?: string;
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
        whatViolence?: string;
        isNoneExplainedConcerns: string;
        noneExplainedConcerns?: string;
        recentIncidents: string;
        recentIncidentWithChild?: string;
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
        PORWhyNoNotice?: string;
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
        dateOfPO?: string;
        ExistingCourt: string;
        ExistingFileNumber: string;
        inCourtForPO: string;
        whyNotInCourt?: string;
        kindofPartyIbPO: string[];
        whatChangesNeeded?: string;
        whyChangesNeeded?: string;
        changePOattachment?: string[];
        terminateDateOfPO?: string;
        whyTerminatePO?: string;
        terminatePOattachment?: string[];
    }

    export interface aboutPOSurveyInfoType {
        data: aboutPOSurveydataInfoType;
        questions: questionInfoType[];
        pageName: string;
        currentStep: number;
        currentPage: number;
    }

    export interface selectedPOOrderInfoType {
        data: poQuestionnaireSurveyInfoType;
        questions: questionInfoType[] | null;
        pageName: string;
        currentStep: number;
        currentPage: number;
    }