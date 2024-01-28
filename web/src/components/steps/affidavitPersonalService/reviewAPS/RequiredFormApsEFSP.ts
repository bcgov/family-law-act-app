import store from '@/store';

export function whichForm(stepApsResult?) {

    const requiredForm = ['P48'];
    let resultAps = stepApsResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepApsResult){                
        const stepAPS = store.state.Application.steps[stPgNo.APS._StepNo] 
        resultAps = stepAPS.result
    }
  
    if(store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';            

        if(eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}