<template>        
<!-- <Page 2> --> 
<!-- <Header> -->
    <div v-if="dataReady">
        <div class="new-page" />
        <div style="text-align:center;"><b> SCHEDULE 1 – REPLY TO AN APPLICATION ABOUT PARENTING ARRANGEMENTS – NEW</b></div>
        <div style="text-align:center;"><b> This is Schedule 1 to the Reply to an Application About a Family Law Matter</b></div>

        <div style="margin:1rem 0; text-align:justify">
            <i>
                This schedule must be completed only if you are disagreeing with a new application by the other party about
                parenting arrangements for the child or children. The order they applied for about parenting arrangements can
                be found in Schedule 1 of their Application About a Family Law Matter.
            </i>
        </div>
<!-- <1> -->
        <section class="resetquestion"> 
            I do not agree to all or part of the following order(s) about parenting arrangements applied for by the other party:
            <i style="margin:0 0 0 1rem; display: block;">Select all options that apply and complete the required part(s)</i>
            <check-box 
                style="margin:0 0 0 1rem;" 
                :check="parentArrInfo.parentResp.applying?'yes':''" 
                text="parental responsibilities <i>(complete Part 1 of this Schedule)</i>"/>
            <check-box 
                style="margin:0 0 0 1rem;" 
                :check="parentArrInfo.parentTime.applying?'yes':''" 
                text="parenting time schedule <i>(complete Part 2 of this Schedule)</i>"/>
            <check-box 
                style="margin:0 0 0 1rem;" 
                :check="parentArrInfo.parentTimeConditions.applying?'yes':''" 
                text="conditions on parenting time <i>(complete Part 3 of this Schedule)</i>"/>                
        </section>

<!-- <Part 1> -->
        <div>
            <div style="margin-top:1rem;"><b>PART 1 – REPLY TO AN APPLICATION – PARENTAL RESPONSIBILITIES</b></div>
            <div><i>
                Complete this part only if you are disagreeing with an order about parental responsibilities requested by the
                other party. You may leave this part blank.
            </i></div>
<!-- <1> -->
            <section class="resetquestion">
                I do not agree with the requested allocation of parental responsibilities because:                    
                <div 
                    v-if="parentArrInfo.parentResp.applying && parentArrInfo.parentResp.disagreeExpl" 
                    class="answerbox">{{parentArrInfo.parentResp.disagreeExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
        </div>

        <div class="print-block">
<!-- <2> -->
            <section>
                I am asking for the parental responsibilities to be exercised by the guardians as follows:                    
                <div 
                    v-if="parentArrInfo.parentResp.applying && parentArrInfo.parentResp.askExpl" 
                    class="answerbox">{{parentArrInfo.parentResp.askExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
            
        </div>        

        <div class="print-block">
<!-- <3> -->
            <section>
                I believe the parental responsibilities I am asking for are in the child(ren)’s best interests because:                    
                <div 
                    v-if="parentArrInfo.parentResp.applying && parentArrInfo.parentResp.bestInterestExpl" 
                    class="answerbox">{{parentArrInfo.parentResp.bestInterestExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
            
        </div>

<!-- <Part 2> -->

        <div>
            <div style="margin-top:1rem;"><b>PART 2 – REPLY TO AN APPLICATION – PARENTING TIME SCHEDULE</b></div>
            <div><i>
                Complete this part only if you are disagreeing with an order about the parenting time schedule requested by the
                other party. You may leave this part blank.
            </i></div>
<!-- <1> -->
            <section class="resetquestion">
                I do not agree with the requested parenting time schedule because:                    
                <div 
                    v-if="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.disagreeExpl" 
                    class="answerbox">{{parentArrInfo.parentTime.disagreeExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
        </div>

        <div class="print-block">
<!-- <2> -->
            <section>
                I am asking for the parenting time schedule to be as follows:                   
                <div 
                   v-if="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.askExpl" 
                    class="answerbox">{{parentArrInfo.parentTime.askExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
            
        </div>        

        <div class="print-block">
<!-- <3> -->
            <section>
                I believe my requested parenting time schedule is in the child(ren)’s best interests because:                    
                <div 
                    v-if="parentArrInfo.parentTime.applying && parentArrInfo.parentTime.bestInterestExpl" 
                    class="answerbox">{{parentArrInfo.parentTime.bestInterestExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
            
        </div>

        <div class="print-block">
            <div style="margin-top:1rem;"><b>PART 3 – REPLY TO AN APPLICATION – CONDITIONS ON PARENTING TIME</b></div>
            <div><i>
                Complete this part only if you are disagreeing with an order about the conditions on parenting time requested by
                the other party. You may leave this part blank.
            </i></div>
<!-- <1> -->
            <section class="resetquestion">
                I do not agree with the requested conditions on my parenting time or the other guardian’s parenting time
                because:                    
                <div 
                    v-if="parentArrInfo.parentTimeConditions.applying && parentArrInfo.parentTimeConditions.disagreeExpl" 
                    class="answerbox">{{parentArrInfo.parentTimeConditions.disagreeExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
        </div>

        <div class="print-block">
<!-- <2> -->
            <section>
                I am asking for the conditions on my parenting time or the other guardian’s parenting time to be as follows:                   
                <div 
                    v-if="parentArrInfo.parentTimeConditions.applying && parentArrInfo.parentTimeConditions.askExpl" 
                    class="answerbox">{{parentArrInfo.parentTimeConditions.askExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>
            
        </div>        

        <div class="print-block">
<!-- <3> -->
            <section>
                I believe the conditions I have asked for on parenting time are in the child(ren)’s best interests because:                    
                <div 
                    v-if="parentArrInfo.parentTimeConditions.applying && parentArrInfo.parentTimeConditions.bestInterestExpl" 
                    class="answerbox">{{parentArrInfo.parentTimeConditions.bestInterestExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>            
        </div>   

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { agreeDisagreeInfoType, schedule1DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { replyNewConditionsParentingTimeDataInfoType, replyNewParentalResponsibilitiesDataInfoType, replyNewParentingTimeDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule1 extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    agreeDisagreeResults!: agreeDisagreeInfoType;

    dataReady = false;
    parentArrInfo = {} as schedule1DataInfoType;   
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    } 

    public extractInfo(){ 
        this.parentArrInfo = this.getParentingArrangementsInfo();
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
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>