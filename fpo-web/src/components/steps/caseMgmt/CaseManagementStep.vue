<template>
  <step-base v-bind:step="step">
    <case-form v-bind:step="step" v-if="step.currentPage == 0"></case-form>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "../../../models/step";
import  CaseForm  from "./CaseForm.vue"

export default {
  name: "case-management",
  components: {
    StepBase,
    CaseForm
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
