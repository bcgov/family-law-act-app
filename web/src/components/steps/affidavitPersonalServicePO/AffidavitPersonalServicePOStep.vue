<template>
    <step-base v-bind:step="step">    
        <affidavit-personal-service-po     v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.AffidavitPersonalServicePO" />
        <about-affiant-apsp                v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.AboutAffiantApsp" />
        <your-story-apsp                   v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.YourStoryAPSP" />
        <filing-apsp                       v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.FilingAPSP" />
        <electronic-filing-statement-apsp  v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.ElectronicFilingStatementAPSP" />
        <review-your-answers-apsp          v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.ReviewYourAnswersAPSP"/>
        <preview-forms-apsp                v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.PreviewFormsAPSP"/>
        <preview-forms-apsp-efsp           v-bind:step="step"     v-if="step.currentPage == stPgNo.APSP.PreviewFormsApspEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import AffidavitPersonalServicePo from "./AffidavitPersonalServicePO.vue";
import AboutAffiantApsp from "./AboutAffiantAPSP.vue";
import YourStoryApsp from "./YourStoryAPSP.vue";
import FilingApsp from "./FilingAPSP.vue";
import ElectronicFilingStatementApsp from "./ElectronicFilingStatementAPSP.vue";
import ReviewYourAnswersApsp from "./reviewAPSP/ReviewYourAnswersAPSP.vue";
import PreviewFormsApsp from "./reviewAPSP/PreviewFormsAPSP.vue";
import PreviewFormsApspEfsp from "./reviewAPSP/PreviewFormsApspEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        AffidavitPersonalServicePo,        
        AboutAffiantApsp,
        YourStoryApsp,
        FilingApsp,
        ElectronicFilingStatementApsp,
        ReviewYourAnswersApsp,
        PreviewFormsApsp,
        PreviewFormsApspEfsp
    }
})
export default class AffidavitPersonalServicePoStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
