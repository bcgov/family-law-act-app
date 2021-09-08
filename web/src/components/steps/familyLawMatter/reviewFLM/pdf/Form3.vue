<template>
<div v-if="dataReady">    
    <!-- <b-button id="app-print" @click="onPrintSave()">Print</b-button>  -->
    <!-- <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>   -->    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <common-section v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"/>
        <schedule-1 v-bind:result="result"  v-if="selectedSchedules.includes('schedule1')" />
        <schedule-2 v-bind:result="result"  v-if="selectedSchedules.includes('schedule2')" />
        <schedule-3 v-bind:result="result"  v-if="selectedSchedules.includes('schedule3')" />
        <schedule-4 v-bind:result="result"  v-if="selectedSchedules.includes('schedule4')" />
        <schedule-5 v-bind:result="result"  v-if="selectedSchedules.includes('schedule5')" />
        <schedule-6 v-bind:result="result"  v-if="selectedSchedules.includes('schedule6')" />
        <schedule-7 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule7')" />
        <schedule-8 v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"  v-if="selectedSchedules.includes('schedule8')" />
        <schedule-9 v-bind:result="result"  v-if="selectedSchedules.includes('schedule9')" />
        <schedule-10 v-bind:result="result" v-if="selectedSchedules.includes('schedule10')" />

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

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import moment from 'moment';
import { nameInfoType } from "@/types/Application/CommonInformation";

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
    }
})

export default class Form3 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedSchedules: string[] = [];
   
    mounted(){
        this.dataReady = false;
        this.result = this.getFLMResultData();
        this.selectedSchedules = this.getSchedulesInfo();
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("familyLawMatter") 
        const pdf_name = "application-about-a-family-law-matter";    
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 712   `+moment().format("MMMM D, YYYY")+` \\a           Form 3";`;
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
            this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){  
        
        const pdf_type = Vue.filter('getPathwayPdfType')("familyLawMatter")             
        const applicationId = this.$store.state.Application.id;

        const url = '/survey-print/'+applicationId+'/?pdf_type='+pdf_type
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "Form3.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }
 
    public getFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 

        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.FLM._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }

        const childBestInterestAck = {childBestInterestAcknowledgement:this.$store.state.Application.steps[this.stPgNo.FLM._StepNo].result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
       
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});

        Vue.filter('extractRequiredDocuments')(result, 'familyLawMatter')

        return result;
    }

    public getSchedulesInfo(){       

        let schedules: string[] = [];
        const selectedFLMs = this.result.flmQuestionnaireSurvey;
        const flmBackgroundInfo = this.result.flmBackgroundSurvey;

        if (flmBackgroundInfo?.ExistingOrdersFLM == 'n') {
            
            if (selectedFLMs?.includes("parentingArrangements")){
                schedules.push("schedule1")
            }
            if (selectedFLMs?.includes("childSupport")){
                schedules.push("schedule3")
            }
            if (selectedFLMs?.includes("contactWithChild")){
                schedules.push("schedule5")
            }            
            if (selectedFLMs?.includes("spousalSupport")){
                schedules.push("schedule9")
            }

        } else if (flmBackgroundInfo?.ExistingOrdersFLM == 'y' && flmBackgroundInfo?.existingOrdersListFLM?.length > 0){

            if (selectedFLMs?.includes("parentingArrangements")) {

                if (flmBackgroundInfo.existingOrdersListFLM?.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){                    
                    schedules.push("schedule2");
                } else {
                    schedules.push("schedule1");
                }
            }

            if (selectedFLMs?.includes("childSupport")){
                if (flmBackgroundInfo.existingOrdersListFLM?.includes("Child Support")){
                    schedules.push("schedule4");
                } else {
                    schedules.push("schedule3")
                }
            }

            if (selectedFLMs?.includes("contactWithChild")){
                if (flmBackgroundInfo.existingOrdersListFLM?.includes("Contact with a Child")){
                    schedules.push("schedule6")
                } else {
                    schedules.push("schedule5")
                }
            }

            if (selectedFLMs?.includes("spousalSupport")){
                if (flmBackgroundInfo.existingOrdersListFLM?.includes("Spousal Support")){
                    schedules.push("schedule10")
                } else {
                    schedules.push("schedule9");
                }
            } 
        }

        if (selectedFLMs.includes("guardianOfChild")){
            if (this.result.guardianOfChildSurvey){
                if (this.result.guardianOfChildSurvey?.applicationType?.includes('becomeGuardian')){
                    schedules.push("schedule7")
                }
                if (this.result.guardianOfChildSurvey?.applicationType?.includes('cancelGuardian')){
                    schedules.push("schedule8")
                }
            }            
        }        
        
        return schedules;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>