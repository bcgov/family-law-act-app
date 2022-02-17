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
    } else if (schedules.includes('schedule2')){
        
        const existingArrangement: replyExistingParentingArrangementsDataInfoType = result.replyExistingParentingArrangementsSurvey;

        let listOfOpApplications = existingArrangement.listOfOpApplications;        
        let minLength = 1;

        if (listOfOpApplications.includes('none of the above')){              
            minLength = 2;                         
        } 
        
        if (listOfOpApplications.includes('parental responsibilities')){
            agreeDisagreeResults.existingParentResp= {
                opApplied: true,
                agree: existingArrangement.agreeCourtOrder == 'y' || 
                    (existingArrangement.agreeCourtOrder == 'n' 
                        && listOfOpApplications.length > minLength 
                        && existingArrangement.agreePartial == 'y' 
                        && existingArrangement.listOfAgreePartial.includes('parental responsibilities'))
            }           
        } else {
            agreeDisagreeResults.existingParentResp = {
                opApplied: false,
                agree: false
            }
        }  

        if (listOfOpApplications.includes('other parenting arrangements') && !listOfOpApplications.includes('parental responsibilities')){
            agreeDisagreeResults.existingParentResp= {
                opApplied: true,
                agree: (existingArrangement.agreeCourtOrder == 'y' && listOfOpApplications.length == minLength) || 
                    (existingArrangement.agreeCourtOrder == 'n' 
                        && listOfOpApplications.length > minLength 
                        && existingArrangement.agreePartial == 'y' 
                        && existingArrangement.listOfAgreePartial.includes('other parenting arrangements'))
            }           
        } else if (!listOfOpApplications.includes('other parenting arrangements') && !listOfOpApplications.includes('parental responsibilities')) {
            agreeDisagreeResults.existingParentResp = {
                opApplied: false,
                agree: false
            }
        }

        if (listOfOpApplications.includes('parenting time')){
            agreeDisagreeResults.existingParentTime= {
                opApplied: true,
                agree: existingArrangement.agreeCourtOrder == 'y' || 
                (existingArrangement.agreeCourtOrder == 'n' 
                    && listOfOpApplications.length > minLength 
                    && existingArrangement.agreePartial == 'y' 
                    && existingArrangement.listOfAgreePartial.includes('parenting time'))
            }           
        } else {
            agreeDisagreeResults.existingParentTime = {
                opApplied: false,
                agree: false
            }
        }

        if (listOfOpApplications.includes('conditions on parenting time')){
            agreeDisagreeResults.existingParentTimeConditions= {
                opApplied: true,
                agree: existingArrangement.agreeCourtOrder == 'y' || 
                (existingArrangement.agreeCourtOrder == 'n' 
                    && listOfOpApplications.length > minLength 
                    && existingArrangement.agreePartial == 'y' 
                    && existingArrangement.listOfAgreePartial.includes('conditions on parenting time'))
            }           
        } else {
            agreeDisagreeResults.existingParentTimeConditions = {
                opApplied: false,
                agree: false
            }
        }

        if (listOfOpApplications.includes('none of the above') && existingArrangement.agreeCourtOrder == 'y'){
            agreeDisagreeResults.existingParentResp= {
                opApplied: true,
                agree: true
            }
            agreeDisagreeResults.existingParentTime= {
                opApplied: true,
                agree: true
            }
            agreeDisagreeResults.existingParentTimeConditions= {
                opApplied: true,
                agree: true
            }           
        } else if (listOfOpApplications.includes('none of the above') 
                    && listOfOpApplications.length == 1 
                    && existingArrangement.agreeCourtOrder == 'n'){

            agreeDisagreeResults.existingParentResp= {
                opApplied: true,
                agree: false
            }
            agreeDisagreeResults.existingParentTime= {
                opApplied: true,
                agree: false
            }
            agreeDisagreeResults.existingParentTimeConditions= {
                opApplied: true,
                agree: false
            }

        }
    }
        
    return agreeDisagreeResults;       
}