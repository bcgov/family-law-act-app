import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {applicationInfoType} from '../../types/Application';

@Module({
  namespaced: true
})
class ApplicationInformation extends VuexModule {
    public application = {} as applicationInfoType
    

    @Mutation
    public setApplication(application): void {   
        this.application = application
    }

    @Action
    public UpdateApplication(newApplication): void {
        this.context.commit('setApplication', newApplication)
    } 

}

export default ApplicationInformation