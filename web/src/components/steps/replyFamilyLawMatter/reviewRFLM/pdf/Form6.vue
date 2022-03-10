<template>
<div v-if="dataReady">    
   
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <common-section v-bind:result="result" v-bind:selectedSchedules="selectedSchedules" v-bind:agreeDisagreeResults="agreeDisagreeResults"/>
        <schedule-1 v-bind:result="result" v-bind:agreeDisagreeResults="agreeDisagreeResults" v-if="selectedSchedules.includes('schedule1')" />
        <schedule-2 v-bind:result="result" v-bind:agreeDisagreeResults="agreeDisagreeResults"  v-if="selectedSchedules.includes('schedule2')" />
        <schedule-3 v-bind:result="result" v-if="selectedSchedules.includes('schedule3')" />
        <schedule-4 v-bind:result="result" v-if="selectedSchedules.includes('schedule4')" />
        <schedule-5 v-bind:result="result" v-if="selectedSchedules.includes('schedule5')" />
        <schedule-6 v-bind:result="result" v-if="selectedSchedules.includes('schedule6')" />
        <schedule-7 v-bind:result="result" v-if="selectedSchedules.includes('schedule7')" />
        <schedule-8 v-bind:result="result" v-if="selectedSchedules.includes('schedule8')" />
        <!-- <schedule-9 v-bind:result="result"  v-if="selectedSchedules.includes('schedule9')" />
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
import moment from 'moment';

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

import { agreeDisagreeInfoType, form6PopulationInfoType } from '@/types/Application/ReplyFamilyLawMatter/Pdf';
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { getForm6PopulationInfo } from "@/components/utils/PopulateForms/PopulateRflmInformation";



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

    populationInfo = {} as form6PopulationInfoType;
    selectedSchedules: string[] = [];
    agreeDisagreeResults = {} as agreeDisagreeInfoType;
   
    mounted(){
        this.dataReady = false;
        this.result = this.getRFLMResultData();
        this.populationInfo = getForm6PopulationInfo(this.result)
        this.selectedSchedules = this.populationInfo.schedules;
        this.agreeDisagreeResults = this.populationInfo.agreeDisagree;

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

        const correctChildInfo = {correctChildInfo:this.$store.state.Application.steps[this.stPgNo.RFLM._StepNo].result.correctChildInfo};
        Object.assign(result, result, correctChildInfo);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
       
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});

        Vue.filter('extractRequiredDocuments')(result, 'replyFlm')

        return result;
    }
    
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>