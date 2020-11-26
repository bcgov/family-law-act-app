<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts"
import surveyJson from "@/assets/POForm/background.json";
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "background",
  components: {
    PageBase
  },
  data() {
    var survey = new SurveyVue.Model(surveyJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    survey.setVariable("RespondentName", this.getFullName(this.$store.getters["application/getRespondentName"]));
    survey.setVariable("protectedPartyName", this.getFullName(this.$store.getters["application/getProtectedPartyName"]));
    survey.setVariable("protectedChildName", this.getFullName(this.$store.getters["application/getProtectedChildName"]));
    //survey.setValue("protectedPartyName", this.getFullName(this.$store.getters["application/getProtectedPartyName"]));
    //survey.setJsonObject({'protected':'ok'})
    //survey.data.setJsonObject({'protected':'ok'})
//console.log(survey.data)
    surveyEnv.setGlossaryMarkdown(survey);
    
    return {
      survey: survey
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    if (this.step.result.backgroundSurvey){
      //console.log(this.step.result)
      this.survey.data = this.step.result.backgroundSurvey;
    }  
  },
  methods: {
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },

    onNext() {
      if(!this.survey.isCurrentPageHasErrors) {
        this.$store.dispatch("application/gotoNextStepPage");
      }
    },

    getFullName(nameObject){
      if (nameObject) {
      return nameObject.first +
        " " +
        nameObject.middle +
        " " +
        nameObject.last;
      } else{
        return " "
      }
    },

    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step  | Object,
    childrenDetailsList: Array
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  },
  beforeDestroy() {
     this.$store.dispatch("application/updateStepResultData",{
      step: this.step,
      data:{backgroundSurvey: this.survey.data}
    })}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
