import { CommonState } from "@/models/storeState";
import { MutationTree } from "vuex";
import GlobalStore from "@/store";


export const mutations: MutationTree<CommonState> = {
    setExistingApplication(state, existingApplication) {
        state.existingApplication = existingApplication;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    saveNewApplication(state, user_id) {       
        const store = GlobalStore.getInstance();
        //Make a POST to create new empty application
        // save the applicationId        
        const applicationId = ''
        store.dispatch("application/setApplicationId", applicationId);        
    },
    updateApplication(applicationId, application){
        console.log("reached store to update application through PUT")
        // Make PUT call to update the application with application.id = applicationId.
    }

  
};
