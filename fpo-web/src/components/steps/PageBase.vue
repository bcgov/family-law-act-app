<!-- parent.vue -->
<!-- https://dzone.com/articles/extending-vuejs-components -->
<template>
  <div>
    <br />
    <h3>{{ page.label }}</h3>
    <br />
    <slot>Provide page content here</slot>
    <br />
    <br />
    <div class="survey-nav">
      <div v-if="hasPrevStepPage()" class="survey-nav-left">
        <button v-on:click="onPrev()" class="btn btn-primary btn-lg">
          <span class="fa fa-chevron-left btn-icon-left"></span> Previous
        </button>
      </div>
      <div v-if="hasNextStepPage()" class="survey-nav-right">
        <button v-on:click="onNext()" class="btn btn-primary btn-lg">
          <span class="fa fa-chevron-right btn-icon-right"></span> Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Page } from "../../models/page";

export default {
  name: "PageBase",
  data() {
    return {};
  },
  props: {
    page: Page,
  },
  created() {},
  methods: {
    onPrev: function(event) {
      this.$store.dispatch("application/gotoPrevStepPage");
    },
    onNext: function(event) {
      this.$store.dispatch("application/gotoNextStepPage");
    },
    hasPrevStepPage: function() {
      return this.$store.getters["application/getPrevStepPage"] != null;
    },
    hasNextStepPage: function() {
      return this.$store.getters["application/getNextStepPage"] != null;
    },
  },
};
</script>
