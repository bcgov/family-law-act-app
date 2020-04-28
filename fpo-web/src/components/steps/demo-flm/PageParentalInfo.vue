<template>
  <page-base v-bind:page="page"
    >Tell use about the person(s) who play a parental role in your child(ren)'s
    day-to-day life.</page-base
  >
</template>

<script>
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageParentalInfo",
  components: {
    PageBase,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  props: {
    page: Page,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
