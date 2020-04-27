<template>
  <page-base v-bind:page="page">
    This page wil contain your personal information.
    <br />
    <br />
    <label for="name">Your Name: </label>
    <input
      name="name"
      type="text"
      v-bind:value="$store.getters['application/getUserName']"
      v-on:keyup="onChange"
    />
  </page-base>
</template>

<script>
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageYourInfo",
  components: {
    PageBase,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChange: function(event) {
      this.$store.dispatch("application/setUserName", event.target.value);
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
