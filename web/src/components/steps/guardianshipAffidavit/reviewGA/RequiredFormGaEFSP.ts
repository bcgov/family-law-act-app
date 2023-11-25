import store from '@/store';

export function whichForm(stepGaResult?) {

    const requiredForm = ['P5'];
    let resultGa = stepGaResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepGaResult){                
        const stepGA = store.state.Application.steps[stPgNo.GA._StepNo] 
        resultGa = stepGA.result
    }
  
    if(resultGa?.filingGaSurvey?.data?.sworn && store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';
        const sworn = resultGa?.filingGaSurvey?.data?.sworn == 'y';        

        if(sworn && eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}