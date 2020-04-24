<template>
  <page-base
    v-bind:page="page"
  >Tell use about the person(s) who play a parental role in your child(ren)'s day-to-day life.</page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "@/components/question-types.ts";
import childJson from "@/assets/child-details.json";
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageChildrenDetails",
  components: {
    PageBase
  },
  data() {
    return {
      columnJson: {
        id: "ID",
        first_name: "First Name",
        last_name: "Last Name",
        relationship: "Relationship"
      },
      isAdding: false,
      survey: Object
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

    var survey = new SurveyVue.Model(childJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.onComplete.add(survey => {
      this.onSurveyComplete(survey);
    });

    this.survey = survey;
  },
  methods: {
    onInitiateAddChild: function() {
      this.isAdding = true;
      console.log("Inside onAddChild " + this.isAdding);
    },

    onCompleteAddChild: function() {
      this.survey.completeLastPage();
    },

    onSurveyComplete(survey) {
      this.childrenDetailsList.push({
        id: this.childrenDetailsList.length + 1,
        first_name: survey.data.childName.first,
        last_name: survey.data.childName.last,
        relationship: survey.data.relationToChild,
        data: survey.data
      });

      this.isAdding = false;

      // set the state to running, clear the data and go to the first page
      // https://github.com/surveyjs/survey-library/issues/897
      survey.clear(true, true);
    }
  },
  props: {
    page: Page,
    childrenDetailsList: Array
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
