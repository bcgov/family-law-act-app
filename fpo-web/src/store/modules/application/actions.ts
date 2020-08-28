import { ApplicationState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";
import axios from "axios";

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
  updateStepResultData(context, { step, data }) {
    context.commit("updateStepResultData", { step, data });
  },
  getUserInfo(): any {
    axios.get('api/v1/user-info/')
  .then((response) => {
    const userId = response.data.user_id;
    const loginUrl = response.data.login_uri;
    return {user_id: userId, login_url: loginUrl};
  });    
    
  }
};
