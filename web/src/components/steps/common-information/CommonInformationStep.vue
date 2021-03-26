<template>
  <step-base v-bind:step="step">
    <safety-check v-bind:step="step" v-if="step.currentPage == 0"></safety-check>
    <information v-bind:step="step" v-if="step.currentPage == 1" ></information> 
    <other-party v-bind:step="step" v-if="step.currentPage == 2"></other-party>
    <filing-location v-bind:step="step" v-if="step.currentPage == 3" ></filing-location>    
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import Information from "./Information.vue";
import FilingLocation from "./FilingLocation.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";
import SafetyCheck from "./SafetyCheck.vue";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
      StepBase,
      SafetyCheck,
      Information,
      OtherParty,
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
