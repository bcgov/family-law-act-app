import store from '@/store';

export function whichCaseMgmtForm() {

    const stPgNo = store.state.Application.stPgNo;

    const requiredForm = [];
    const stepCM = store.state.Application.steps[stPgNo.CM._StepNo]   

    if(stepCM.result?.withoutNoticeOrAttendanceSurvey?.data && stepCM.result?.cmQuestionnaireSurvey?.data){
        const withoutNoticeOrAttendanceData = stepCM.result.withoutNoticeOrAttendanceSurvey.data;
        const determinedItemType = determineNoticeTurquoise(stepCM.result)
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
        'section242'
    ]

    const needNotice = needNoticeList.some(turquoise => selectedCaseManagementItems.includes(turquoise)); 
    const nonTurquoise = selectedCaseManagementItems.some(selectedItem => !needNoticeList.includes(selectedItem))
    return {needNotice:needNotice, nonTurquoise:nonTurquoise};
}