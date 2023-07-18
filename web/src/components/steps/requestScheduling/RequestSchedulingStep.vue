<template>
    <step-base v-bind:step="step">    
        <request-for-scheduling      v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.RequestForScheduling" />
        <request-for-scheduling-information v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.RequestForSchedulingInformation" />
        <more-information-rqs           v-bind:step="step"     v-if="step.currentPage == stPgNo.RQS.MoreInformationRQS" />
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
import RequestForSchedulingInformation from "./RequestForSchedulingInformation.vue";
import MoreInformationRqs from "./MoreInformationRQS.vue";
import ReviewYourAnswersRqs from "./reviewRQS/ReviewYourAnswersRQS.vue";
import PreviewFormsRqs from "./reviewRQS/PreviewFormsRQS.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        RequestForScheduling,        
        RequestForSchedulingInformation,
        MoreInformationRqs,
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
