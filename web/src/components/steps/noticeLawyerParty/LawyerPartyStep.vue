<template>
    <step-base v-bind:step="step">    
        <notice-lawyer-party      v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.NoticeLawyerParty" />
        <review-your-answers-nlp  v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.ReviewYourAnswersNLP"/>
        <preview-forms-nlp        v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.PreviewFormsNLP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeLawyerParty from "./NoticeLawyerParty.vue";
import ReviewYourAnswersNlp from "./reviewNLP/ReviewYourAnswersNLP.vue";
import PreviewFormsNlp from "./reviewNLP/PreviewFormsNLP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeLawyerParty,
        ReviewYourAnswersNlp,
        PreviewFormsNlp        
    }
})
export default class LawyerPartyStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
