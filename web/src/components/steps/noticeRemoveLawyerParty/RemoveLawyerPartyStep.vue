<template>
    <step-base v-bind:step="step">    
        <notice-remove-lawyer-party      v-bind:step="step"     v-if="step.currentPage == stPgNo.NLPR.NoticeRemoveLawyerParty" />
        <review-your-answers-nlpr  v-bind:step="step"     v-if="step.currentPage == stPgNo.NLPR.ReviewYourAnswersNLPR"/>
        <preview-forms-nlpr        v-bind:step="step"     v-if="step.currentPage == stPgNo.NLPR.PreviewFormsNLPR"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeRemoveLawyerParty from "./NoticeRemoveLawyerParty.vue";
import ReviewYourAnswersNlpr from "./reviewNLPR/ReviewYourAnswersNLPR.vue";
import PreviewFormsNlpr from "./reviewNLPR/PreviewFormsNLPR.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeRemoveLawyerParty,
        ReviewYourAnswersNlpr,
        PreviewFormsNlpr        
    }
})
export default class RemoveLawyerPartyStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>