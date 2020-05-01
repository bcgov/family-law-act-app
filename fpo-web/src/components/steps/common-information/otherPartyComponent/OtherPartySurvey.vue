<template>
  <div>
    <survey v-bind:survey="survey"></survey>
    <div class="row">
      <div class="col-6">
        <button type="button" class="btn btn-primary" @click="goBack()">Back</button>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-primary" @click="saveParty()">Save Changes</button>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import opInfo from "@/assets/survey-opInfo.json";
import { addQuestionTypes } from "@/components/question-types.ts";

export default {
  name: "OtherParty-Survey",
  props: {
    editRowProp: Object
  },
  data() {
    var survey = new SurveyVue.Model(opInfo);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.onComplete.add((sender, options) => {
      this.populateOpModel(sender.data);
      let id = sender.getVariable("id");
      if (id === null || id === undefined) {
        this.$emit("surveyData", this.op);
      } else {
        this.$emit("editedData", { ...this.op, id });
        id = null;
      }
    });
    if (this.editRowProp != null) {
      this.populateFormWithPreExistingValues(this.editRowProp, survey);
    }
    return {
      op: {
        name: {
          first: "",
          middle: "",
          last: ""
        },
        knowDob: "",
        dob: "",
        opRelation: "",
        livedTogether: "",
        dateOfLivedTogether: "",
        married: "",
        dateOfMarriage: "",
        separated: "",
        dateSeparated: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          postcode: ""
        },
        contactInfo: {
          phone: "",
          fax: "",
          email: ""
        }
      },
      survey: survey
    };
  },
  created() {
    const Survey = SurveyVue;
    addQuestionTypes(Survey);
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.page.description = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.page.title = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic";
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
    Survey.StylesManager.applyTheme("bootstrap");
  },
  methods: {
    goBack() {
      this.$emit("showTable", true);
    },
    saveParty() {
      this.survey.completeLastPage();
    },
    populateOpModel(opData) {
      this.op.name.first = opData.OtherPartyName.first;
      this.op.name.middle = opData.OtherPartyName.middle;
      this.op.name.last = opData.OtherPartyName.last;

      this.op.knowDob = opData.doYouKnowDOB;
      this.op.dob = opData.otherPartyDOB;
      this.op.opRelation = opData.relationWithOtherParty;
      this.op.livedTogether = opData.isMarriedWithOtherParty;
      this.op.dateOfLivedTogether = opData.dateOfMarriageLikeWithOtherParty;
      this.op.married = opData.isLegallyMarried;
      this.op.dateOfMarriage = opData.dateOfMarriage;
      this.op.separated = opData.isSeperatedOtherParty;
      this.op.dateSeparated = opData.dateOfSeparation;

      this.op.address.street = opData.otherPartyAddress.street;
      this.op.address.city = opData.otherPartyAddress.city;
      this.op.address.state = opData.otherPartyAddress.state;
      this.op.address.country = opData.otherPartyAddress.country;
      this.op.address.postcode = opData.otherPartyAddress.postcode;

      this.op.contactInfo.phone = opData.otherPartyContact.phone;
      this.op.contactInfo.fax = opData.otherPartyContact.fax;
      this.op.contactInfo.email = opData.otherPartyContact.email;
    },
    populateFormWithPreExistingValues(editRowProp, survey) {
      survey.data = {
        OtherPartyName: { first: editRowProp.name.first, middle: editRowProp.name.middle, last: editRowProp.name.last },
        otherPartyAddress: {
          street: editRowProp.address.street,
          city: editRowProp.address.city,
          state: editRowProp.address.state,
          country: editRowProp.address.country,
          postcode: editRowProp.address.postcode 
          },
          otherPartyContact: {
          phone: editRowProp.contactInfo.phone,
          fax: editRowProp.contactInfo.fax,
          email: editRowProp.contactInfo.email
        }
      };
      survey.setValue("doYouKnowDOB", editRowProp.knowDob);
      survey.setValue("otherPartyDOB", editRowProp.dob);
      survey.setValue("relationWithOtherParty", editRowProp.opRelation);
      survey.setValue("isMarriedWithOtherParty", editRowProp.livedTogether);
      survey.setValue("dateOfMarriageLikeWithOtherParty", editRowProp.dateOfLivedTogether);
      survey.setValue("isLegallyMarried", editRowProp.married);
      survey.setValue("dateOfMarriage", editRowProp.dateOfMarriage);
      survey.setValue("isSeperatedOtherParty", editRowProp.isSeperatedOtherParty);
      survey.setValue("dateOfSeparation", editRowProp.dateOfSeparation);
      survey.setVariable("id", editRowProp.id);
    }
  }
};
</script>
