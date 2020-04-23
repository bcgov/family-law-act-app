<!-- parent.vue -->
<!-- https://dzone.com/articles/extending-vuejs-components -->
<template>
  <div class="app-main" id="step-base">
    <b-container>
      <br />
      <h2>
        {{"STEP " + step.id + " "}}
        <br />
        {{ step.label }}
      </h2>
      <div>{{ $store.getters['application/getUserName'] }}</div>
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