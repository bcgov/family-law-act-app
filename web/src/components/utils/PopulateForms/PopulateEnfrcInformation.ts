import store from '@/store';

export function getEnforcementResultData (result, commonStepNo, enfrcStepNo){

    for(const stepIndex of [commonStepNo, enfrcStepNo]){
        const stepResults = store.state.Application.steps[stepIndex].result
        for(const stepResultInx in stepResults){
            if(stepResults[stepResultInx])
                result[stepResultInx]=stepResults[stepResultInx].data; 
        }
    }        
    
    const applicationLocation = store.state.Application.applicationLocation;
    const userLocation = store.state.Common.userLocation;
   
    if(applicationLocation)
        Object.assign(result, result,{applicationLocation: applicationLocation}); 
    else
        Object.assign(result, result,{applicationLocation: userLocation});

    return result;
}