<template>
  <page-base>
    <survey v-bind:survey="survey"></survey>
  </page-base>
</template>

<script>
import * as SurveyVue from "survey-vue";
import { addQuestionTypes } from "@/components/question-types.ts";
import surveyJson from "@/assets/survey-qualify.json";
import PageBase from "../PageBase.vue";
import { Step } from "../../../models/step";
import * as showdown from "showdown";

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

    var markdownConverter = new showdown.Converter({
      noHeaderId: true
    });
    survey.onTextMarkdown.add((sender, options) => {
      let str = markdownConverter.makeHtml(options.text);
      let showMissingTerms = true;

      let m = str.match(/^<p>(.*)<\/p>$/);
      str = str.substring(3);
      if (m) {
        str = m[1];
      }
      // // convert <code> into glossary tags: TODO
      str = str.replace(/<code>(.*?)<\/code>/g, (wholeMatch, m1) => {
        // if (this.hasTerm(m1)) {
        //   //       // note: m1 is already html format
        //   return (
        //     '<a href="#" class="glossary-link" data-glossary="' +
        //     m1 +
        //     '">' +
        //     m1 +
        //     "</a>"
        //   );
        // }
        if (showMissingTerms) {
          return "<code>" + m1 + "</code>";
        }
        return m1;
      });
      options.html = str;
    });

    survey.onValueChanged.add((sender, options) => {
      let pagesArr = [];
      if (options.name === "orderType") {
        this.removePages();
        let selectedOrder = options.value;
        this.$store.dispatch("application/setSelectedPOOrder", sender.data);
        pagesArr = [8, 9];
        if (selectedOrder !== "needPO" && selectedOrder !== "none") {
          this.togglePages(pagesArr, true);
        } else {
          this.togglePages(pagesArr, false);
        }
        if (selectedOrder === "needPO") {
          this.populatePagesForNeedPO(sender);
        }
      }
      if (options.name === "PORConfirmed") {
        pagesArr = [1, 2, 3, 5, 6, 7, 9];
        if (options.value.length !== 0) {
          this.togglePages(pagesArr, true);
        } else {
          this.togglePages(pagesArr, false);
        }
      }
    });

    return {
      survey: survey,
      markdownConverter: markdownConverter
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

    if (this.step.result.questionnaireSurvey) {
      this.survey.data = this.step.result.questionnaireSurvey;
    }

  },
  methods: {
    getTerm(term, formatted) {
      term = ("" + term).toLowerCase();
      let content = this.terms[term];
      if (formatted) content = this.formatHtml(content);
      return content;
    },

    hasTerm(term) {
      return this.getTerm(term) !== undefined;
    },

    formatHtml(content) {
      if (content !== undefined) {
        content = this.markdownConverter.makeHtml(content);
        content = content.replace(/<a ([^>]+)/g, function(a) {
          return a + ' target="_blank"';
        });
      }
      return content;
    },
    togglePages(pageArr, activeIndicator) {
      for (let i = 0; i < pageArr.length; i++) {
        this.$store.dispatch("application/setPageActive", {
          currentStep: 1,
          currentPage: pageArr[i],
          active: activeIndicator
        });
      }
    },
    removePages() {
      let allPageIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.togglePages(allPageIndex, false);
    },
    populatePagesForNeedPO(sender) {
      if (sender.data.PORConfirmed) {
        if (sender.data.PORConfirmed.length !== 0) {
          let pagesArr = [1, 2, 3, 5, 6, 7, 9];
          this.togglePages(pagesArr, true);
        }
      }
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
