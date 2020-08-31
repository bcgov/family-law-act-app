<template>
  <step-base v-bind:step="step">
    <e-file-application v-bind:step="step" v-if="step.currentPage == 0"></e-file-application>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "@/models/step";
import eFileApplication from "./eFileApplication.vue";

export default {
  name: "eFile",
  components: {
    StepBase,
    eFileApplication
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
