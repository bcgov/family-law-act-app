<template>
<div v-if="dataReady">    
    <b-button id="app-print" @click="onPrintSave()">Print</b-button> 
    <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>      
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <common-section v-bind:result="result" v-bind:selectedSchedules="selectedSchedules"/>
        <schedule-1     v-bind:result="result"  v-if="selectedSchedules.includes('schedule1')" />
        <schedule-2     v-bind:result="result"  v-if="selectedSchedules.includes('schedule2')" />
        <schedule-3     v-bind:result="result"  v-if="selectedSchedules.includes('schedule3')" />
        <schedule-4     v-bind:result="result"  v-if="selectedSchedules.includes('schedule4')" />
        <schedule-5     v-bind:result="result"  v-if="selectedSchedules.includes('schedule5')" />        

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
        Schedule5
    }
})

export default class Form11 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public applicantName!: nameInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedSchedules: string[] = [];
   
    mounted(){
        this.dataReady = false;
        this.result = this.getCMResultData();
        this.selectedSchedules = this.getSchedulesInfo();
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("caseMgmt") 
        const pdf_name = "application-for-case-management-order-without-notice-or-attendanceabout";    
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA718    `+moment().format("MMMM D, YYYY")+` \\a           Form 11";`;
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
            this.UpdatePathwayCompleted({pathway:"caseMgmt", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){  
        
        const pdf_type = Vue.filter('getPathwayPdfType')("caseMgmt") 
             
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
            link.download = "Form11.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }
 
    public getCMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.CM._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }
        
        const stepCM = this.$store.state.Application.steps[this.stPgNo.CM._StepNo]
        const childRelatedType = {childRelatedTypeSurvey: stepCM.result.childRelatedTypeSurvey};
        Object.assign(result, result, childRelatedType);

        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
       
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});

        Vue.filter('extractRequiredDocuments')(result, 'caseMgmt')

        return result;
    }

    public getSchedulesInfo(){       
        
        let schedules: string[] = [];
        const selectedCMs = this.result.cmQuestionnaireSurvey;              
            
        if (selectedCMs?.includes("remoteAttendance")){
            schedules.push("schedule1")
        }

        if (selectedCMs?.includes("changeServiceRequirement")){
            schedules.push("schedule2")
        }

        if (selectedCMs?.includes("changeRequirement")){
            schedules.push("schedule3")
        }   

        if (selectedCMs?.includes("section242")){
            schedules.push("schedule4")
        }

        if (selectedCMs?.includes("otherProvinceOrder")){
            schedules.push("schedule5")
        }

        return schedules;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>