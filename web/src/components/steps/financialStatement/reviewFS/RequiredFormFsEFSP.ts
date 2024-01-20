import store from '@/store';

export function whichForm(stepFsResult?) {

    const requiredForm = ['P4'];
    let resultFs = stepFsResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepFsResult){                
        const stepFS = store.state.Application.steps[stPgNo.FS._StepNo] 
        resultFs = stepFS.result
    }
  
    if(resultFs?.filingFsSurvey?.data?.sworn && store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';
        const sworn = resultFs?.filingFsSurvey?.data?.sworn == 'y';        

        if(sworn && eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}