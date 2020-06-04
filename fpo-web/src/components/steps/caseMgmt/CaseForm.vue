<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12">
        <h1>Case Management</h1>
        <p>
          Case management orders can be made by a judge at a family management conference, family case conference or other court appearance without application by a party,
          or you can apply for a case management order.
        </p>
        <p>
          Usually, an application for an order must be made with notice to all other parties so that they can decide if they
          want to participate in the application. There are circumstances when the court may make an order without notice and without you having to make an appearance.
          Some case management orders can be made without notice or a court appearance, and others require you to give notice.
        </p>
        <p>You can use this form to:</p>
        <ul>
          <li>apply for a case management order by consent without an appearance, or</li>
          <li>request an appearance to apply to the court for a case management order.</li>
        </ul>
        <br />
        <p>
          The
          <a
            href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms/prov-family-forms"
          >Application for Case Management Order Form H</a> can be used to apply to the court for one or more of the following case management orders:
        </p>
        <ul>
          <li>transferring the court file to another registry for one or more purposes;</li>
          <li>adding or removing a party to the proceeding;</li>
          <li>settling or correcting the terms of an order made under these rules;;</li>
          <li>setting a specified period of time for the filing and exchanging of information, including a financial statement in Form D [Financial Statement] of Appendix C;;</li>
          <li>correcting or amending a filed document, including the correction of a name or date of birth;</li>
          <li>requiring that a parentage test be taken under section 33 [parentage tests] of the Family Law Act;</li>
          <li>requiring that information be disclosed by a third party;</li>
          <li>adjourning a hearing or trial;</li>
          <li>requiring that a person who prepared a report under section 211 [orders respecting reports] of the Family Law Act attend a trial;</li>
          <li>respecting the conduct and management of a trial;</li>
          <li>changing, suspending or cancelling an order made in the absence of a party.</li>
        </ul>
        <p>
          The application must be made with notice to the other party. If the other party agrees to the order, you can apply by consent and you can choose to have the
          application reviewed by a judge with or without an appearance.
        </p>
        <p>
          The following case management orders can be requested without notice and without an appearance by filing an
          <a
            href="https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms/prov-family-forms"
          >Application for Case Management Order without Notice or Appearance in Form I</a>; however, Form H can also be used to apply for the same case management orders,
          if they are by consent or you want a hearing:
        </p>
        <ul>
          <li>allowing a person to attend a hearing or conference using electronic communication;</li>
          <li>shortening or extending a time limit set under these rules or a time limit set by an order or direction of a judge;</li>
          <li>allowing, waiving or modifying any service, delivery or notice requirement, including allowing an alternate method for the service of a document;</li>
          <li>requiring access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act;</li>
          <li>permitting any other means of proof instead of that required by these rules;</li>
          <li>waiving or varying any early resolution requirements;</li>
          <li>recognizing an extraprovincial order other than a support order;;</li>
          <li>permitting a party to be exempt from a requirement under these rules.</li>
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
  name: "case-form",
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
      data: { caseFormSurvey: null }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
