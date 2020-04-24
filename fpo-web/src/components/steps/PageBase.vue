<!-- parent.vue -->
<!-- https://dzone.com/articles/extending-vuejs-components -->
<template>
  <div class="app-main" id="page-base">
    <b-container>
      <br />
      <h3>{{ page.label }}</h3>
      <br />
      <slot>Provide page content here</slot>
    </b-container>
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
    page: Page
  },
  created() {},
  methods: {}
};
</script>