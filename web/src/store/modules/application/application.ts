import { Step } from "@/models/step";
import { ApplicationState, RootState } from "@/models/storeState";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { Module } from "vuex";

export const state: ApplicationState = {
  id: "",
  type: "",
  steps: new Array<Step>(),
  lastUpdate: null,
  lastPrinted: null,
  currentStep: 1,
  allCompleted: false,
  userType: "",
  userName: "",
  userId: "",
  applicantName: "",
  respondentName: "",
  protectedPartyName: "",
  protectedChildName: "",
  applicationLocation: "",
};

const namespaced = true;

export const application: Module<ApplicationState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
