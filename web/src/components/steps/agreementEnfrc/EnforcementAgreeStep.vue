<template>
  <step-base v-bind:step="step">
    <enfrc-questionnaire     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnfrcQuestionnaire" />

    <enforce-agreement-order     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnforceAgreementOrOrder" />
    <enforce-change-or-set-aside-determination     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnforceChangeOrSetAsideDetermination" />
    <about-the-order-enforcement     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.AboutTheOrderEnforcement" />

    <review-your-answers-enfrc     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.ReviewYourAnswersENFRC"/>
    <preview-forms-enfrc           v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewFormsENFRC"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import EnfrcQuestionnaire from "./EnfrcQuestionnaire.vue"
import AboutTheOrderEnforcement from "./AboutTheOrderEnforcement.vue";
import EnforceAgreementOrder from "./EnforceAgreementOrder.vue";
import EnforceChangeSetAsideDetermination from "./EnforceChangeSetAsideDetermination.vue";
import ReviewYourAnswersEnfrc from "./reviewAE/ReviewYourAnswersEnfrc.vue";
import PreviewFormsEnfrc from "./reviewAE/PreviewFormsEnfrc.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      StepBase,
      EnfrcQuestionnaire,
      AboutTheOrderEnforcement,
      EnforceAgreementOrder,
      EnforceChangeSetAsideDetermination,
      ReviewYourAnswersEnfrc,
      PreviewFormsEnfrc
    }
})
export default class EnforcementAgreeStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType;

  @applicationState.State
  public stPgNo!: stepsAndPagesNumberInfoType;

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
