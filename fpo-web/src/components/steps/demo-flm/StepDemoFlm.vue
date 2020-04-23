<template>
  <step-base v-bind:step="step">
    <page-intro v-bind:page="step.pages[0]" v-if="step.currentPage == 0"></page-intro>
    <page-parental-info v-bind:page="step.pages[1]" v-if="step.currentPage == 1"></page-parental-info>
    <page-children-details
      v-bind:page="step.pages[2]"
      v-bind:childrenDetailsList="childrenDetailsList"
      v-if="step.currentPage == 2"
    ></page-children-details>
  </step-base>
</template>

<script>
import childJson from "@/assets/child-details.json";
import StepBase from "../StepBase.vue";
import PageIntro from "./PageIntro.vue";
import PageParentalInfo from "./PageParentalInfo.vue";
import PageChildrenDetails from "./PageChildrenDetails.vue";
import { Step } from "../../../models/step";

export default {
  name: "StepDemoFlm",
  components: {
    StepBase,
    PageIntro,
    PageParentalInfo,
    PageChildrenDetails
  },
  data() {
    return {
      childrenDetailsList: []
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
