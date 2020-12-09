import { CommonState, RootState } from "@/models/storeState";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { Module } from "vuex";

export const state: CommonState = {    
    existingApplication: false,
    userId: '',
    userLocation: ''
};

const namespaced = true;

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};