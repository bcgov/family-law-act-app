import store from '@/store';

export function resetProgressOfAllPages(selectedForms, exceptionSteps: Number[]){
    
    const stPgNo = store.state.Application.stPgNo;
    for(const step of store.state.Application.steps){
        if(step.id == stPgNo.COMMON._StepNo){
            if(selectedForms.includes("protectionOrder"))
                store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: stPgNo.COMMON.YourInformation });           
            else 
                store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: stPgNo.COMMON.SafetyCheck });               
        }

        if(exceptionSteps.includes(Number(step.id))) continue;

        for(const page of step.pages){           
           store.commit("Application/setPageProgress", { currentStep: step.id, currentPage:page.key, progress:0 });
        }
    }
}

export function incompleteProgressOfAllPages(){
    
    for(const step of store.state.Application.steps){
        for(const page of step.pages){  
            if(page.progress ==100)         
                store.commit("Application/setPageProgress", { currentStep: step.id, currentPage:page.key, progress:50 });
        }
    }
}