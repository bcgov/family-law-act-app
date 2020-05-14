<template>
  <step-base v-bind:step="step">
    <getting-started v-bind:step="step" v-if="step.currentPage == 0"></getting-started>
    <your-information v-bind:step="step" v-if="step.currentPage == 1"></your-information>
    <other-party v-bind:step="step" v-if="step.currentPage == 2"></other-party>
    <children-info v-bind:step="step" v-if="step.currentPage == 3"></children-info>
  </step-base>
</template>

<script>
import childJson from "@/assets/child-details.json";
import StepBase from "../StepBase.vue";
import GettingStarted from "./GettingStarted.vue";
import YourInformation from "./YourInformation.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";
import ChildrenInfo from "./childComponent/ChildrenInfo.vue";
import { Step } from "../../../models/step";

export default {
  name: "common-information",
  components: {
    StepBase,
    GettingStarted,
    YourInformation,
    OtherParty,
    ChildrenInfo
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
