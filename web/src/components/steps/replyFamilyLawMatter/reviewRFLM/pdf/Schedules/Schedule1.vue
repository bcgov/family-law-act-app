<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" ></div>
        <div style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px;">
                <div style="flex: 1">
                    <ScheduleHeader scheduleNumber="Schedule 1" scheduleTitle="Parenting Arrangements"
                        scheduleDescription="Disagree with order requested by other party"></ScheduleHeader>
                        <div style="margin-bottom: 1rem;"></div>
                    <NoteBox>
                        <p>
                            Complete this schedule only if you disagree with all or part of the order about parenting arrangements, including parental responsibilities and parenting time, applied for by the other party on Schedule 1 or Schedule 2 of their Application About a Family Law Matter
                        </p>
                    </NoteBox>
                </div>

                <div style="width: 20%;"></div>
            </div>
            <div style="margin-bottom: 1rem;"></div>
<!-- <1> -->
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="1" title="Reason you disagree"></FormPart>
            <div class="print-block">
               
            <div style="display:inline; margin-left:0.35rem"><b>1.</b> I <b>do not agree with the order </b>requested by the other party about parenting arrangements, including parental responsibilities and parenting time, because:</div> 
            <GreyBoxForm v-if="exParentArrInfo.disagreeExpl" style="margin-top:10px; text-indent:0rem"
            textwidth="35rem" :text="exParentArrInfo.disagreeExpl">

             </GreyBoxForm>
             <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>
            </div> 
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Parenting arrangements include how each guardian of a child will parent their child(ren), including each guardian’s responsibilities for decision making about a child (parental responsibilities), and the time each guardian spends with a child (parenting time).
                    </p>
                </NoteBox>
            </div>      
        </div>
    </div>
      
    <div style="margin-bottom: 1rem;"></div>
<!-- <Part 2> -->
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="2" title="Existing final order or agreement– Complete this part only if there is an existing final order or agreement about parenting arrangements, including parental responsibilities and parenting time"></FormPart>
            <div class="print-block">
                <div>
                        <div style="margin:0 0 0 3rem;">
                            <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="exParentArrInfo.noChange?'yes':''" text="I would like the final order or agreement to <b>continue to be in place</b> ➜ If you selected this option, no further information is required on this schedule"  />
                          </div>
                          <div style="display:block;">
                            <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;"  :check="exParentArrInfo.change?'yes':''"  text="cancelled -> <i>Complete Part 5</i>"  />
                        </div>                            
                        </div>                        
                    </div>
            </div>
        </div>
        
    </div>

    <div style="margin-bottom: 1rem;"></div>
<!-- <Part 3> -->
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="3" title="Order about parenting arrangements, including parental responsibilities and parenting time - You do not need to complete this part if have indicated you would like the existing order or agreement to continue to be in place. "></FormPart>
            <div class="print-block">
                <div style="margin-bottom: 1rem;"></div>
                <NoteBox>
                    <p>
                        Guardians can arrange parental responsibilities and parenting time in any way that is in the best interests of the child. <br>
                        The court can make orders under Division 2 [Parenting Arrangements] of Part 4 [Care of and Time with Children] of the <i>Family Law Act. </i>
                    </p>
                </NoteBox>
                <div style="display:inline; margin-left:0.35rem"><b>3.</b> I am applying for an <b>order about parenting arrangements, including parental
                  responsibilities or parenting time, </b>as follows: <br> <i>List the details of teh order you are asking for</i></div> 
                <GreyBoxForm v-if="exParentArrInfo.change && exParentArrInfo.changeExpl" style="margin-top:10px; text-indent:0rem"
                textwidth="35rem" :text="exParentArrInfo.changeExpl">

             </GreyBoxForm>
             <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>
            </div>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        Parental responsibilities can 
                        be set up so they can be 
                        exercised by: <br>
                        • One or more guardians only, <br>
                        • Each guardian acting
                        separately, or<br>
                        • All guardians acting
                        together.<br>
                        <i>[s. 40 Family Law Act]</i>
                    </p>
                </NoteBox>
            </div>      
        </div>
    </div>

    <!-- <Part 4> -->
    <div style="margin-bottom: 1rem;"></div>
    <div style="display: flex; flex-direction: row;">
        <div style="width: 80%; padding-right: 4px;">
            <FormPart :part="4" title="Best interests of the child - You do not need to complete this part if have indicated
             you would like the existing order or agreement to continue to be in place."></FormPart>
             <div class="print-block">
                <div style="margin-bottom: 1rem;"></div>
                <div style="display:inline; margin-left:0.35rem"><b>4.</b> I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the best interests of the child(ren) because: <br> <i>List your reasons</i></div> 
                <GreyBoxForm v-if="exParentArrInfo.bestInterestExpl" style="margin-top:10px; text-indent:0rem"
                textwidth="35rem" :text="exParentArrInfo.changeExpl">

             </GreyBoxForm>
             <GreyBoxForm v-else style="margin-top:10px; text-indent:0rem" textwidth="30rem"></GreyBoxForm>
            </div>
        </div>
        <div style="width: 20%;">
            <div style="padding-top:30px">
                <NoteBox>
                    <b-icon-info-circle-fill />
                    <p>
                        To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the <i>Family Law Act. </i>The parties and the court must consider the best interests of a child when making a decision about parenting arrangements. For more information, see the guidebook. 
                    </p>
                </NoteBox>
            </div>      
        </div>
    </div>    

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { agreeDisagreeInfoType, schedule1DataInfoType,schedule2DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { replyExistingParentingArrangementsDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';
import { replyNewConditionsParentingTimeDataInfoType, replyNewParentalResponsibilitiesDataInfoType, replyNewParentingTimeDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import GreyBoxForm from '@/components/utils/PopulateForms/components/GreyBoxForm.vue';

@Component({
    components:{
        UnderlineForm,
        CheckBox,
        ScheduleHeader,
        NoteBox,
        FormPart,
        GreyBoxForm
    }
})

export default class Schedule1 extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    agreeDisagreeResults!: agreeDisagreeInfoType;

    dataReady = false;
    parentArrInfo = {} as schedule1DataInfoType;  
    exParentArrInfo = {} as schedule2DataInfoType;  
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){ 
        this.parentArrInfo = this.getParentingArrangementsInfo();
        this.exParentArrInfo = this.getExistingParentingArrangementsInfo();
    } 

    public getParentingArrangementsInfo(){
        let parentingArrangements = {} as schedule1DataInfoType;       

        if (this.agreeDisagreeResults.newParentResp.opApplied && !this.agreeDisagreeResults.newParentResp.agree){
            const parentingResp: replyNewParentalResponsibilitiesDataInfoType = this.result.replyNewParentalResponsibilitiesSurvey
            parentingArrangements.parentResp = {
                applying: true,
                disagreeExpl: parentingResp.disagreeReason,
                askExpl: parentingResp.requestedParentalResponsibilities,
                bestInterestExpl: parentingResp.childBestInterestReason                
            }

        } else {
            parentingArrangements.parentResp= {
                applying: false,
                disagreeExpl: '',
                askExpl: '',
                bestInterestExpl: '' 
            }
        }

        if (this.agreeDisagreeResults.newParentTime.opApplied && !this.agreeDisagreeResults.newParentTime.agree){
            const parentingTime: replyNewParentingTimeDataInfoType = this.result.replyNewParentingTimeSurvey
            parentingArrangements.parentTime = {
                applying: true,
                disagreeExpl: parentingTime.disagreeReason,
                askExpl: parentingTime.requestedParentalTime,
                bestInterestExpl: parentingTime.childBestInterestReason 
            }

        } else {
            parentingArrangements.parentTime = {
                applying: false,
                disagreeExpl: '',
                askExpl: '',
                bestInterestExpl: ''   
            }     
        }

        if (this.agreeDisagreeResults.newParentTimeConditions.opApplied && !this.agreeDisagreeResults.newParentTimeConditions.agree){
            const parentingTimeConditions: replyNewConditionsParentingTimeDataInfoType = this.result.replyNewConditionsParentingTimeSurvey
            parentingArrangements.parentTimeConditions = {
                applying: true,
                disagreeExpl: parentingTimeConditions.disagreeReason,
                askExpl: parentingTimeConditions.requestedConditionParentalTime,
                bestInterestExpl: parentingTimeConditions.childBestInterestReason                 
            }
        } else {
            parentingArrangements.parentTimeConditions = {
                applying: false,
                disagreeExpl: '',
                askExpl: '',
                bestInterestExpl: ''                
            }
        }       
        
        return parentingArrangements;
    }

    public getExistingParentingArrangementsInfo(){
        let existingParentingArrangements = {} as schedule2DataInfoType; 

        if(this.result.replyExistingParentingArrangementsSurvey){

            const existingInfo: replyExistingParentingArrangementsDataInfoType = this.result.replyExistingParentingArrangementsSurvey;

            const disagreeItem = (this.agreeDisagreeResults.existingParentResp.opApplied && !this.agreeDisagreeResults.existingParentResp.agree)
                || (this.agreeDisagreeResults.existingParentTime.opApplied && !this.agreeDisagreeResults.existingParentTime.agree)
                || (this.agreeDisagreeResults.existingParentTimeConditions.opApplied && !this.agreeDisagreeResults.existingParentTimeConditions.agree);

                console.log(this.agreeDisagreeResults)

            if (disagreeItem){
                if (existingInfo.existingType == 'finalOrder'){
                    existingParentingArrangements.existingType = 'finalOrder';
                    existingParentingArrangements.agreeNeedsChanges = existingInfo.agreeFinalOrder == 'y';
                    existingParentingArrangements.agreeBestInterest = false;                
                } else if (existingInfo.existingType == 'agreement'){
                    existingParentingArrangements.existingType = 'agreement';
                    existingParentingArrangements.agreeBestInterest = existingInfo.agreeAgreement == 'y';
                    existingParentingArrangements.agreeNeedsChanges = false;
                }                
                existingParentingArrangements.disagreeExpl = existingInfo.disagreeReason?existingInfo.disagreeReason:''
                existingParentingArrangements.noChange = existingInfo.desiredOrderChoice == 'noChange';
                existingParentingArrangements.change = existingInfo.desiredOrderChoice == 'differentChange';
                const changeExplanationRequired = (existingInfo.desiredOrderChoice == 'differentChange') && existingInfo.requestedParentingArrangements
                existingParentingArrangements.changeExpl = changeExplanationRequired?existingInfo.requestedParentingArrangements:'';
                existingParentingArrangements.bestInterestExpl = existingInfo.childBestInterestReason?existingInfo.childBestInterestReason:'';

            } else {
                existingInfo.existingType = '';
                existingParentingArrangements.agreeBestInterest = false;
                existingParentingArrangements.agreeNeedsChanges = false;
                existingParentingArrangements.disagreeExpl = '';
                existingParentingArrangements.noChange = false;
                existingParentingArrangements.change = false;
                existingParentingArrangements.changeExpl = ''
                existingParentingArrangements.bestInterestExpl = '';
            }              
        } 
        
        return existingParentingArrangements;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>