<template>
<div v-if="dataReady">    
   
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <common-section v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"/>
        <!-- <schedule-1 v-bind:result="result"  v-if="selectedSchedules.includes('schedule1')" />
        <schedule-2 v-bind:result="result"  v-if="selectedSchedules.includes('schedule2')" />
        <schedule-3 v-bind:result="result"  v-if="selectedSchedules.includes('schedule3')" />
        <schedule-4 v-bind:result="result"  v-if="selectedSchedules.includes('schedule4')" />
        <schedule-5 v-bind:result="result"  v-if="selectedSchedules.includes('schedule5')" />
        <schedule-6 v-bind:result="result"  v-if="selectedSchedules.includes('schedule6')" />
        <schedule-7 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule7')" />
        <schedule-8 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule8')" />
        <schedule-9 v-bind:result="result"  v-if="selectedSchedules.includes('schedule9')" />
        <schedule-10 v-bind:result="result" v-if="selectedSchedules.includes('schedule10')" />
        <schedule-11 v-bind:result="result"  v-if="selectedSchedules.includes('schedule11')" />
        <schedule-12 v-bind:result="result"  v-if="selectedSchedules.includes('schedule12')" />
        <schedule-13 v-bind:result="result"  v-if="selectedSchedules.includes('schedule13')" />
        <schedule-14 v-bind:result="result"  v-if="selectedSchedules.includes('schedule14')" />
        <schedule-15 v-bind:result="result"  v-if="selectedSchedules.includes('schedule15')" />
        <schedule-16 v-bind:result="result"  v-if="selectedSchedules.includes('schedule16')" />
        <schedule-17 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule17')" />
        <schedule-18 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule18')" />
        <schedule-19 v-bind:result="result"  v-if="selectedSchedules.includes('schedule19')" />
        <schedule-20 v-bind:result="result" v-if="selectedSchedules.includes('schedule20')" /> -->

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import CommonSection from "./Schedules/CommonSection.vue"
import Schedule1 from "./Schedules/Schedule1.vue"
import Schedule2 from "./Schedules/Schedule2.vue"
import Schedule3 from "./Schedules/Schedule3.vue"
import Schedule4 from "./Schedules/Schedule4.vue"
import Schedule5 from "./Schedules/Schedule5.vue"
import Schedule6 from "./Schedules/Schedule6.vue"
import Schedule7 from "./Schedules/Schedule7.vue"
import Schedule8 from "./Schedules/Schedule8.vue"
import Schedule9 from "./Schedules/Schedule9.vue"
import Schedule10 from "./Schedules/Schedule10.vue"
import Schedule11 from "./Schedules/Schedule11.vue"
import Schedule12 from "./Schedules/Schedule12.vue"
import Schedule13 from "./Schedules/Schedule13.vue"
import Schedule14 from "./Schedules/Schedule14.vue"
import Schedule15 from "./Schedules/Schedule15.vue"
import Schedule16 from "./Schedules/Schedule16.vue"
import Schedule17 from "./Schedules/Schedule17.vue"
import Schedule18 from "./Schedules/Schedule18.vue"
import Schedule19 from "./Schedules/Schedule19.vue"
import Schedule20 from "./Schedules/Schedule20.vue"


import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import moment from 'moment';
import { rflmBackgroundSurveyDataInfoType, rflmCounterAppDataInfoType, rflmQuestionnaireDataInfoType } from '@/types/Application/ReplyFamilyLawMatter';

@Component({
    components:{
        
        CommonSection,
        Schedule1,
        Schedule2,
        Schedule3,
        Schedule4,
        Schedule5,
        Schedule6,
        Schedule7,
        Schedule8,
        Schedule9,
        Schedule10, 
        Schedule11,
        Schedule12,
        Schedule13,
        Schedule14,
        Schedule15,
        Schedule16,
        Schedule17,
        Schedule18,
        Schedule19,
        Schedule20
    }
})

export default class Form6 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedSchedules: string[] = [];
   
    mounted(){
        this.dataReady = false;
        this.result = this.getRFLMResultData();
        this.selectedSchedules = this.getSchedulesInfo();
        //this.selectedSchedules = []//["schedule1", "schedule2", "schedule3", "schedule4", "schedule5", "schedule6", "schedule7", "schedule8", 
                                // "schedule9", "schedule10", "schedule11", "schedule12", "schedule13", "schedule14", "schedule15", 
                                // "schedule16", "schedule17", "schedule18", "schedule19", "schedule20"];
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("replyFlm") 
        const pdf_name = "reply-to-an-application-about-a-family-law-matter";    
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 712   `+moment().format("MMMM D, YYYY")+` \\a           Form 6";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+applicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

        const body = {
            'html':pdfhtml,
            'json_data':this.result
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  

        this.$http.post(url,body, options)
        .then(res => {
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate); 
            this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getRFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 

        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.RFLM._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }

        const childBestInterestAck = {rflmChildBestInterestAcknowledgement:this.$store.state.Application.steps[this.stPgNo.RFLM._StepNo].result.rflmChildBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);

        const incorrectChildInfo = {incorrectChildInfo:this.$store.state.Application.steps[this.stPgNo.RFLM._StepNo].result.incorrectChildInfo};
        Object.assign(result, result, incorrectChildInfo);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
       
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});

        Vue.filter('extractRequiredDocuments')(result, 'replyFlm')

        return result;
    }

    public getSchedulesInfo(){       

        let schedules: string[] = [];       

        const rflmQuestionnaireInfo: rflmQuestionnaireDataInfoType = this.result.rflmQuestionnaireSurvey;
        const rflmCounterAppInfo: rflmCounterAppDataInfoType = this.result.rflmCounterAppSurvey;
        const rflmBackgroundInfo: rflmBackgroundSurveyDataInfoType = this.result.rflmBackgroundSurvey;
        
        const counterList = rflmCounterAppInfo.counterList;
        const existingFlmList = (rflmBackgroundInfo.ExistingOrdersFLM == 'y')?rflmBackgroundInfo.existingOrdersListFLM:[];

        if (rflmQuestionnaireInfo.selectedParentingArrangementsForm.includes('newParentingArrangements')){
            schedules.push('schedule1');
        } else if (rflmQuestionnaireInfo.selectedParentingArrangementsForm.includes('existingParentingArrangements')){
            schedules.push('schedule2')
        }

        if (rflmQuestionnaireInfo.selectedChildSupportForm.includes('newChildSupport')){
            schedules.push('schedule3');
        } else if (rflmQuestionnaireInfo.selectedChildSupportForm.includes('existingChildSupport')){
            schedules.push('schedule4')
        }

        if (rflmQuestionnaireInfo.selectedContactWithChildForm.includes('newContact')){
            schedules.push('schedule5');
        } else if (rflmQuestionnaireInfo.selectedContactWithChildForm.includes('existingContact')){
            schedules.push('schedule6')
        }

        //TODO: update after shedule 7 and 8 have been added 

        if (rflmQuestionnaireInfo.selectedGuardianshipForm.includes('appointing')){
            schedules.push('schedule7');
        } 
        if (rflmQuestionnaireInfo.selectedGuardianshipForm.includes('cancelling')){
            schedules.push('schedule8')
        }

        if (rflmQuestionnaireInfo.selectedSpousalSupportForm.includes('newSpouseSupport')){
            schedules.push('schedule9');
        } else if (rflmQuestionnaireInfo.selectedSpousalSupportForm.includes('existingSpouseSupport')){
            schedules.push('schedule10')
        }

        if (rflmCounterAppInfo.counter == 'Yes'){

            if (counterList.includes('parentingArrangements')) {

                if (existingFlmList.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                    schedules.push('schedule12')
                } else {
                    schedules.push('schedule11')
                }

            } 

            if (counterList.includes('childSupport')) {

                if (existingFlmList.includes("Child Support")){
                    schedules.push('schedule14')
                } else {
                    schedules.push('schedule13')
                }

            } 

            if (counterList.includes('contactWithChild')) {

                if (existingFlmList.includes("Contact with a Child")){
                    schedules.push('schedule16')
                } else {
                    schedules.push('schedule15')
                }

            } 
//TODO: update after shedule 17 and 18 have been added 
            if (counterList.includes('guardianOfChild')) {

                if (existingFlmList.includes("Contact with a Child")){
                    schedules.push('schedule16')
                } else {
                    schedules.push('schedule15')
                }

            }

            if (counterList.includes('spousalSupport')) {

                if (existingFlmList.includes("Spousal Support")){
                    schedules.push('schedule20')
                } else {
                    schedules.push('schedule19')
                }

            }

        }            
        
        return schedules;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>