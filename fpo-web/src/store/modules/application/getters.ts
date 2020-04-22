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
};
