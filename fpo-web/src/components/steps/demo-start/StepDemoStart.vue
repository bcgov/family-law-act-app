<template>
  <step-base v-bind:step="step">
    <page-getting-started
      v-bind:page="step.pages[1]"
      v-if="step.currentPage == 0"
    ></page-getting-started>
    <page-your-info
      v-bind:page="step.pages[1]"
      v-if="step.currentPage == 1"
    ></page-your-info>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import PageGettingStarted from "./PageGettingStarted.vue";
import PageYourInfo from "./PageYourInfo.vue";
import { Step } from "../../../models/step";

export default {
  name: "StepDemoStart",
  components: {
    StepBase,
    PageGettingStarted,
    PageYourInfo,
  },
  data() {
    return {
      //childrenDetailsList: []
    };
  },

  methods: {},
  props: {
    step: Step,
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
