import store from '@/store';

export function whichAgreementEnfrcForm() {

    const stPgNo = store.state.Application.stPgNo;

    const requiredForm = ['P26','P27','P28','P29'];
    const stepENFRC = store.state.Application.steps[stPgNo.ENFRC._StepNo]   

    // if( stepENFRC.result?.withoutNoticeOrAttendanceSurvey?.data &&  stepENFRC.result?.cmQuestionnaireSurvey?.data){
    //     const withoutNoticeOrAttendanceData =  stepENFRC.result.withoutNoticeOrAttendanceSurvey.data;
    //     const determinedItemType = determineNoticeTurquoise( stepENFRC.result)
    //     if(withoutNoticeOrAttendanceData?.needWithoutNotice == 'y' && determinedItemType.needNotice && determinedItemType.nonTurquoise){
    //         requiredForm.push('P10','P11');                
    //     }
    //     else if(withoutNoticeOrAttendanceData?.needWithoutNotice == 'y' && determinedItemType.needNotice && !determinedItemType.nonTurquoise){
    //         requiredForm.push('P11');                
    //     } else {
    //         requiredForm.push('P10');
    //     }        
    // } else {
    //     requiredForm.push('P29');
    // }   
    return requiredForm;          
}

// function determineNoticeTurquoise(results){

//     const selectedCaseManagementItems = results.cmQuestionnaireSurvey.data;
//     const needNoticeList = [
//         'changeServiceRequirement',
//         'changeRequirement',
//         'remoteAttendance',
//         'otherProvinceOrder',
//         'section242'
//     ]

//     const needNotice = needNoticeList.some(turquoise => selectedCaseManagementItems.includes(turquoise)); 
//     const nonTurquoise = selectedCaseManagementItems.some(selectedItem => !needNoticeList.includes(selectedItem))
//     return {needNotice:needNotice, nonTurquoise:nonTurquoise};
// }