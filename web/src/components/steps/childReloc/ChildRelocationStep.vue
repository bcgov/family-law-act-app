<template>
    <step-base v-bind:step="step">
        <relocation-of-child-Questionnaire           v-bind:step="step" v-if="step.currentPage == stPgNo.RELOC.RelocQuestionnaire"/>
        <reloc-children-info                         v-bind:step="step" v-if="step.currentPage == stPgNo.RELOC.RelocChildrenInfo"/>
        <relocation-of-child-best-interests-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RELOC.RelocChildBestInterestInfo"/> 
        <review-your-answers-reloc                   v-bind:step="step" v-if="step.currentPage == stPgNo.RELOC.ReviewYourAnswersRELOC"/>
        <preview-forms-reloc                         v-bind:step="step" v-if="step.currentPage == stPgNo.RELOC.PreviewFormsRELOC"/>     
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import RelocChildrenInfo from "./childInfo/RelocChildrenInfo.vue";
import RelocationOfChildBestInterestsOfChild from "./RelocationOfChildBestInterestsOfChild.vue";
import RelocationOfChildQuestionnaire from "./RelocationOfChildQuestionnaire.vue";
import ReviewYourAnswersReloc from "./reviewRELOC/ReviewYourAnswersRELOC.vue";
import PreviewFormsReloc from "./reviewRELOC/PreviewFormsRELOC.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,
        RelocationOfChildQuestionnaire,
        RelocationOfChildBestInterestsOfChild,
        RelocChildrenInfo,
        ReviewYourAnswersReloc,
        PreviewFormsReloc
    }
})
export default class ChildRelocationStep extends Vue {

  @Prop({required: true})
  step!: stepInfoType;

  @applicationState.State
  public stPgNo!: stepsAndPagesNumberInfoType;

  
};
</script>
