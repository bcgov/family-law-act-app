<template>
  <step-base v-bind:step="step">
    <priority-form v-bind:step="step" v-if="step.currentPage == 0"></priority-form>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "../../../models/step";
import  PriorityForm  from "./PriorityForm.vue"

export default {
  name: "parenting-priority",
  components: {
    StepBase,
    PriorityForm
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: Step | Object
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
