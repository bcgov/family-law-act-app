<template>
    <step-base v-bind:step="step">    
        <notice-remove-lawyer-child      v-bind:step="step"     v-if="step.currentPage == stPgNo.NLCR.NoticeRemoveLawyerChild" />       
        <review-your-answers-nlcr        v-bind:step="step"     v-if="step.currentPage == stPgNo.NLCR.ReviewYourAnswersNLCR"/>
        <preview-forms-nlcr              v-bind:step="step"     v-if="step.currentPage == stPgNo.NLCR.PreviewFormsNLCR"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeRemoveLawyerChild from "./NoticeRemoveLawyerChild.vue";
import ReviewYourAnswersNlcr from "./reviewNLCR/ReviewYourAnswersNLCR.vue";
import PreviewFormsNlcr from "./reviewNLCR/PreviewFormsNLCR.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeRemoveLawyerChild,
        ReviewYourAnswersNlcr,
        PreviewFormsNlcr        
    }
})
export default class RemoveLawyerChildStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>