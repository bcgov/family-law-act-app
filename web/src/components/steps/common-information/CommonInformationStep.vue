<template>
  <step-base v-bind:step="step">
    <information v-bind:step="step" v-if="step.currentPage == 0" ></information>
    <other-party v-bind:step="step" v-if="step.currentPage == 1"></other-party>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import Information from "./Information.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";
import { stepInfoType } from "@/types/Application";
import * as SurveyVue from "survey-vue";
import surveyJson from "../common-information/forms/survey-information.json";


@Component({
    components:{
      StepBase,
      Information,
      OtherParty
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
