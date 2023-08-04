<template>
    <step-base v-bind:step="step">    
        <notice-lawyer-party      v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.NoticeLawyerParty" />
        <lawyer-party-information v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.LawyerPartyInformation" />
        <more-information-nlp     v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.MoreInformationTRIS" />
        <review-your-answers-nlp  v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.ReviewYourAnswersTRIS"/>
        <preview-forms-nlp        v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.PreviewFormsTRIS"/> 
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
import MoreInformationTris from "./MoreInformationTRIS.vue";
import ReviewYourAnswersTris from "./reviewTRIS/ReviewYourAnswersTRIS.vue";
import PreviewFormsTris from "./reviewTRIS/PreviewFormsTRIS.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeLawyerParty,        
        LawyerPartyInformation,
        MoreInformationTris,
        ReviewYourAnswersTris,
        PreviewFormsTris        
    }
})
export default class TrialReadinessStatementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
