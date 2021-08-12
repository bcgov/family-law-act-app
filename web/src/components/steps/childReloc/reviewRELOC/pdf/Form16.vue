<template>
<div v-if="dataReady">    
    <!-- <b-button id="app-print" @click="onPrintSave()">Print</b-button>  -->
    <!-- <b-button class="ml-2" @click="onPrintSave()">Print Save</b-button>   -->    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-16-layout v-bind:result="result"/>
    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Form16Layout from "./Form16Layout.vue"
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import moment from 'moment';
import { nameInfoType } from "@/types/Application/CommonInformation";

@Component({
    components:{        
        Form16Layout
    }
})
export default class Form16 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false;     
   
    mounted(){
        this.dataReady = false;
        this.result = this.getRELOCResultData();       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("childReloc")
        const pdf_name = "application-for-order-prohibiting-the-relocation-of-a-child"       
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA724    `+moment().format("MMMM D, YYYY")+` \\a           Form 16";`;
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
            this.UpdatePathwayCompleted({pathway:"childReloc", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){ 
        
        const pdf_type = Vue.filter('getPathwayPdfType')("childReloc")

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
            link.download = "Form16.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }
 
    public getRELOCResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.COMMON._StepNo, this.stPgNo.RELOC._StepNo]){
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

        Vue.filter('extractRequiredDocuments')(result, 'childReloc')

        return result;
    } 

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>