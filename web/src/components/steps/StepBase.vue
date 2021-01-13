<template>
    <div class="app-main" id="step-base">
        <b-container>
            <slot>
                <page-base></page-base>
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
  created() {},
  methods: {}
};
</script>