import { Step } from "@/models/step";
import { ApplicationState, RootState } from "@/models/storeState";
import { ActionContext, ActionTree } from "vuex";

export const actions: ActionTree<ApplicationState, RootState> = {
  init(context) {
    context.commit("init");
  },
  setUserType(context, userType) {
    context.commit("setUserType", userType);
  },
  setCurrentStep(context, currentStep) {
    context.commit("setCurrentStep", currentStep);
  },
  setCurrentStepPage(context, { currentStep, currentPage }) {
    context.commit("setCurrentStepPage", { currentStep, currentPage });
  },
  setUserName(context, userName) {
    context.commit("setUserName", userName);
  },
  setStepActive(context, { currentStep, active }) {
    context.commit("setStepActive", { currentStep, active });
  },
};
