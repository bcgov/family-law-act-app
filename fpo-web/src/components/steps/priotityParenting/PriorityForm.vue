<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <h1>Priority parenting matter</h1>
        <h4>
          You need to complete an Application for
          <a
            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa722.pdf?forcedownload=true"
          >Priority Parenting Matter in Form M</a> if you need an order about a priority parenting matter,
          including a new order or to change or cancel an existing order.
        </h4>
        <p>Priority parenting matters are usually:</p>
        <ul>
          <li>decisions about a child or children, where all guardians are not in agreement, and</li>
          <li>a court order is needed because something must be done quickly</li>
        </ul>
        <p>Priority parenting matters include the following:</p>
        <ul>
          <li>giving, refusing or withdrawing consent, by a guardian, to medical, dental or other health-related treatments for a child, if delay will result in risk to the child’s health;</li>
          <li>
            applying, by a guardian, for
            <ul>
              <li>a passport, licence, permit, benefit, privilege or other thing for a child, if delay will result in risk of harm to the child’s physical, psychological or emotional safety, security or well-being, or</li>
              <li>travel with a child or participation by a child in an activity if consent to the travel or activity is required and is alleged to have been wrongfully denied;</li>
            </ul>
          </li>
          <li>
            relating to change in location of a child’s residence, or a guardian’s plan to change the location of a child’s residence, if
            <ul>
              <li>no written agreement or order respecting parenting arrangements applies in respect of the child, and</li>
              <li>he change of residence can reasonably be expected to have a significant impact on the child’s relationship with another guardian;</li>
            </ul>
          </li>
          <li>relating to the removal of a child under section 64 [orders to prevent removal of child] of the Family Law Act;</li>
          <li>determining matters relating to interjurisdictional issues under section 74 (2) (c) [determining whether to act under Part 4 – Care of and Time with Children] of the Family Law Act;</li>
          <li>relating to the alleged wrongful removal of a child under section 77 (2) [wrongful removal of child] of the Family Law Act;</li>
          <li>relating to the return of a child alleged to have been wrongfully removed or retained under the Convention on the Civil Aspects of International Child Abduction signed at the Hague on October 25, 1980;</li>
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
  created() {},
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
