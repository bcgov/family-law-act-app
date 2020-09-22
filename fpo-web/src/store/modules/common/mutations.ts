import { CommonState } from "@/models/storeState";
import { MutationTree } from "vuex";

export const mutations: MutationTree<CommonState> = {
    setExistingApplication(state, existingApplication) {
        state.existingApplication = existingApplication;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },    
    updateApplication(applicationId, application){
        console.log("reached store to update application through PUT")
        // Make PUT call to update the application with application.id = applicationId.
    }

  
};
