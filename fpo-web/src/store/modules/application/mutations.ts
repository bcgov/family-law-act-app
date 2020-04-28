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

    state.steps = new Array<Step>();

    var s = new Step();

    s.active = true;
    s.id = "1";
    s.label = "Demo - Get Started";
    s.icon = "fa-users";
    s.lastUpdate = null;
    s.type = "stepDemoGetStarted";
    s.pages = new Array<Page>();
    s.currentPage = 0;

    var p = new Page();
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

    state.steps.push(s);

    s = new Step();

    s.active = true;
    s.id = "2";
    s.label = "Demo - FLM";
    s.icon = "fa-child";
    s.lastUpdate = null;
    s.type = "stepDemoFlm";
    s.pages = new Array<Page>();
    s.currentPage = 0;

    var p = new Page();
    p.key = "0";
    p.label = "Introduction";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "1";
    p.label = "Parental Information";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "2";
    p.label = "Children Details";
    p.active = true;
    p.progress = 0;

    s.pages.push(p);

    state.steps.push(s);
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
};
