<template>
  <step-base v-bind:step="step">
    <priority-form v-bind:step="step" v-if="step.currentPage == 0"></priority-form>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../common-information/forms/survey-information.json";
import  PriorityForm  from "./PriorityForm.vue"


@Component({
    components:{
      StepBase,
      PriorityForm
    }
})
export default class ParentingPriorityStep extends Vue {
  
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
