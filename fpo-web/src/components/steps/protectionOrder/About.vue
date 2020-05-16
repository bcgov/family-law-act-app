<template>
  <page-base>
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "@/components/question-types.ts";
import surveyJson from "@/assets/POForm/aboutPO.json";
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "about",
  components: {
    PageBase
  },
  data() {
    var survey = new SurveyVue.Model(surveyJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    let order = this.$store.getters['application/getSelectedPOOrder'];
    if(order) {
      survey.setVariable("userPreferredService", order.orderType);
    }
    
    return {
      survey: survey,
      selectedPOOrder: null
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
    
    if (this.step.result.aboutPOSurvey){
      this.survey.data = this.step.result.aboutPOSurvey;
    }  
  },
  mounted() {
  
  },
  methods: {
  },
  props: {
    step: Step
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  },
  beforeDestroy() {
     this.$store.dispatch("application/updateStepResultData",{
      step: this.step,
      data:{aboutPOSurvey: this.survey.data}
    })}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
