<template>
    <div v-if="dataReady">
        <!-- <Header> -->
        <div>
            <div class="new-page" />
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px; text-align: center;">
                    <ScheduleHeader scheduleNumber="Schedule 4" scheduleTitle="Guardianship of a child" scheduleDescription="Disagree with order requested by other party"/>
                </div>
                <div style="width: 20%;">
                    
                </div>
            </div>
            <div style="margin-bottom: 0.5rem;"></div>

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                        <NoteBox>
                            <p style="margin-bottom: 0rem;">
                                Complete this schedule only if you disagree with all or part of the order about guardianship of a 
                                child applied for by the other party on Schedule 7 of their Application About a Family Law Matter.
                            </p>
                        </NoteBox>
                    </div>
                    <div style="width: 20%;">
                        <NoteBox>
                            <b-icon-info-circle-fill />
                            <p>
                                A guardian is responsible for a 
                                child. 
                                Only guardians have parental 
                                responsibilities and parenting 
                                time with a child [s. 40 <i>Family Law Act</i>]. 
                            </p>
                        </NoteBox>
                    </div>
            </div>

            <!-- <1> -->
            <div style="display: flex; flex-direction: row; margin-top: -60px">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="1" title="Reason you disagree – Best interests of the child"/>
                    <div>
                        <b>1. </b> 
                        <p style="display: inline">
                            <b>I do not agree with the order requested</b> by the other party about guardianship of a
                            child. I believe the order they have requested is <b>not in the best interests of the
                            child(ren)</b> because:
                        </p>
                        <p><i>List your reasons</i></p>
                        <div v-if="exChSupInfo.disagreeReason" class="answerbox" style="width:98%; word-wrap: break-word;">{{exChSupInfo.disagreeReason}}</div>
                        <div v-else style="margin-bottom:3rem;"/>
                    </div>
                </div>
                <div style="width: 20%; margin-top: 143px">
                    <NoteBox>
                        <b-icon-info-circle-fill/>
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances 
                            must be considered including the factors set out in s. 37 of the Family Law Act.
                            <br/>
                            The parties and the court must consider the best interests of a child when making a decision about parenting arrangements.
                            <br/><br/>
                            For more information, see the guidebook.
                        </p>
                    </NoteBox>
                    <div style="margin-bottom: 0.5rem;"/>
                    <NoteBox>
                        <b-icon-info-circle-fill/>
                        <p>
                            If a child is 12 or older, the 
                            court must not appoint a 
                            person other than a parent as 
                            the child’s guardian without 
                            the child’s written approval, 
                            unless satisfied it is in the 
                            child’s best interests [s. 51 
                            <i>Family Law Act</i>]. 
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
import ScheduleHeader from '@/components/utils/PopulateForms/components/ScheduleHeader.vue';
import NoteBox from '@/components/utils/PopulateForms/components/NoteBox.vue';
import FormPart from '@/components/utils/PopulateForms/components/FormPart.vue';
import CheckBox from "@/components/utils/PopulateForms/components/CheckBox.vue";
import { schedule4DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeExistingChildSupportDataInfoType } from "@/types/Application/ReplyFamilyLawMatter/ChildSupport"

@Component({
    components:{
        UnderlineForm,
        ScheduleHeader,
        NoteBox,
        FormPart,
        CheckBox
    }
})

export default class Schedule4 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;   
    exChSupInfo = {} as schedule4DataInfoType;
   
    mounted(){
        this.dataReady = false;      
        this.extractInfo();       
        this.dataReady = true;       
    }

    public extractInfo(){         
        this.exChSupInfo = this.getExistingChildSupportInfo();
    }

    public getExistingChildSupportInfo(){

        let existingChildSupportInfo = {} as schedule4DataInfoType;       

        if (this.result.replyExistingChildSupportSurvey && this.result.rflmUnpaidChildSupportSurvey 
                && this.result.rflmCalculatingChildSupportSurvey && this.result.disagreeExistingChildSupportSurvey){
                    
            const disagreeExistingChildSupportInfo: disagreeExistingChildSupportDataInfoType = this.result.disagreeExistingChildSupportSurvey;

            existingChildSupportInfo.disagreeReason = disagreeExistingChildSupportInfo.disagreeReason;

        } else {
            const calculationsInfo = {
                attaching: false,
                reason: ''
            }
            const childSupportUnpaid = {
                agreeAmount: false,
                crntDate: '',
                unpaidAmnt: ''
            }
            existingChildSupportInfo = {
            
                agreeCircumstanceChanges: false,
                disAgreeCircumstanceChanges: false,
                agreeSetAside: false,
                section150: false,
                disagreeReason: '',
                continue: false,  
                change: false,
                changeExpl: '',     
                calc: calculationsInfo,
                unpaidDetails: childSupportUnpaid
            }
        }
          
        return existingChildSupportInfo;
    } 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>