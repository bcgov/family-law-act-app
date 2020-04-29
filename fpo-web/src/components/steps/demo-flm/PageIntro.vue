<template>
  <page-base v-bind:page="page"
    >This is the Family Law Matter step. In this step we will be collecting the
    parental information and children details needed to complete the
    application.</page-base
  >
</template>

<script>
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageIntro",
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
