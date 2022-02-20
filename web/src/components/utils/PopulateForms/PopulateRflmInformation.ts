import { replyNewChildSupportDataInfoType, replyNewChildSupportSurveyInfoType } from '@/types/Application/ReplyFamilyLawMatter/ChildSupport';
import { replyExistingParentingArrangementsDataInfoType, replyNewConditionsParentingTimeDataInfoType, replyNewParentalResponsibilitiesDataInfoType, replyNewParentingTimeDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';
import { agreeDisagreeInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';

export function getAgreeDisagreeResults(result, schedules: string[]) {

    let agreeDisagreeResults = {} as agreeDisagreeInfoType;

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
        existingSpouseSupport: { opApplied: false, agree: false}
    }

    if (schedules.includes('schedule1')){

        const newResp: replyNewParentalResponsibilitiesDataInfoType = result.replyNewParentalResponsibilitiesSurvey;        
        agreeDisagreeResults.newParentResp = {
            opApplied: newResp.otherPartyParentalResponsibilitiesOrder == 'y',
            agree: newResp.otherPartyParentalResponsibilitiesOrder == 'y' && newResp.agreeResponsibilitiesOrder == 'y'
        }        

        const newTime: replyNewParentingTimeDataInfoType = result.replyNewParentingTimeSurvey;        
        agreeDisagreeResults.newParentTime= {
            opApplied: newTime.otherPartyParentalTimeOrder == 'y',
            agree: (newTime.otherPartyParentalTimeOrder == 'y' && newTime.agreeTimeOrder == 'y')
        }

        const newTimeCondition: replyNewConditionsParentingTimeDataInfoType = result.replyNewConditionsParentingTimeSurvey;        
        agreeDisagreeResults.newParentTimeConditions= {
            opApplied: newTimeCondition.otherPartyConditionParentalTimeOrder == 'y',
            agree: (newTimeCondition.otherPartyConditionParentalTimeOrder == 'y' && newTimeCondition.agreeConditionTimeOrder == 'y')
        }           
        
    } else if (schedules.includes('schedule2')){
        
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
        
        agreeDisagreeResults.existingParentResp = {
            opApplied: includesParentResp,
            agree: (includesParentResp && agreeAll) || 
                (includesParentResp && !agreeAll 
                    && listOfOpApplications.length > minLength 
                    && existingArrangement.agreePartial == 'y' 
                    && listOfAgreePartial.includes('parental responsibilities'))
        }    

        if (includesOther && !includesParentResp){
            agreeDisagreeResults.existingParentResp = {
                opApplied: true,
                agree: (agreeAll) || 
                        (!agreeAll && listOfOpApplications.length > minLength 
                        && existingArrangement.agreePartial == 'y' 
                        && listOfAgreePartial.includes('other parenting arrangements'))
            }           
        } else if (!includesOther && !includesParentResp) {
            agreeDisagreeResults.existingParentResp = {
                opApplied: false,
                agree: false
            }
        }
        
        agreeDisagreeResults.existingParentTime = {
            opApplied: includesParentTime,
            agree: (includesParentTime && agreeAll) || 
            (includesParentTime && !agreeAll 
                && listOfOpApplications.length > minLength 
                && existingArrangement.agreePartial == 'y' 
                && listOfAgreePartial.includes('parenting time'))
        } 
       
        agreeDisagreeResults.existingParentTimeConditions = {
            opApplied: includesParentTimeConditions,
            agree: (includesParentTimeConditions && agreeAll) || 
            (includesParentTimeConditions && !agreeAll 
                && listOfOpApplications.length > minLength 
                && existingArrangement.agreePartial == 'y' 
                && listOfAgreePartial.includes('conditions on parenting time'))
        } 

        if (includesNone && agreeAll){

            agreeDisagreeResults.existingParentResp = {opApplied: true, agree: true}
            agreeDisagreeResults.existingParentTime = {opApplied: true, agree: true}
            agreeDisagreeResults.existingParentTimeConditions = {opApplied: true, agree: true}     

        } else if (includesNone && listOfOpApplications.length == 1 && !agreeAll){

            agreeDisagreeResults.existingParentResp = {opApplied: true, agree: false}
            agreeDisagreeResults.existingParentTime = {opApplied: true, agree: false}
            agreeDisagreeResults.existingParentTimeConditions = {opApplied: true, agree: false}
        }
    }

    if (schedules.includes('schedule3')){

        const newChildSupport: replyNewChildSupportDataInfoType = result.replyNewChildSupportSurvey;        
        agreeDisagreeResults.newChildSupport = {
            opApplied: true,
            agree: newChildSupport.agreeCourtOrder == 'y'
        }                 
        
    }
        
    return agreeDisagreeResults;       
}