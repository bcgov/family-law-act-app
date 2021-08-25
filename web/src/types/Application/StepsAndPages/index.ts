export interface stepsAndPagesNumberInfoType{
    GETSTART: GETSTARTstPgTypes;
    PO: POstPgTypes;
    COMMON: COMMONstPgTypes;    
    FLM: FLMstPgTypes;
    CM: CMstPgTypes
    PPM: PPMstPgTypes
    RELOC: RELOCstPgTypes;
    ENFRC: ENFRCstPgTypes;
    SUBMIT: SUBMITstPgTypes;
}

 
export interface GETSTARTstPgTypes{
    _StepNo: number;   
    
    GettingStarted: number;
}

export interface POstPgTypes{
    _StepNo: number;
    
    PoQuestionnaire: number;
    YourinformationPO: number;
    ProtectionFromWhom: number;
    PoFilingLocation: number;
    RemovePerson: number;
    NoGo: number;
    NoContact: number;
    WeaponsFirearms: number;
    Background: number;
    YourStory: number;
    OtherParty: number;
    About: number;
    Urgency: number;
    ReviewYourAnswers: number;
    PreviewForms: number;    
}
  
export interface COMMONstPgTypes{
    _StepNo: number;
    
    SafetyCheck: number;
    Notice: number;
    YourInformation: number;
    OtherPartyCommon: number;
    FilingLocation: number;
}

export interface FLMstPgTypes{
    _StepNo: number;

    FlmQuestionnaire: number;
    FlmBackground: number;
    ChildrenInfo: number;
    ParentingArrangements: number;
    ParentalResponsibilities: number;
    ParentingTime: number;
    OtherParentingArrangements: number;
    ParentingOrderAgreement: number;
    AboutParentingArrangements: number;
    ParentingArrangementChanges: number;
    BestInterestsOfChild: number;
    ChildSupport: number;
    ChildSupportCurrentArrangements: number;
    IncomeAndEarningPotential: number;
    AboutChildSupportOrder: number;
    ChildSupportOrderAgreement: number;
    AboutExistingChildSupport: number;
    CalculatingChildSupport: number;
    UndueHardship: number;
    SpecialAndExtraordinaryExpenses: number;
    AboutChildSupportChanges: number;
    UnpaidChildSupport: number;
    ContactWithChild: number;
    ContactWithChildOrder: number;
    AboutContactWithChildOrder: number;
    ContactWithChildBestInterestsOfChild: number;
    GuardianOfChild: number;
    GuardianOfChildBestInterestsOfChild: number;
    IndigenousAncestryOfChild: number;
    SpousalSupport: number;
    SpousalSupportIncomeAndEarningPotential: number;
    AboutSpousalSupportOrder: number;
    ExistingSpousalSupportOrderAgreement: number;
    ExistingSpousalSupportFinalOrder: number;
    ExistingSpousalSupportAgreement: number;
    CalculatingSpousalSupport: number;
    AboutExistingSpousalSupportOrder: number;
    UnpaidSpousalSupport: number;
    FlmAdditionalDocuments: number;
    ReviewYourAnswersFLM: number;
    PreviewFormsFLM: number;
}

export interface CMstPgTypes{
    _StepNo: number;

    CmQuestionnaire: number;
    OtherPersons: number;
    WithoutNoticeOrAttendance: number;
    ByConsent: number;
    CmNotice: number;
    Scheduling: number;
    AboutCaseManagementOrder: number;
    CmChildrenInfo: number;
    AttendanceUsingElectronicCommunication: number;
    ChangingOrCancellingAServiceOrNotice: number;
    ChangingOrCancellingAnyOtherRequirement: number;
    RequiringAccessToInformation: number;
    RecognizingAnOrderFromOutsideBc: number; 
    ContactInformationOtherParty: number;   
    ReviewYourAnswersCM: number;
    PreviewForm10CM: number;
    PreviewForm11CM: number;
}

export interface PPMstPgTypes{
    _StepNo: number;
    
    PpmQuestionnaire: number;
    PriorityParentingMatterOrder: number;
    PpmBackground: number;
    PpmChildrenInfo: number;
    AboutPriorityParentingMatterOrder: number;
    ReviewYourAnswersPPM: number;
    PreviewFormsPPM: number;  
}

export interface RELOCstPgTypes{
    _StepNo: number;
    
    RelocQuestionnaire: number;
    RelocChildrenInfo: number;
    RelocChildBestInterestInfo: number;
    ReviewYourAnswersRELOC: number;
    PreviewFormsRELOC: number;
}

export interface ENFRCstPgTypes{
    _StepNo: number;
    
    EnfrcQuestionnaire: number;
    DetermineAnAmountOwingForExpenses: number;
    DetermineArrears: number;
    EnforceAgreementOrOrder: number;
    EnforceChangeOrSetAsideDetermination: number;
    AboutTheOrderEnforcement: number;
    ReviewYourAnswersENFRC: number;
    PreviewForm26ENFRC: number;
    PreviewForm27ENFRC: number;
    PreviewForm28ENFRC: number;
    PreviewForm29ENFRC : number;   
}

export interface SUBMITstPgTypes{
    _StepNo: number;

    FilingOptions: number;
    ReviewAndPrint: number;
    ReviewAndSave: number;
    ReviewAndSubmit: number;
    NextSteps: number;    
}