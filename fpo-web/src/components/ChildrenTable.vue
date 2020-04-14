<template>
  <div class="survey-container contentcontainer codecontainer">
    <b-container class="fill-body">
      <br />
      <div v-if="!isAdding">
        <h2>List of Children</h2>
        <table class="table" border="1">
          <thead>
            <tr>
              <th v-for="(value, index) in columnJson" :key="index">
                {{ value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, itemIndex) in items" :key="itemIndex">
              <td
                v-for="(value, key, columnIndex) in columnJson"
                :key="columnIndex"
              >
                {{ item[key] }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="survey-nav">
          <div class="survey-nav-right">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              v-on:click="onInitiateAddChild"
            >
              <span class="fa fa-plus btn-icon-left"></span> Add a child
            </button>
          </div>
        </div>
      </div>

      <div v-if="isAdding">
        <survey v-bind:survey="survey"></survey>

        <br />
        <div class="survey-nav">
          <div class="survey-nav-right">
            <button
              v-on:click="onCompleteAddChild()"
              class="btn btn-success btn-lg"
            >
              <span class="fa fa-check-circle btn-icon-left"></span> Add
            </button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "./question-types.ts";
import childJson from "../assets/child-details.json";

export default {
  name: "ChildrenTable",
  data() {
    return {
      items: [],
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
      this.items.push({
        id: this.items.length + 1,
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
  props: {},
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/survey";
</style>
