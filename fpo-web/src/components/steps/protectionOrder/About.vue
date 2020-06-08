<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts"
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

    let order = this.step.result.selectedPOOrder;
    if(order) {
      survey.setVariable("userPreferredService", order.orderType);
    }
    
    return {
      survey: survey,
      selectedPOOrder: null
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    if (this.step.result.aboutPOSurvey){
      this.survey.data = this.step.result.aboutPOSurvey;
    }  
  },
  mounted() {
  
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
