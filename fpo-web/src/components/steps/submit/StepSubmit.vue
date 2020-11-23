<template>
  <step-base v-bind:step="step">
    <submit-application v-bind:step="step" v-if="step.currentPage == 0"></submit-application>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "@/models/step";
import SubmitApplication from "./SubmitApplication.vue";

export default {
  name: "submit",
  components: {
    StepBase,
    SubmitApplication
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: Step | Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
