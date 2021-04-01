<template>
  <step-base v-bind:step="step">
    <flm-sub-path-selection v-bind:step="step" v-if="step.currentPage == 0"></flm-sub-path-selection>
    <!-- <child-support v-bind:step="step" v-if="step.currentPage == 1"></child-support>   -->
    <family-form v-bind:step="step" v-if="step.currentPage == 1"></family-form>
    <preview-forms v-bind:step="step" v-if="step.currentPage == 2"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../common-information/forms/survey-information.json";

import FlmSubPathSelection from "./FlmSubPathSelection.vue";
import ChildSupport from "./ChildSupport.vue";
import  FamilyForm  from "./FamilyForm.vue"

import PreviewForms from "./reviewFLM/PreviewForms.vue"


@Component({
    components:{
      StepBase,      
      FlmSubPathSelection,
      ChildSupport,     
      FamilyForm,
      PreviewForms
    }
})
export default class FamilyLawStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType | Object

  @Watch('pageIndex')
  pageIndexChange(newVal) 
  {
      this.survey.currentPageNo = newVal;        
  }

  survey = new SurveyVue.Model(surveyJson);

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
