<template>
  <div class="app-outer fill-body" id="app">
    <FlappSurveys></FlappSurveys>
  </div>
</template>

<script>
import FlappSurveys from "./components/FlappSurveys.vue";

export default {
  name: "app",
  components: {
    FlappSurveys
  },

  data() {
    return {};
  }
};
</script>
