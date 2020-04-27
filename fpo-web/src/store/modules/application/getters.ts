import { Step } from "@/models/step";
import { ApplicationState, RootState } from "@/models/storeState";
import { GetterTree } from "vuex";

export const getters: GetterTree<ApplicationState, RootState> = {
  getStep(state: ApplicationState, stepIndex: number): Step {
    return state.steps[stepIndex];
  },

  getUserType(state: ApplicationState): string {
    return state.userType;
  },
  getNavigation(state: ApplicationState): Array<Step> {
    console.log("in getNavigation: " + state.steps);
    return state.steps;
  },

  getCurrentStep(state: ApplicationState): number {
    return state.currentStep;
  },

  isAllCompleted(state: ApplicationState): boolean {
    return state.allCompleted;
  },
  getUserName(state: ApplicationState): string {
    return state.userName;
  },
  getPrevStepPage(
    state: ApplicationState
  ): { prevStep: number; prevPage: number } {
    var prevStepPage: { prevStep: number; prevPage: number };

    var sIndex = state.currentStep;
    var pIndex = state.steps[sIndex].currentPage - 1;

    while (prevStepPage == null && sIndex >= 0) {
      var s = state.steps[sIndex];

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
        pIndex = state.steps[sIndex].pages.length - 1;
      }
    }

    return prevStepPage;
  },
  getNextStepPage(
    state: ApplicationState
  ): { nextStep: number; nextPage: number } {
    var nextStepPage: { nextStep: number; nextPage: number };

    var sIndex = state.currentStep;
    var pIndex = state.steps[sIndex].currentPage + 1;

    while (nextStepPage == null && sIndex < state.steps.length) {
      var s = state.steps[sIndex];

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

      if (sIndex < state.steps.length) {
        pIndex = 0;
      }
    }

    return nextStepPage;
  },
};
