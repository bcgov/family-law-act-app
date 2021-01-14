<template>
  <step-base v-bind:step="step">
    <family-form v-bind:step="step" v-if="step.currentPage == 0"></family-form>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import  FamilyForm  from "./FamilyForm.vue"

export default {
  name: "family-law",
  components: {
    StepBase,
    FamilyForm
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: stepInfoType | Object
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
