//_______________________Migration_Rule________________________________
//  1. Step names (s.name) should not have duplicates.
//  2. Page names and page results must match: 
//      - assume  page name (p.name) is `PageName`
//      - then survey name must be `pageNameSurvey` first letter is lowercase and add Survey at the end. 
//_____________________________________________________________________

export interface stepsAndPagesNumberInfoType{
    GETSTART: GETSTARTstPgTypes;
    PO: POstPgTypes;
    COMMON: COMMONstPgTypes;
    RFLM: RFLMstPgTypes;
    WR: WRstPgTypes;
    CA: CAstPgTypes;    
    FLM: FLMstPgTypes;
    CM: CMstPgTypes;
    PPM: PPMstPgTypes;
    RELOC: RELOCstPgTypes;
    ENFRC: ENFRCstPgTypes;
    CONNECT: CONNECTstPgTypes;
    OTHER: OTHERstPgTypes;
    NCD: NCDstPgTypes;
    NDT: NDTstPgTypes;    
    NPR: NPRstPgTypes;    
    RQS: RQSstPgTypes;
    TRIS: TRISstPgTypes;
    NLC: NLCstPgTypes;
    NLCR: NLCRstPgTypes;
    NLP: NLPstPgTypes;
    NLPR: NLPRstPgTypes;
    AFF: AFFstPgTypes;
    GA: GAstPgTypes;
    SUBMIT: SUBMITstPgTypes;
}
 
export interface GETSTARTstPgTypes{
    _StepNo: number;   
    
    SelectActivity: number;
    ReplyToApplication: number;
    GettingStarted: number; // Apply for an order
    FlmInfo: number;
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

export interface RFLMstPgTypes{
    _StepNo: number;  

    RflmQuestionnaire: number;
    RflmCounterApp: number;
    RflmBackground: number;
    RflmChildrenInfo: number;  
    ReplyNewParentingArrangements: number;
    ReplyNewParentalResponsibilities: number;
    ReplyNewParentingTime: number;
    ReplyNewConditionsParentingTime: number;
    ReplyExistingParentingArrangements: number;
    ReplyNewChildSupport: number;
    RelationshipToChild: number;
    DisagreeChildSupport: number;
    RflmCalculatingChildSupport: number;
    ReplyExistingChildSupport: number;
    RflmUnpaidChildSupport: number;
    DisagreeExistingChildSupport: number; 
    ReplyNewContactWithChild: number;
    DisagreeContactWithChild: number;
    ReplyExistingContactWithChild: number;
    ReplyAppointingGuardianOfChild: number;
    DisagreeAppointingGuardianOfChild: number;
    ReplyCancellingGuardianOfChild: number;
    DisagreeCancellingGuardianOfChild: number;
    ReplyNewSpouseSupport: number;
    RelationshipToOtherParty: number;
    DisagreeSpouseSupport: number;
    RflmSpouseSupportOrder: number;
    RflmCalculatingSpouseSupport: number;
    ReplyExistingSpouseSupport: number;
    RflmUnpaidSpouseSupport: number;
    DisagreeExistingSpouseSupport: number;
    ReplyNewPropertyDivision: number;
    AnimalRelationshipToOtherParty: number;
    DisagreePropertyDivision: number;
    PropertyDivisionOrder: number;
    ReplyExistingPropertyDivision: number;
    DisagreeExistingPropertyDivisionOrder: number;
    RflmAdditionalDocuments: number;
    YourApplication: number;
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
    PropertyDivisionCompanionAnimal: number;
    CompanionAnimalFacts: number;
    CompanionAnimalExistingAgreement: number;
    FlmAdditionalDocuments: number;
    ReviewYourAnswersRFLM: number;
    PreviewFormsRFLM: number; 
}

export interface WRstPgTypes{
    _StepNo: number;  

    WrReplyingToApplication: number;  
    AgreeDisagree: number;
    AboutWrittenResponseOrder: number; 

    ReviewYourAnswersWR: number;
    PreviewFormsWR: number;
}

export interface CAstPgTypes{
    _StepNo: number;  

    CounterApplication: number;   
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
    PropertyDivisionCompanionAnimal: number;
    CompanionAnimalFacts: number;
    CompanionAnimalExistingAgreement: number;
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
    ApplicationUnderFOAEAA: number;
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
    PpmIndigenousAncestryOfChild: number;
    PpmAdditionalDocuments: number;
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
    PreviewForm29ENFRC: number;   
}

export interface CONNECTstPgTypes{
    _StepNo: number;
    
    ReviewAndConnect: number;   
}

export interface OTHERstPgTypes{
    _StepNo: number;

    OtherForms: number; 
    CompleteOtherForms: number;   
    OtherFormsFilingLocation: number;
}

export interface NCDstPgTypes{
    _StepNo: number;
    
    AddressChange: number;
    AddressChangeNotice: number; 
    ReviewYourAnswersNCD: number;
    PreviewFormsNCD: number;
}

export interface NDTstPgTypes{
    _StepNo: number;    
    
    NoticeDiscontinuance: number;
    DiscontinuanceInformation: number;
    MoreInformation: number;
    ReviewYourAnswersNDT: number;
    PreviewFormsNDT: number;
}

export interface NPRstPgTypes{
    _StepNo: number;

    NoticeIntentionProceed: number;
    YourInformationNpr: number;    
    OtherPartyNpr: number;
    ReviewYourAnswersNPR: number;
    PreviewFormsNPR: number;
}

export interface RQSstPgTypes{
    _StepNo: number;

    RequestForScheduling: number;
    ReasonForScheduling: number;
    InterimOrder: number;
    NextAppearance: number;
    PartyInformationRQS: number;  
    ReviewYourAnswersRQS: number;
    PreviewFormsRQS: number;
}

export interface TRISstPgTypes{
    _StepNo: number;

    TrialReadinessStatement: number;
    PeopleAtTrial: number;
    IssuesForTrial: number;
    BackgroundTris: number;
    DisclosureOfInformation: number; 
    Witnesses: number;
    RequirementsAndConsiderations: number;
    AboutTheTrial: number;
    OrdersAtTpc: number;   
    ReviewYourAnswersTRIS: number;
    PreviewFormsTRIS: number;
}

export interface NLCstPgTypes{
    _StepNo: number;

    NoticeLawyerChild: number;  
    ReviewYourAnswersNLC: number;
    PreviewFormsNLC: number;
}

export interface NLCRstPgTypes{
    _StepNo: number;

    NoticeRemoveLawyerChild: number;   
    ReviewYourAnswersNLCR: number;
    PreviewFormsNLCR: number;
}

export interface AFFstPgTypes{
    _StepNo: number;

    Affidavit: number;
    AboutAffiant: number;
    YourStoryAFF: number;
    FilingAFF: number;
    ElectronicFilingStatementAFF: number;
    ReviewYourAnswersAFF: number;
    PreviewFormsAFF: number;
    PreviewFormsEFSP: number;
}

export interface NLPstPgTypes{
    _StepNo: number;

    NoticeLawyerParty: number;    
    ReviewYourAnswersNLP: number;
    PreviewFormsNLP: number;
}

export interface NLPRstPgTypes{
    _StepNo: number;

    NoticeRemoveLawyerParty: number;
    ReviewYourAnswersNLPR: number;
    PreviewFormsNLPR: number;
}

export interface GAstPgTypes{
    _StepNo: number;

    GuardianshipAffidavit: number;
    AboutAffiantGa: number;
    ChildrenDetailsGa: number;
    CaringForChildGa: number;
    BackgroundFamilyViolence: number;
    BackgroundCivilCourtProceedings: number;
    BackgroundCriminalHistory: number;
    Exhibits: number;
    FilingGA: number;
    ElectronicFilingStatementGA: number;
    ReviewYourAnswersGA: number;
    PreviewFormsGA: number;
    PreviewFormsGaEFSP: number;
}

export interface SUBMITstPgTypes{
    _StepNo: number;

    FilingOptions: number;
    ReviewAndPrint: number;
    ReviewAndSave: number;
    ReviewAndSubmit: number;
    OtherFile: number;
    ResubmitAttachments: number;
    NextSteps: number;    
}