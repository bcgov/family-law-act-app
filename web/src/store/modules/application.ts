import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { stepInfoType, pageInfoType } from "@/types/Application";
import { nameInfoType } from "@/types/Application/CommonInformation";
import { supportingDocumentInfoType, requiredDocumentsInfoType } from "@/types/Common";

import { stepsAndPagesNumberInfoType } from "@/types/Application/StepsAndPages";

@Module({
  namespaced: true
})
class Application extends VuexModule {

    public id = ""
    public types: string[] = [];
    public steps = new Array<stepInfoType>()
    public lastUpdate = null
    public lastPrinted = null
    public lastFiled = null
    public currentStep = 1    
    public userType = ""
    public userName = ""
    public userId = ""
    public version: string = "";
    public applicantName = {} as nameInfoType;
    public respondentName = {} as nameInfoType;
    public protectedPartyName = {} as nameInfoType;
    public protectedChildName = ""
    public applicationLocation = ""
    public scrollToLocationName = ""
    public requiredDocuments = {} as requiredDocumentsInfoType
    public packageNumber = ""
    public eFilingHubLink = ""
    public generatedForms: string[] = [];

    public surveyChangedPO = false;
    
    public supportingDocuments: supportingDocumentInfoType[] = [];
    public supportingDocumentForm4: number[] = [];

    public allCompleted = false;
    public pathwayCompleted = { protectionOrder:false, familyLawMatter:false, caseMgmt:false, priorityParenting:false, childReloc:false, agreementEnfrc:false} //{Protection Order, Family Law Matters, Case management, Priority parenting, Relocation of a child, Enforcement of agreements}

    public stPgNo = {} as stepsAndPagesNumberInfoType;

    @Mutation
    public init(): void {
        this.allCompleted = false;
        this.currentStep = 0;
        this.types = [];
        this.userName = "";
        this.lastPrinted = null;
        this.lastUpdate = null;
        this.lastFiled = null;
        this.packageNumber = "";
        this.eFilingHubLink = "";
        this.steps = new Array<stepInfoType>();


        // Getting started START
        let s = {} as stepInfoType;
    
        s.active = true;
        s.id = "0";
        s.name = "GETSTART";
        s.label = "Get Started";
        s.icon = "fa-users";
        s.lastUpdate = null;    
        s.type = "getInformationStep";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        let p = {} as pageInfoType;
        p.key = "0";
        p.name = "GettingStarted";
        p.label = "Getting Started";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);
    
        // Getting started STOP       
        // Protection Order START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "1";
        s.name = "PO";
        s.label = "Protection Order";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPO";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "PoQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "YourinformationPO";
        p.label = "Your Information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "2";
        p.name = "ProtectionFromWhom";
        p.label = "Protection From Whom?";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "PoFilingLocation";
        p.label = "Filing Location";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "4";
        p.name = "RemovePerson";
        p.label = "Remove person or belongings";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "5";
        p.name = "NoGo";
        p.label = "No Go";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "6";
        p.name = "NoContact";
        p.label = "No Contact";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "7";
        p.name = "WeaponsFirearms";
        p.label = "Weapons and Firearms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "8";
        p.name = "Background";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "9";
        p.name = "YourStory";
        p.label = "Your Story";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "OtherParty";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "11";
        p.name = "About";
        p.label = "About Protection Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "12";
        p.name = "Urgency";
        p.label = "Urgency";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
        p.name = "ReviewYourAnswers";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "14";
        p.name = "PreviewForms";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);
    
        //Protection Order STOP
        // Common information START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "2";
        s.name = "COMMON";
        s.label = "Your Information";
        s.icon = "fa-users";
        s.lastUpdate = null;
        s.type = "commonInformationStep";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "SafetyCheck";
        p.label = "Safety Check";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "YourInformation";
        p.label = "Your information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "OtherPartyCommon";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "Notice";
        p.label = "Notice";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "FilingLocation";
        p.label = "Filing Location";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Common Information STOP

        //Family Law Matter START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "3";
        s.name = "FLM";
        s.label = "Family Law Matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepFlm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "FlmQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "FlmBackground";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "ChildrenInfo";
        p.label = "Children Info";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


//____________Parenting Arrangements_________
        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ParentingArrangements";
        p.label = "Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "ParentalResponsibilities";
        p.label = "Parental Responsibilities";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "ParentingTime";
        p.label = "Parenting Time";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "OtherParentingArrangements";
        p.label = "Other Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.name = "ParentingOrderAgreement";
        p.label = "Parenting Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "8";
        p.name = "AboutParentingArrangements";
        p.label = "About Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "9";
        p.name = "ParentingArrangementChanges";
        p.label = "Parenting Arrangement Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "BestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


//____________Child Support__________
        p = {} as pageInfoType;
        p.key = "11";
        p.name = "ChildSupport";
        p.label = "Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "12";
        p.name = "ChildSupportCurrentArrangements";
        p.label = "Current Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
        p.name = "IncomeAndEarningPotential";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "14";
        p.name = "AboutChildSupportOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "15";
        p.name = "ChildSupportOrderAgreement";
        p.label = "Child Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "16";
        p.name = "AboutExistingChildSupport";
        p.label = "About Existing Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "17";
        p.name = "CalculatingChildSupport";
        p.label = "Calculating Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "18";
        p.name = "UndueHardship";
        p.label = "Undue Hardship";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "19";
        p.name = "SpecialAndExtraordinaryExpenses";
        p.label = "Special and Extraordinary Expenses";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "20";
        p.name = "AboutChildSupportChanges";
        p.label = "About Child Support Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "21";
        p.name = "UnpaidChildSupport";
        p.label = "Unpaid Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);



//____________Contact with a Child
        p = {} as pageInfoType;
        p.key = "22";
        p.name = "ContactWithChild";
        p.label = "Contact with a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "23";
        p.name = "ContactWithChildOrder";
        p.label = "Contact Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "24";
        p.name = "AboutContactWithChildOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "25";
        p.name = "ContactWithChildBestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Guardianship of a Child
        p = {} as pageInfoType;
        p.key = "26";
        p.name = "GuardianOfChild";
        p.label = "Guardianship of a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "27";
        p.name = "GuardianOfChildBestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "28";
        p.name = "IndigenousAncestryOfChild";
        p.label = "Indigenous Ancestry of Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Spousal Support
        p = {} as pageInfoType;
        p.key = "29";
        p.name = "SpousalSupport";
        p.label = "Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);  
        
        p = {} as pageInfoType;
        p.key = "30";
        p.name = "SpousalSupportIncomeAndEarningPotential";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "31";
        p.name = "AboutSpousalSupportOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "32";
        p.name = "ExistingSpousalSupportOrderAgreement";
        p.label = "Spousal Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "33";
        p.name = "ExistingSpousalSupportFinalOrder";
        p.label = "Existing final order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "34";
        p.name = "ExistingSpousalSupportAgreement";
        p.label = "Existing written agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "35";
        p.name = "CalculatingSpousalSupport";
        p.label = "Calculating Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "36";
        p.name = "AboutExistingSpousalSupportOrder";
        p.label = "About the order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "37";
        p.name = "UnpaidSpousalSupport";
        p.label = "Unpaid Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//______ Additional Documents
        p = {} as pageInfoType;
        p.key = "38";
        p.name = "FlmAdditionalDocuments";
        p.label = "Additional Documents";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

//____________Review
        p = {} as pageInfoType;
        p.key = "39";
        p.name = "ReviewYourAnswersFLM";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "40";
        p.name = "PreviewFormsFLM";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Family Law Matter STOP
        // Case Mgmt START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "4";
        s.name = "CM";
        s.label = "Case Management";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepCm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "CmQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "OtherPersons";
        p.label = "Other Persons";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "WithoutNoticeOrAttendance";
        p.label = "Without Notice or Attendance";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ByConsent";
        p.label = "By Consent";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "CmNotice";
        p.label = "Notice";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "Scheduling";
        p.label = "Scheduling";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "AboutCaseManagementOrder";
        p.label = "About the order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.name = "CmChildrenInfo";
        p.label = "Children";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "8";
        p.name = "AttendanceUsingElectronicCommunication";
        p.label = "Attendance Using Electronic Communication";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "9";
        p.name = "ChangingOrCancellingAServiceOrNotice";
        p.label = "Changing or Cancelling a Service or Notice";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "ChangingOrCancellingAnyOtherRequirement";
        p.label = "Changing or Cancelling Any Other Requirement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "11";
        p.name = "RequiringAccessToInformation";
        p.label = "Requiring Access to Information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "12";
        p.name = "RecognizingAnOrderFromOutsideBc";
        p.label = "Recognizing an Order from Outside BC";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
        p.name = "ContactInformationOtherParty";
        p.label = "Contact Information Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "14";
        p.name = "ReviewYourAnswersCM";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "15";
        p.name = "PreviewForm10CM";
        p.label = "Preview Form 10";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "16";
        p.name = "PreviewForm11CM";
        p.label = "Preview Form 11";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


        this.steps.push(s);
        //Case Mgmt STOP
        //Priority parenting matter START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "5";
        s.name = "PPM";
        s.label = "Priority parenting matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPpm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "PpmQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "PriorityParentingMatterOrder";
        p.label = "Priority Parenting Matter";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "PpmChildrenInfo";
        p.label = "Children Info";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "PpmBackground";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "AboutPriorityParentingMatterOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        //____________Review
        p = {} as pageInfoType;
        p.key = "5";
        p.name = "ReviewYourAnswersPPM";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "PreviewFormsPPM";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        this.steps.push(s);

        //Priority parenting matter STOP
        //Relocation of a child START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "6";
        s.name = "RELOC";
        s.label = "Relocation of a child";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepReloc";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "RelocQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "RelocChildrenInfo";
        p.label = "Children Info";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "RelocChildBestInterestInfo";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ReviewYourAnswersRELOC";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "PreviewFormsRELOC";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Relocation of a child STOP
        //Enforcement START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "7";
        s.name = "ENFRC";
        s.label = "Enforcement";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepEnfrc";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "EnfrcQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "EnforceAgreementOrOrder";
        p.label = "Enforce Agreement or Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "EnforceChangeOrSetAsideDetermination";
        p.label = "Enforce, Change or Set Aside Determination";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "DetermineAnAmountOwingForExpenses";
        p.label = "Determine an Amount Owing for Expenses";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "DetermineArrears";
        p.label = "Determine Arrears";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "AboutTheOrderEnforcement";
        p.label = "About the Order - Enforcement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "6";
        p.name = "ReviewYourAnswersENFRC";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.name = "PreviewForm26ENFRC";
        p.label = "Preview Form 26";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p); 
        
        p = {} as pageInfoType;
        p.key = "8";
        p.name = "PreviewForm27ENFRC";
        p.label = "Preview Form 27";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "9";
        p.name = "PreviewForm28ENFRC";
        p.label = "Preview Form 28";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "PreviewForm29ENFRC";
        p.label = "Preview Form 29";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Enforcement STOP
        //Submit START
        s = {} as stepInfoType;

        s.active = false;
        s.id = "8";
        s.name = "SUBMIT";
        s.label = "Review and File";
        s.icon = "fa-paper-plane";
        s.lastUpdate = null;
        s.type = "submit";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "FilingOptions";
        p.label = "Filing Options";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReviewAndPrint";
        p.label = "Review and Print";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "2";
        p.name = "ReviewAndSave";
        p.label = "Review and Save";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ReviewAndSubmit";
        p.label = "Review and Submit";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "4";
        p.name = "NextSteps";
        p.label = "Next Steps";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        //Submit STOP
        //console.log(this.steps)
        
    }
    @Action
    public UpdateInit(newVersion: string) {
        this.context.commit("init");
        this.context.commit("setVersion", newVersion)
        this.context.dispatch("UpdateStPgNo");
    }

    @Mutation
    public setVersion(version: string): void {
        this.version = version;
    }
    @Action
    public UpdateVersion(newVersion: string) {
        this.context.commit("setVersion", newVersion);
    }

    @Mutation
    public setUserType(userType): void {
        this.userType = userType;
    }
    @Action
    public UpdateUserType(newUserType) {
        this.context.commit("setUserType", newUserType);
    }
    
    @Mutation
    public  setCurrentStep(currentStep): void {
        this.currentStep = currentStep;
    }
    @Action
    public UpdateCurrentStep(newCurrentStep) {
        this.context.commit("setCurrentStep", newCurrentStep);
    }
    
    @Mutation
      public setCurrentStepPage({ currentStep, currentPage }): void {
        this.steps[currentStep].currentPage = currentPage;
    }
    @Action
    public UpdateCurrentStepPage({ currentStep, currentPage }) {
        this.context.commit("setCurrentStepPage", { currentStep, currentPage });
    }

    @Mutation
    public  setUserName(userName): void {
        this.userName = userName;
    }
    @Action
    public UpdateUserName(newUserName) {
        this.context.commit("setUserName", newUserName);
    }
    
    @Mutation
    public setUserId(userId): void {
        this.userId = userId;
    }
    @Action
    public UpdateUserId(newUserId) {
        this.context.commit("setUserId", newUserId);
    }

    @Mutation
    public setRequiredDocuments(requiredDocuments): void {
        this.requiredDocuments = requiredDocuments;
    }    
    @Action
    public UpdateRequiredDocuments(newRequiredDocuments) {
        this.context.commit("setRequiredDocuments", newRequiredDocuments);        
    }

    @Mutation
    public setRequiredDocumentsByType({typeOfRequiredDocuments, requiredDocuments }): void {
        this.requiredDocuments[typeOfRequiredDocuments] = requiredDocuments;
    }    
    @Action
    public UpdateRequiredDocumentsByType({typeOfRequiredDocuments, requiredDocuments }) {
        this.context.commit("setRequiredDocumentsByType", {typeOfRequiredDocuments, requiredDocuments });
        this.context.commit("setCommonStepResults",{data:{'requiredDocuments':this.requiredDocuments}});
    }

    @Mutation
    public setPackageNumber(packageNumber): void {
        this.packageNumber = packageNumber;
    }    
    @Action
    public UpdatePackageNumber(newPackageNumber) {
        this.context.commit("setPackageNumber", newPackageNumber);
    }

    @Mutation
    public setEFilingHubLink(eFilingHubLink): void {
        this.eFilingHubLink = eFilingHubLink;
    }    
    @Action
    public UpdateEFilingHubLink(newEFilingHubLink) {
        this.context.commit("setEFilingHubLink", newEFilingHubLink);
    }
    
    @Mutation
    public setStepActive({ currentStep, active }): void {
        this.steps[currentStep].active = active;
    }
    @Action
    public UpdateStepActive({ currentStep, active }) {
        this.context.commit("setStepActive", { currentStep, active });
    }

    @Mutation
    public gotoPrevStepPage({ prevStep, prevPage }): void {
        if (prevStep != this.currentStep) {
          this.currentStep = prevStep;
        }
    
        if (prevPage != this.steps[prevStep].currentPage) {
          this.steps[prevStep].currentPage = prevPage;
        }
        window.scrollTo(0, 0);
    }
    @Action
    public UpdateGotoPrevStepPage() {
        const prevStepPage = this.context.getters["getPrevStepPage"];
    
        if (prevStepPage != null) {
          this.context.commit("gotoPrevStepPage", prevStepPage);
        }
    }    

    @Mutation
    public gotoNextStepPage({ nextStep, nextPage }): void {
        if (nextStep != this.currentStep) {
            this.currentStep = nextStep;
        }
    
        if (nextPage != this.steps[nextStep].currentPage) {
            this.steps[nextStep].currentPage = nextPage;
        }
        window.scrollTo(0, 0);
    }    
    @Action
    public UpdateGotoNextStepPage() {
        const nextStepPage = this.context.getters["getNextStepPage"];
    
        if (nextStepPage != null) {
            this.context.commit("gotoNextStepPage", nextStepPage);
        }
    }
    
    @Mutation
    public setPageActive({ currentStep, currentPage, active }): void {
        this.steps[currentStep].pages[currentPage].active = active;
    }
    @Action
    public UpdatePageActive({ currentStep, currentPage, active }) {
        this.context.commit("setPageActive", { currentStep, currentPage, active });
    }

    @Mutation
    public setPageProgress({ currentStep, currentPage, progress }): void {
        this.steps[currentStep].pages[currentPage].progress = progress;
    }
    @Action
    public UpdatePageProgress({ currentStep, currentPage, progress }) {
        this.context.commit("setPageProgress", { currentStep, currentPage, progress });
    }

    @Mutation
    public resetStep(currentStep: number): void {
        this.steps[currentStep].result = {};
    }
    

    @Mutation
    public setStepResultData({ step, data }): void {
        step.result = {...step.result, ...data};
    }
    @Action
    public UpdateStepResultData({ step, data }) {
        this.context.commit("setScrollToLocationName","");
        this.context.commit("setStepResultData", { step, data });
    } 

    @Mutation
    public setCommonStepResults({ data }): void {
        this.steps[0].result = {...this.steps[0].result, ...data};
    }
    @Action
    public UpdateCommonStepResults({ data }) {
        this.context.commit("setCommonStepResults", { data });
    }   

    @Mutation
    public setPathwayCompletedFull(newPathwayCompleted): void {
        this.pathwayCompleted = newPathwayCompleted;
    }
    @Action
    public UpdatePathwayCompletedFull(newPathwayCompleted) {
        this.context.commit("setPathwayCompletedFull",newPathwayCompleted);
    }

    @Mutation
    public setAllCompleted(allCompleted): void {
        this.allCompleted = allCompleted;
    }
    @Action
    public checkAllCompleted() {
        let newAllCompleted = false;
        if(this.steps[0].result){
            for(const selectedform of this.steps[0].result.selectedForms){

                if(this.pathwayCompleted[selectedform]) 
                    newAllCompleted = true;
                else{
                    newAllCompleted = false;
                    break;
                }
            }            
        }
        if(!newAllCompleted)this.context.commit("setCurrentStepPage", { currentStep:this.stPgNo.SUBMIT._StepNo, currentPage:0 });
        this.context.commit("setAllCompleted", newAllCompleted)
    }

    @Mutation
    public setPathwayCompleted({pathway, isCompleted}): void {
        this.pathwayCompleted[pathway] = isCompleted;        
    }
    @Action
    public UpdatePathwayCompleted({pathway, isCompleted}) { 
        this.context.commit("setPathwayCompleted", {pathway, isCompleted}); 
        this.context.commit("setCommonStepResults",{data:{'pathwayCompleted':this.pathwayCompleted}});            
        this.context.dispatch("checkAllCompleted")
    }    
        
    @Mutation
    public setApplicantName(applicantName): void {
        this.applicantName = applicantName;
    }
    @Action
    public UpdateApplicantName(newApplicantName) {
        this.context.commit("setApplicantName", newApplicantName);
    }
    
    @Mutation
    public setRespondentName(respondentName): void {
        this.respondentName = respondentName;
    }
    @Action
    public UpdateRespondentName(newRespondentName) {
        this.context.commit("setRespondentName", newRespondentName);
    }
    
    @Mutation
    public setProtectedPartyName(protectedPartyName): void {
        this.protectedPartyName = protectedPartyName;
    }
    @Action
    public UpdateProtectedPartyName(newProtectedPartyName) {
        this.context.commit("setProtectedPartyName", newProtectedPartyName);
    }  
    
    @Mutation
    public setProtectedChildName(protectedChildName): void {
        this.protectedChildName = protectedChildName;
    }
    @Action
    public UpdateProtectedChildName(newProtectedChildName) {
        this.context.commit("setProtectedChildName", newProtectedChildName);
    }

    @Mutation
    public setApplicationLocation(applicationLocation): void {
        this.applicationLocation = applicationLocation;
    }
    @Action
    public UpdateApplicationLocation(newApplicationLocation) {
        this.context.commit("setApplicationLocation", newApplicationLocation);
    }
    
    @Mutation
    public setApplicationId(id): void {
        this.id = id;
    }
    @Action
    public UpdateApplicationId(newId) {
        this.context.commit("setApplicationId", newId);
    }

    @Mutation
    public setApplicationType(type): void {
        this.types = type;
    }
    @Action
    public UpdateApplicationType(newType) {
        this.context.commit("setApplicationType", newType);
    }
    
    @Mutation
    public setLastUpdated(lastUpdated): void {
        this.lastUpdate = lastUpdated;
    }
    @Action
    public UpdateLastUpdated(newLastUpdated) {
        this.context.commit("setLastUpdated", newLastUpdated);
    }
    
    @Mutation
    public setLastPrinted(lastPrinted): void {
        this.lastPrinted = lastPrinted;
    }
    @Action
    public UpdateLastPrinted(newLastPrinted) {
        this.context.commit("setLastPrinted", newLastPrinted);
    }

    @Mutation
    public setLastFiled(lastFiled): void {
        this.lastFiled = lastFiled;
    }
    @Action
    public UpdateLastFiled(newLastFiled) {
        this.context.commit("setLastFiled", newLastFiled);
    }

    @Mutation
    public setScrollToLocationName(scrollToLocationName): void {
        this.scrollToLocationName = scrollToLocationName;
    }
    @Action
    public UpdateScrollToLocationName(newScrollToLocationName) {
        this.context.commit("setScrollToLocationName", newScrollToLocationName);
    }

    @Mutation
    public setSupportingDocuments(supportingDocuments): void {
        this.supportingDocuments = supportingDocuments;
    }
    @Action
    public UpdateSupportingDocuments(newSupportingDocuments) {
        this.context.commit("setSupportingDocuments", newSupportingDocuments);
    }

    @Mutation
    public setSupportingDocumentForm4(supportingDocumentForm4): void {
        this.supportingDocumentForm4 = supportingDocumentForm4;
    }
    @Action
    public UpdateSupportingDocumentForm4(newSupportingDocumentForm4) {
        this.context.commit("setSupportingDocumentForm4", newSupportingDocumentForm4);        
    }

    @Mutation
    public setGeneratedForms(generatedForms): void {
        this.generatedForms = generatedForms;
    }
    @Action
    public UpdateGeneratedForms(newGeneratedForms) {
        this.context.commit("setGeneratedForms", newGeneratedForms);
    }

    @Mutation
    public setStPgNo(stPgNo): void {
        this.stPgNo = stPgNo;
    }
    @Action
    public UpdateStPgNo(newStPgNo) {
        const stepsAndPagesNumber = {GETSTART: {}, PO: {}, COMMON: {}, FLM: {}, CM: {}, PPM: {}, RELOC: {}, ENFRC: {}, SUBMIT: {}} as stepsAndPagesNumberInfoType
        const steps = this.steps
        for(const step of steps){
            stepsAndPagesNumber[step.name]._StepNo = Number(step.id)           
            for(const page of step.pages){
                stepsAndPagesNumber[step.name][page.name] = Number(page.key)
            }
        }
        this.context.commit("setStPgNo", stepsAndPagesNumber);
    }

    @Mutation
    public setSurveyChangedPO(surveyChangedPO: boolean): void {
        this.surveyChangedPO = surveyChangedPO;
    }
    @Action
    public UpdateSurveyChangedPO(newSurveyChangedPO: boolean) {
        const stepPO = this.stPgNo.PO._StepNo
        const reviewPagePO = this.stPgNo.PO.ReviewYourAnswers
        const previewPagePO = this.stPgNo.PO.PreviewForms
        this.context.commit("setSurveyChangedPO", newSurveyChangedPO);
        if(newSurveyChangedPO && this.steps[stepPO].pages[reviewPagePO].progress ==100 ){//if changes, make review page incompelete
            this.context.commit("setPageProgress", { currentStep: stepPO, currentPage:reviewPagePO, progress:50 });
            this.context.commit("setPageActive", { currentStep: stepPO, currentPage: previewPagePO, active: false });
        
            if(this.steps[stepPO].pages[previewPagePO].progress ==100) this.context.commit("setPageProgress", { currentStep: stepPO, currentPage:previewPagePO, progress:50 });
        }  
        
        
        this.context.commit("resetStep", this.stPgNo.SUBMIT._StepNo);
        const submitTotalPages = (Object.keys(this.stPgNo.SUBMIT).length -1)
        for (let i=1; i<submitTotalPages; i++) {
            this.context.commit("setPageActive",   { currentStep: this.stPgNo.SUBMIT._StepNo, currentPage: i, active: false });
            this.context.commit("setPageProgress", { currentStep: this.stPgNo.SUBMIT._StepNo, currentPage: i, progress:0 });
        }
        
    }

    @Mutation
    public setCurrentApplication(application): void {
        this.id = application.id;    
        this.types = application.types;    
        this.steps = application.steps;
        this.lastUpdate = application.lastUpdate;    
        this.currentStep = application.currentStep;
        this.allCompleted = application.allCompleted;
        this.lastPrinted = application.lastPrinted;
        this.userType = application.userType;
        this.userName = application.userName;
        this.applicantName = application.applicantName;
        this.respondentName = application.respondentName; 
        this.protectedPartyName = application.protectedPartyName;
        this.protectedChildName = application.protectedChildName;
        this.applicationLocation = application.applicationLocation;  
        this.lastFiled = application.lastFiled;
        this.version = application.version;
    }
    @Action
    public UpdateCurrentApplication(newApplication) {
        this.context.commit("setCurrentApplication", newApplication);
    }


    get getPrevStepPage(): { prevStep: number; prevPage: number } {

        let prevStepPage: { prevStep: number; prevPage: number };    
        let sIndex = Number(this.currentStep);
        let pIndex = Number(this.steps[sIndex].currentPage) - 1;
    
        while (prevStepPage == null && sIndex >= 0) {
            const s = this.steps[sIndex];
        
            if (s.active) {
                while (prevStepPage == null && pIndex >= 0) {
                    if (s.pages[pIndex].active) {
                        prevStepPage = { prevStep: sIndex, prevPage: pIndex };
                    } else {
                        pIndex--;
                    }
                }
            }
        
            // go to previous step
            sIndex--;
        
            if (sIndex >= 0) {
                pIndex = this.steps[sIndex].pages.length - 1;
            }
        }
    
        return prevStepPage;
    }

    get getNextStepPage(): { nextStep: number; nextPage: number } {

        let nextStepPage: { nextStep: number; nextPage: number };    
        let sIndex = Number(this.currentStep);       
        let pIndex = Number(this.steps[sIndex].currentPage) + 1;
        
        while (nextStepPage == null && sIndex < this.steps.length) {
            const s = this.steps[sIndex];
        
            if (s.active) {
                while (nextStepPage == null && pIndex < s.pages.length) {
                    if (s.pages[pIndex] && s.pages[pIndex].active) {
                        nextStepPage = { nextStep: sIndex, nextPage: pIndex };
                    } else {
                        pIndex++;
                    }
                }
            }
    
            // go to next step
            sIndex++;
    
            if (sIndex < this.steps.length) {
                pIndex = 0;
            }
        }

        return nextStepPage;
    }

}

export default Application