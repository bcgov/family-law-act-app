import { CommonState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";

export const actions: ActionTree<CommonState, RootState> = {
    setUserId(context, userId) {
        context.commit("setUserId", userId);
    },
    setExistingApplication(context, existingApplication) {
        context.commit("setExistingApplication", existingApplication);
    },
    saveNewApplication(context, application) {
        context.commit("saveNewApplication", application);
    },
    updateApplication(context, {applicationId, application}) {
        context.commit("updateApplication", {applicationId, application});
    }

};