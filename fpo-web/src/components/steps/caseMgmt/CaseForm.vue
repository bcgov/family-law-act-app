<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <div class="row">
      <div class="col-md-12 order-heading">
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
            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa717.pdf?forcedownload=true"
          >Application for Case Management Order Form H</a> can be used to apply to the court for one or more of the following case management orders:
        </p>
        <ul>
          <li>transferring a court file to another registry for all purposes or specific purposes;</li>
          <li>relating to the management of a court record, file or document, including access to a court file;</li>
          <li>correcting or amending a filed document, including the correction of a name or date of birth;</li>
          <li>setting a specified period for the filing and exchanging of information or evidence, including a financial statement in Form D [Financial Statement];</li>
          <li>specifying or requiring information that must be disclosed by a person who is not a party to a case;</li>
          <li>requiring that a parentage test be taken under section 33 [parentage tests] of the Family Law Act;</li>
          <li>requiring access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act; </li>
          <li>recognizing an extraprovincial order other than a support order;</li>
          <li>waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for the service of a document;</li>
          <li>waiving or modifying any other requirement under these rules, including a time limit set under these rules or a time limit set by an order or direction of a judge, even after the time limit has expired;</li>
          <li>allowing a person to attend a conference or hearing using electronic communication, including by telephone or video;</li>
          <li>adjourning a court appearance;</li>
          <li>respecting the conduct of a party or management of a case, including pre-trial and trial process and evidence disclosure</li>
          <li>relating to a report under section 211 [orders respecting reports] of the Family Law Act, including requiring that a person who prepared the report attend a trial as a witness;</li>
          <li>adding or removing a party to a case, including leave to intervene under section 204 (2) Act [intervention by Attorney General or other person] of the Family Law Act;</li>
          <li>respecting the appointment of a lawyer to represent
            <ul>
              <li>the interests of a child, or</li>
              <li>a party;</li>
            </ul>
          </li>
          <li>settling or correcting the terms of an order made under these rules;</li>
          <li>cancelling a subpoena.</li>
        </ul>
        <p>
          The application must be made with notice to the other party. If the other party agrees to the order, you can apply by consent and you can choose to have the
          application reviewed by a judge with or without an appearance.
        </p>
        <p>
          The following case management orders can be requested without notice and without an appearance by filing an
          <a
            href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa718.pdf?forcedownload=true"
          >Application for Case Management Order without Notice or Appearance in Form I</a>; however, Form H can also be used to apply for the same case management orders,
          if they are by consent or you want a hearing:
        </p>
        <ul>
          <li>allowing a person to attend a conference or hearing using electronic communication, including by telephone or video;</li>
          <li>waiving or modifying any requirement related to service or giving notice to a person, including allowing an alternative method for the service of a document;</li>
          <li>waiving or modifying any other requirement under these rules, including a time limit set under these rules or a time limit set by an order or direction of a judge, even after the time limit has expired;</li>
          <li>requiring access to information in accordance with section 242 [orders respecting searchable information] of the Family Law Act; </li>
          <li>recognizing an extraprovincial order other than a support order.</li>
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
