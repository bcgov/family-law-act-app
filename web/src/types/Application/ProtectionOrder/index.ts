import { nameInfoType, addressInfoType, contactInfoType, questionInfoType } from "../CommonInformation"; 
  

    export interface ExistingOrderInfoType {
        type?: string;
        filingLocation?: string;
        fileNumber?: string;
    }

    export interface poQuestionnaireSurveyDataInfoType {
        FAQLegalAdvice?: boolean;
        orderType?: string;
        explanationQualifying?: boolean;
        unsafe?: string;
        familyUnsafe?: string;
        PORConfirmed?: string[];
    }

    export interface poQuestionnaireSurveyInfoType {
        data: poQuestionnaireSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }    

    export interface yourinformationPOSurveyDataInfoType {
        ApplicantName?: nameInfoType;
        ApplicantDOB?: string;
        Lawyer?: string;
        ExplanationServiceAddress?: boolean;
        ApplicantAddress?: addressInfoType;
        ApplicantContact?: contactInfoType;
        LawyerName?: nameInfoType;
        LawyerAddress?: addressInfoType;
        LawyerContact?: contactInfoType;
        FAQLawyer1?: boolean;
        FAQLawyer2?: boolean;
        ApplicantOccupation?: string;
    }

    export interface yourinformationPOSurveyInfoType {
        data: yourinformationPOSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface noContactSurveyDataInfoType {
        needCommunication: string;
        reasonForCommunication?: string[];
        reasonForCommunicationComment?: string;
    }  

    export interface noContactSurveyInfoType {
        data: noContactSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
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

    export interface protectionFromWhomSurveyDataInfoType {
        allchildren?: allchildrenInfoType[];
        allAnotherAdultsSharingResi?: allAnotherAdultsSharingResiInfoType[];
        RespondentName?: nameInfoType;
        RespondentDOBExact?: string;
        RespondentDOB?: string;
        RespondentAddress?: addressInfoType;
        RespondentContact?: contactInfoType;
        ApplicantNeedsProtection?: string;
        anotherAdultPO?: string;
        anotherAdultName?: string | object;
        anotherAdultDOB?: string;
        anotherAdultReasonForPO?: string;
        childPO?: string;
        anotherAdultSharingResi?: string;
        sharingResidenceFAQ?: boolean;
    }   

    export interface protectionFromWhomSurveyInfoType {
        data: protectionFromWhomSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface poFilingLocationSurveyDataInfoType {
        CourtLocationFAQ1?: boolean | string;
        CourtLocationFAQ2?: boolean | string;
        ExistingFamilyCase: string;
        ExplanationCourtLocation?: boolean;
        ExistingCourt?: string;
        ExistingFamilyCaseFAQ1?: boolean;
        ExistingFamilyCaseFAQ2?: boolean;
        ExistingFileNumber?: string;        
    }   

    export interface poFilingLocationSurveyInfoType {
        data: poFilingLocationSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface removePersonSurveyDataInfoType {
        RespondentLiveTogether?: string;
        needPolice?: string[];
        needPoliceComment?: string;
    }    

    export interface removePersonSurveyInfoType {
        data: removePersonSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface noGoSurveyDataInfoType {
        RespondentNoGo?: string;
        RespondentNoGoPlaces?: string[];
        RespondentNoGoPlacesComment?: string;
    }

    export interface noGoSurveyInfoType {
        data: noGoSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface weaponsFirearmsSurveyDataInfoType {
        RespondentFirearms?: string;
        firearmsReason?: string;
        RespondentFirearmsYes?: string;
        firearmsYesReason?: string;
        RespondentWeapons?: string;
        weaponsReasons?: string;
        RespondentWeaponsYes?: string;
        weaponsYesReason?: string;
        RespondentNoWeapons?: string[];
    }  

    export interface weaponsFirearmsSurveyInfoType {
        data: weaponsFirearmsSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface allOtherChilderenInfoType {
        childName?: nameInfoType;
        childDOB?: string;
        childRelationshipWithProtected?: string;
        childRelationshipWithOther?: string;
        childLivingWith?: string;
    }

    export interface backgroundSurveyDataInfoType {
        allOtherChilderen?: allOtherChilderenInfoType[];
        howPartiesRelated?: string;
        werePOPartiesMarried?: string;
        werePOPartiesMarriedFAQ?: boolean;
        liveTogetherPODate?: string;
        dateOfMarriagePO?: string;
        isSeperatedPO?: string;
        separationDate?: string;
        PartiesHasOtherChilderen?: string;
        ExistingOrders?: string;
        likeToAddCulturalExplanation?: string;
        culturalExplain?: string;
        mentalHealthConcernPO?: string;
        explainReasonsPO?: string;
        riskOfViolencePO?: string;
        describeCirumstancesPO?: string;
        existingPOOrders?: string;
        otherPartyDisobeyOrder?: string;
        describeDisobeyOrder?: string;
        concernForNotObeying?: string;
        explainReasonsForConcern?: string;
        reportedConcernsToPolice?: string;
        describeActionsByPolice?: string;
        reportedConcernsToSW: string;
        desrcibeSWAction?: string;
    }  

    export interface backgroundSurveyInfoType {
        data: backgroundSurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface yourStorySurveyDataInfoType {
        isFamilyViolence?: string;
        whatViolence?: string;
        isNoneExplainedConcerns?: string;
        noneExplainedConcerns?: string;
        recentIncidents?: string;
        recentIncidentWithChild?: string;
    }    

    export interface yourStorySurveyInfoType {
        data: yourStorySurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface urgencySurveyDataInfoType {
        PORNoNotice?: string;
        PORWhyNoNotice?: string;
    }


    export interface urgencySurveyInfoType {
        data: urgencySurveyDataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }

    export interface aboutPOSurveydataInfoType {
        dateOfPO?: string;
        ExistingCourt?: string;
        ExistingFileNumber?: string;
        inCourtForPO?: string;
        whyNotInCourt?: string;
        kindofPartyIbPO?: string[];
        whatChangesNeeded?: string;
        whyChangesNeeded?: string;
        changePOattachment?: string[];
        terminateDateOfPO?: string;
        whyTerminatePO?: string;
        terminatePOattachment?: string[];
    }

    export interface aboutPOSurveyInfoType {
        data: aboutPOSurveydataInfoType;
        questions?: questionInfoType[];
        pageName?: string;
        currentStep?: number | string;
        currentPage?: number | string;
    }