import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {applicationInfoType} from '../../types/Application';
import { Step } from "@/models/step";
import { Page } from "@/models/page";

@Module({
  namespaced: true
})
class Application extends VuexModule {

    public id = ""
    public type = ""
    public steps = new Array<Step>()
    public lastUpdate = null
    public lastPrinted = null
    public currentStep = 1
    public allCompleted = false
    public userType = ""
    public userName = ""
    public userId = ""
    public applicantName = ""
    public respondentName = ""
    public protectedPartyName = ""
    public protectedChildName = ""
    public applicationLocation = ""

    @Mutation
    public init(): void {
        this.allCompleted = false;
        this.currentStep = 0;
        this.type = "default";
        this.userName = "";
        this.lastPrinted = null;
        this.lastUpdate = null;
        this.steps = new Array<Step>();
        // Getting started START
        let s = new Step();
    
        s.active = true;
        s.id = "0";
        s.label = "Get Started";
        s.icon = "fa-users";
        s.lastUpdate = null;    
        s.type = "getInformationStep";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        let p = new Page();
        p.key = "0";
        p.label = "Getting Started";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "1";
        p.label = "Questionnaire";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        // Getting started STOP
        // Common information START
        s = new Step();
    
        s.active = false;
        s.id = "1";
        s.label = "Your Information";
        s.icon = "fa-users";
        s.lastUpdate = null;
        s.type = "commonInformationStep";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Your information";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "1";
        p.label = "Other Party";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        // Common Information STOP
        // Protection Order START
        s = new Step();
    
        s.active = false;
        s.id = "2";
        s.label = "Protection Order";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPO";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Protection From Whom?";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "1";
        p.label = "Remove person or belongings";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "2";
        p.label = "No Go";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "3";
        p.label = "No Contact";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "4";
        p.label = "Weapons and Firearms";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "5";
        p.label = "Background";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "6";
        p.label = "Your Story";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "7";
        p.label = "About Protection Order";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "8";
        p.label = "Urgency";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
    
        //Protection Order STOP
        //Family Law Matter START
        s = new Step();
    
        s.active = false;
        s.id = "3";
        s.label = "Family Law Matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepFlm";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Family Law Form";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Family Law Matter STOP
        // Case Mgmt START
        s = new Step();
    
        s.active = false;
        s.id = "4";
        s.label = "Case Management";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepCm";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Case Management Form";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Case Mgmt STOP
        //Priority parenting matter START
        s = new Step();
    
        s.active = false;
        s.id = "5";
        s.label = "Priority parenting matter";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepPpm";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Priority Parenting Matter Form";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Priority parenting matter STOP
        //Relocation of a child START
        s = new Step();
    
        s.active = false;
        s.id = "6";
        s.label = "Relocation of a child";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepReloc";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Relocation of a child Form";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Relocation of a child STOP
        //Enforcement START
        s = new Step();
    
        s.active = false;
        s.id = "7";
        s.label = "Enforcement of agreements and court orders";
        s.icon = "fa-child";
        s.lastUpdate = null;
        s.type = "stepEnfrc";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Agreement and Court Orders Forms";
        p.active = true;
        p.progress = 0;
    
        s.pages.push(p);
        this.steps.push(s);
        //Enforcement STOP
        //Submit START
        s = new Step();
    
        s.active = false;
        s.id = "8";
        s.label = "Review and File";
        s.icon = "fa-paper-plane";
        s.lastUpdate = null;
        s.type = "submit";
        s.pages = new Array<Page>();
        s.currentPage = 0;
    
        p = new Page();
        p.key = "0";
        p.label = "Filing Options";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "1";
        p.label = "Review and Print";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "2";
        p.label = "Review and Save";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        p = new Page();
        p.key = "3";
        p.label = "Next Steps";
        p.active = false;
        p.progress = 0;
    
        s.pages.push(p);
    
        this.steps.push(s);
    
        //console.log(this.steps)
        //Submit STOP
        
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
        console.log("goto mutation")
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
    public updateStepResultData({ step, data }): void {
        step.result = {...step.result, ...data};
    }
    @Action
    public UpdateUpdateStepResultData({ step, data }) {
        this.context.commit("updateStepResultData", { step, data });
    } 
    
    @Mutation
    public setAllCompleted(allCompleted): void {
        this.allCompleted = allCompleted;
    }
    @Action
    public UpdateAllCompleted(newAllCompleted) {
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
        this.type = type;
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
    public setCurrentApplication(application): void {
        this.id = application.id;    
        this.type = application.type;    
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
    }
    @Action
    public UpdateCurrentApplication(newApplication) {
        this.context.commit("setCurrentApplication", newApplication);
    }


    get getPrevStepPage(): { prevStep: number; prevPage: number } {

        let prevStepPage: { prevStep: number; prevPage: number };    
        let sIndex = this.currentStep;
        let pIndex = this.steps[sIndex].currentPage - 1;
    
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
        let sIndex = this.currentStep;
        let pIndex = this.steps[sIndex].currentPage + 1;
        // console.log(sIndex);
        // console.log(pIndex);
        // console.log(this.steps)
        while (nextStepPage == null && sIndex < this.steps.length) {
            const s = this.steps[sIndex];
        
            if (s.active) {
                while (nextStepPage == null && pIndex < s.pages.length) {
                    if (s.pages[pIndex].active) {
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
         console.log(nextStepPage)
        return nextStepPage;
    }

}

export default Application