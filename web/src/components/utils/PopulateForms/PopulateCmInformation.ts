import store from '@/store';

export function getCaseManagementResultData (result, commonStepNo, cMStepNo){

    for(const stepIndex of [commonStepNo, cMStepNo]){
        const stepResults = store.state.Application.steps[stepIndex].result
        for(const stepResultInx in stepResults){         
            if(stepResults[stepResultInx])
                result[stepResultInx]=stepResults[stepResultInx].data; 
        }
    }

    const stepCM = store.state.Application.steps[cMStepNo]
    const childRelatedType = {childRelatedTypeSurvey: stepCM.result.childRelatedTypeSurvey};
    Object.assign(result, result, childRelatedType);
    
    const applicationLocation = store.state.Application.applicationLocation;
    const userLocation = store.state.Common.userLocation;

    if(applicationLocation)
        Object.assign(result, result,{applicationLocation: applicationLocation}); 
    else
        Object.assign(result, result,{applicationLocation: userLocation});

    return result;
}