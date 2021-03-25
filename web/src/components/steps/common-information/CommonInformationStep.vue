<template>
  <step-base v-bind:step="step">
    <safety-check v-bind:step="step" v-if="step.currentPage == 0"></safety-check>
    <information v-bind:step="step" v-if="step.currentPage == 1" ></information>    
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import Information from "./Information.vue";
import SafetyCheck from "./SafetyCheck.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/survey-information.json";


@Component({
    components:{
      StepBase,
      SafetyCheck,
      Information
    }
})
export default class CommonInformationStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType | Object

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
