import { ApplicationState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";

export const actions: ActionTree<ApplicationState, RootState> = {
  init(context) {
    context.commit("init");
  },
  setCurrentApplication(context, application) {
    context.commit("setCurrentApplication", application);
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
  setUserId(context, userId) {
    context.commit("setUserId", userId);
  },
  setStepActive(context, { currentStep, active }) {
    context.commit("setStepActive", { currentStep, active });
  },
  gotoPrevStepPage(context) {
    const prevStepPage = context.getters["getPrevStepPage"];

    if (prevStepPage != null) {
      context.commit("gotoPrevStepPage", prevStepPage);
    }
  },
  gotoNextStepPage(context) {
    const nextStepPage = context.getters["getNextStepPage"];

    if (nextStepPage != null) {
      context.commit("gotoNextStepPage", nextStepPage);
    }
  },
  setAllCompleted(context, allCompleted) {
    context.commit("setAllCompleted", allCompleted);
  },
  setApplicantName(context, applicantName) {
    context.commit("setApplicantName", applicantName);
  },
  setPageActive(context, { currentStep, currentPage, active }) {
    context.commit("setPageActive", { currentStep, currentPage, active });
  },
  
  setRespondentName(context, respondentName) {
    context.commit("setRespondentName", respondentName);
  },

  setApplicationId(context, id) {
    context.commit("setApplicationId", id);
  },

  setApplicationType(context, type) {
    context.commit("setApplicationType", type);
  },

  setLastUpdated(context, lastUpdated) {
    context.commit("setLastUpdated", lastUpdated);
  },

  setLastPrinted(context, lastPrinted) {
    context.commit("setLastPrinted", lastPrinted);
  },

  updateStepResultData(context, { step, data }) {
    context.commit("updateStepResultData", { step, data });
  }
};