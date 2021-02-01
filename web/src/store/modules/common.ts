import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Common extends VuexModule {
    public existingApplication = false;
    public userId = '';
    public userLocation = '';

    @Mutation
    public setExistingApplication(existingApplication: boolean): void {   
        this.existingApplication = existingApplication
    }

    @Action
    public UpdateExistingApplication(newExistingApplication: boolean): void {
        this.context.commit('setExistingApplication', newExistingApplication)
    }
    
    @Mutation
    public setUserId(userId: string): void {   
        this.userId = userId
    }

    @Action
    public UpdateUserId(newUserId: string): void {
        this.context.commit('setUserId', newUserId)
    }

    @Mutation
    public setUserLocation(userLocation: string): void {   
        this.userLocation = userLocation
    }

    @Action
    public UpdateUserLocation(newUserLocation: string): void {
        this.context.commit('setUserLocation', newUserLocation)
    } 

}

export default Common