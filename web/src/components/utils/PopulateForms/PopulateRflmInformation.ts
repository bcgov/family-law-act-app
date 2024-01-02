import { replyExistingChildSupportDataInfoType, replyNewChildSupportDataInfoType, replyNewChildSupportSurveyInfoType } from '@/types/Application/ReplyFamilyLawMatter/ChildSupport';
import { rflmQuestionnaireDataInfoType, rflmCounterAppDataInfoType, rflmBackgroundSurveyDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';
import { replyExistingParentingArrangementsDataInfoType, replyNewConditionsParentingTimeDataInfoType, replyNewParentalResponsibilitiesDataInfoType, replyNewParentingTimeDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';
import { agreeDisagreeInfoType, form6PopulationInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { replyExistingContactWithChildDataInfoType, replyNewContactWithChildDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ContactWithChild';
import { replyAppointingGuardianOfChildDataInfoType, replyCancellingGuardianOfChildDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/GuardianShip';
import { replyExistingSpouseSupportDataInfoType, replyNewSpouseSupportDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/SpousalSupport';
import { replyExistingPropertyDivisionDataInfoType, replyNewPropertyDivisionDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/CompanionAnimal';

export function getForm6PopulationInfo(result) {

    let form6PopulationInfo = {} as form6PopulationInfoType;

    let agreeDisagreeResults = {} as agreeDisagreeInfoType;
    const schedules: string[] = [];

    const rflmQuestionnaireInfo: rflmQuestionnaireDataInfoType = result.rflmQuestionnaireSurvey;
    const rflmCounterAppInfo: rflmCounterAppDataInfoType = result.rflmCounterAppSurvey;
    const rflmBackgroundInfo: rflmBackgroundSurveyDataInfoType = result.rflmBackgroundSurvey;
    
    const counterList = rflmCounterAppInfo.counterList;
    const existingFlmList = (rflmBackgroundInfo.ExistingOrdersFLM == 'y')?rflmBackgroundInfo.existingOrdersListFLM:[];

    agreeDisagreeResults = {
        newParentResp: { opApplied: false, agree: false},
        newParentTime: { opApplied: false, agree: false},
        newParentTimeConditions: { opApplied: false, agree: false},
        existingParentResp: { opApplied: false, agree: false},
        existingParentTime: { opApplied: false, agree: false},
        existingParentTimeConditions: { opApplied: false, agree: false},
        newChildSupport: { opApplied: false, agree: false},
        existingChildSupport: { opApplied: false, agree: false},
        newChildContact: { opApplied: false, agree: false},
        existingChildContact: { opApplied: false, agree: false},
        appointGuardian: { opApplied: false, agree: false},
        cancelGuardian: { opApplied: false, agree: false},
        newSpouseSupport: { opApplied: false, agree: false},
        existingSpouseSupport: { opApplied: false, agree: false},
        newCompanionAnimal: { opApplied: false, agree: false},
        existingCompanionAnimal: { opApplied: false, agree: false}
    }    

    if (rflmQuestionnaireInfo.selectedParentingArrangementsForm.includes('newParentingArrangements')){

        const newParentingArrangementsInfo = getSchedule1Info(result)
               
        agreeDisagreeResults.newParentResp = newParentingArrangementsInfo.newParentResp;            
        agreeDisagreeResults.newParentTime= newParentingArrangementsInfo.newParentTime;           
        agreeDisagreeResults.newParentTimeConditions= newParentingArrangementsInfo.newParentTimeConditions

        const disagreeItem = (agreeDisagreeResults.newParentResp.opApplied && !agreeDisagreeResults.newParentResp.agree)
        || (agreeDisagreeResults.newParentTime.opApplied && !agreeDisagreeResults.newParentTime.agree)
        || (agreeDisagreeResults.newParentTimeConditions.opApplied && !agreeDisagreeResults.newParentTimeConditions.agree);

        if (disagreeItem){
            schedules.push('schedule1');
        }
        
    } else if (rflmQuestionnaireInfo.selectedParentingArrangementsForm.includes('existingParentingArrangements')){

        const existingParentingArrangementsInfo = getSchedule2Info(result); 
        
        agreeDisagreeResults.existingParentResp = existingParentingArrangementsInfo.existingParentResp;
        agreeDisagreeResults.existingParentTime = existingParentingArrangementsInfo.existingParentTime;
        agreeDisagreeResults.existingParentTimeConditions = existingParentingArrangementsInfo.existingParentTimeConditions;       

        const disagreeItem = (agreeDisagreeResults.existingParentResp.opApplied && !agreeDisagreeResults.existingParentResp.agree)
                || (agreeDisagreeResults.existingParentTime.opApplied && !agreeDisagreeResults.existingParentTime.agree)
                || (agreeDisagreeResults.existingParentTimeConditions.opApplied && !agreeDisagreeResults.existingParentTimeConditions.agree);

        if (disagreeItem){
            schedules.push('schedule2');
        }
        
    }

    if (rflmQuestionnaireInfo.selectedChildSupportForm.includes('newChildSupport')){        

        const newChildSupport: replyNewChildSupportDataInfoType = result.replyNewChildSupportSurvey;    
        const agreed = newChildSupport.agreeCourtOrder == 'y';

        agreeDisagreeResults.newChildSupport = { opApplied: true, agree: agreed }
        
        if (!agreed){
            schedules.push('schedule3')
        }
        
    } else if (rflmQuestionnaireInfo.selectedChildSupportForm.includes('existingChildSupport')){
        const existingChildSupport: replyExistingChildSupportDataInfoType = result.replyExistingChildSupportSurvey;     
        const agreed = existingChildSupport.agreeCourtOrder == 'y';  

        agreeDisagreeResults.existingChildSupport = { opApplied: true, agree: agreed }
        
        if (!agreed){
            schedules.push('schedule4')
        }
    }

    if (rflmQuestionnaireInfo.selectedContactWithChildForm.includes('newContact')){

        const newContactWithChild: replyNewContactWithChildDataInfoType = result.replyNewContactWithChildSurvey;   
        const agreed = newContactWithChild.agreeCourtOrder == 'y'; 

        agreeDisagreeResults.newChildContact = { opApplied: true, agree: agreed }     
        
        if (!agreed){
            schedules.push('schedule5')
        }

    } else if (rflmQuestionnaireInfo.selectedContactWithChildForm.includes('existingContact')){

        const existingChildContact: replyExistingContactWithChildDataInfoType = result.replyExistingContactWithChildSurvey;   
        const agreed = existingChildContact.agreeCourtOrder == 'y';    

        agreeDisagreeResults.existingChildContact = { opApplied: true, agree: agreed };
        
        if (!agreed){
            schedules.push('schedule6')
        }
    }

    if (rflmQuestionnaireInfo.selectedGuardianshipForm.includes('appointing')){

        const appointingChildGuardian: replyAppointingGuardianOfChildDataInfoType = result.replyAppointingGuardianOfChildSurvey;        
        const agreed = (appointingChildGuardian.moreThanOneChild == 'y' && appointingChildGuardian.agreeCourtOrderChild == 'agreeAll')
        || (appointingChildGuardian.moreThanOneChild == 'n' && appointingChildGuardian.agreeCourtOrder == 'y');

        agreeDisagreeResults.appointGuardian = { opApplied: true, agree: agreed }
        
        if (!agreed){
            schedules.push('schedule7')
        }
    } 
    if (rflmQuestionnaireInfo.selectedGuardianshipForm.includes('cancelling')){

        const cancellingChildGuardian: replyCancellingGuardianOfChildDataInfoType = result.replyCancellingGuardianOfChildSurvey;        
        const agreed = (cancellingChildGuardian.agreeCourtOrder == 'agreeAll');

        agreeDisagreeResults.cancelGuardian = { opApplied: true, agree: agreed };
        
        if (!agreed){
            schedules.push('schedule8')
        }
    }    

    if (rflmQuestionnaireInfo.selectedSpousalSupportForm.includes('newSpouseSupport')){

        const newSpouseSupport: replyNewSpouseSupportDataInfoType = result.replyNewSpouseSupportSurvey;    
        const agreed = newSpouseSupport.agreeCourtOrder == 'y';

        agreeDisagreeResults.newSpouseSupport = { opApplied: true, agree: agreed }
        
        if (!agreed){
            schedules.push('schedule9')
        }
    } else if (rflmQuestionnaireInfo.selectedSpousalSupportForm.includes('existingSpouseSupport')){

        const existingSpouseSupport: replyExistingSpouseSupportDataInfoType = result.replyExistingSpouseSupportSurvey;    
        const agreed = existingSpouseSupport.agreeCourtOrder == 'y';

        agreeDisagreeResults.existingSpouseSupport = { opApplied: true, agree: agreed }

        if (!agreed){
            schedules.push('schedule10');
        }
        
    }

    if (rflmQuestionnaireInfo.selectedCompanionAnimalForm.includes('newCompanionAnimal')){

        const newCompanionAnimal: replyNewPropertyDivisionDataInfoType = result.replyNewPropertyDivisionSurvey;    
        const agreed = newCompanionAnimal.agreeCourtMakeOrder == 'y';

        agreeDisagreeResults.newCompanionAnimal = { opApplied: true, agree: agreed }
        
        if (!agreed){
            schedules.push('schedule101')
        }
    } else if (rflmQuestionnaireInfo.selectedCompanionAnimalForm.includes('existingCompanionAnimal')){

        const existingCompanionAnimal: replyExistingPropertyDivisionDataInfoType = result.replyExistingPropertyDivisionSurvey;    
        const agreed = existingCompanionAnimal.agreeCourtMakeOrder == 'y';

        agreeDisagreeResults.existingCompanionAnimal = { opApplied: true, agree: agreed }

        if (!agreed){
            schedules.push('schedule102');
        }
        
    }

    if (rflmCounterAppInfo.counter == 'Yes'){

        if (counterList.includes('parentingArrangements')) {

            if (existingFlmList.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                schedules.push('schedule12')
            } else {
                schedules.push('schedule11')
            }

        } 

        if (counterList.includes('childSupport')) {

            if (existingFlmList.includes("Child Support")){
                schedules.push('schedule14')
            } else {
                schedules.push('schedule13')
            }

        } 

        if (counterList.includes('contactWithChild')) {

            if (existingFlmList.includes("Contact with a Child")){
                schedules.push('schedule16')
            } else {
                schedules.push('schedule15')
            }

        } 

        if (counterList.includes('guardianOfChild')) {
            if (result.guardianOfChildSurvey){
                if (result.guardianOfChildSurvey?.applicationType?.includes('becomeGuardian')){
                    schedules.push("schedule17")
                }
                if (result.guardianOfChildSurvey?.applicationType?.includes('cancelGuardian')){
                    schedules.push("schedule18")
                }
            }  

        }

        if (counterList.includes('spousalSupport')) {

            if (existingFlmList.includes("Spousal Support")){
                schedules.push('schedule20')
            } else {
                schedules.push('schedule19')
            }

        }

        if (counterList.includes('companionAnimal')) {
            if (existingFlmList.includes("Property Division in respect of a companion animal")){
                schedules.push('schedule22')
            } else {
                schedules.push('schedule21')
            }
        }
    }    

    form6PopulationInfo = {
        schedules: schedules,
        agreeDisagree: agreeDisagreeResults
    }
        
    return form6PopulationInfo;       
}

export function getSchedule1Info(result){

    const newResp: replyNewParentalResponsibilitiesDataInfoType = result.replyNewParentalResponsibilitiesSurvey;        
    const newParentResp = {
        opApplied: newResp.otherPartyParentalResponsibilitiesOrder == 'y',
        agree: newResp.otherPartyParentalResponsibilitiesOrder == 'y' && newResp.agreeResponsibilitiesOrder == 'y'
    }        

    const newTime: replyNewParentingTimeDataInfoType = result.replyNewParentingTimeSurvey;        
    const newParentTime= {
        opApplied: newTime.otherPartyParentalTimeOrder == 'y',
        agree: (newTime.otherPartyParentalTimeOrder == 'y' && newTime.agreeTimeOrder == 'y')
    }

    const newTimeCondition: replyNewConditionsParentingTimeDataInfoType = result.replyNewConditionsParentingTimeSurvey;        
    const newParentTimeConditions= {
        opApplied: newTimeCondition.otherPartyConditionParentalTimeOrder == 'y',
        agree: (newTimeCondition.otherPartyConditionParentalTimeOrder == 'y' && newTimeCondition.agreeConditionTimeOrder == 'y')
    }

    return {newParentResp: newParentResp, newParentTime: newParentTime, newParentTimeConditions: newParentTimeConditions}

}

export function getSchedule2Info(result){

    const existingArrangement: replyExistingParentingArrangementsDataInfoType = result.replyExistingParentingArrangementsSurvey;
    const agreeAll = existingArrangement.agreeCourtOrder == 'y';

    let listOfOpApplications = existingArrangement.listOfOpApplications?existingArrangement.listOfOpApplications:[];
    let listOfAgreePartial = existingArrangement.listOfAgreePartial?existingArrangement.listOfAgreePartial:[];

    const includesParentResp = listOfOpApplications.includes('parental responsibilities');
    const includesParentTime = listOfOpApplications.includes('parenting time');
    const includesParentTimeConditions = listOfOpApplications.includes('conditions on parenting time');
    const includesOther = listOfOpApplications.includes('other parenting arrangements');
    const includesNone = listOfOpApplications.includes('none of the above');

    let minLength = includesNone?2:1
    
    let existingParentResp = {
        opApplied: includesParentResp,
        agree: (includesParentResp && agreeAll) || 
            (includesParentResp && !agreeAll 
                && listOfOpApplications.length > minLength 
                && existingArrangement.agreePartial == 'y' 
                && listOfAgreePartial.includes('parental responsibilities'))
    }    

    if (includesOther && !includesParentResp){
       existingParentResp = {
            opApplied: true,
            agree: (agreeAll) || 
                    (!agreeAll && listOfOpApplications.length > minLength 
                    && existingArrangement.agreePartial == 'y' 
                    && listOfAgreePartial.includes('other parenting arrangements'))
        }           
    } else if (!includesOther && !includesParentResp) {
        existingParentResp = { opApplied: false, agree: false }
    }
    
    let existingParentTime = {
        opApplied: includesParentTime,
        agree: (includesParentTime && agreeAll) || 
        (includesParentTime && !agreeAll 
            && listOfOpApplications.length > minLength 
            && existingArrangement.agreePartial == 'y' 
            && listOfAgreePartial.includes('parenting time'))
    } 
    
    let existingParentTimeConditions = {
        opApplied: includesParentTimeConditions,
        agree: (includesParentTimeConditions && agreeAll) || 
        (includesParentTimeConditions && !agreeAll 
            && listOfOpApplications.length > minLength 
            && existingArrangement.agreePartial == 'y' 
            && listOfAgreePartial.includes('conditions on parenting time'))
    } 

    if (includesNone && agreeAll){

        existingParentResp = {opApplied: true, agree: true}
        existingParentTime = {opApplied: true, agree: true}
        existingParentTimeConditions = {opApplied: true, agree: true}     

    } else if (includesNone && listOfOpApplications.length == 1 && !agreeAll){

        existingParentResp = {opApplied: true, agree: false}
        existingParentTime = {opApplied: true, agree: false}
        existingParentTimeConditions = {opApplied: true, agree: false}
    }    
    
    return {existingParentResp: existingParentResp, existingParentTime: existingParentTime, existingParentTimeConditions: existingParentTimeConditions}

}