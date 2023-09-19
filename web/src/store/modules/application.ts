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
    public loggedInUserName = {} as nameInfoType;
    public userId = ""
    public version = "";
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
    public rflmRequiredDocsRequests = [];
    public rflmRequiredDocsRequestsUpdateCounter = 0;

    public rejectedPathway = false;
    public rejectedFileNumber = "";
    public rejectedFormsList = [];

    public surveyChangedPO = false;
    
    public supportingDocuments: supportingDocumentInfoType[] = [];
    public supportingDocumentForm4: number[] = [];

    public allCompleted = false;
    public pathwayCompleted = { 
        protectionOrder:false, 
        replyFlm: false, 
        writtenResponse: false, 
        replyCounterApplication: false, 
        familyLawMatter:false, 
        caseMgmt:false, 
        priorityParenting:false, 
        childReloc:false, 
        agreementEnfrc:false,
        other: false,
        noticeOfAddressChange: false,
        noticeDiscontinuance: false,
        noticeIntentionProceed: false,        
        requestScheduling: false,
        trialReadinessStatement: false,   
        noticeLawyerChild: false,
        noticeRemoveLawyerChild: false,
        noticeLawyerParty: false,
        noticeRemoveLawyerParty: false             
    }

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
        this.rejectedPathway = false;
        this.rejectedFileNumber = "";
        this.rejectedFormsList = [];

        // Getting started START
        let s = {} as stepInfoType;
    
        s.active = true;
        s.id = "0";
        s.name = "GETSTART";
        s.label = "Get Started";
        s.icon = "fa fa-rocket";
        s.lastUpdate = null;    
        s.type = "getInformationStep";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        let p = {} as pageInfoType;
        p.key = "0";
        p.name = "SelectActivity";
        p.label = "Getting Started";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReplyToApplication";
        p.label = "Reply to an Application";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "GettingStarted";
        p.label = "Apply for an Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "FlmInfo";
        p.label = "Did You Know?";
        p.active = false;
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
        s.icon = "fa fa-child";
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
        p.label = "Remove Person or Belongings";
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
        s.icon = "fa fa-users";
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
        p.label = "Your Information";
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

        // Reply Family Law Matter START
        s = {} as stepInfoType;
    
        s.active = false;
        s.id = "3";
        s.name = "RFLM";
        s.label = "Reply to Family Law Matter";
        s.icon = "fa fa-reply-all";
        s.lastUpdate = null;    
        s.type = "stepRFLM";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "RflmQuestionnaire";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "RflmCounterApp";
        p.label = "Counter Application";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "RflmBackground";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "RflmChildrenInfo";
        p.label = "Children Info";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "ReplyNewParentingArrangements";
        p.label = "Reply New Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "ReplyNewParentalResponsibilities";
        p.label = "Reply New Parental Responsibilities";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "ReplyNewParentingTime";
        p.label = "Reply New Parenting Time";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.name = "ReplyNewConditionsParentingTime";
        p.label = "Reply New Conditions Parenting Time";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "8";
        p.name = "ReplyExistingParentingArrangements";
        p.label = "Reply Existing Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "9";
        p.name = "ReplyNewChildSupport";
        p.label = "Reply New Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "RelationshipToChild";
        p.label = "Relationship To Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "11";
        p.name = "DisagreeChildSupport";
        p.label = "Disagree Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "12";
        p.name = "ReplyExistingChildSupport";
        p.label = "Reply Existing Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
        p.name = "RflmUnpaidChildSupport";
        p.label = "Unpaid Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "14";
        p.name = "DisagreeExistingChildSupport";
        p.label = "Disagree Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "15";
        p.name = "RflmCalculatingChildSupport";
        p.label = "Calculating Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "16";
        p.name = "ReplyNewContactWithChild";
        p.label = "Reply New Contact With Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "17";
        p.name = "DisagreeContactWithChild";
        p.label = "Disagree Contact With Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "18";
        p.name = "ReplyExistingContactWithChild";
        p.label = "Reply Existing Contact With Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "19";
        p.name = "ReplyAppointingGuardianOfChild";
        p.label = "Reply Appointing a Guardian of a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "20";
        p.name = "DisagreeAppointingGuardianOfChild";
        p.label = "Disagree Appointing a Guardian";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "21";
        p.name = "ReplyCancellingGuardianOfChild";
        p.label = "Reply Cancelling a Guardian of a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "22";
        p.name = "DisagreeCancellingGuardianOfChild";
        p.label = "Disagree Cancelling a Guardian";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "23";
        p.name = "ReplyNewSpouseSupport";
        p.label = "Reply New Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "24";
        p.name = "RelationshipToOtherParty";
        p.label = "Relationship to Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "25";
        p.name = "DisagreeSpouseSupport";
        p.label = "Disagree – Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "26";
        p.name = "RflmSpouseSupportOrder";
        p.label = "Spousal Support Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "27";
        p.name = "ReplyExistingSpouseSupport";
        p.label = "Reply Existing Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "28";
        p.name = "RflmUnpaidSpouseSupport";
        p.label = "Unpaid Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "29";
        p.name = "DisagreeExistingSpouseSupport";
        p.label = "Disagree Existing Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "30";
        p.name = "RflmCalculatingSpouseSupport";
        p.label = "Calculating Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "31";
        p.name = "RflmAdditionalDocuments";
        p.label = "Additional Documents";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "32";
        p.name = "YourApplication";
        p.label = "Your Application";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Parenting Arrangements_________
        p = {} as pageInfoType;
        p.key = "33";
        p.name = "ParentingArrangements";
        p.label = "Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "34";
        p.name = "ParentalResponsibilities";
        p.label = "Parental Responsibilities";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "35";
        p.name = "ParentingTime";
        p.label = "Parenting Time";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "36";
        p.name = "OtherParentingArrangements";
        p.label = "Other Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "37";
        p.name = "ParentingOrderAgreement";
        p.label = "Parenting Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "38";
        p.name = "AboutParentingArrangements";
        p.label = "About Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "39";
        p.name = "ParentingArrangementChanges";
        p.label = "Parenting Arrangement Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "40";
        p.name = "BestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


//____________Child Support__________
        p = {} as pageInfoType;
        p.key = "41";
        p.name = "ChildSupport";
        p.label = "Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "42";
        p.name = "ChildSupportCurrentArrangements";
        p.label = "Current Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "43";
        p.name = "IncomeAndEarningPotential";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "44";
        p.name = "AboutChildSupportOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "45";
        p.name = "ChildSupportOrderAgreement";
        p.label = "Child Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "46";
        p.name = "AboutExistingChildSupport";
        p.label = "About Existing Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "47";
        p.name = "CalculatingChildSupport";
        p.label = "Calculating Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "48";
        p.name = "UndueHardship";
        p.label = "Undue Hardship";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "49";
        p.name = "SpecialAndExtraordinaryExpenses";
        p.label = "Special and Extraordinary Expenses";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "50";
        p.name = "AboutChildSupportChanges";
        p.label = "About Child Support Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "51";
        p.name = "UnpaidChildSupport";
        p.label = "Unpaid Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);



//____________Contact with a Child
        p = {} as pageInfoType;
        p.key = "52";
        p.name = "ContactWithChild";
        p.label = "Contact with a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "53";
        p.name = "ContactWithChildOrder";
        p.label = "Contact Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "54";
        p.name = "AboutContactWithChildOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "55";
        p.name = "ContactWithChildBestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Guardianship of a Child
        p = {} as pageInfoType;
        p.key = "56";
        p.name = "GuardianOfChild";
        p.label = "Guardianship of a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "57";
        p.name = "GuardianOfChildBestInterestsOfChild";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "58";
        p.name = "IndigenousAncestryOfChild";
        p.label = "Indigenous Ancestry of Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Spousal Support
        p = {} as pageInfoType;
        p.key = "59";
        p.name = "SpousalSupport";
        p.label = "Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);  
        
        p = {} as pageInfoType;
        p.key = "60";
        p.name = "SpousalSupportIncomeAndEarningPotential";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "61";
        p.name = "AboutSpousalSupportOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "62";
        p.name = "ExistingSpousalSupportOrderAgreement";
        p.label = "Spousal Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "63";
        p.name = "ExistingSpousalSupportFinalOrder";
        p.label = "Existing Final Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "64";
        p.name = "ExistingSpousalSupportAgreement";
        p.label = "Existing Written Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "65";
        p.name = "CalculatingSpousalSupport";
        p.label = "Calculating Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "66";
        p.name = "AboutExistingSpousalSupportOrder";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "67";
        p.name = "UnpaidSpousalSupport";
        p.label = "Unpaid Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//______ Additional Documents
        p = {} as pageInfoType;
        p.key = "68";
        p.name = "FlmAdditionalDocuments";
        p.label = "Additional Documents";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "69";
        p.name = "ReviewYourAnswersRFLM";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "70";
        p.name = "PreviewFormsRFLM";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Reply Family Law Matter STOP

        // Written Response to Application START
        s = {} as stepInfoType;

        s.active = false;
        s.id = "4";
        s.name = "WR";
        s.label = "Written Response to Application";
        s.icon = "fa fa-pencil";
        s.lastUpdate = null;    
        s.type = "stepWR";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "WrReplyingToApplication";
        p.label = "Replying to Application";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "AgreeDisagree";
        p.label = "Agree or Disagree";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "AboutWrittenResponseOrder";
        p.label = "About the Order";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ReviewYourAnswersWR";
        p.label = "Review Your Answers";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "PreviewFormsWR";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
 
        this.steps.push(s);
 
        // Written Response to Application STOP

        // Reply to Counter Application START
        s = {} as stepInfoType;

        s.active = false;
        s.id = "5";
        s.name = "CA";
        s.label = "Reply to Counter Application";
        s.icon = "fa fa-reply";
        s.lastUpdate = null;    
        s.type = "stepCA";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "CounterApplication";
        p.label = "Reply to Counter Application";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);
 
        this.steps.push(s);
 
        // Reply to Counter Application STOP

        //Family Law Matter START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "6";
        s.name = "FLM";
        s.label = "Family Law Matter";
        s.icon = "fa fa-child";
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
        p.label = "Existing Final Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "34";
        p.name = "ExistingSpousalSupportAgreement";
        p.label = "Existing Written Agreement";
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
        p.label = "About the Order";
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
        s.id = "7";
        s.name = "CM";
        s.label = "Case Management";
        s.icon = "fa fa-child";
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
        p.label = "About the Order";
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
        p.label = "Attendance Using Another Method of Attendance";
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
        s.id = "8";
        s.name = "PPM";
        s.label = "Priority Parenting Matter";
        s.icon = "fa fa-child";
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
        
        p = {} as pageInfoType;
        p.key = "5";
        p.name = "PpmIndigenousAncestryOfChild";
        p.label = "Indigenous Ancestry of Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //______ Additional Documents
        p = {} as pageInfoType;
        p.key = "6";
        p.name = "PpmAdditionalDocuments";
        p.label = "Additional Documents";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "7";
        p.name = "ReviewYourAnswersPPM";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "8";
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
        s.id = "9";
        s.name = "RELOC";
        s.label = "Relocation of a Child";
        s.icon = "fa fa-child";
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
        s.id = "10";
        s.name = "ENFRC";
        s.label = "Enforcement";
        s.icon = "fa fa-child";
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
        //Connect START  
        s = {} as stepInfoType;
        s.active = false;
        s.id = "11";
        s.name = "CONNECT";
        s.label = "Review and Connect";
        s.icon = "fas fa-user-friends";
        s.lastUpdate = null;
        s.type = "connect";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "ReviewAndConnect";
        p.label = "Review and Connect";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);

        this.steps.push(s);

        // Connect STOP
        //Admin forms START

        s = {} as stepInfoType;

        s.active = false;
        s.id = "12";
        s.name = "OTHER";
        s.label = "Other Forms";
        s.icon = "fa fa-pencil";
        s.lastUpdate = null;
        s.type = "other";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.name = "OtherForms";
        p.label = "Other Forms";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "CompleteOtherForms";
        p.label = "Complete Other Forms";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "2";
        p.name = "OtherFormsFilingLocation";
        p.label = "Other Form Filing Location";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p); 
    
        this.steps.push(s);

        // OTHER Stop

        // Address Change START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "13";
        s.name = "NCD";
        s.label = "Address Change";
        s.icon = "fa fa-envelope";
        s.lastUpdate = null;
        s.type = "addressChange";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "AddressChange";
        p.label = "Address Change";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "AddressChangeNotice";
        p.label = "Notice";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        //____________Review
        p = {} as pageInfoType;
        p.key = "2";
        p.name = "ReviewYourAnswersNCD";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
        p.name = "PreviewFormsNCD";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Address Change STOP

        // Discontinuance START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "14";
        s.name = "NDT";
        s.label = "Notice of Discontinuance";
        s.icon = "fa fa-ban";
        s.lastUpdate = null;
        s.type = "discontinuance";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeDiscontinuance";
        p.label = "Notice of Discontinuance";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "DiscontinuanceInformation";
        p.label = "Discontinuance Information ";        
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);   
        
        p = {} as pageInfoType;
        p.key = "2";        
        p.name = "MoreInformation";
        p.label = "More Information ";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ReviewYourAnswersNDT";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "PreviewFormsNDT";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Discontinuance STOP

        // Intention to Proceed START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "15";
        s.name = "NPR";
        s.label = "Notice of Intention to Proceed";
        s.icon = "fa fa-forward";
        s.lastUpdate = null;
        s.type = "noticeIntentionProceed";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeIntentionProceed";
        p.label = "Intention to Proceed";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "YourInformationNpr";
        p.label = "Your Information ";        
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);   

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "OtherPartyNpr";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "3";
        p.name = "ReviewYourAnswersNPR";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.name = "PreviewFormsNPR";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Intention to Proceed STOP        

        
        // Request for Scheduling START

        s = {} as stepInfoType;    
        s.active = false;        
        s.id = "16";
        s.name = "RQS";
        s.label = "Request for Scheduling";
        s.icon = "fa fa-calendar";
        s.lastUpdate = null;
        s.type = "requestScheduling";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "RequestForScheduling";
        p.label = "Request for Scheduling";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReasonForScheduling";
        p.label = "Reason for Scheduling";        
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);   

        p = {} as pageInfoType;
        p.key = "2";        
        p.name = "InterimOrder";
        p.label = "Interim Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";        
        p.name = "NextAppearance";
        p.label = "Next Appearance";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "4";        
        p.name = "PartyInformationRQS";
        p.label = "Party Information ";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
 
        //____________Review
        p = {} as pageInfoType;
        p.key = "5";
        p.name = "ReviewYourAnswersRQS";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.name = "PreviewFormsRQS";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
 
        this.steps.push(s);
        
        // Request for Scheduling STOP

        // Trial Readiness Statement START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "17";
        s.name = "TRIS";
        s.label = "Trial Readiness Statement";
        s.icon = "fa fa-file-text";
        s.lastUpdate = null;
        s.type = "trialReadinessStatement";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "TrialReadinessStatement";
        p.label = "Trial Readiness Statement";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "1";
        p.name = "PeopleAtTrial";
        p.label = "People At Trial";        
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);   

        p = {} as pageInfoType;
        p.key = "2";        
        p.name = "IssuesForTrial";
        p.label = "Issues For Trial";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";        
        p.name = "BackgroundTris";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "4";        
        p.name = "DisclosureOfInformation";
        p.label = "Disclosure Of Information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";        
        p.name = "Witnesses";
        p.label = "Witnesses";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";        
        p.name = "RequirementsAndConsiderations";
        p.label = "Requirements And Considerations";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";        
        p.name = "AboutTheTrial";
        p.label = "About The Trial";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "8";        
        p.name = "OrdersAtTpc";
        p.label = "Orders at TPC";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
 
        //____________Review
        p = {} as pageInfoType;
        p.key = "9";
        p.name = "ReviewYourAnswersTRIS";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.name = "PreviewFormsTRIS";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
 
        this.steps.push(s);

        // Trial Readiness Statement STOP

        // Notice of Lawyer for Child START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "18";
        s.name = "NLC";
        s.label = "Notice of Lawyer for Child";
        s.icon = "fa fa-exclamation-circle";
        s.lastUpdate = null;
        s.type = "lawyerChild";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0; 

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeLawyerChild";
        p.label = "Notice of Lawyer for Child";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p); 

        //____________Review
        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReviewYourAnswersNLC";
        p.label = "Review Your Answers";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "PreviewFormsNLC";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Notice of Lawyer for Child STOP  

        // Notice of Removal of Lawyer for Child START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "19";
        s.name = "NLCR";
        s.label = "Notice of Removal of Lawyer for Child";
        s.icon = "fa fa-exclamation-circle";
        s.lastUpdate = null;
        s.type = "removeLawyerChild";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeRemoveLawyerChild";
        p.label = "Notice of Removal of Lawyer for Child";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);       

        //____________Review
        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReviewYourAnswersNLCR";
        p.label = "Review Your Answers";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "PreviewFormsNLCR";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Notice of Removal of Lawyer for Child STOP              

        // Notice of Lawyer for Party START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "20";
        s.name = "NLP";
        s.label = "Notice of Lawyer for Party";
        s.icon = "fa fa-exclamation-circle";
        s.lastUpdate = null;
        s.type = "lawyerParty";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeLawyerParty";
        p.label = "Notice of Lawyer for Party";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);       
        
        //____________Review
        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReviewYourAnswersNLP";
        p.label = "Review Your Answers";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "PreviewFormsNLP";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Notice of Lawyer for Party STOP


        // Notice of Removal of Lawyer for Party START

        s = {} as stepInfoType;    
        s.active = false;
        s.id = "21";
        s.name = "NLPR";
        s.label = "Notice of Removal of Lawyer for Party";
        s.icon = "fa fa-exclamation-circle";
        s.lastUpdate = null;
        s.type = "removeLawyerParty";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.name = "NoticeRemoveLawyerParty";
        p.label = "Notice of Removal of Lawyer for Party";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);        

        // p = {} as pageInfoType;
        // p.key = "1";
        // p.name = "RemoveLawyerPartyInformation";
        // p.label = "Notice of Removal of Lawyer for Party Information ";        
        // p.active = true;
        // p.progress = 0;    
        // s.pages.push(p);   

        // p = {} as pageInfoType;
        // p.key = "2";        
        // p.name = "MoreInformationNLPR";
        // p.label = "More Information";
        // p.active = false;
        // p.progress = 0;    
        // s.pages.push(p);

        //____________Review
        p = {} as pageInfoType;
        p.key = "1";
        p.name = "ReviewYourAnswersNLPR";
        p.label = "Review Your Answers";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.name = "PreviewFormsNLPR";
        p.label = "Preview Forms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        // Notice of Removal of Lawyer for Party STOP

        //Submit START
        s = {} as stepInfoType;
        s.active = false;        
        s.id = "22";
        s.name = "SUBMIT";
        s.label = "Review and File";
        s.icon = "fa fa-paper-plane";
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
        p.name = "OtherFile";
        p.label = "File";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.name = "ResubmitAttachments";
        p.label = "Resubmit Attachments";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "6";
        p.name = "NextSteps";
        p.label = "Next Steps";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        //Submit STOP
        
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
    public  setLoggedInUserName(loggedInUserName: nameInfoType): void {
        this.loggedInUserName = loggedInUserName;
    }

    @Action
    public UpdateLoggedInUserName(newLoggedInUserName: nameInfoType) {
        this.context.commit("setLoggedInUserName", newLoggedInUserName);
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
    public  setRejectedPathway(rejectedPathway: boolean): void {
        this.rejectedPathway = rejectedPathway;
    }
    @Action
    public UpdateRejectedPathway(newRejectedPathway: boolean) {
        this.context.commit("setRejectedPathway", newRejectedPathway);
    }

    @Mutation
    public  setRejectedFileNumber(rejectedFileNumber): void {
        this.rejectedFileNumber = rejectedFileNumber;
    }
    @Action
    public UpdateRejectedFileNumber(newRejectedFileNumber) {
        this.context.commit("setRejectedFileNumber", newRejectedFileNumber);
    }

    @Mutation
    public  setRejectedFormsList(rejectedFormsList): void {
        this.rejectedFormsList = rejectedFormsList;
    }
    @Action
    public UpdateRejectedFormsList(newRejectedFormsList) {
        this.context.commit("setRejectedFormsList", newRejectedFormsList);
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
    public setRflmRequiredDocsRequests(rflmRequiredDocsRequests): void {
        this.rflmRequiredDocsRequests = rflmRequiredDocsRequests;
    }    
    @Action
    public UpdateRflmRequiredDocsRequests(newRflmRequiredDocsRequests) {
        this.context.commit("setRflmRequiredDocsRequests", newRflmRequiredDocsRequests);
        //this.context.commit("setCommonStepResults",{data:{'rflmRequiredDocsRequests':this.rflmRequiredDocsRequests}});
    }
    @Mutation
    public setRflmRequiredDocsRequestsUpdateCounter(rflmRequiredDocsRequestsUpdateCounter): void {
        this.rflmRequiredDocsRequestsUpdateCounter = rflmRequiredDocsRequestsUpdateCounter;
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
        //TODO: check the other forms pathway and each one of the corresponding pathways as well
        if(this.steps[0].result?.selectedForms){
            for(const selectedform of this.steps[0].result.selectedForms){

                if(this.pathwayCompleted[selectedform]) 
                    newAllCompleted = true;
                else{
                    newAllCompleted = false;
                    break;
                }
            }            
        }
        if(this.steps[0].result?.selectedReplyForms){
            for(const selectedReplyform of this.steps[0].result.selectedReplyForms){

                if(this.pathwayCompleted[selectedReplyform]) 
                    newAllCompleted = true;
                else{
                    newAllCompleted = false;
                    break;
                }
            }            
        }

        const includesOtherForms = this.steps[0].result?.otherForms;
        if(includesOtherForms){

            if(this.pathwayCompleted.other) 
                newAllCompleted = true;
            else{
                newAllCompleted = false;
            }

        }
            
        if(!newAllCompleted && !includesOtherForms)this.context.commit("setCurrentStepPage", { currentStep:this.stPgNo.SUBMIT._StepNo, currentPage:0 });
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
        const stepsAndPagesNumber = {GETSTART: {}, PO: {}, COMMON: {}, RFLM:{}, WR:{}, CA:{}, FLM: {}, CM: {}, PPM: {}, RELOC: {}, ENFRC: {}, CONNECT:{}, OTHER:{}, NCD:{}, NDT:{}, NPR: {}, RQS: {}, TRIS: {}, NLC: {}, NLCR: {}, NLP:{}, NLPR: {}, SUBMIT: {}} as stepsAndPagesNumberInfoType
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
        this.rejectedPathway = application.rejectedPathway;
        this.rejectedFileNumber = application.rejectedFileNumber;
        this.rejectedFormsList = application.rejectedFormsList;
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