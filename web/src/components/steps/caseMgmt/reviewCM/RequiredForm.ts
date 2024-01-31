import store from '@/store';

export function whichCaseMgmtForm(stepCMresult?) {
    
    const requiredForm = [];
    
    let resultCm = stepCMresult
    
    if(!stepCMresult){
        const stPgNo = store.state.Application.stPgNo;
        const stepCM = store.state.Application.steps[stPgNo.CM._StepNo]   
        resultCm = stepCM.result;
    }

    if(resultCm?.withoutNoticeOrAttendanceSurvey?.data && resultCm?.cmQuestionnaireSurvey?.data){
        const withoutNoticeOrAttendanceData = resultCm.withoutNoticeOrAttendanceSurvey.data;
        const determinedItemType = determineNoticeTurquoise(resultCm)
        if(withoutNoticeOrAttendanceData?.needWithoutNotice == 'y' && determinedItemType.needNotice && determinedItemType.nonTurquoise){
            requiredForm.push('P10','P11');                
        }
        else if(withoutNoticeOrAttendanceData?.needWithoutNotice == 'y' && determinedItemType.needNotice && !determinedItemType.nonTurquoise){
            requiredForm.push('P11');                
        } else {
            requiredForm.push('P10');
        }        
    } else {
        requiredForm.push('P10');
    }   
    return requiredForm;          
}

function determineNoticeTurquoise(results){

    const selectedCaseManagementItems = results.cmQuestionnaireSurvey.data;
    const needNoticeList = [
        'changeServiceRequirement',
        'changeRequirement',
        'remoteAttendance',
        'otherProvinceOrder',
        'section242',
        'section12'
    ]

    const needNotice = needNoticeList.some(turquoise => selectedCaseManagementItems.includes(turquoise)); 
    const nonTurquoise = selectedCaseManagementItems.some(selectedItem => !needNoticeList.includes(selectedItem))
    return {needNotice:needNotice, nonTurquoise:nonTurquoise};
}