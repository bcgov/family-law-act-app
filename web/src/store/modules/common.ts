import { documentTypesJsonInfoType } from '@/types/Common';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class Common extends VuexModule {
    public existingApplication = false;
    public documentTypesJson = [];
    public userId = '';
    public userLocation = '';
    public efilingEnabled = false;
    public efilingStreams = [];

    public locationsInfo = [];
    public userHasStatisticsAccess = false;

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
    
    @Mutation
    public setDocumentTypesJson(documentTypesJson: documentTypesJsonInfoType[]): void {
        this.documentTypesJson = documentTypesJson;
    }
    @Action
    public UpdateDocumentTypesJson(newDocumentTypesJson: documentTypesJsonInfoType[]) {
        this.context.commit("setDocumentTypesJson", newDocumentTypesJson);
    }

    @Mutation
    public setLocationsInfo(locationsInfo): void {   
        this.locationsInfo = locationsInfo
    }
    @Action
    public UpdateLocationsInfo(newLocationsInfo): void {
        this.context.commit('setLocationsInfo', newLocationsInfo)
    }
    @Mutation
    public setEfilingEnabled(efilingEnabled: boolean): void {
        this.efilingEnabled = efilingEnabled;
    }

    @Mutation
    public setEfilingStreams(efilingStreams: string[]): void {
        this.efilingStreams = efilingStreams;
    }

    @Mutation
    public setUserHasStatisticsAccess(userHasStatisticsAccess: boolean): void {   
        this.userHasStatisticsAccess = userHasStatisticsAccess
    }
    @Action
    public UpdateUserHasStatisticsAccess(newUserHasStatisticsAccess: boolean): void {
        this.context.commit('setUserHasStatisticsAccess', newUserHasStatisticsAccess)
    }
}

export default Common