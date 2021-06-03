<template>
  <step-base v-bind:step="step">
    <case-form v-bind:step="step" v-if="step.currentPage == 0"></case-form>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../common-information/forms/your-information.json";
import  CaseForm  from "./CaseForm.vue"

@Component({
    components:{
      StepBase,
      CaseForm
    }
})
export default class CaseManagementStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType | Object

  survey = new SurveyVue.Model(surveyJson);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
