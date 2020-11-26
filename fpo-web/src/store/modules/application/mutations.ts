import { Step } from "@/models/step";
import { Page } from "@/models/page";
import { ApplicationState } from "@/models/storeState";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ApplicationState> = {
  init(state) {
    state.allCompleted = false;
    state.currentStep = 0;
    state.type = "default";
    state.userName = "";
    state.lastPrinted = null;
    state.lastUpdate = null;
    state.steps = new Array<Step>();
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

    state.steps.push(s);

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

    state.steps.push(s);

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
    state.steps.push(s);

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
    state.steps.push(s);
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
    state.steps.push(s);
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
    state.steps.push(s);
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
    state.steps.push(s);
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
    state.steps.push(s);
    //Enforcement STOP
    //Submit START
    s = new Step();

    s.active = false;
    s.id = "8";
    s.label = "Submit";
    s.icon = "fa-paper-plane";
    s.lastUpdate = null;
    s.type = "submit";
    s.pages = new Array<Page>();
    s.currentPage = 0;

    p = new Page();
    p.key = "0";
    p.label = "Submit Application Forms";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);
    state.steps.push(s);
    //Submit STOP
    
  },
  setUserType(state, userType) {
    state.userType = userType;
  },
  setCurrentStep(state, currentStep) {
    state.currentStep = currentStep;
  },
  setCurrentStepPage(state, { currentStep, currentPage }) {
    state.steps[currentStep].currentPage = currentPage;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setStepActive(state, { currentStep, active }) {
    state.steps[currentStep].active = active;
  },
  gotoPrevStepPage(state, { prevStep, prevPage }) {
    if (prevStep != state.currentStep) {
      state.currentStep = prevStep;
    }

    if (prevPage != state.steps[prevStep].currentPage) {
      state.steps[prevStep].currentPage = prevPage;
    }
  },
  gotoNextStepPage(state, { nextStep, nextPage }) {
    if (nextStep != state.currentStep) {
      state.currentStep = nextStep;
    }

    if (nextPage != state.steps[nextStep].currentPage) {
      state.steps[nextStep].currentPage = nextPage;
    }
  },  
  setPageActive(state, { currentStep, currentPage, active }) {
    state.steps[currentStep].pages[currentPage].active = active;
  }, 
  updateStepResultData(state, { step, data }) {
    step.result = {...step.result, ...data};
  }, 

  setAllCompleted(state, allCompleted) {
    state.allCompleted = allCompleted;
  },
  setApplicantName(state, applicantName) {
    state.applicantName = applicantName;
  },
  setRespondentName(state, respondentName) {
    state.respondentName = respondentName;
  },
  setProtectedPartyName(state, protectedPartyName) {
    state.protectedPartyName = protectedPartyName;
  },  
  setProtectedChildName(state, protectedChildName) {
    state.protectedChildName = protectedChildName;
  },
  setApplicationId(state, id) {
    state.id = id;
  },
  setApplicationType(state, type) {
    state.type = type;
  },
  setLastUpdated(state, lastUpdated) {
    state.lastUpdate = lastUpdated;
  },
  setLastPrinted(state, lastPrinted) {
    state.lastPrinted = lastPrinted;
  },
  setCurrentApplication(state, application) {
    state.id = application.id;    
    state.type = application.type;    
    state.steps = application.steps;
    state.lastUpdate = application.lastUpdate;    
    state.currentStep = application.currentStep;
    state.allCompleted = application.allCompleted;
    state.lastPrinted = application.lastPrinted;
    state.userType = application.userType;
    state.userName = application.userName;
    state.applicantName = application.applicantName;
    state.respondentName = application.respondentName; 
    state.protectedPartyName = application.protectedPartyName;
    state.protectedChildName = application.protectedChildName;  
  },
  
};
