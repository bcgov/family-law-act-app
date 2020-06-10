<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts"
import surveyJson from "@/assets/POForm/protectionFromWhom.json";
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "protection-fromWhom",
  components: {
    PageBase
  },
  data() {
    var survey = new SurveyVue.Model(surveyJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    let applicantNameObject = this.$store.getters[
      "application/getApplicantName"
    ];
    
    if (applicantNameObject) {
      let applicantName =
        applicantNameObject.first +
        " " +
        applicantNameObject.middle +
        " " +
        applicantNameObject.last;
      survey.setVariable("ApplicantName", applicantName);
    }

    surveyEnv.setGlossaryMarkdown(survey);

    survey.onValueChanged.add((sender, options) => {
      if (options.name === "ApplicantNeedsProtection") {
        if (options.value === "y") {
          this.$store.dispatch("application/setPageActive", {
            currentStep: 2,
            currentPage: 3,
            active: true
          });
        } else {
          this.$store.dispatch("application/setPageActive", {
            currentStep: 2,
            currentPage: 3,
            active: false
          });
        }
      }
      if(options.name === "RespondentName") {
        this.$store.dispatch("application/setRespondentName", options.value);
      }
    });

    return {
      survey: survey
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    if (this.step.result.protectionWhomSurvey){
      this.survey.data = this.step.result.protectionWhomSurvey;
    }
  },
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
    this.$store.dispatch("application/updateStepResultData",{
      step: this.step,
      data:{protectionWhomSurvey: this.survey.data}
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
