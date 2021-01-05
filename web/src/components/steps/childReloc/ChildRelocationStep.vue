<template>
  <step-base v-bind:step="step">
    <relocation-form v-bind:step="step" v-if="step.currentPage == 0"></relocation-form>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "../../../models/step";
import  RelocationForm  from "./RelocationForm.vue"

export default {
  name: "child-relocation",
  components: {
    StepBase,
    RelocationForm
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
