import store from '@/store';
import _ from 'underscore';


export function togglePages(pageArr, activeIndicator, currentStep) {  
          
    for (const page of pageArr) {
        store.commit("Application/setPageActive", {
            currentStep: currentStep,
            currentPage: page,
            active: activeIndicator
        });
    } 
}

export function toggleStep(stepId, activeIndicator) {       
    store.commit("Application/setStepActive", {
        currentStep: stepId,
        active: activeIndicator
    });
}

export function toggleSteps(stepArr, activeIndicator) {  
    for (const step of stepArr) {   
        store.commit("Application/setStepActive", {
            currentStep: step,
            active: activeIndicator
        });
    }
}

export function toggleAllSteps(exceptionSteps, activeIndicator) {  
    const stPgNo = store.state.Application.stPgNo
    const stepsArr = _.range(0, Object.keys(stPgNo).length)    
    
    for (const stepNo of stepsArr) {

        if(exceptionSteps?.includes(stepNo)) continue;

        store.commit("Application/setStepActive", {
            currentStep: stepNo,
            active: activeIndicator
        });
    }
}