<template>
  <step-base v-bind:step="step">
    <relocation-form v-bind:step="step" v-if="step.currentPage == 0"></relocation-form>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../common-information/forms/your-information.json";
import  RelocationForm  from "./RelocationForm.vue";

@Component({
    components:{
      StepBase,
      RelocationForm
    }
})
export default class ChildRelocationStep extends Vue {

  @Prop({required: true})
  step!: stepInfoType | Object

  survey = new SurveyVue.Model(surveyJson);
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
