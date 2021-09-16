import store from '@/store';
import * as _ from 'underscore';

export function getQuestionResults(stepNumbers, currentStep) {

    let questionResults = []

    for(const stepIndex of stepNumbers){
        const step = store.state.Application.steps[stepIndex]
        const stepResult = step.result
       
        if(stepResult)
            for (const [, value] of Object.entries(stepResult))
            {                                 
                if(value?.['data']?.length == 0){
                    const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                    value['questions'][0]= {name: "require", value: "", title: value['pageName'], inputType: ""}                 
                    if(isPageActive){
                        questionResults.push(value);
                    }
                }
                else if(value?.['currentPage'] || value?.['currentPage']==0){ 
                    const isPageActive = step.pages[value['currentPage']]? step.pages[value['currentPage']].active : false; 
                                    
                    if(value['questions'] && isPageActive){
                        questionResults.push(value);
                    }
                }
            }
    }

    questionResults = _.sortBy(questionResults,function(questionResult){ return (Number(questionResult['currentStep'])*100+Number(questionResult['currentPage'])); });
    
    const stPgNo = store.state.Application.stPgNo;
    
    if(currentStep != stPgNo.ENFRC._StepNo)
        questionResults = questionResults.filter(questionResult=>{if(questionResult.pageName !='Notice')return true})

       
    return questionResults;          
}