<template>
  <step-base v-bind:step="step">
    <enforcement-form           v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.EnforcementForms" />
    <review-your-answers-enfrc     v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.ReviewYourAnswersENFRC"/>
    <preview-forms-enfrc           v-bind:step="step" v-if="step.currentPage == stPgNo.ENFRC.PreviewFormsENFRC"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import  EnforcementForm  from "./EnforcementForm.vue";
import ReviewYourAnswersEnfrc from "./reviewAE/ReviewYourAnswersEnfrc.vue";
import PreviewFormsEnfrc from "./reviewAE/PreviewFormsEnfrc.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      StepBase,
      EnforcementForm,
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
