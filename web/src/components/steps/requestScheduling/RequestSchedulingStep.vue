<template>
    <step-base v-bind:step="step">    
        <request-for-scheduling     v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.RequestForScheduling"/>
        <reason-for-scheduling      v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.ReasonForScheduling"/>
        <interim-order              v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.InterimOrder"/>
        <next-appearance            v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.NextAppearance"/>
        <party-information-rqs      v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.PartyInformationRQS" />
        <review-your-answers-rqs    v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.ReviewYourAnswersRQS"/>
        <preview-forms-rqs          v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.PreviewFormsRQS"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import RequestForScheduling from "./RequestForScheduling.vue";
import ReasonForScheduling from "./ReasonForScheduling.vue";
import InterimOrder from "./InterimOrder.vue";
import NextAppearance from "./NextAppearance.vue";
import PartyInformationRqs from "./PartyInformationRQS.vue";
import ReviewYourAnswersRqs from "./reviewRQS/ReviewYourAnswersRQS.vue";
import PreviewFormsRqs from "./reviewRQS/PreviewFormsRQS.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        RequestForScheduling,        
        ReasonForScheduling,
        InterimOrder,
        NextAppearance,
        PartyInformationRqs,
        ReviewYourAnswersRqs,
        PreviewFormsRqs        
    }
})
export default class RequestSchedulingStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
