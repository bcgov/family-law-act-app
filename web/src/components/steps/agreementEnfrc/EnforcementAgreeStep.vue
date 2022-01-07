<template>
  <step-base v-bind:step="step">    
    <enfrc-questionnaire                           v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnfrcQuestionnaire" />
    <determine-an-amount-owing-for-expenses        v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.DetermineAnAmountOwingForExpenses" />
    <determine-arrears                             v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.DetermineArrears" />
    <enforce-agreement-order                       v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnforceAgreementOrOrder" />
    <enforce-change-set-aside-determination        v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnforceChangeOrSetAsideDetermination" />
    <about-the-order-enforcement                   v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.AboutTheOrderEnforcement" />
    <review-your-answers-enfrc                     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.ReviewYourAnswersENFRC"/>
    <preview-form-26-enfrc                         v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewForm26ENFRC"/>
    <preview-form-27-enfrc                         v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewForm27ENFRC"/>
    <preview-form-28-enfrc                         v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewForm28ENFRC"/>
    <preview-form-29-enfrc                         v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewForm29ENFRC"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import EnfrcQuestionnaire from "./EnfrcQuestionnaire.vue"
import DetermineAnAmountOwingForExpenses from "./DetermineAnAmountOwingForExpenses.vue"
import AboutTheOrderEnforcement from "./AboutTheOrderEnforcement.vue";
import EnforceAgreementOrder from "./EnforceAgreementOrder.vue";
import EnforceChangeSetAsideDetermination from "./EnforceChangeSetAsideDetermination.vue";
import DetermineArrears from "./DetermineArrears.vue";
import ReviewYourAnswersEnfrc from "./reviewAE/ReviewYourAnswersEnfrc.vue";
import PreviewForm26Enfrc from "./reviewAE/PreviewForm26Enfrc.vue";
import PreviewForm27Enfrc from "./reviewAE/PreviewForm27Enfrc.vue";
import PreviewForm28Enfrc from "./reviewAE/PreviewForm28Enfrc.vue";
import PreviewForm29Enfrc from "./reviewAE/PreviewForm29Enfrc.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      StepBase,
      EnfrcQuestionnaire,
      DetermineAnAmountOwingForExpenses,
      AboutTheOrderEnforcement,
      EnforceAgreementOrder,
      EnforceChangeSetAsideDetermination,
      DetermineArrears,
      ReviewYourAnswersEnfrc,
      PreviewForm26Enfrc,
      PreviewForm27Enfrc,
      PreviewForm28Enfrc,
      PreviewForm29Enfrc,
    }
})
export default class EnforcementAgreeStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType;

  @applicationState.State
  public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
