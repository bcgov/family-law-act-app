<template>
  <step-base v-bind:step="step">
    <safety-check v-bind:step="step" v-if="step.currentPage == 0"></safety-check>
    <your-information v-bind:step="step" v-if="step.currentPage == 1" ></information> 
    <other-party-common v-bind:step="step" v-if="step.currentPage == 2"></other-party-common>
    <filing-location v-bind:step="step" v-if="step.currentPage == 3" ></filing-location>    
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
  step!: stepInfoType | Object

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
