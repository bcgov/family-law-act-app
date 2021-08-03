import store from '@/store';

export function whichAgreementEnfrcForm() {

    const stPgNo = store.state.Application.stPgNo;

    const requiredForm = ['P29'];
    const stepENFRC = store.state.Application.steps[stPgNo.ENFRC._StepNo] 
    
    

    if( stepENFRC.result?.enforceAgreementOrOrderSurvey?.data &&  stepENFRC.result?.enfrcQuestionnaireSurvey?.data){
        
        const enfrcAgreeOrderData =  stepENFRC.result.enforceAgreementOrOrderSurvey.data;
        const selectedEnfrc = stepENFRC.result.enfrcQuestionnaireSurvey.data
        
        if(selectedEnfrc.includes('writtenAgreementOrder') && enfrcAgreeOrderData.enforceOrder =="n" && enfrcAgreeOrderData.filedOrder == "n"){
            if(enfrcAgreeOrderData.existingType == "courtOrder")
                requiredForm.push('P28');
            else
                requiredForm.push('P26');
        }

        if(selectedEnfrc.includes('parentingCoordinatorDetermination'))
            requiredForm.push('P27');

    }   
    return requiredForm;          
}