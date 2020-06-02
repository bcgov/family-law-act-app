<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12">
        <h1>Priority parenting matter</h1>
        <h4>
          You need to complete an Application for Extraordinary Parenting Matter in Form M if you need an order about an extraordinary parenting matter,
          including a new order or to change or cancel an existing order.
        </h4>
        <p>Extraordinary parenting matters are usually:</p>
        <ul>
          <li>decisions about a child or children, where all guardians are not in agreement, and</li>
          <li>a court order is needed because something must be done quickly</li>
        </ul>
        <p>Extraordinary parenting matters include the following:</p>
        <ul>
          <li>a guardian giving, refusing or withdrawing consent to health treatments for a child, that if delayed will result in risk to the health of the child</li>
          <li>a guardian applying for a passport, licence, permit, benefit, privilege or other thing for the child, if delay will result in risk of harm to the child's physical, psychological or emotional safety, security or well-being</li>
          <li>preventing the removal of a child under section 64 [orders to prevent removal of child] of the Family Law Act</li>
          <li>
            determining matters relating to interjurisdictional issues under section 74 (2) (c) [determining whether to act under Part 5 Care of and Time with Children]
            of the Family Law Act
          </li>
          <li>preventing the wrongful removal of a child under section 77 (2) [wrongful removal of child] of the Family Law Act</li>
          <li>seeking an extraordinary remedy under section 231 (4) or (5) [extraordinary remedies] of the Family Law Act</li>
        </ul>
        <p>
          This service does not currently support the completion of these forms. Please click on the link above to access a fillable PDF document which can then be printed
          and filed at the court registry.
        </p>
      </div>
    </div>
  </page-base>
</template>

<script>
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "priority-form",
  components: {
    PageBase
  },

  data() {
    return {};
  },
  created() {
  },
  methods: {
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },
    onNext() {
      this.$store.dispatch("application/gotoNextStepPage");
    },
    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step
  },
  beforeDestroy() {
    this.$store.dispatch("application/updateStepResultData", {
      step: this.step,
      data: { priorityParentingSurvey: null }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
