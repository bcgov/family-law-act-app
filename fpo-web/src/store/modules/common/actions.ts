import { CommonState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";

export const actions: ActionTree<CommonState, RootState> = {
    setUserId(context, userId) {
        context.commit("setUserId", userId);
    },
    setExistingApplication(context, existingApplication) {
        context.commit("setExistingApplication", existingApplication);
    }
};