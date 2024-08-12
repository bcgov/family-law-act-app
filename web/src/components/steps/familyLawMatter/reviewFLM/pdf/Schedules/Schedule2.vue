<template>
<!-- <Page 3> --> 
<!-- <Header> -->
        <div v-if="dataReady">
            <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <ScheduleHeader scheduleNumber="Schedule 2" scheduleTitle="Parenting Arrangements" scheduleDescription="Existing final order or written agreement"></ScheduleHeader>

                    <div style="margin-bottom: 1rem;"></div>

                    <NoteBox fontSize="9pt">
                        <p>
                            Complete this schedule only if you have an existing final order or written agreement about parenting arrangements, including parental responsibilities and parenting time, and you need a new court order made to change, suspend or cancel the final order, or to set aside or replace the written agreement.
                        </p>
                    </NoteBox>
                </div>
                <div style="width: 20%;"></div>
            </div>

            <div style="margin-bottom: 1rem;"></div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="1" title="Final order or written agreement "></FormPart>

                    <section>
                        Select only one of the options below and complete the requested information
                        <div>
                            <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0.35rem;" :check="exParentArrInfo.type == 'ExistingOrder'" text="I have a <b>final court order</b> about parenting arrangements, including"/>
                            <br>
                            <GreyBoxForm v-if="exParentArrInfo.type == 'ExistingOrder'" style="margin-left:1.25rem; text-indent:0rem" textwidth="6rem" marginTop="-15px" beforetext="parental responsibilities or parenting time <b>  made on</b> <i>(date)</i>" aftertext="that I want to change or cancel (<i>see attached copy of order</i>). -->  Complete <b><i>Part 2</i></b>" hint="" :text="exParentArrInfo.existingDate | beautify-date-mid"/>
                            <GreyBoxForm v-else style="margin-left:1.25rem; text-indent:0rem" textwidth="6rem"  marginTop="-15px" beforetext="parental responsibilities or parenting time, <b>made on</b> <i>(date)</i>" aftertext="that I want to change or cancel (<i>see attached copy of order</i>). --> Complete <b><i>Part 2</i></b>" hint="" text=""/>
                        </div>
                        <div>
                            <check-box inline="inline" boxMargin="0" style="display:inline; margin:0 0 0 0.35rem;" :check="exParentArrInfo.type == 'ExistingAgreement'" text="I have a <b>written agreement</b> about parenting arrangements, including"/>
                                <br>
                            <GreyBoxForm v-if="exParentArrInfo.type == 'ExistingAgreement'" style="margin-left:1rem; text-indent:0rem" textwidth="6rem"  marginTop="-15px" beforetext=" parental responsibilities or parenting time, <b>made on</b> <i>(date)</i>" aftertext="that I want to repeal or replace (<i>see attached copy of order</i>).--> Complete <b><i>Part 3</i><b>" hint="" :text="exParentArrInfo.existingDate | beautify-date-mid"/>
                            <GreyBoxForm v-else style="margin-left:1rem; text-indent:0rem" textwidth="6rem"  marginTop="-15px" beforetext=" parental responsibilities or parenting time, <b>made on</b> <i>(date)</i>" aftertext="that I want to repeal or replace (<i>see attached copy of order</i>). --> Complete <b><i>Part 3</i><b>" hint="" text=""/>
                        </div>
                    
                    </section>

                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-paperclip />
                        <p>
                            You must attach a copy of the order or agreement to this application for filing.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <!-- <2> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="2" title="Final order" subtitle="Complete this part only if you have a final order"></FormPart>
                    
                    <div class="print-block">
                        
                        <div>
                            <b>2. </b> Since the final order was made, <b>needs or circumstances have changed</b> as follows:

                            <div v-if="exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.changesSince" 
                            class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede">{{exParentArrInfo.changesSince}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede"></div> 
                        </div>
                        <div>
                            <b>3. </b> I am applying for the final order to be:
                            <br>
                            <i>Select only one option</i>
                            <div>
                                <div style="margin:0 0 0 1rem;">
                                    <div style="display:block;">
                                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="(exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.subType == 'changeOrder')?'yes':''" text="<b>changed --> </b>  <i>Complete <b>Part 4 and 5</b></i>" />
                                    </div>
                                    <div style="display:block;">
                                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;" :check="(exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.subType == 'suspendedOrder')?'yes':''" text="<b>suspended --> </b> <i>Complete <b>Part 5</b></i>" />
                                    </div>
                                    <div style="display:block;">
                                    <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                    style="text-indent: 5px;"  :check="(exParentArrInfo.type == 'ExistingOrder' && exParentArrInfo.subType == 'cancelOrder')?'yes':''" text="<b>cancelled --> </b>  <i>Complete <b>Part 5</b></i>" />
                                    </div>
                                   
                                </div>
                            </div>                
                        </div>
                    </div>

                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court can only change, suspend or cancel a final order if there has been a change in the needs or circumstances of the child since the original order was made, including a change in the circumstances of another person such as a parent [s. 47 Family Law Act].
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <!-- <3> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="3" title="Agreement" subtitle="Complete this part only if you have a written agreement"></FormPart>
                    
                    <div class="print-block">
                        
                        <div>
                            <b>4. </b> I believe the written agreement is <b>not in the best interests</b> of the child(ren) because:
                            <div v-if="exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.changesSince" 
                                class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.changesSince}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div>
                        </div>

                        <div>
                            <b>5. </b> I am applying for the written agreement to be:
                            <br>
                            <i>Select only one option</i>
                            <div>
                            <div style="margin:0 0 0 1rem;">
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="(exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.subType == 'setAsideAgreement')?'yes':''" text="<b>set aside</b> --> <i>Complete <b>Part 5</b</i>" />
                            </div>
                            <div style="display:block;">
                                <check-box checkbox="" inline="inline" boxMargin="0" shiftmark="-3"
                                style="text-indent: 5px;" :check="(exParentArrInfo.type == 'ExistingAgreement' && exParentArrInfo.subType == 'replacedAgreement')?'yes':''" text="<b>replaced with an order</b> --> <i>Complete <b>Part 4 and 5</b></i>" />
                            </div>
                            </div>  
                            </div>                
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <div style="padding-top:10px">
                        <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            The court must set aside or replace with an order, all or part of an agreement about parenting arrangements, if the court is satisfied that the agreement is not in the best interests of the child [s. 44 Family Law Act].
                        </p>
                    </NoteBox>
                    </div>
                    
                </div>        
            </div>

            <div style="margin-bottom: 1rem;"></div>
            <!-- <4> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="4" title="About the new order" subtitle="Complete this part only if you are asking to change or replace the existing order or agreement"></FormPart>
                    
                    <div class="print-block">        
                        <div>
                            <b>6. </b> I am applying for an order for the parenting arrangements, including parental responsibilities and parenting time, to be <b>changed or replaced as follows</b>:
                            <br>
                            <i>List the details of the order you are asking for</i>

                           
                            <div v-if="exParentArrInfo.parentResp.applying && exParentArrInfo.parentResp.desc" 
                            class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.parentResp.desc}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div> 

                            
                            <div v-if="exParentArrInfo.parentTime.applying && exParentArrInfo.parentTime.desc" 
                                class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.parentTime.desc}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div>

                            <div v-if="exParentArrInfo.parentCond.applying && exParentArrInfo.parentCond.desc" 
                                class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.parentCond.desc}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div> 

                            
                            <div v-if="exParentArrInfo.parentalArr.applying && exParentArrInfo.parentalArr.desc" 
                            class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.parentalArr.desc}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div>
                        </div>
                    </div>   
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-info-circle-fill />
                        <p>
                            Guardians can arrange parental responsibilities and parenting time in any way that is in the best interests of the child..
                        </p>
                        <p>
                            The court can make orders under Division 2 [Parenting Arrangements] of Part 4 [Care of and Time with Children] of the Family Law Act.
                        </p>
                    </NoteBox>
                </div>        
            </div>

            <!-- <5> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                    <FormPart :part="5" title="Best interests of the child"></FormPart>
                      
                    <div class="print-block">
                        <div>
                            <div style="display:inline; margin-left:0.25rem">
                                <b>7. </b> I believe the order about parenting arrangements I am applying for, including parental responsibilities and parenting time, is in the <b>best interests of the child(ren)</b> because:
                                <br>
                                <i>List your reasons</i>
                            </div>
                            <div v-if="exParentArrInfo.childBestInterest" 
                                class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;">{{exParentArrInfo.childBestInterest}}</div>
                            <div v-else class="answerbox" style="min-height: 80px; padding: 8px; background-color:#dedede;"></div>
                        </div>
                    </div>
                </div>
                <div style="width: 20%;">
                    <NoteBox>
                        <b-icon-book />
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances must be considered including the factors set out in s. 37 of the Family Law Act.
                        </p>
                        <p>
                            For more information, see the guidebook. 
                        </p>
                    </NoteBox>
                </div>        
            </div>
            
        

        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import UnderlineForm from "@/components/utils/PopulateForms/components/UnderlineForm.vue";
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule2DataInfoType } from '@/types/Application/FamilyLawMatter/Pdf';
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

export default class Schedule2 extends Vue {

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