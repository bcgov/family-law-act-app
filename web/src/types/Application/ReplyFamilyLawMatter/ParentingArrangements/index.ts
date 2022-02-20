import { questionInfoType } from "../../CommonInformation";

export interface replyNewParentalResponsibilitiesDataInfoType {
    otherPartyParentalResponsibilitiesOrder: string;
    agreeResponsibilitiesOrder?: string;
    disagreeReason?: string;
    requestedParentalResponsibilities?: string;
    childBestInterestReason?: string;
}

export interface replyNewParentalResponsibilitiesSurveyInfoType {
    data: replyNewParentalResponsibilitiesDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyNewParentingTimeDataInfoType {
    otherPartyParentalTimeOrder: string;
    agreeTimeOrder?: string;
    disagreeReason?: string;
    requestedParentalTime?: string;
    childBestInterestReason?: string;
}

export interface replyNewParentingTimeSurveyInfoType {
    data: replyNewParentingTimeDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyNewConditionsParentingTimeDataInfoType {
    otherPartyConditionParentalTimeOrder: string;
    agreeConditionTimeOrder?: string;
    disagreeReason?: string;
    requestedConditionParentalTime?: string;
    childBestInterestReason?: string;
}

export interface replyNewConditionsParentingTimeSurveyInfoType {
    data: replyNewConditionsParentingTimeDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface replyExistingParentingArrangementsDataInfoType {
    listOfOpApplications: string[];
    agreeCourtOrder?: string;
    existingType?: string;
    agreeFinalOrder?: string;
    agreeAgreement?: string;
    agreePartial?: string;
    listOfAgreePartial?: string[];
    disagreeReason?: string;
    desiredOrderChoice?: string;
    requestedParentingArrangements?: string;
    childBestInterestReason?: string;
}

export interface replyExistingParentingArrangementsSurveyInfoType {
    data: replyExistingParentingArrangementsDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}









