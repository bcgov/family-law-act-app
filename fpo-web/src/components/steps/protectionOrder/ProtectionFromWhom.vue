<template>
  <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
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


    
    if (this.applicantName) {
      survey.setVariable("ApplicantName", this.applicantName);
    }

    surveyEnv.setGlossaryMarkdown(survey);

    survey.onValueChanged.add((sender, options) => {
      console.log(survey.data)
      console.log(options.name)
      if (options.name === "ApplicantNeedsProtection") {
        if (options.value === "y") {
          this.$store.dispatch("application/setProtectedPartyName", this.$store.getters["application/getApplicantName"]);
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

      if (options.name === "anotherAdultPO") {
        if (options.value === "y") {
          this.$store.dispatch("application/setProtectedChildName", "");
          this.$store.dispatch("application/setProtectedPartyName", survey.data.anotherAdultName);
        }else{
          if (survey.data.childPO === "y") {
            this.$store.dispatch("application/setProtectedChildName", survey.data.childName);
          }
          this.$store.dispatch("application/setProtectedPartyName", this.$store.getters["application/getApplicantName"]);
        }
      }
      if(options.name === "anotherAdultName") {
        this.$store.dispatch("application/setProtectedPartyName", options.value);
      }

      if(options.name === "RespondentName") {        
        this.$store.dispatch("application/setRespondentName", options.value);
      }      

      if (options.name === "childPO") {
        if (options.value === "y") {
          this.$store.dispatch("application/setProtectedChildName", survey.data.childName);
        }else{
          this.$store.dispatch("application/setProtectedChildName", "");
        }
      }
      if(options.name === "childName") {
        this.$store.dispatch("application/setProtectedChildName", options.value);
      }

      //console.log(survey.data.ApplicantNeedsProtection)
      //console.log(survey.data.anotherAdultPO)
      console.log(survey.data.childPO)
      console.log(survey.data.childName)
      if(survey.data.ApplicantNeedsProtection === 'n' && survey.data.anotherAdultPO === 'n' && survey.data.childPO === 'n'){
        this.disableNextButton = true;
      }else{
        this.disableNextButton = false;
      }

    });
    
    return {
      survey: survey,
      applicantName: "",
      disableNextButton: false
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
    let applicantNameObject = this.$store.getters["application/getApplicantName"];
    
    if (applicantNameObject) {
      this.applicantName =
        applicantNameObject.first +
        " " +
        applicantNameObject.middle +
        " " +
        applicantNameObject.last;
    }
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
      if(!this.survey.isCurrentPageHasErrors) {
        this.$store.dispatch("application/gotoNextStepPage");
      }
    },

    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step  | Object
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
