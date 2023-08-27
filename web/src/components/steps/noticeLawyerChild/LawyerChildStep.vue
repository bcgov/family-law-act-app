<template>
    <step-base v-bind:step="step">    
        <notice-lawyer-child      v-bind:step="step"     v-if="step.currentPage == stPgNo.NLC.NoticeLawyerChild" />        
        <review-your-answers-nlc  v-bind:step="step"     v-if="step.currentPage == stPgNo.NLC.ReviewYourAnswersNLC"/>
        <preview-forms-nlc        v-bind:step="step"     v-if="step.currentPage == stPgNo.NLC.PreviewFormsNLC"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeLawyerChild from "./NoticeLawyerChild.vue";
import ReviewYourAnswersNlc from "./reviewNLC/ReviewYourAnswersNLC.vue";
import PreviewFormsNlc from "./reviewNLC/PreviewFormsNLC.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeLawyerChild,
        ReviewYourAnswersNlc,
        PreviewFormsNlc        
    }
})
export default class LawyerChildStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
