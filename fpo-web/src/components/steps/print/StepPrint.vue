<template>
  <step-base v-bind:step="step">
    <print-application v-bind:step="step" v-if="step.currentPage == 0"></print-application>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "@/models/step";
import PrintApplication from "./PrintApplication.vue";

export default {
  name: "print",
  components: {
    StepBase,
    PrintApplication
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: Step
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
