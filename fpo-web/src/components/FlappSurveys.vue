<template>
  <div class="fill-body" id="flapp-surveys">
    <main class="app-content">
      <navigation-sidebar />
      <get-started v-show="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></get-started>
      <common-information v-show="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></common-information>
      <protection-order v-show="getCurrentStepIndex() == 2" v-bind:step="getStep(2)"></protection-order>
      <family-law v-show="getCurrentStepIndex() == 3" v-bind:step="getStep(3)"></family-law>
      <case-management v-show="getCurrentStepIndex() == 4" v-bind:step="getStep(4)"></case-management>
      <parenting-priority v-show="getCurrentStepIndex() == 5" v-bind:step="getStep(5)"></parenting-priority>
      <child-relocation v-show="getCurrentStepIndex() == 6" v-bind:step="getStep(6)"></child-relocation>
      <enforcement-agree v-show="getCurrentStepIndex() == 7" v-bind:step="getStep(7)"></enforcement-agree>
      <print v-show="getCurrentStepIndex() == 8" v-bind:step="getStep(8)"></print>
    </main>
  </div>
</template>

<script>
import NavigationSidebar from "./NavigationSidebar.vue";
import CommonInformation from "./steps/common-information/CommonInformationStep.vue";
import ProtectionOrder from "./steps/protectionOrder/StepProtectionOrder.vue";
import Print from "./steps/print/StepPrint.vue";
import FamilyLaw from "./steps/familyLawMatter/FamilyLawStep.vue";
import ParentingPriority from "./steps/priotityParenting/ParentingPriorityStep.vue";
import CaseManagement from "./steps/caseMgmt/CaseManagementStep.vue";
import ChildRelocation from "./steps/childReloc/ChildRelocationStep.vue";
import EnforcementAgree from "./steps/agreementEnfrc/EnforcementAgreeStep.vue";
import GetStarted from "./steps/get-started/GetStartedStep.vue";
import * as surveyEnv from "@/components/survey-glossary.ts"

export default {
  name: "FlappSurveys",
  components: {
    NavigationSidebar,
    ProtectionOrder,
    CommonInformation,
    Print,
    FamilyLaw,
    ParentingPriority,
    CaseManagement,
    ChildRelocation,
    EnforcementAgree,
    GetStarted
  },
  computed: {},
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("application/init");
    surveyEnv.loadGlossary();
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
