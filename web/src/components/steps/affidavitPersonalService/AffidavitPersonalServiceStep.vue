<template>
    <step-base v-bind:step="step">    
        <affidavit-personal-service       v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.AffidavitPersonalService" />
        <about-affiant-aps                v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.AboutAffiantAps" />
        <about-service-aps                v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.AboutServiceAPS" />       
        <electronic-filing-statement-aps  v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.ElectronicFilingStatementAPS" />
        <review-your-answers-aps          v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.ReviewYourAnswersAPS"/>
        <preview-forms-aps                v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.PreviewFormsAPS"/>
        <preview-forms-aps-efsp           v-bind:step="step"     v-if="step.currentPage == stPgNo.APS.PreviewFormsApsEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import AffidavitPersonalService from "./AffidavitPersonalService.vue";
import AboutAffiantAps from "./AboutAffiantAPS.vue";
import AboutServiceAps from "./AboutServiceAPS.vue";
import ElectronicFilingStatementAps from "./ElectronicFilingStatementAPS.vue";
import ReviewYourAnswersAps from "./reviewAPS/ReviewYourAnswersAPS.vue";
import PreviewFormsAps from "./reviewAPS/PreviewFormsAPS.vue";
import PreviewFormsApsEfsp from "./reviewAPS/PreviewFormsApsEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        AffidavitPersonalService,        
        AboutAffiantAps,
        AboutServiceAps,
        ElectronicFilingStatementAps,
        ReviewYourAnswersAps,
        PreviewFormsAps,
        PreviewFormsApsEfsp
    }
})
export default class AffidavitPersonalServiceStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
