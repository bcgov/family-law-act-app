<template>
  <div class="app-main" id="step-base">
    <b-container>
      <slot>
        <page-base v-bind:page="step.pages[step.currentPage]"></page-base>
      </slot>
    </b-container>
  </div>
</template>

<script>
import PageBase from "./PageBase.vue";
import { Step } from "../../models/step";

export default {
  name: "StepBase",
  components: {
    PageBase
  },
  data() {
    return {};
  },
  props: {
    step: Step
  },
  created() {},
  methods: {}
};
</script>