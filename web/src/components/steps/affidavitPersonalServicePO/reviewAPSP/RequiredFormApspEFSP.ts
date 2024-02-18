import store from '@/store';

export function whichForm(stepApspResult?) {

    const requiredForm = ['P49'];
    let resultApsp = stepApspResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepApspResult){                
        const stepAPSP = store.state.Application.steps[stPgNo.APSP._StepNo] 
        resultApsp = stepAPSP.result
    }
  
    if(store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile'; 

        if(eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}