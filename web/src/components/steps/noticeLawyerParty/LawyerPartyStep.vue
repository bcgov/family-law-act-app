<template>
    <step-base v-bind:step="step">    
        <notice-lawyer-party      v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.NoticeLawyerParty" />
        <lawyer-party-information v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.LawyerPartyInformation" />
        <more-information-nlp     v-bind:step="step"     v-if="step.currentPage == stPgNo.NLP.MoreInformationNLP" />
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
import LawyerPartyInformation from "./LawyerPartyInformation.vue";
import MoreInformationNlp from "./MoreInformationNLP.vue";
import ReviewYourAnswersNlp from "./reviewNLP/ReviewYourAnswersNLP.vue";
import PreviewFormsNlp from "./reviewNLP/PreviewFormsNLP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeLawyerParty,        
        LawyerPartyInformation,
        MoreInformationNlp,
        ReviewYourAnswersNlp,
        PreviewFormsNlp        
    }
})
export default class LawyerPartyStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
