import store from '@/store/index'
import {applicationInfoType, stepInfoType, pageInfoType, resultInfoType, pathwayCompletedInfoType} from "@/types/Application"
import { stepsAndPagesNumberInfoType } from "@/types/Application/StepsAndPages";

export class MigrateStore{
 
    currentApplication = {} as applicationInfoType;

    stPgNo = {} as stepsAndPagesNumberInfoType;

    public migrate(applicationData, applicationType, currentVersion: string): applicationInfoType{
        
        this.currentApplication.id = applicationData.id;
       
        this.currentApplication.lastUpdate = applicationData.lastUpdated;
        this.currentApplication.lastPrinted = applicationData.lastPrinted;
        this.currentApplication.applicationLocation = applicationData.applicationLocation;                        
        this.currentApplication.types = applicationType
        this.currentApplication.userId = applicationData.userId;
        this.currentApplication.userName = applicationData.userName;
        this.currentApplication.userType = applicationData.userType;

        const appVersion = applicationData.version
        
        if(appVersion == currentVersion){             
            console.log('Similar Version')
            this.currentApplication.currentStep = applicationData.currentStep;        
            this.currentApplication.steps = applicationData.steps;
            this.currentApplication.version = applicationData.version;
            
        }else{
            console.log('Old Version')
            this.currentApplication.steps = this.migrateSteps(applicationData.steps)
            this.currentApplication.currentStep = 0;
            this.currentApplication.version = currentVersion;
        }
       
        if(applicationData.steps[0].result){
            this.currentApplication.applicantName = applicationData.steps[0].result.applicantName;                                                       
            this.currentApplication.respondentName = applicationData.steps[0].result.respondentsPO? applicationData.steps[0].result.respondentsPO[0]:''; 
            this.currentApplication.protectedPartyName = applicationData.steps[0].result.protectedPartyName;                                             
            this.currentApplication.protectedChildName = applicationData.steps[0].result.protectedChildName;                                                          
        }

        store.commit("Application/setCurrentApplication", this.currentApplication);
        store.commit("Common/setExistingApplication", true);
        store.dispatch("Application/UpdateStPgNo");
        return this.currentApplication

    }

    public migrateSteps(oldSteps: stepInfoType[]): stepInfoType[]{
        store.dispatch("Application/UpdateInit");
        const newSteps = store.state.Application.steps;
        this.stPgNo = store.state.Application.stPgNo;

        for(const newStepIndex in newSteps){
            const newStep = newSteps[newStepIndex]         
            const correspondingStep = oldSteps.filter(oldstep=>oldstep.name == newStep.name)[0]
            
            if(correspondingStep){                
                newSteps[newStepIndex].active = correspondingStep.active
                
                //if step COMMON then Page 0 might not be active
                if(newStep.id == this.stPgNo.COMMON._StepNo)
                    newSteps[newStepIndex].currentPage = this.stPgNo.COMMON.YourInformation;

                newSteps[newStepIndex].pages = this.migratePages(newStep.pages,  correspondingStep.pages)
                
                if(correspondingStep.result)
                    newSteps[newStepIndex].result = this.migrateResult(newStep, correspondingStep)
                
            }
        }
        return newSteps
    }

    public migratePages(newPages: pageInfoType[] , oldPages: pageInfoType[]): pageInfoType[]{
        
        for(const newPageIndex in newPages){
            const newPage = newPages[newPageIndex]
            const correspondingPage = oldPages.filter(oldpage=>oldpage.name == newPage.name)[0]
            if(correspondingPage){
                newPages[newPageIndex].active = correspondingPage.active
            }
        }
        return newPages
    }

    public migrateResult(newStep, correspondingStep){
        
        const result = {} as resultInfoType
        
        if(newStep.id == this.stPgNo.GETSTART._StepNo)
        {// step 0
            if(correspondingStep.result.applicantName)      result.applicantName = correspondingStep.result.applicantName;
            if(correspondingStep.result.respondentsCommon)  result.respondentsCommon = correspondingStep.result.respondentsCommon;
            if(correspondingStep.result.respondents)        result.respondents = correspondingStep.result.respondents;

            if(correspondingStep.result.existingOrders)     result.existingOrders = correspondingStep.result.existingOrders;
            if(correspondingStep.result.respondentsPO)      result.respondentsPO  = correspondingStep.result.respondentsPO;

            if(correspondingStep.result.protectedPartyName) result.protectedPartyName = correspondingStep.result.protectedPartyName;
            if(correspondingStep.result.protectedChildName) result.protectedChildName = correspondingStep.result.protectedChildName;

            result.selectedForms = [];
            const pathwayCompleted = this.resetPathwayCompleted();
            result.pathwayCompleted = pathwayCompleted;

            for(const selectedform of correspondingStep.result.selectedForms){                
                if(pathwayCompleted[selectedform] == false){                    
                    result.selectedForms.push(selectedform)
                }
            }
        }
        else{
            //other steps
            for (const [key, value] of Object.entries(correspondingStep.result)){
                
                const fieldName = key.charAt(0).toUpperCase() + key.slice(1,-6);
                if(value && (value['currentStep'] || value['currentStep']==0) && (this.stPgNo[newStep.name][fieldName] || this.stPgNo[newStep.name][fieldName]==0)){
                    value['currentStep'] = this.stPgNo[newStep.name]._StepNo
                    value['currentPage'] = this.stPgNo[newStep.name][fieldName]
                    result[key] = value;
                }
            }            
        }
        return result
    }


    public resetPathwayCompleted(): pathwayCompletedInfoType{
        
        const pathwayCompleted = {} as pathwayCompletedInfoType;
        
        pathwayCompleted.protectionOrder = false;
        pathwayCompleted.replyFlm = false;
        pathwayCompleted.writtenResponse = false;
        pathwayCompleted.replyCounterApplication = false;        
        pathwayCompleted.familyLawMatter = false;        
        pathwayCompleted.caseMgmt = false;       
        pathwayCompleted.priorityParenting = false;       
        pathwayCompleted.childReloc = false;       
        pathwayCompleted.agreementEnfrc = false;
        
        return pathwayCompleted;        
    }

    public applyResetPathway(){
        const newPathwayCompleted = this.resetPathwayCompleted();
		store.commit("setPathwayCompletedFull",newPathwayCompleted);
    }

}