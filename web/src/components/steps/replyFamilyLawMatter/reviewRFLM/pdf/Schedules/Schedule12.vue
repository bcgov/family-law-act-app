<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="text-align:center;"><b> SCHEDULE 12 – COUNTER APPLICATION PARENTING ORDER/WRITTEN AGREEMENT – EXISTING</b></div>
            <div style="text-align:center;"><b> This is Schedule 12 to the Reply to an Application About a Family Law Matter with Counter Application</b></div>

            <div style="margin:1rem 0; text-align:justify">
                <i>
                    Complete this schedule only if you are making a counter application to change or cancel all or part of an existing
                    final order about parenting arrangements, or to set aside or replace all or part of an agreement about parenting
                    arrangements, of the child or children identified in section 13 of the reply with counter application.
                </i>
            </div>
<!-- <1> -->
            <section class="resetquestion"> 
                I am:
                <div style="margin-left:1rem;">
                    <check-box 
                        :check="result.parentingOrderAgreementSurvey && result.parentingOrderAgreementSurvey.guardianApplicant == 'y'?'yes':''" 
                        text="a guardian of the child(ren)"/>
                    <check-box 
                        style="width:120%;" 
                        :check="result.parentingOrderAgreementSurvey && result.parentingOrderAgreementSurvey.applyingGuardianApplicant == 'y'?'yes':''" 
                        text="applying to be appointed as a guardian of the child(ren)"/>
                </div>
            </section>

            <div style="margin-top:1rem;"></div>
<!-- <2> -->
            <section>
                <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0.35rem;" :check="true?'yes':''" text="I am attaching a copy of the existing final order or agreement about parenting arrangements"/>
                <underline-form v-if="exParentArrInfo.type == 'ExistingOrder'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="exParentArrInfo.existingDate | beautify-date"/>
                <underline-form v-if="exParentArrInfo.type == 'ExistingAgreement'" style="margin-left:1.75rem; text-indent:0rem" textwidth="8rem" beforetext="made on " hint="(mmm/dd/yyyy)" :text="exParentArrInfo.existingDate | beautify-date"/>
            
            </section>

            <div class="print-block">
                <div style="margin-top:1rem;"><b>Existing final order</b></div>
<!-- <3> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing order. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="exParentArrInfo.type == 'ExistingOrder'?'yes':''" text="I am applying for the existing final order to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box  :check="(exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.subType == 'changeOrder')?'yes':''" text="changed"/>
                            <check-box  :check="(exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.subType == 'cancelOrder')?'yes':''" text="cancelled"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">Since the final order was made, needs or circumstances have changed as follows:</div>
                    
                        <div v-if="exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.changesSince" 
                        class="answerbox">{{exParentArrInfo.changesSince}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    
                    
                    </div>                
                </section>
            </div>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Existing agreement</b></div>
<!-- <4> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you have an existing agreement. You may leave this section blank.</i>
                    <div>
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 1rem;" :check="exParentArrInfo.type == 'ExistingAgreement'?'yes':''" text="I am applying for all or part of the existing agreement to be:"/>
                        <div style="margin:0 0 0 3rem;">
                            <check-box  :check="(exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.subType == 'setAsideAgreement')?'yes':''" text="set aside"/>
                            <check-box  :check="(exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.subType == 'replacedAgreement')?'yes':''" text="replaced"/>
                        </div>
                        <div style="margin:0 0 0 1rem;">I believe the agreement is not in the best interests of the child(ren) because:</div>
                        <div v-if="exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.changesSince" 
                        class="answerbox">{{exParentArrInfo.changesSince}}</div>
                        <div v-else style="margin-bottom:3rem;"></div> 
                    </div>                
                </section>
            </div>
        
            <div class="print-block">        
                <div style="margin-top:3rem;"><b>About the order</b></div>
<!-- <5> -->
                <section>
                    <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parental responsibilities. You may leave this section blank.</i>
                    <div style="margin:0 0 0 1rem;">
                        <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentResp.applying?'yes':''" text="I am applying for the parental responsibilities (who makes certain decisions about a child) to be changed or replaced as follows:"/>
                    </div>
                    <div v-if="exParentArrInfo.parentResp.applying && exParentArrInfo.parentResp.desc" 
                        class="answerbox">{{exParentArrInfo.parentResp.desc}}</div>
                    <div v-else style="margin-bottom:3rem;"></div> 
                </section>
            </div>

            <div style="margin-top:3rem;"></div>
<!-- <6> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentTime.applying?'yes':''" text="I am applying for the parenting time schedule to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentTime.applying && exParentArrInfo.parentTime.desc" 
                        class="answerbox">{{exParentArrInfo.parentTime.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <7> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to conditions on parenting time. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentCond.applying?'yes':''" text="I am applying for the conditions on my parenting time or the other guardian’s parenting time to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentCond.applying && exParentArrInfo.parentCond.desc" 
                        class="answerbox">{{exParentArrInfo.parentCond.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div> 
            </section>

            <div style="margin-top:3rem;"></div>
<!-- <8> -->
            <section>
                <i style="display:inline; margin-left:0.25rem">Complete only if you are applying for changes to other parenting arrangements. You may leave this section blank.</i>
                <div style="margin:0 0 0 1rem;">
                    <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0rem;" :check="exParentArrInfo.parentalArr.applying?'yes':''" text="I am applying for the other order term(s) about parenting arrangements to be changed or replaced as follows:"/>
                </div>
                <div v-if="exParentArrInfo.parentalArr.applying && exParentArrInfo.parentalArr.desc" 
                        class="answerbox">{{exParentArrInfo.parentalArr.desc}}</div>
                <div v-else style="margin-bottom:3rem;"></div>
            </section>

            <div class="print-block">
                <div style="margin-top:3rem;"><b>Best interests of child</b></div>
<!-- <9> -->
                <section>
                    <div style="display:inline; margin-left:0.25rem">
                        I believe the order I am applying for is in the child(ren)’s best interests because:
                    </div>
                    <div v-if="exParentArrInfo.childBestInterest" 
                        class="answerbox">{{exParentArrInfo.childBestInterest}}</div>
                    <div v-else style="margin-bottom:3rem;"></div>
                </section>
            </div>

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule2DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';

@Component({
    components:{
        UnderlineForm,
        CheckBox
    }
})

export default class Schedule12 extends Vue {

    @Prop({required:true})
    result!: any;

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

        const generalCondition = (( this.result.aboutParentingArrangementsSurvey?.existingType == 'ExistingOrder' &&                                    
                                    this.result.aboutParentingArrangementsSurvey?.orderDifferenceType == 'changeOrder')
                                 || 
                                  ( this.result.aboutParentingArrangementsSurvey?.existingType == 'ExistingAgreement'&& 
                                    this.result.aboutParentingArrangementsSurvey?.agreementDifferenceType == 'replacedAgreement'))


        if(this.result.aboutParentingArrangementsSurvey?.existingType == 'ExistingOrder' ){
            
            existingParentingArrangements.type = 'ExistingOrder'
            existingParentingArrangements.existingDate = this.result.aboutParentingArrangementsSurvey.orderDate
            existingParentingArrangements.changesSince = this.result.aboutParentingArrangementsSurvey.changesSinceOrder
            
            if(this.result.aboutParentingArrangementsSurvey.orderDifferenceType == 'changeOrder'){
                existingParentingArrangements.subType = 'changeOrder'                
            } else if(this.result.aboutParentingArrangementsSurvey.orderDifferenceType == 'cancelOrder'){
                existingParentingArrangements.subType = 'cancelOrder'
            }
        }
        
        if( this.result.aboutParentingArrangementsSurvey?.existingType == 'ExistingAgreement' ){
            
            existingParentingArrangements.type = 'ExistingAgreement'
            existingParentingArrangements.existingDate = this.result.aboutParentingArrangementsSurvey.agreementDate
            existingParentingArrangements.changesSince = this.result.aboutParentingArrangementsSurvey.changesSinceAgreement
            
            if(this.result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'replacedAgreement'){
                existingParentingArrangements.subType = 'replacedAgreement'                
            } else if(this.result.aboutParentingArrangementsSurvey.agreementDifferenceType == 'setAsideAgreement'){
                existingParentingArrangements.subType = 'setAsideAgreement'
            }
        }        
        
        if (generalCondition && this.result.parentingArrangementChangesSurvey?.orderChangeList?.includes("parentalResponsibilities")){
            existingParentingArrangements.parentResp = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentalResponsibilitiesDescription:''
            }

        } else {
            existingParentingArrangements.parentResp = {
                applying: false,
                desc: ''
            }
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey?.orderChangeList?.includes("parentingTime")){
            existingParentingArrangements.parentTime = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeDescription:''
            }

        } else {
            existingParentingArrangements.parentTime = {
                applying: false,
                desc: ''
            }
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey?.orderChangeList?.includes("conditionsOnParentingTime")){
            existingParentingArrangements.parentCond = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeParentingTimeConditionsDescription:''
            }

        } else {
            existingParentingArrangements.parentCond = {
                applying: false,
                desc: ''
            }           
        }

        if (generalCondition && this.result.parentingArrangementChangesSurvey?.orderChangeList?.includes("otherTermsAboutParentingArrangements")){
            existingParentingArrangements.parentalArr = {
                applying: true,
                desc: this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription? this.result.parentingArrangementChangesSurvey.existingOrderChangeOtherTermsDescription:''
            }
        } else {
            existingParentingArrangements.parentalArr = {
                    applying: false,
                    desc: ''
                }
        }         
        
        if (this.result.bestInterestsOfChildSurvey?.existingParentingArrangementsChildBestInterestDescription){
                existingParentingArrangements.childBestInterest = this.result.bestInterestsOfChildSurvey.existingParentingArrangementsChildBestInterestDescription;
        } else {            
            existingParentingArrangements.childBestInterest = '';
        }
        
        return existingParentingArrangements;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>