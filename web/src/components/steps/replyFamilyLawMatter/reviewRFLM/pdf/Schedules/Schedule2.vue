<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page"/>
            <div style="text-align:center;"><b> SCHEDULE 2 – REPLY TO AN APPLICATION ABOUT PARENTING ARRANGEMENTS – EXISTING</b></div>
            <div style="text-align:center;"><b> This is Schedule 2 to the Reply to an Application About a Family Law Matter</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    This schedule must be completed only if you are disagreeing with an application by the other party to change or
                    cancel an existing final order about parenting arrangements, or to set aside or replace all or part of an
                    agreement about parenting arrangements, for the child or children. The order they applied for about parenting
                    arrangements can be found in Schedule 2 of their Application About a Family Law Matter.
                </i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                <i>Select only one of the options below</i>
                <div style="margin-left:1rem;">
                    <check-box 
                        :check="(exParentArrInfo.existingType == 'finalOrder' && exParentArrInfo.agreeNeedsChanges)?'yes':''" 
                        text="I agree that needs or circumstances have changed since the final order about parenting arrangements was made"/>
                    <check-box 
                        :check="(exParentArrInfo.existingType == 'finalOrder' && !exParentArrInfo.agreeNeedsChanges)?'yes':''" 
                        text="There has been no change in needs or circumstances since the final order about parenting arrangements was made"/>
                    <check-box 
                        :check="(exParentArrInfo.existingType == 'agreement' && exParentArrInfo.agreeBestInterest)?'yes':''" 
                        text="I agree the agreement about parenting arrangements is not in the best interests of the child(ren)"/>
                    <check-box 
                        :check="(exParentArrInfo.existingType == 'agreement' && !exParentArrInfo.agreeBestInterest)?'yes':''" 
                        text="I believe the agreement about parenting arrangements is in the best interests of the child(ren)"/>                    
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                I do not agree with the requested order about the existing final order or agreement because:                    
                <div 
                    v-if="exParentArrInfo.disagreeExpl" 
                    class="answerbox">{{exParentArrInfo.disagreeExpl}}
                </div>
                <div v-else style="margin-bottom:3rem;"></div>                     
            </section>

            <div class="print-block">                
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Select only one of the options below</i>
                    <div>
                        <div style="margin:0 0 0 3rem;">
                            <check-box 
                                :check="exParentArrInfo.noChange?'yes':''" 
                                text="I am applying for the existing final order or agreement about parenting arrangements to continue to be in place"/>
                            <check-box 
                                :check="exParentArrInfo.change?'yes':''" 
                                text="I am applying to change or replace the existing final order or agreement about parenting arrangements as follows:"/>                            
                        </div>                        
                    
                        <div v-if="exParentArrInfo.change && exParentArrInfo.changeExpl" 
                        class="answerbox">{{exParentArrInfo.changeExpl}}</div>
                        <div v-else style="margin-bottom:3rem;"></div>                    
                    
                    </div>                
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Best interests of child</b></div>
<!-- <4> -->
                <section>
                    <div style="display:inline; margin-left:0.25rem">
                        I believe the order about parenting arrangements I am applying for is in the child(ren)’s best interests
                        because:
                    </div>
                    <div v-if="exParentArrInfo.bestInterestExpl" 
                        class="answerbox">{{exParentArrInfo.bestInterestExpl}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { agreeDisagreeInfoType, schedule2DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { replyExistingParentingArrangementsDataInfoType } from '@/types/Application/ReplyFamilyLawMatter/ParentingArrangements';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule2 extends Vue {

    @Prop({required:true})
    result!: any;

    @Prop({required:true})
    agreeDisagreeResults!: agreeDisagreeInfoType;

    dataReady = false;
    exParentArrInfo = {} as schedule2DataInfoType; 
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;
    }

    public extractInfo(){        
        this.exParentArrInfo = this.getExistingParentingArrangementsInfo();
    }

    public getExistingParentingArrangementsInfo(){
        let existingParentingArrangements = {} as schedule2DataInfoType; 

        if(this.result.replyExistingParentingArrangementsSurvey){

            const existingInfo: replyExistingParentingArrangementsDataInfoType = this.result.replyExistingParentingArrangementsSurvey;

            if (existingInfo.existingType == 'finalOrder'){
                existingParentingArrangements.existingType = 'finalOrder';
                existingParentingArrangements.agreeNeedsChanges = existingInfo.agreeFinalOrder == 'y';
                existingParentingArrangements.agreeBestInterest = false;                
            } else if (existingInfo.existingType == 'agreement'){
                existingParentingArrangements.existingType = 'agreement';
                existingParentingArrangements.agreeBestInterest = existingInfo.agreeAgreement == 'y';
                existingParentingArrangements.agreeNeedsChanges = false;
            }

            const disagreeItem = (this.agreeDisagreeResults.existingParentResp.opApplied && !this.agreeDisagreeResults.existingParentResp.agree)
                || (this.agreeDisagreeResults.existingParentTime.opApplied && !this.agreeDisagreeResults.existingParentTime.agree)
                || (this.agreeDisagreeResults.existingParentTimeConditions.opApplied && !this.agreeDisagreeResults.existingParentTimeConditions.agree)

            if (disagreeItem){
                existingParentingArrangements.disagreeExpl = existingInfo.disagreeReason?existingInfo.disagreeReason:''
                existingParentingArrangements.noChange = existingInfo.desiredOrderChoice == 'noChange';
                existingParentingArrangements.change = existingInfo.desiredOrderChoice == 'differentChange';
                const changeExplanationRequired = (existingInfo.desiredOrderChoice == 'differentChange') && existingInfo.requestedParentingArrangements
                existingParentingArrangements.changeExpl = changeExplanationRequired?existingInfo.requestedParentingArrangements:'';
                existingParentingArrangements.bestInterestExpl = existingInfo.childBestInterestReason?existingInfo.childBestInterestReason:'';

            } else {
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