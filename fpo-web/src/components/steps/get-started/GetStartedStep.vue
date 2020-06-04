<template>
  <step-base v-bind:step="step">
    <getting-started v-bind:step="step" v-if="step.currentPage == 0"></getting-started>
    <po-questionnaire v-bind:step="step" v-if="step.currentPage == 1"></po-questionnaire>
  </step-base>
</template>

<script>
import childJson from "@/assets/child-details.json";
import StepBase from "../StepBase.vue";
import GettingStarted from "./GettingStarted.vue";
import { Step } from "../../../models/step";
import PoQuestionnaire from "./Questionnaire.vue";

export default {
  name: "get-started",
  components: {
    StepBase,
    GettingStarted,
    PoQuestionnaire
  },
  data() {
    return {
      forms: [],
      selectedForms: []
    };
  },
  created() {
  },
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
