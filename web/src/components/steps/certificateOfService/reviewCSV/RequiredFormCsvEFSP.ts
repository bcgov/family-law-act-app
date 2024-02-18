import store from '@/store';

export function whichForm(stepCsvResult?) {

    const requiredForm = ['P7'];
    let resultCsv = stepCsvResult

    const stPgNo = store.state.Application.stPgNo;

    if(!stepCsvResult){                
        const stepCSV = store.state.Application.steps[stPgNo.CSV._StepNo] 
        resultCsv = stepCSV.result
    }
  
    if(store.state.Application.steps[stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
        
        const eFiling = store.state.Application.steps[stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';

        if(eFiling){
            requiredForm.push('P51');
        }			

    }   
    return requiredForm;          
}