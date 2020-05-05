<template>
  <step-base v-bind:step="step">
    <po-questionnaire v-bind:page="step.pages[0]" v-if="step.currentPage == 0"></po-questionnaire>
    <protection-fromWhom v-bind:page="step.pages[0]" v-if="step.currentPage == 1"></protection-fromWhom>
    <remove-person v-bind:page="step.pages[0]" v-if="step.currentPage == 2"></remove-person>
    <no-go v-bind:page="step.pages[0]" v-if="step.currentPage == 3"></no-go>
    <no-contact v-bind:page="step.pages[0]" v-if="step.currentPage == 4"></no-contact>
    <weapons-firearms v-bind:page="step.pages[0]" v-if="step.currentPage == 5"></weapons-firearms>
    <background v-bind:page="step.pages[0]" v-if="step.currentPage == 6"></background>
    <your-story v-bind:page="step.pages[0]" v-if="step.currentPage == 7"></your-story>
    <about v-bind:page="step.pages[0]" v-if="step.currentPage == 8"></about>
    <urgency v-bind:page="step.pages[0]" v-if="step.currentPage == 9"></urgency>
  </step-base>
</template>

<script>
import StepBase from "../StepBase.vue";
import { Step } from "../../../models/step";
import ProtectionFromWhom from "./ProtectionFromWhom.vue";
import Background from "./Background.vue";
import YourStory from "./YourStory.vue";
import Urgency from "./Urgency.vue";
import NoGo from "./safteyNeeds/NoGo.vue";
import RemovePerson from "./safteyNeeds/RemovePerson.vue";
import NoContact from "./safteyNeeds/NoContact.vue";
import WeaponsFirearms from "./safteyNeeds/WeaponsFirearms.vue";
import PoQuestionnaire from "./Questionnaire.vue";
import About from "./About.vue";

export default {
  name: "protection-order",
  components: {
    StepBase,
    ProtectionFromWhom,
    Background,
    YourStory,
    Urgency,
    NoGo,
    RemovePerson,
    NoContact,
    WeaponsFirearms,
    PoQuestionnaire,
    About
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {},
  props: {
    step: Step
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
