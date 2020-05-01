<template>
  <div class="fill-body" id="flapp-surveys">
    <main class="app-content">
      <navigation-sidebar />
      <common-information v-show="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></common-information>
      <protection-order v-show="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></protection-order>
      <!-- <step-demo-start v-show="getCurrentStepIndex() == 2" v-bind:step="getStep(2)"></step-demo-start> -->
      <!-- <step-demo-flm v-show="getCurrentStepIndex() == 3" v-bind:step="getStep(3)"></step-demo-flm>  -->
      <print-page v-show="$store.getters.allCompleted" />
    </main>
  </div>
</template>

<script>
import NavigationSidebar from "./NavigationSidebar.vue";
import PrintPage from "./PrintPage.vue";
import StepDemoFlm from "./steps/demo-flm/StepDemoFlm.vue";
import StepDemoStart from "./steps/demo-start/StepDemoStart.vue";
import CommonInformation from "./steps/common-information/CommonInformationStep.vue";
import ProtectionOrder from "./steps/protectionOrder/StepProtectionOrder.vue";


export default {
  name: "FlappSurveys",
  components: {
    NavigationSidebar,
    StepDemoFlm,
    StepDemoStart,
    PrintPage,
    ProtectionOrder,
    CommonInformation
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
