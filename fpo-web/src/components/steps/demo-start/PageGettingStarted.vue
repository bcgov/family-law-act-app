<template>
  <page-base v-bind:page="page">
    Please select the application(s) you would like to fill out.
    <br />
    <br />
    <input
      name="flm"
      type="checkbox"
      v-on:change="onChange($event)"
      v-bind:checked="$store.getters['application/getNavigation'][1].active"
    />
    <label for="flm">Family Law Matter</label>
  </page-base>
</template>

<script>
import { addQuestionTypes } from "@/components/question-types.ts";
import orderTypesJson from "@/assets/survey-orderTypes.json";
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageGettingStarted",
  components: {
    PageBase,
  },
  data() {
    return {};
  },
  methods: {
    onChange: function(event) {
      this.$store.dispatch("application/setStepActive", {
        currentStep: 1,
        active: event.target.checked,
      });
    },
  },
  props: {
    page: Page,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
