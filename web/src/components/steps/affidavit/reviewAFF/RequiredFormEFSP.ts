import store from '@/store';

export function whichForm(stepAffResult?) {

    const requiredForm = ['P45'];
    let resultAff = stepAffResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepAffResult){                
        const stepAFF = store.state.Application.steps[stPgNo.AFF._StepNo] 
        resultAff = stepAFF.result
    }
  
    if(resultAff?.filingAffSurvey?.data?.sworn && store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';
        const sworn = resultAff?.filingAffSurvey?.data?.sworn == 'y';        

        if(sworn && eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}