<template>
  <step-base v-bind:step="step">
    <information v-bind:step="step" v-if="step.currentPage == 0" ></information>
    <other-party v-bind:step="step" v-if="step.currentPage == 1"></other-party>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import Information from "./Information.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";
import { stepInfoType } from "@/types/Application";

export default {
  name: "common-information",
  components: {
    StepBase,
    Information,
    OtherParty,
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {},
  props: {
    step: stepInfoType | Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
