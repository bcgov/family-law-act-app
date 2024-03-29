<template>
    <div v-if="dataReady">
        <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-4 mb-4 container" no-body>
            <form-4-layout v-bind:result="result"/>
            <part-1-layout v-if="requiredParts.part1Required" v-bind:result="result"/>
            <part-2-layout v-if="requiredParts.part2and3Required" v-bind:result="result"/>
            <part-3-layout v-if="requiredParts.part2and3Required" v-bind:result="result"/>
            <part-4-layout v-if="requiredParts.part4Required" v-bind:result="result"/>
            <part-5-layout v-if="requiredParts.part5Required" v-bind:result="result"/>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Form4Layout from "./Form4Layout.vue"
import Part1Layout from "./Part1Layout.vue"
import Part2Layout from "./Part2Layout.vue"
import Part3Layout from "./Part3Layout.vue"
import Part4Layout from "./Part4Layout.vue"
import Part5Layout from "./Part5Layout.vue"
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import moment from 'moment';

@Component({
    components:{        
        Form4Layout,
        Part1Layout,
        Part2Layout,
        Part3Layout,
        Part4Layout,
        Part5Layout
    }
})
export default class Form4 extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    result;
    dataReady = false; 
    requiredParts = {
        part1Required: false,
        part2and3Required: false,
        part4Required: false,
        part5Required: false
    };     
   
    mounted(){
        this.dataReady = false;
        this.result = this.getFSResultData(); 
        this.requiredParts = {
            part1Required: false,
            part2and3Required: false,
            part4Required: false,
            part5Required: false
        }
        if(this.result?.financialStatementSurvey)
            this.requiredParts = Vue.filter('getFsRequiredParts')(this.result.financialStatementSurvey);      
        this.dataReady = true;
        Vue.nextTick(()=> this.onPrint())
    }   
           
    public onPrint() { 

        const pdf_type = Vue.filter('getPathwayPdfType')("financialStatement")
        const pdf_name = "financialStatement";       
        const el= document.getElementById("print");

        const applicationId = this.$store.state.Application.id;
        const bottomLeftText = `"PFA713    `+moment().format("MMMM D, YYYY")+` \\a           Form 4";`;
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
            this.UpdatePathwayCompleted({pathway:"financialStatement", isCompleted:true});

            this.$emit('enableNext',true)                   
        },err => {
            console.error(err);        
        });
    }
 
    public getFSResultData() {         
        
        const result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of [this.stPgNo.OTHER._StepNo, this.stPgNo.FS._StepNo]){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }    
        
        const incomeOtherPersonHouseholdLiveAlone = {incomeOtherPersonHouseholdLiveAlone:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.incomeOtherPersonHouseholdLiveAlone};
        Object.assign(result, result, incomeOtherPersonHouseholdLiveAlone);

        const incomeOtherPersonHouseholdNumberOfChildren = {incomeOtherPersonHouseholdNumberOfChildren:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.incomeOtherPersonHouseholdNumberOfChildren};
        Object.assign(result, result, incomeOtherPersonHouseholdNumberOfChildren);

        const incomeOtherPersonHouseholdLiveWithAdult = {incomeOtherPersonHouseholdLiveWithAdult:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.incomeOtherPersonHouseholdLiveWithAdult};
        Object.assign(result, result, incomeOtherPersonHouseholdLiveWithAdult);

        const undueHardshipFsExists = {undueHardshipFsExists:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.undueHardshipFsExists};
        Object.assign(result, result, undueHardshipFsExists);

        const legalDutyDependentChildFsExists = {legalDutyDependentChildFsExists:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.legalDutyDependentChildFsExists};
        Object.assign(result, result, legalDutyDependentChildFsExists);

        const legalDutyAnotherPersonFsExists = {legalDutyAnotherPersonFsExists:this.$store.state.Application.steps[this.stPgNo.FS._StepNo].result.legalDutyAnotherPersonFsExists};
        Object.assign(result, result, legalDutyAnotherPersonFsExists);        

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