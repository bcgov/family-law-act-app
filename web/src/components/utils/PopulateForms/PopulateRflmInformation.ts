import { replyNewConditionsParentingTimeDataInfoType, replyNewParentalResponsibilitiesDataInfoType, replyNewParentingTimeDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';
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

        if (newResp.otherPartyParentalResponsibilitiesOrder == 'y'){
            agreeDisagreeResults.newParentResp = {
                opApplied: true,
                agree: newResp.agreeResponsibilitiesOrder == 'y'
            }
        } else {
            agreeDisagreeResults.newParentResp = {
                opApplied: false,
                agree: false
            }
        }

        const newTime: replyNewParentingTimeDataInfoType = result.replyNewParentingTimeSurvey

        if (newTime.otherPartyParentalTimeOrder == 'y'){
            agreeDisagreeResults.newParentTime= {
                opApplied: true,
                agree: newTime.agreeTimeOrder == 'y'
            }
            
        } else {
            agreeDisagreeResults.newParentTime = {
                opApplied: false,
                agree: false
            }
        }

        const newTimeCondition: replyNewConditionsParentingTimeDataInfoType = result.replyNewConditionsParentingTimeSurvey;

        if (newTimeCondition.otherPartyConditionParentalTimeOrder == 'y'){
            agreeDisagreeResults.newParentTimeConditions= {
                opApplied: true,
                agree: newTimeCondition.agreeConditionTimeOrder == 'y'
            }           
        } else {
            agreeDisagreeResults.newParentTimeConditions = {
                opApplied: false,
                agree: false
            }
        }     
    }   
        
    return agreeDisagreeResults;       
}