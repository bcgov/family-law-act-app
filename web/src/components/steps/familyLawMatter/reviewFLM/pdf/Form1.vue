<template>
<div v-if="dataReady">    
  
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-1-layout v-bind:result="result" v-bind:selectedPathways="selectedPathways"/>       

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import Form1Layout from "./Form1Layout.vue";

import moment from 'moment';

@Component({
    components:{
        Form1Layout         
    }
})

export default class Form1 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    selectedPathways: string[] = [];

   
    mounted(){
        this.dataReady = false;
        this.result = this.getFLMResultData();
        this.selectedPathways = this.getPathwayInfo();
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 
        
        const pdf_type = Vue.filter('getPathwayPdfType')("familyLawMatterForm1")
        const pdf_name = "notice-to-resolve-a-family-law-matter"
        const el= document.getElementById("print");
  
        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 710 `+moment().format("MM/YYYY") +` \\a           Form 1";`;
        const bottomRightText = `"Notice to Resolve"`
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

    public getPathwayInfo(){
        
        let pathways: string[] = [];
        const selectedFLMs = this.result.flmQuestionnaireSurvey; 
            
        if (selectedFLMs?.includes("parentingArrangements")){
            pathways.push("parentingArrangements")
        }
        if (selectedFLMs?.includes("childSupport")){
            pathways.push("childSupport")
        }
        if (selectedFLMs?.includes("contactWithChild")){
            pathways.push("contactWithChild")
        } 
        if (selectedFLMs?.includes("guardianOfChild")){
            pathways.push("guardianOfChild")
        }
                    
        if (selectedFLMs?.includes("spousalSupport")){
            pathways.push("spousalSupport")
        } 
        
        if (selectedFLMs?.includes("companionAnimal")){
            pathways.push("companionAnimal");
        }
        
        return pathways;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">
</style>