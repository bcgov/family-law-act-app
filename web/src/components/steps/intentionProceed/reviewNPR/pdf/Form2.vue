<template>
<div v-if="dataReady">
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-2-layout v-bind:result="result"/>
    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Form2Layout from "./Form2Layout.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import moment from 'moment';

@Component({
    components:{        
        Form2Layout
    }
})
export default class Form2 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false;     
   
    mounted(){
        this.dataReady = false;
        this.result = this.getNprResultData();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("noticeIntentionProceed")
        const pdf_name = "notice-of-intention-to-proceed"       
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 711    `+moment().format("MM/YYYY")+` \\a           Form 2";`;
        const bottomRightText = `"Notice of Intention to Proceed | "`
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
            this.UpdatePathwayCompleted({pathway:"noticeIntentionProceed", isCompleted:true});

            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getNprResultData() {         
        
        const result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.OTHER._StepNo, this.stPgNo.NPR._StepNo]){
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

        
        return result;
    } 

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>