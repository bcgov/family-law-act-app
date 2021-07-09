import store from '@/store';

export function whichCaseMgmtForm() {

    const stPgNo = store.state.Application.stPgNo;

    const requiredForm = [];
    const stepCM = store.state.Application.steps[stPgNo.CM._StepNo]   

    if(stepCM.result?.withoutNoticeOrAttendanceSurvey?.data && stepCM.result?.cmQuestionnaireSurvey?.data){
        const withoutNoticeOrAttendanceData = stepCM.result.withoutNoticeOrAttendanceSurvey.data;
        if(withoutNoticeOrAttendanceData.needWithoutNotice == 'y' && needNotice(stepCM.result)){
            requiredForm.push('P11');                
        } else {
            requiredForm.push('P10');
        }        
    } else {
        requiredForm.push('P10');
    }   
    return requiredForm;          
}

function needNotice(results){

    let needNotice = false;
    
    const selectedCaseManagementItems = results.cmQuestionnaireSurvey.data;
    const needNoticeList = [
        'changeServiceRequirement',
        'changeRequirement',
        'remoteAttendance',
        'otherProvinceOrder',
        'section242'
    ]

    needNotice = needNoticeList.some(i => selectedCaseManagementItems.includes(i));        

    return needNotice;
}