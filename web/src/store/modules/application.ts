import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { stepInfoType, pageInfoType, nameInfoType } from "@/types/Application";
import { supportingDocumentInfoType, requiredDocumentsInfoType } from "@/types/Common";

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
    public pathwayCompleted = { protectionOrder:false, familyLawMatter:false, caseMgmt:false, priotityParenting:false, childReloc:false, agreementEnfrc:false} //{Protection Order, Family Law Matters, Case management, Priority parenting, Relocation of a child, Enforcement of agreements}


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
        s.label = "Get Started";
        s.icon = "fa-users";
        s.lastUpdate = null;    
        s.type = "getInformationStep";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        let p = {} as pageInfoType;
        p.key = "0";
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
        s.label = "Protection Order";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPO";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.label = "Your information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "2";
        p.label = "Protection From Whom?";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "3";
        p.label = "Remove person or belongings";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "4";
        p.label = "No Go";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "5";
        p.label = "No Contact";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "6";
        p.label = "Weapons and Firearms";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "7";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "8";
        p.label = "Your Story";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "9";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "10";
        p.label = "About Protection Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "11";
        p.label = "Urgency";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "12";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
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
        s.label = "Your Information";
        s.icon = "fa-users";
        s.lastUpdate = null;
        s.type = "commonInformationStep";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;

        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Safety Check";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.label = "Your information";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "3";
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
        s.label = "Family Law Matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepFlm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;        

        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Questionnaire";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.label = "Background";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "2";
        p.label = "Children Info";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


//____________Parenting Arrangements_________
        p = {} as pageInfoType;
        p.key = "3";
        p.label = "Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "4";
        p.label = "Parental Responsibilities";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "5";
        p.label = "Parenting Time";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "6";
        p.label = "Parental Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "7";
        p.label = "Parenting Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "8";
        p.label = "About Parenting Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "9";
        p.label = "Parenting Arrangement Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "10";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);


//____________Child Support__________
        p = {} as pageInfoType;
        p.key = "11";
        p.label = "Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "12";
        p.label = "Current Arrangements";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "13";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "14";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "15";
        p.label = "Child Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "16";
        p.label = "About Existing Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "17";
        p.label = "Calculating Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "18";
        p.label = "Undue Hardship";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "19";
        p.label = "Special and Extraordinary Expenses";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "20";
        p.label = "About Child Support Changes";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "21";
        p.label = "Unpaid Child Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);



//____________Contact with a Child
        p = {} as pageInfoType;
        p.key = "22";
        p.label = "Contact with a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);        

        p = {} as pageInfoType;
        p.key = "23";
        p.label = "Contact Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "24";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "25";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Guardianship of a Child
        p = {} as pageInfoType;
        p.key = "26";
        p.label = "Guardianship of a Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "27";
        p.label = "Best Interests of the Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "28";
        p.label = "Indigenous Ancestry of Child";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

//____________Spousal Support
        p = {} as pageInfoType;
        p.key = "29";
        p.label = "Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);  
        
        p = {} as pageInfoType;
        p.key = "30";
        p.label = "Income and Earning Potential";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "31";
        p.label = "About the Order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "32";
        p.label = "Spousal Support Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "33";
        p.label = "About the Order/Agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "34";
        p.label = "Existing final order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "35";
        p.label = "Existing written agreement";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "36";
        p.label = "Calculating Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "37";
        p.label = "About the order";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "38";
        p.label = "Unpaid Spousal Support";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);
    
       
//____________Review
        p = {} as pageInfoType;
        p.key = "39";
        p.label = "Review Your Answers";
        p.active = false;
        p.progress = 0;    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "40";
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
        s.label = "Case Management";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepCm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Case Management Form";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Case Mgmt STOP
        //Priority parenting matter START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "5";
        s.label = "Priority parenting matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPpm";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Priority Parenting Matter Form";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Priority parenting matter STOP
        //Relocation of a child START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "6";
        s.label = "Relocation of a child";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepReloc";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Relocation of a child Form";
        p.active = true;
        p.progress = 0;    
        s.pages.push(p);

        this.steps.push(s);

        //Relocation of a child STOP
        //Enforcement START
        s = {} as stepInfoType;    
        s.active = false;
        s.id = "7";
        s.label = "Enforcement of agreements and court orders";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepEnfrc";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Agreement and Court Orders Forms";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);

        this.steps.push(s);

        //Enforcement STOP
        //Submit START
        s = {} as stepInfoType;

        s.active = false;
        s.id = "8";
        s.label = "Review and File";
        s.icon = "fa-paper-plane";
        s.lastUpdate = null;
        s.type = "submit";
        s.pages = new Array<pageInfoType>();
        s.currentPage = 0;
    
        p = {} as pageInfoType;
        p.key = "0";
        p.label = "Filing Options";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);

        p = {} as pageInfoType;
        p.key = "1";
        p.label = "Review and Print";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "2";
        p.label = "Review and Save";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
        
        p = {} as pageInfoType;
        p.key = "3";
        p.label = "Review and Submit";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = {} as pageInfoType;
        p.key = "4";
        p.label = "Next Steps";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        //Submit STOP
        //console.log(this.steps)
        
    }
    @Action
    public UpdateInit() {
        this.context.commit("init");
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
        //console.log(this.requiredDocuments)
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
    public setAllCompleted(allCompleted): void {
        this.allCompleted = allCompleted;
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
    public setPathwayCompleted({pathway, isCompleted}): void {
        this.pathwayCompleted[pathway] = isCompleted;
    }
    @Action
    public UpdatePathwayCompleted({pathway, isCompleted}) {
        //console.log(pathway,isCompleted)
        this.context.commit("setPathwayCompleted", {pathway, isCompleted}); 
        this.context.commit("setCommonStepResults",{data:{'pathwayCompleted':this.pathwayCompleted}});            
        //console.log(this.pathwayCompleted)
        let newAllCompleted = false;
        if(isCompleted && this.steps[0].result){
            //console.log(this.steps[0].result['selectedForms'])
            for(const selectedform of this.steps[0].result['selectedForms']){
                //console.log(selectedform)
                if(this.pathwayCompleted[selectedform]) 
                    newAllCompleted = true;
                else{
                    newAllCompleted = false;
                    break;
                }
            }            
        }
        //console.log(newAllCompleted)
        if(!newAllCompleted)this.context.commit("setCurrentStepPage", { currentStep:8, currentPage:0 });
        this.context.commit("setAllCompleted", newAllCompleted);
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
    public setSurveyChangedPO(surveyChangedPO: boolean): void {
        this.surveyChangedPO = surveyChangedPO;
    }
    @Action
    public UpdateSurveyChangedPO(newSurveyChangedPO: boolean) {
        const stepPO = 1
        const reviewPagePO = 12
        const previewPagePO = 13
        this.context.commit("setSurveyChangedPO", newSurveyChangedPO);
        if(newSurveyChangedPO && this.steps[stepPO].pages[reviewPagePO].progress ==100 ){//if changes, make review page incompelete
            this.context.commit("setPageProgress", { currentStep: stepPO, currentPage:reviewPagePO, progress:50 });
            this.context.commit("setPageActive", { currentStep: stepPO, currentPage: previewPagePO, active: false });
        
            if(this.steps[stepPO].pages[previewPagePO].progress ==100)this.context.commit("setPageProgress", { currentStep: stepPO, currentPage:previewPagePO, progress:50 });
        }  
        
        
        this.context.commit("resetStep", 8);
        for (let i=1; i<5; i++) {
            this.context.commit("setPageActive", { currentStep: 8, currentPage: i, active: false });
            this.context.commit("setPageProgress", { currentStep: 8, currentPage:i, progress:0 });
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

        //console.log("nextStep")

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
        //console.log(nextStepPage)
        return nextStepPage;
    }

}

export default Application