import { CommonState, RootState } from "@/models/storeState";
import { ActionTree } from "vuex";

export const actions: ActionTree<CommonState, RootState> = {
    setUserId(context, userId) {
        context.commit("setUserId", userId);
    },
    setUserLocation(context, userLocation) {
        context.commit("setUserLocation", userLocation);
    },
    setExistingApplication(context, existingApplication) {
        context.commit("setExistingApplication", existingApplication);
    }
};