<template>
<div v-if="dataReady"> 

    <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
        <common-section v-bind:result="result" />
        <schedule-1     v-bind:result="result" v-if="orderType == 'needPO'" />
        <schedule-2     v-bind:result="result" v-if="orderType == 'changePO'" />
        <schedule-3     v-bind:result="result" v-if="orderType == 'terminatePO'" />

    </b-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import CommonSection from "./Schedules/CommonSection.vue"
import Schedule1 from "./Schedules/Schedule1.vue"
import Schedule2 from "./Schedules/Schedule2.vue"
import Schedule3 from "./Schedules/Schedule3.vue"

import moment from 'moment';

@Component({
    components:{
        CommonSection,
        Schedule1,
        Schedule2,
        Schedule3
    }
})

export default class FormK extends Vue {

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    result;
    dataReady = false;
    orderType = '';    
    applicantList = []
        
    mounted(){        
        this.dataReady = false;
        this.result = this.getFPOResultData()       
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }

    public onPrint() { 
        const pdf_type = Vue.filter('getPathwayPdfType')("protectionOrder")//'AAP'  
        const pdf_name = "application-about-a-protection-order";  
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA 720   `+moment().format("MM/YYYY")+` \\a           Form 12";`;
        const bottomRightText = `"Application Protection Order "`
        const url = '/survey-print/'+applicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );
        
        const body = {
            'html':pdfhtml,
            'json_data':this.getFPOResultData()
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
            this.UpdatePathwayCompleted({pathway:"protectionOrder", isCompleted:true})
            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getFPOResultData() {  
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.PO._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResult in stepResults){              
                result[stepResult]=stepResults[stepResult].data; 
            }
        }
        
        const applicationLocation = this.$store.state.Application.applicationLocation;        
        Object.assign(result, result,{applicationLocation: applicationLocation});
        Vue.filter('extractRequiredDocuments')(result, 'protectionOrder')

        if(result?.poQuestionnaireSurvey?.orderType)
            this.orderType =  result.poQuestionnaireSurvey.orderType

        return result;
    }

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>