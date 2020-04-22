import { Step } from "@/models/step";
import { Page } from "@/models/page";
import { ApplicationState } from "@/models/storeState";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ApplicationState> = {
  init(state) {
    state.allCompleted = false;
    state.currentStep = 1;
    state.type = "default";

    state.steps = new Array<Step>();

    var s = new Step();

    s.active = true;
    s.id = "1";
    s.label = "Protection Order";
    s.icon = "fa-users";
    s.lastUpdate = null;
    s.type = "fpo";
    s.pages = new Array<Page>();
    s.currentPage = 0;

    var p = new Page();
    p.key = "1";
    p.label = "Getting Started";
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "2";
    p.label = "Your information";
    p.progress = 0;

    s.pages.push(p);

    state.steps.push(s);

    s = new Step();

    s.active = true;
    s.id = "2";
    s.label = "Family Law Matters";
    s.icon = "fa-child";
    s.lastUpdate = null;
    s.type = "flm";
    s.pages = new Array<Page>();
    s.currentPage = 0;

    var p = new Page();
    p.key = "1";
    p.label = "Parental Details";
    p.progress = 0;

    s.pages.push(p);

    p = new Page();
    p.key = "2";
    p.label = "Children Details";
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
};
