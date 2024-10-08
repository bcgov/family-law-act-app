<template>
    <div v-if="dataReady">
        
        <div>
            <div class="new-page" />
            <!-- <Header> -->
            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px; text-align: center;">
                    <ScheduleHeader 
                        scheduleNumber="Schedule 4" 
                        scheduleTitle="Guardianship of a child" 
                        scheduleDescription="Disagree with order requested by other party"/>
                </div>
                <div style="width: 20%;"/>
            </div>
            <div style="margin-bottom: 0.5rem;"/>

            <div style="display: flex; flex-direction: row;">
                <div style="width: 80%; padding-right: 4px;">
                        <NoteBox>
                            <p style="margin-bottom: 0rem; font-size: 10pt;">
                                Complete this schedule only if you disagree with all or part of the order about guardianship of a 
                                child applied for by the other party on Schedule 7 of their Application About a Family Law Matter.
                            </p>
                        </NoteBox>
                </div>
                <div style="width: 20%;">
                    <NoteBox textColor="#626262">
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
            <div style="display: flex; flex-direction: row; margin-top: -90px">
                <div style="width: 80% !important; padding-right: 4px;">
                    <FormPart :part="1" title="Reason you disagree – Best interests of the child"/>
                    <div style="margin-left: 1rem; text-indent: -10px; padding-left: 10px;">
                        <b>1. </b> 
                        <div style="text-indent:10px;display:inline;">
                            <b>I do not agree with the order requested</b> by the other party about guardianship of a
                            child. I believe the order they have requested is <b>not in the best interests of the
                            child(ren)</b> because:
                            </br>
                            <i style="color: #626262">List your reasons</i>
                            </div>
                        <div v-if="guardInfo.opNotGuardianDesc || guardInfo.opNotSuitable || guardInfo.other" class="answerbox" style="width:98%; background-color: #dedede; word-wrap: break-word;">
                            <p>
                                {{ 
                                    guardInfo.opNotGuardianDesc ? `The other party is not able to be a guardian because ${guardInfo.opNotGuardianDesc}` : ''
                                }}
                            </p>
                            <p>
                                {{
                                    guardInfo.opNotSuitable ? `The other party is not suitable to be a guardian because ${guardInfo.opNotSuitableDesc}` : ''
                                }}
                            </p>
                            <p>
                                {{ 
                                    guardInfo.other ? `Other reasons are ${guardInfo.otherDesc}` : ''
                                }}
                            </p>
                        </div>
                        <div v-else style="margin-bottom:3rem; min-height:550px; background-color: #dedede"/>
                    </div>
                </div>
                <div style="width: 20%; margin-top: 120px">
                    <NoteBox textColor="#626262">
                        <b-icon-info-circle-fill/>
                        <p>
                            To determine what is in the best interests of a child, all of the child’s needs and circumstances 
                            must be considered including the factors set out in s. 37 of the <i>Family Law Act</i>.
                            <br/>
                            The parties and the court must consider the best interests of a child when making a decision about parenting arrangements.
                            <br/><br/>
                            For more information, see the guidebook.
                        </p>
                    </NoteBox>
                    <div style="margin-bottom: 0.5rem;"/>
                    <NoteBox textColor="#626262">
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
import { schedule7DataInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import { disagreeReasonListInfoType } from '@/types/Application/ReplyFamilyLawMatter/GuardianShip';

@Component({
    components:{
        UnderlineForm,
        ScheduleHeader,
        NoteBox,
        FormPart,
        CheckBox
    }
})

export default class Schedule7 extends Vue {

    @Prop({required:true})
    result!: any;

    dataReady = false;
    guardInfo = {} as schedule7DataInfoType;
   
    mounted(){
        this.dataReady = false;
        this.guardInfo = this.getGuardianshipOfChildInfo();  
        this.dataReady = true;       
    }

    public getGuardianshipOfChildInfo(){
        let guardianshipInfo = {} as schedule7DataInfoType;
        guardianshipInfo = {
            opNotGuardian: false,
            opNotGuardianDesc: '',
            opNotSuitable: false,
            opNotSuitableDesc: '',
            other: false,
            otherDesc: ''
        }
        if (this.result.disagreeAppointingGuardianOfChildSurvey?.disagreeReasonList){
            const disagreeReasons: disagreeReasonListInfoType = this.result.disagreeAppointingGuardianOfChildSurvey.disagreeReasonList;           
            guardianshipInfo = {
                opNotGuardian: disagreeReasons.checked.includes('unable'),
                opNotGuardianDesc: (disagreeReasons.checked.includes('unable') && disagreeReasons.unableComment)?disagreeReasons.unableComment:'',
                opNotSuitable: disagreeReasons.checked.includes('unsuitable'),
                opNotSuitableDesc: (disagreeReasons.checked.includes('unsuitable') && disagreeReasons.unsuitableComment)?disagreeReasons.unsuitableComment:'',
                other: disagreeReasons.checked.includes('other'),
                otherDesc: (disagreeReasons.checked.includes('other') && disagreeReasons.otherComment)?disagreeReasons.otherComment:''
            }
        }
        return guardianshipInfo;
    }
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style> 