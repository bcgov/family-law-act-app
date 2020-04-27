<template>
  <page-base v-bind:page="page">
    Please select the application(s) you would like to fill out.
    <br />
    <br />
    <input type="checkbox" v-on:change="onChange($event)" v-bind:checked="$store.getters['application/getNavigation'][1].active"> Family Law Matter</input>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "@/components/question-types.ts";
import orderTypesJson from "@/assets/survey-orderTypes.json";
import PageBase from "../PageBase.vue";
import { Page } from "../../../models/page";

export default {
  name: "PageGettingStarted",
  components: {
    PageBase
  },
  data() {
    return {
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

    var survey = new SurveyVue.Model(orderTypesJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.onComplete.add(survey => {
      this.onSurveyComplete(survey);
    });

    this.survey = survey;
  },
  methods: {
    onChange: function(event) {
      this.$store.dispatch("application/setStepActive", {currentStep: 1, active: event.target.checked});
    }
    
  },
  props: {
    page: Page
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
