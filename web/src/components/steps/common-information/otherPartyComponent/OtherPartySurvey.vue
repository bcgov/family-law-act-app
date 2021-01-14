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
import opInfo from "./forms/survey-opInfo.json";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

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
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
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

      if(opData.otherPartyAddress)
      {
        this.op.address.street = opData.otherPartyAddress.street;
        this.op.address.city = opData.otherPartyAddress.city;
        this.op.address.state = opData.otherPartyAddress.state;
        this.op.address.country = opData.otherPartyAddress.country;
        this.op.address.postcode = opData.otherPartyAddress.postcode;
      }
      if(opData.otherPartyContact)
      {
        this.op.contactInfo.phone = opData.otherPartyContact.phone;
        this.op.contactInfo.fax = opData.otherPartyContact.fax;
        this.op.contactInfo.email = opData.otherPartyContact.email;
      }
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
