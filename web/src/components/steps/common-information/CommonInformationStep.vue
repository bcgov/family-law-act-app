<template>
  <step-base v-bind:step="step">
    <safety-check v-bind:step="step"       v-if="step.currentPage == stPgNo.COMMON.SafetyCheck" />
    <your-information v-bind:step="step"   v-if="step.currentPage == stPgNo.COMMON.YourInformation" /> 
    <other-party-common v-bind:step="step" v-if="step.currentPage == stPgNo.COMMON.OtherPartyCommon" />
    <filing-location v-bind:step="step"    v-if="step.currentPage == stPgNo.COMMON.FilingLocation" />    
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import YourInformation from "./YourInformation.vue";
import FilingLocation from "./FilingLocation.vue";
import OtherPartyCommon from "./otherPartyComponent/OtherPartyCommon.vue";
import SafetyCheck from "./SafetyCheck.vue";
import { stepInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");


@Component({
    components:{
      StepBase,
      SafetyCheck,
      YourInformation,
      OtherPartyCommon,
      FilingLocation
    }
})
export default class CommonInformationStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType

  @applicationState.State
  public stPgNo!: stepsAndPagesNumberInfoType;

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
