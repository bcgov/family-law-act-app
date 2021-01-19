import { CommonState, RootState } from "@/models/storeState";
import { GetterTree } from "vuex";

export const getters: GetterTree<CommonState, RootState> = {
    getExistingApplication(state: CommonState): boolean {
        return state.existingApplication;
    },
    getUserId(state: CommonState): string {
        return state.userId;
    },
    getUserLocation(state: CommonState): string {
        return state.userLocation;
    } 
};
