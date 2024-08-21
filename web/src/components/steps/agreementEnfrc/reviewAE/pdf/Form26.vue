<template>
<div v-if="dataReady">   
   
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <form-26-layout v-bind:result="result"/>
    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";   
import moment from 'moment';

import "@/store/modules/application";
const applicationState = namespace("Application");

import Form26Layout from "./Form26Layout.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { getEnforcementResultData } from '@/components/utils/PopulateForms/PopulateEnfrcInformation';

@Component({
    components:{        
        Form26Layout
    }
})

export default class Form26 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    result;
    dataReady = false;
   
    mounted(){
        this.dataReady = false;
        this.result = this.getEnfrcResultData();   
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 
        const pdf_type = Vue.filter('getPathwayPdfType')("agreementEnfrc26")
        const pdf_name = "request-to-file-an-order"
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 736    `+moment().format("MM/YYYY")+` \\a           Form 26";`;
        const bottomRightText = `"Request to File an Agreement | "`
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
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }    
 
    public getEnfrcResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 

        result = getEnforcementResultData(result, this.stPgNo.COMMON._StepNo, this.stPgNo.ENFRC._StepNo)

        Vue.filter('extractRequiredDocuments')(result, 'agreementEnfrc26')

        return result;
    }
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>