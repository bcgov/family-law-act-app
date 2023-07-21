<template>
    <step-base v-bind:step="step">        
        <notice-intention-proceed         v-bind:step="step"     v-if="step.currentPage == stPgNo.NPR.NoticeIntentionProceed" />
        <your-information-npr             v-bind:step="step"     v-if="step.currentPage == stPgNo.NPR.YourInformationNpr" />
        <other-party-npr                  v-bind:step="step"     v-if="step.currentPage == stPgNo.NPR.OtherPartyNpr" />
        <review-your-answers-npr          v-bind:step="step"     v-if="step.currentPage == stPgNo.NPR.ReviewYourAnswersNPR"/>
        <preview-forms-npr                v-bind:step="step"     v-if="step.currentPage == stPgNo.NPR.PreviewFormsNPR"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeIntentionProceed from "./NoticeIntentionProceed.vue";
import YourInformationNpr from './YourInformationNpr.vue';
import OtherPartyNpr from "./otherPartyComponent/OtherPartyNpr.vue";
import ReviewYourAnswersNpr from "./reviewNPR/ReviewYourAnswersNPR.vue";
import PreviewFormsNpr from "./reviewNPR/PreviewFormsNPR.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeIntentionProceed,        
        YourInformationNpr,
        OtherPartyNpr,
        ReviewYourAnswersNpr,
        PreviewFormsNpr        
    }
})
export default class IntentionProceedStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
