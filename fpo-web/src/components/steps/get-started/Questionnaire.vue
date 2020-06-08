<template>
  <page-base v-bind:disableNext="isDisableNext()" v-bind:disableNextText="getDisableNextText()" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import surveyJson from "@/assets/survey-qualify.json";
import * as surveyEnv from "@/components/survey-glossary.ts"
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";

export default {
  name: "po-questionnaire",
  components: {
    PageBase
  },
  data() {
    var survey = new SurveyVue.Model(surveyJson);

    survey.commentPrefix = "Comment";
    survey.showQuestionNumbers = "off";
    survey.showNavigationButtons = false;

    surveyEnv.setGlossaryMarkdown(survey);

    survey.onValueChanged.add((sender, options) => {
      let pagesArr = [];
      if (options.name === "orderType") {
        this.removePages();
        let selectedOrder = options.value;
        this.$store.dispatch("application/updateStepResultData", {
          step: this.step,
          data: {selectedPOOrder: sender.data}
        });
        pagesArr = [7, 8];
        if (selectedOrder !== "needPO" && selectedOrder !== "none") {
          this.togglePages(pagesArr, true);
          this.toggleOtherPartyPage(true);
        } else {
          this.togglePages(pagesArr, false);
          this.toggleOtherPartyPage(false);
        }
        if (selectedOrder === "needPO") {
          this.populatePagesForNeedPO(sender);
        }
      }
      if (options.name === "PORConfirmed") {
        pagesArr = [0, 1, 2, 4, 5, 6, 8];
        if (options.value.length !== 0) {
          this.togglePages(pagesArr, true);
        } else {
          this.togglePages(pagesArr, false);
        }
      }
    });

    return {
      survey: survey,
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);
  },
  created() {
    if (this.step.result.questionnaireSurvey) {
      this.survey.data = this.step.result.questionnaireSurvey;
    }

  },
  methods: {
    activateStep(stepActive) {
      this.$store.dispatch("application/setStepActive", {
        currentStep: 2,
        active: stepActive
      });
    },
    togglePages(pageArr, activeIndicator) {
      this.activateStep(activeIndicator);
      for (let i = 0; i < pageArr.length; i++) {
        this.$store.dispatch("application/setPageActive", {
          currentStep: 2,
          currentPage: pageArr[i],
          active: activeIndicator
        });
      }
    },
    toggleOtherPartyPage(activeIndicator) {
      this.$store.dispatch("application/setPageActive", {
          currentStep: 1,
          currentPage: 1,
          active: activeIndicator
        });
    },
    removePages() {
      let allPageIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.togglePages(allPageIndex, false);
    },
    populatePagesForNeedPO(sender) {
      if (sender.data.PORConfirmed) {
        if (sender.data.PORConfirmed.length !== 0) {
          let pagesArr = [0, 1, 2, 4, 5, 6, 8];
          this.togglePages(pagesArr, true);
        }
      }
    },
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },
    onNext() {
      this.$store.dispatch("application/gotoNextStepPage");
    },
    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    },
    isDisableNext() {
      // demo
      return Object.keys(this.survey.data).length === 0;
    },
    getDisableNextText() {
      // demo
      return "You will need to answer the question above to continue";
    }
  },
  props: {
    step : Step
  },

  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("application/updateStepResultData", {
        step: this.step,
        data: {questionnaireSurvey: this.survey.data}
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
