import { questionInfoType } from "../../CommonInformation";

export interface childSupportDataInfoType {
    applicantGuardianType?: string[];
    applicantGuardianTypeComment?: string;
    'otherParty[0]GuardianType'?: string[];
    'otherParty[1]GuardianType'?: string[];
    'otherParty[2]GuardianType'?: string[];
    'otherParty[3]GuardianType'?: string[];
    'otherParty[4]GuardianType'?: string[];
    'otherParty[5]GuardianType'?: string[];
    'otherParty[6]GuardianType'?: string[];
    'otherParty[7]GuardianType'?: string[];
    'otherParty[8]GuardianType'?: string[];
    'otherParty[9]GuardianType'?: string[];
    'otherParty[10]GuardianType'?: string[];
    'otherParty[0]GuardianTypeComment'?: string;
    'otherParty[1]GuardianTypeComment'?: string;
    'otherParty[2]GuardianTypeComment'?: string;
    'otherParty[3]GuardianTypeComment'?: string;
    'otherParty[4]GuardianTypeComment'?: string;
    'otherParty[5]GuardianTypeComment'?: string;
    'otherParty[6]GuardianTypeComment'?: string;
    'otherParty[7]GuardianTypeComment'?: string;
    'otherParty[8]GuardianTypeComment'?: string;
    'otherParty[9]GuardianTypeComment'?: string;
    'otherParty[10]GuardianTypeComment'?: string;
}

export interface childSupportSurveyInfoType {
    data: childSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childSupportCurrentArrangementDataInfoType {
    FAQTimewithchild?: boolean;
    applicantTimeWithChildExplanation?: string;
    applicantTimeType?: string;
    currentArrangmentExplanation?: string;
}

export interface childSupportCurrentArrangementsSurveyInfoType {
    data: childSupportCurrentArrangementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childSupportIncomeEarningDataInfoType {
    knowIncome?: string;
    otherPartyIncome?: string;
    knowFacts?: string;
    factsExplanation?: string;
}

export interface incomeAndEarningPotentialSurveyInfoType {
    data: childSupportIncomeEarningDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface reasonForSupportInfoType {
    illness?: boolean;
    disability?: boolean;
    student?: boolean;
}

export interface over19DetailsInfoType {
    name?: string;
    reasonForSupport?: reasonForSupportInfoType;
}

export interface paymentRequestStartingDateInfoType {
    startingDate?: string;
    selected?: string;
    otherComment?: string;
}

export interface aboutChildSupportOrderDataInfoType {
    FAQamountdifference?: boolean;
    numberOf19yrsChild?: number;
    listOfSupportPayors?: string[];
    over19Details?: over19DetailsInfoType[];
    payorEarnsHigh?: string;
    listOfChildren?: string[];
    supportChildOver19?: string;
    'whyOlderChildNeedSupport[0]'?: string;
    'whyOlderChildNeedSupport[1]'?: string;
    'whyOlderChildNeedSupport[2]'?: string;
    'whyOlderChildNeedSupport[3]'?: string;
    'whyOlderChildNeedSupport[4]'?: string;
    'whyOlderChildNeedSupport[5]'?: string;
    'whyOlderChildNeedSupport[6]'?: string;
    'whyOlderChildNeedSupport[7]'?: string;
    'whyOlderChildNeedSupport[8]'?: string;
    'whyOlderChildNeedSupport[9]'?: string;
    'whyOlderChildNeedSupport[10]'?: string;
    paymentRequestStartingDate?: paymentRequestStartingDateInfoType;
    paymentRequestStartingDateWhy?: string;
    FAQpayingparent?: boolean;
}

export interface aboutChildSupportOrderSurveyInfoType {
    data: aboutChildSupportOrderDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface calculatingChildSupportDataInfoType {
    attachingCalculations?: string;
    whyNotAttachingCalculations?: string;
}

export interface calculatingChildSupportSurveyInfoType {
    data: calculatingChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface undueHardshipDataInfoType {
    FAQamountdifference?: boolean;
    changeAmount?: string;
    hardshipReasons?: string[];
    hardshipReasonsComment?: string;
}

export interface undueHardshipSurveyInfoType {
    data: undueHardshipDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childrenSupportExpenseFieldInfoType {
    key: string;
    label: string;
    tdClass: string;
    thClass: string;
    thStyle: string;
}

export interface specialAndExtraordinaryExpensesDataInfoType {
    applyForExtraordinaryExpenses?: string;
    childrenSupportExpenseItem?: any[];
    childrenSupportExpenseFields?: childrenSupportExpenseFieldInfoType[];
}

export interface specialAndExtraordinaryExpensesSurveyInfoType {
    data: specialAndExtraordinaryExpensesDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface childSupportOrderAgreementDataInfoType {
    existingType?: string;
    existingResponsibilityType?: string;
    existingResponsibilityTypeComment?: string;
    filedWithDirector?: string;
}

export interface childSupportOrderAgreementSurveyInfoType {
    data: childSupportOrderAgreementDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface changesSinceOrderListInfoType {
    expensesChangedComment?: string;
    arrangementsChangedComment?: string;
    newInformationComment?: string;
    otherComment?: string;
    checked?: string[];
}

export interface aboutExistingChildSupportDataInfoType {
    orderDate?: string;
    changesSinceOrderList?: changesSinceOrderListInfoType;
    orderDifferenceType?: string;
    agreementDate?: string;
    changesSinceAgreement?: string;
    agreementDifferenceType?: string;
}

export interface aboutExistingChildSupportSurveyInfoType {
    data: aboutExistingChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface orderStartingDateInfoType {
    startingDate?: string;
    selected?: string;
    otherComment?: string;
}

export interface aboutChildSupportChangesDataInfoType {
    orderDescription: string;
    orderStartingDate: orderStartingDateInfoType;
    orderStartDateReason: string;
    listOfSituations: string[];
}

export interface aboutChildSupportChangesSurveyInfoType {
    data: aboutChildSupportChangesDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}

export interface paymentScheduleInfoType {
    monthlyAmount?: string;
    selected?: string;
    otherComment?: string;
}

export interface unpaidChildSupportDataInfoType {
    unpaid?: string;
    unPaidAmount?: string;
    applyToReduce?: string;
    reduceAmount?: string;
    whyReduceAmount?: string;
    paymentSchedule?: paymentScheduleInfoType;
}

export interface unpaidChildSupportSurveyInfoType {
    data: unpaidChildSupportDataInfoType;
    questions?: questionInfoType[];
    pageName?: string;
    currentStep?: number | string;
    currentPage?: number | string;
}