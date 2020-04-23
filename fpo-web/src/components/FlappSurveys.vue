<template>
  <div class="fill-body" id="flapp-surveys">
    <main class="app-content">
      <navigation-sidebar />
      <!-- <survey-selector v-show="getCurrentStepIndex() != 1" /> -->
      <!-- <step-base v-show="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></step-base> -->
      <step-demo-start v-show="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></step-demo-start>
      <step-demo-flm v-show="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></step-demo-flm>

      <print-page v-show="$store.getters.allCompleted" />
      <!--SurveyCreatorComponent /-->
    </main>
  </div>
</template>

<script>
import NavigationSidebar from "./NavigationSidebar.vue";
import SurveySelector from "./SurveySelector.vue";
//import SurveyCreatorComponent from "./components/SurveyCreatorComponent.vue";
import PrintPage from "./PrintPage.vue";

import fpoJson from "../assets/survey-fpo.json";
//import fpoJson from "../assets/survey-primary-orig.json";
import flmJson from "../assets/survey-flm.json";
import parentingJson from "../assets/survey-parenting.json";
import childJson from "../assets/child-details.json";

import StepDemoFlm from "./steps/demo-flm/StepDemoFlm.vue";
import StepDemoStart from "./steps/demo-start/StepDemoStart.vue";
import StepBase from "./steps/StepBase.vue";

export default {
  name: "FlappSurveys",
  components: {
    NavigationSidebar,
    SurveySelector,
    StepDemoFlm,
    StepDemoStart,
    StepBase,
    PrintPage
  },
  computed: {},
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("application/init");

    var startChoiceArray = [
      { value: 1, text: "Step 2 : " + fpoJson.title },
      { value: 2, text: "Step 3 : " + flmJson.title },
      { value: 3, text: "Step 4 : " + childJson.title }
    ];

    var formIndexArray = [];

    var startJson = {
      pages: [
        {
          name: "page1",
          elements: [
            {
              type: "panel",
              name: "ApplicantPanel",
              elements: [
                {
                  type: "checkbox",
                  name: "forms",
                  title: "Which forms apply to you",
                  choices: startChoiceArray
                }
              ]
            }
          ],
          title: "Select your forms"
        }
      ],
      title: "Start Your Application"
    };

    startChoiceArray.forEach(element => {
      formIndexArray.push(element.value);
    });

    var startJsonData = { forms: formIndexArray };

    var surveyArray = [
      {
        json: startJson,
        data: startJsonData,
        icon: "fa-headphones",
        pageIndex: 0,
        selected: true,
        completed: false
      },
      {
        json: fpoJson,
        data: {},
        icon: "fa-users",
        pageIndex: 0,
        selected: true,
        completed: false
      },
      {
        json: flmJson,
        data: {},
        icon: "fa-anchor",
        pageIndex: 0,
        selected: true,
        completed: false
      },
      {
        json: childJson,
        data: {},
        icon: "fa-child",
        pageIndex: 0,
        selected: true,
        completed: false
      }
    ];

    //TODO - refactor
    // this.$store.dispatch("setSurveyArray", surveyArray);
    // this.$store.dispatch("setSurveyIndex", 0);
  },
  methods: {
    getCurrentStepIndex() {
      return this.$store.getters["application/getCurrentStep"];
    },

    getStep(stepIndex) {
      var step = this.$store.getters["application/getNavigation"][stepIndex];

      return step;
    }
  }
};
</script>
