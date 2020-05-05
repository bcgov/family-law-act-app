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
    state.selectedForms = null;

    state.steps = new Array<Step>();

    let s = new Step();

    s.active = true;
    s.id = "1";
    s.label = "Get Started";
    s.icon = "fa-users";
    s.lastUpdate = null;
    s.type = "commonInformationStep";
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
    p.label = "Your information";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "2";
    p.label = "Other Party";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "3";
    p.label = "Children information";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

    state.steps.push(s);

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
    p.label = "Questionnaire";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "1";
    p.label = "Protection From Whom?";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "2";
    p.label = "Remove person or belongings";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "3";
    p.label = "No Go";
    p.active = false;
    p.progress = 0;
    s.pages.push(p);

     p = new Page();
    p.key = "4";
    p.label = "No Contact";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "5";
    p.label = "Weapons and Firearms";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "6";
    p.label = "Background";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

     p = new Page();
    p.key = "7";
    p.label = "Your Story";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "8";
    p.label = "About Protection Order";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "9";
    p.label = "Urgency";
    p.active = false;
    p.progress = 0;

    s.pages.push(p);
    state.steps.push(s);

    //Commenting out the demo part
    // s = new Step();
    
    // s.active = true;
    // s.id = "3";
    // s.label = "Demo - Get Started";
    // s.icon = "fa-users";
    // s.lastUpdate = null;
    // s.type = "stepDemoGetStarted";
    // s.pages = new Array<Page>();
    // s.currentPage = 0;

    //  p = new Page();
    // p.key = "0";
    // p.label = "Getting Started";
    // p.active = true;
    // p.progress = 0;

    // s.pages.push(p);

    // p = new Page();
    // p.key = "1";
    // p.label = "Your information";
    // p.active = true;
    // p.progress = 0;

    // s.pages.push(p);

    // state.steps.push(s);

    // s = new Step();

    // s.active = true;
    // s.id = "4";
    // s.label = "Demo - FLM";
    // s.icon = "fa-child";
    // s.lastUpdate = null;
    // s.type = "stepDemoFlm";
    // s.pages = new Array<Page>();
    // s.currentPage = 0;

    //  p = new Page();
    // p.key = "0";
    // p.label = "Introduction";
    // p.active = true;
    // p.progress = 0;

    // s.pages.push(p);

    // p = new Page();
    // p.key = "1";
    // p.label = "Parental Information";
    // p.active = true;
    // p.progress = 0;

    // s.pages.push(p);

    // p = new Page();
    // p.key = "2";
    // p.label = "Children Details";
    // p.active = true;
    // p.progress = 0;

    // s.pages.push(p);

    // state.steps.push(s);
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
  setSelectedForms(state, selectedForms) {
    state.selectedForms = selectedForms;
  },
  setApplicantName(state, applicantName) {
    state.applicantName = applicantName;
  },
  setYourInformationSurvey(state, yourInformationSurvey) {
    state.yourInformationSurvey = yourInformationSurvey;
  },
  setPageActive(state, { currentStep, currentPage, active }) {
    state.steps[currentStep].pages[currentPage].active = active;
  },
  setOtherParties(state, otherParties) {
    state.otherPartySurvey = otherParties;
  },
  setSelectedPOOrder(state, selectedPOOrder) {
    state.selectedPOOrder = selectedPOOrder;
  },
  setUrgencySurvey(state, urgencySurvey) {
    state.urgencySurvey = urgencySurvey;
  },
  setAboutPOSurvey(state, aboutPOSurvey) {
    state.aboutPOSurvey = aboutPOSurvey;
  },
  setRespondentName(state, respondentName) {
    state.respondentName = respondentName;
  },
  setProtectionWhomSurvey(state, protectionWhomSurvey) {
    state.protectionWhomSurvey = protectionWhomSurvey;
  },
  setRemoveSurvey(state, removeSurvey) {
    state.removeSurvey = removeSurvey;
  },
  setNoGoSurvey(state, noGoSurvey) {
    state.noGoSurvey = noGoSurvey;
  },
  setNoContactSurvey(state, noContactSurvey) {
    state.noContactSurvey = noContactSurvey;
  },
  setWeaponsSurvey(state, weaponsSurvey) {
    state.weaponsSurvey = weaponsSurvey;
  },
  setBackgroundSurvey(state, backgroundSurvey) {
    state.backgroundSurvey = backgroundSurvey;
  },
  setYourStory(state, yourStory) {
    state.yourStory = yourStory;
  },
  setQuestionnaireSurvey(state, questionnaireSurvey) {
    state.questionnaireSurvey = questionnaireSurvey;
  },
};
