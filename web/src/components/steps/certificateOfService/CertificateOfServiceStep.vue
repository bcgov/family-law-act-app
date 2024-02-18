<template>
    <step-base v-bind:step="step">    
        <certificate-of-service           v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.CertificateOfService" />
        <about-affiant-csv                v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.AboutAffiantCsv" />
        <about-service-csv                   v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.AboutServiceCSV" />       
        <electronic-filing-statement-csv  v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.ElectronicFilingStatementCSV" />
        <review-your-answers-csv          v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.ReviewYourAnswersCSV"/>
        <preview-forms-csv                v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.PreviewFormsCSV"/>
        <preview-forms-csv-efsp           v-bind:step="step"     v-if="step.currentPage == stPgNo.CSV.PreviewFormsCsvEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import CertificateOfService from "./CertificateOfService.vue";
import AboutAffiantCsv from "./AboutAffiantCSV.vue";
import AboutServiceCsv from "./AboutServiceCSV.vue";
import ElectronicFilingStatementCsv from "./ElectronicFilingStatementCSV.vue";
import ReviewYourAnswersCsv from "./reviewCSV/ReviewYourAnswersCSV.vue";
import PreviewFormsCsv from "./reviewCSV/PreviewFormsCSV.vue";
import PreviewFormsCsvEfsp from "./reviewCSV/PreviewFormsCsvEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        CertificateOfService,        
        AboutAffiantCsv,
        AboutServiceCsv,
        ElectronicFilingStatementCsv,
        ReviewYourAnswersCsv,
        PreviewFormsCsv,
        PreviewFormsCsvEfsp
    }
})
export default class CertificateOfServiceStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
