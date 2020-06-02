<template>
  <step-base v-bind:step="step">
    <enforcement-form v-bind:step="step" v-if="step.currentPage == 0"></enforcement-form>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "../../../models/step";
import  EnforcementForm  from "./EnforcementForm.vue"

export default {
  name: "enforcement-agree",
  components: {
    StepBase,
    EnforcementForm
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: Step
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
