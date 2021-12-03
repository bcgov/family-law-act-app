<template>
<div v-if="dataReady">    
  
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-15-layout v-bind:result="result"/>
        <schedule-1     v-bind:result="result"  v-if="selectedSchedules.includes('schedule1')" />
        <schedule-2     v-bind:result="result"  v-if="selectedSchedules.includes('schedule2')" />
    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Form15Layout from "./Form15Layout.vue";
import Schedule1 from "./Schedule1.vue";
import Schedule2 from "./Schedule2.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

import moment from 'moment';
import { priorityParentingMatterOrderSurveyDataInfoType } from '@/types/Application/PriorityParentingMatter';

@Component({
    components:{        
        Form15Layout,
        Schedule1,
        Schedule2
    }
})

export default class Form15 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedSchedules: string[] = [];
   
    mounted(){
        this.dataReady = false;
        this.result = this.getPPMResultData(); 
        this.selectedSchedules = this.getSchedulesInfo();      
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 
        const pdf_type = Vue.filter('getPathwayPdfType')("priorityParenting")
        const pdf_name = "application-about-priority-parenting-matter"
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA722    `+moment().format("MMMM D, YYYY")+` \\a           Form 15";`;
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
            this.UpdatePathwayCompleted({pathway:"priorityParenting", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getPPMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.PPM._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }        
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
       
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});

        Vue.filter('extractRequiredDocuments')(result, 'priorityParenting')

        return result;
    }

     public getSchedulesInfo(){       
        
        let schedules: string[] = [];       
        //TODO: once survey changes are in place, change this accordingly
        if(this.result.ppmQuestionnaireSurvey && this.result.priorityParentingMatterOrderSurvey) {
            const ppmType: string[] = this.result.ppmQuestionnaireSurvey;
            const ppmOrderData: priorityParentingMatterOrderSurveyDataInfoType = this.result.priorityParentingMatterOrderSurvey;
            
                 
            if ((ppmType.includes('medical')) && (ppmOrderData.delayMedicalRisk == 'y') && 
                (ppmOrderData.confirmMedicalRisk?.includes('applyPPM'))){
                    schedules.push('schedule1');
                }

            if ((ppmType.includes('medical')) && (ppmOrderData.delayMedicalRisk == 'y') && 
                (ppmOrderData.confirmMedicalRisk?.includes('applyPPM'))){
                    schedules.push('schedule2');
                }            
        }

        //test
        schedules = ['schedule1', 'schedule2']

        return schedules;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>