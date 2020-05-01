<template>
  <div>
    <survey v-bind:survey="survey"></survey>
    <div class="row">
      <div class="col-6">
        <button type="button" class="btn btn-primary" @click="goBack()">Back</button>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-primary" @click="saveChild()">Save Changes</button>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import childInfo from "@/assets/survey-childInfo.json";
import { addQuestionTypes } from "@/components/question-types.ts";

export default {
  name: "Children-Survey",
  props: {
    editRowProp: Object
  },
  data() {
    var survey = new SurveyVue.Model(childInfo);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.onComplete.add((sender, options) => {
      this.populateChildModel(sender.data);
      let id = sender.getVariable("id");
      if (id === null || id === undefined) {
        this.$emit("surveyData", this.child);
      } else {
        this.$emit("editedData", { ...this.child, id });
        id = null;
      }
    });
    if (this.editRowProp != null) {
      this.populateFormWithPreExistingValues(this.editRowProp, survey);
    }
    return {
      child: {
        name: {
          first: "",
          middle: "",
          last: ""
        },
        dob: "",
        relation: "",
        opRelation: "",
        currentLiving: "",
        ack: "",
        additionalInfo: "",
        additionalInfoDetails: ""
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
    saveChild() {
      this.survey.completeLastPage();
    },
    populateChildModel(childData) {
      this.child.name.first = childData.childName.first;
      this.child.name.middle = childData.childName.middle;
      this.child.name.last = childData.childName.last;
      this.child.dob = childData.childDateOfBirth;
      this.child.relation = childData.relationToChild;
      this.child.opRelation = childData.childRelationToOtherParty;
      this.child.currentLiving = childData.childCurrentlyLivingWith;
      this.child.ack = childData.childInfoAckknowledge;
      this.child.additionalInfo = childData.childAdditionalInfo;
      this.child.additionalInfoDetails = childData.additionInfoDetails;
    },
    populateFormWithPreExistingValues(editRowProp, survey) {
      survey.data = {
        childName: { first: editRowProp.name.first, middle: editRowProp.name.middle, last: editRowProp.name.last }
      };
      survey.setValue("childDateOfBirth", editRowProp.dob);
      survey.setValue("relationToChild", editRowProp.relation);
      survey.setValue("childRelationToOtherParty", editRowProp.opRelation);
      survey.setValue("childCurrentlyLivingWith", editRowProp.currentLiving);
      survey.setValue("childInfoAckknowledge", editRowProp.ack);
      survey.setValue("childAdditionalInfo", editRowProp.additionalInfo);
      survey.setValue("additionInfoDetails", editRowProp.additionalInfoDetails);
      survey.setVariable("id", editRowProp.id);
    }
  }
};
</script>
