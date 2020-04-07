<template>
  <div class="survey-container contentcontainer codecontainer">
    <b-container class="fill-body">
      <survey v-bind:survey="survey"></survey>

      <br />
      <div class="survey-nav">
        <div
          class="survey-nav-left"
          v-if="!isFirstPage()"
          v-on:click="prevPage()"
        >
          <button class="btn btn-primary btn-lg">
            <span class="fa fa-arrow-circle-left btn-icon-left"></span> Back
          </button>
        </div>
        <div class="survey-nav-right">
          <button
            class="btn btn-primary btn-lg"
            v-if="!isLastSurveyAndPage()"
            v-on:click="nextPage()"
          >
            Next <span class="fa fa-arrow-circle-right btn-icon-right"></span>
          </button>
          <button
            class="btn btn-success btn-lg"
            v-if="isLastSurveyAndPage()"
            v-on:click="nextPage()"
          >
            <span class="fa fa-check-circle btn-icon-left"></span> Complete
          </button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "./question-types.ts";

export default {
  name: "SurveyComponent",
  data() {
    var survey = new SurveyVue.Model(
      this.$store.getters.surveyArray[this.surveyIndex].json
    );

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.data = this.$store.getters.surveyArray[this.surveyIndex].data;

    // place the surveyIndex inside the survey object
    survey.custom_surveyIndex = this.surveyIndex;

    survey.onCurrentPageChanged.add((survey, options) => {
      this.onCurrentPageChanged(
        survey.custom_surveyIndex,
        survey.currentPageNo
      );
    });

    survey.onValueChanged.add((survey, options) => {
      if (survey.custom_surveyIndex == 0) {
        // in the getting started form
        this.onStartPageChanged(survey.data.forms);
      } else {
        // in a survey form
        this.onSurveyDataChanged(survey.custom_surveyIndex, survey.data);
      }
    });

    survey.onComplete.add((survey, options) => {
      this.onSurveyComplete(survey.custom_surveyIndex, survey);
    });

    survey.completeText = "Next Form";

    return {
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
    isFirstPage: function() {
      return this.survey.isFirstPage;
    },
    isLastPage: function() {
      return this.survey.isLastPage;
    },
    isLastSurveyAndPage: function() {
      if (!this.isLastPage()) {
        return false;
      } else {
        var surveyArray = this.$store.getters.surveyArray;
        var lastSurveyIndex = 0;

        var i;
        for (i = surveyArray.length - 1; i >= 0; i--) {
          if (surveyArray[i].selected) {
            // found the last selected survey
            lastSurveyIndex = i;
            break;
          }
        }

        return this.surveyIndex == lastSurveyIndex;
      }
    },
    prevPage: function() {
      if (!this.isFirstPage()) {
        this.survey.prevPage();
      }
    },
    nextPage: function() {
      if (this.isLastPage()) {
        this.survey.completeLastPage();
      } else {
        this.survey.nextPage();
      }
    },
    onCurrentPageChanged: function(surveyIndex, pageIndex) {
      this.$store.dispatch("setSurveyPageIndex", {
        surveyIndex,
        pageIndex
      });
    },
    onStartPageChanged: function(forms) {
      if (forms == null) {
        forms = [];
      }

      var i;
      for (i = 1; i < this.$store.getters.surveyArray.length; i++) {
        this.$store.dispatch("setSurveySelected", {
          surveyIndex: i,
          surveySelected: forms.includes(i)
        });
      }
    },
    onSurveyDataChanged(surveyIndex, surveyData) {
      if (this.$store.getters.surveyArray[surveyIndex].completed === true) {
        this.$store.dispatch("setSurveyIncomplete", surveyIndex);
      } else {
        this.$store.dispatch("setSurveyData", {
          surveyIndex: surveyIndex,
          surveyData: surveyData
        });
      }
    },
    onSurveyComplete(surveyIndex, survey) {
      if (surveyIndex < this.$store.getters.surveyArray.length) {
        // mark the survey as completed
        this.$store.dispatch("setSurveyCompleted", surveyIndex);

        // set the state to running, keep the data and go to the first page
        // https://github.com/surveyjs/survey-library/issues/897
        survey.clear(false, true);

        // automatically set the surveyIndex to the next selected survey
        var i;
        for (
          i = surveyIndex + 1;
          i < this.$store.getters.surveyArray.length;
          i++
        ) {
          var surveyElement = this.$store.getters.surveyArray[i];

          if (surveyElement.selected) {
            this.$store.dispatch("setSurveyIndex", i);
            break;
          }
        }
      } else {
        // this is the last survey
        // TODO: enable the print button
      }
    }
  },
  props: {
    surveyIndex: Number,
    pageIndex: Number
  },
  watch: {
    pageIndex: function(newVal, oldVall) {
      this.survey.currentPageNo = newVal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../styles/survey";
</style>
