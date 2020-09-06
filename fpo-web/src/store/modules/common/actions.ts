import { CommonState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";

export const actions: ActionTree<CommonState, RootState> = {
    setExistingApplication(context, existingApplication) {
        context.commit("setExistingApplication", existingApplication);
    }
};