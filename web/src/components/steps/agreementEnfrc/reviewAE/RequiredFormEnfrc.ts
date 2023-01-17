import store from '@/store';

export function whichAgreementEnfrcForm(stepEnfrcResult?) {

    const requiredForm = ['P29'];
    let resultEnfrc = stepEnfrcResult

    if(!stepEnfrcResult){
        const stPgNo = store.state.Application.stPgNo;        
        const stepENFRC = store.state.Application.steps[stPgNo.ENFRC._StepNo] 
        resultEnfrc = stepENFRC.result
    }
    
    if(resultEnfrc?.enfrcQuestionnaireSurvey?.data){
        
        const selectedEnfrc = resultEnfrc.enfrcQuestionnaireSurvey.data

        if(resultEnfrc?.enforceAgreementOrOrderSurvey?.data){    
            const enfrcAgreeOrderData =  resultEnfrc.enforceAgreementOrOrderSurvey.data;

            if(selectedEnfrc.includes('writtenAgreementOrder') && enfrcAgreeOrderData.enforceOrder =="n" && enfrcAgreeOrderData.filedOrder == "n"){
                if(enfrcAgreeOrderData.existingType == "courtOrder")
                    requiredForm.push('P28');
                else
                    requiredForm.push('P26');
            }
        }

        if(selectedEnfrc.includes('parentingCoordinatorDetermination')){
                                
            const detData  = resultEnfrc?.enforceChangeSetAsideDeterminationSurvey?.data
            
            if(detData?.filedOrder == "n")
                requiredForm.push('P27');

            if(detData?.filedOrder == "n" && detData?.appointedDetermination?.selected == "writtenAgreement" && detData?.filedAgreement == "n")
                requiredForm.push('P26');
        }
			

    }   
    return requiredForm;          
}