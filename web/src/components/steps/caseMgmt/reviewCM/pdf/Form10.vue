<template>
<div v-if="dataReady">    
    
    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        
        <form-10-layout v-bind:result="result" />       

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import Form10Layout from "./Form10Layout.vue";
import { getCaseManagementResultData } from '@/components/utils/PopulateForms/PopulateCmInformation';
import moment from 'moment';

@Component({
    components:{
        Form10Layout         
    }
})

export default class Form10 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    
   
    mounted(){
        this.dataReady = false;
        this.result = this.getCMResultData();
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 
        
        const pdf_type = Vue.filter('getPathwayPdfType')("caseMgmt")
        const pdf_name = "application-for-case-management"
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA717 02/2024    `+moment().format("DD/YYYY")+` \\a           Form 10";`;        
        const bottomRightText = `" Application Case Management |"`
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
            
            if(this.$store.state.Application.steps[this.stPgNo.CM._StepNo].pages[this.stPgNo.CM.PreviewForm11CM].active == false)
               this.UpdatePathwayCompleted({pathway:"caseMgmt", isCompleted:true})
            
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getCMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        result = getCaseManagementResultData(result, this.stPgNo.COMMON._StepNo, this.stPgNo.CM._StepNo);

        Vue.filter('extractRequiredDocuments')(result, 'caseMgmt')

        return result;
    }

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>