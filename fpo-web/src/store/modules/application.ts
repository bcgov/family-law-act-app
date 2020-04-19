import { Step } from "@/models/step";
import { ApplicationState } from "@/models/storeState";

export const state: ApplicationState = {
  type: "",
  steps: new Array<Step>(),
  lastUpdate: null,
  currentStep: "",
  currentPage: "",
  allCompleted: false,
};
