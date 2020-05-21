<template>
  <div class="fill-body" id="flapp-surveys">
    <main class="app-content">
      <navigation-sidebar />
      <common-information v-show="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></common-information>
      <protection-order v-show="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></protection-order>
      <print v-show="getCurrentStepIndex() == 2" v-bind:step="getStep(2)"></print>
    </main>
  </div>
</template>

<script>
import NavigationSidebar from "./NavigationSidebar.vue";
import CommonInformation from "./steps/common-information/CommonInformationStep.vue";
import ProtectionOrder from "./steps/protectionOrder/StepProtectionOrder.vue";
import Print from "./steps/print/StepPrint.vue";


export default {
  name: "FlappSurveys",
  components: {
    NavigationSidebar,
    ProtectionOrder,
    CommonInformation,
    Print,
  },
  computed: {},
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("application/init");
  },
  methods: {
    getCurrentStepIndex() {
      return this.$store.getters["application/getCurrentStep"];
    },

    getStep(stepIndex) {
      const step = this.$store.getters["application/getNavigation"][stepIndex];

      return step;
    },
  },
};
</script>
