import { CommonState } from "@/models/storeState";
import { MutationTree } from "vuex";

export const mutations: MutationTree<CommonState> = {
    setExistingApplication(state, existingApplication) {
        state.existingApplication = existingApplication;
    },
    setUserId(state, userId) {
        state.userId = userId;
    }  
};
