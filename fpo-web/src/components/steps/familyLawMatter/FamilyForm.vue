<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <h1>Family law matter</h1>
        <h4>You need to complete a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa712.pdf?forcedownload=true">Family Law Matter Claim Form C</a> if you need an order about a family law matter. The form is used after you have already met the early resolution requirements.</h4>
        <p>Use this form if you need:</p>
        <ul>
          <li>a new order about a family law matter, if you have never had an order or agreement about the family law matter</li>
          <li>to change or cancel all or part of an existing provincial court order or filed written agreement about a family law mattery</li>
          <li>to set aside or replace all or part of a written agreement about a family law matter that has not been filed</li>
        </ul>
        <p>Family law matters include: </p>
        <ul>
          <li>Parenting arrangements including 'parental responsibilities' and 'parenting time'</li>
          <li>Child support</li>
          <li>Contact with a child</li>
          <li>Guardianship of a child</li>
          <li>Spousal support</li>
        </ul>
        <p>
          This service does not currently support the completion of these forms. Please click on the link above to access a fillable PDF document which can then be printed and filed at the court registry.
        </p>
      </div>
    </div>
  </page-base>
</template>

<script>
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "family-form",
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
      data: { familyMatterSurvey: null }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
