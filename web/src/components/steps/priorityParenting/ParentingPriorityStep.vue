<template>
  <step-base v-bind:step="step">
    <priority-form v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PriorityParentingMatterForm" />
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import  PriorityForm  from "./PriorityForm.vue"
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      StepBase,
      PriorityForm
    }
})
export default class ParentingPriorityStep extends Vue {
  
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
