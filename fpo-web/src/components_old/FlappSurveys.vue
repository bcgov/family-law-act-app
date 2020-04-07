<template>
  <div class="fill-body" id="flappsurveys">
    <NavigationTopbar />
    <main class="app-content">
      <NavigationSidebar />
      <SurveySelector v-show="!$store.getters.allCompleted" />
      <Print v-show="$store.getters.allCompleted" />
      <!--SurveyCreatorComponent /-->
    </main>
    <NavigationFooter id="footer" />
  </div>
</template>

<script>
import NavigationTopbar from "./NavigationTopbar.vue";
import NavigationSidebar from "./NavigationSidebar.vue";
import SurveySelector from "./SurveySelector.vue";
//import SurveyCreatorComponent from "./components/SurveyCreatorComponent.vue";
import Print from "./Print.vue";
import NavigationFooter from "./NavigationFooter.vue";

import fpoJson from "../assets/survey-fpo.json";
//import fpoJson from "../assets/survey-primary-orig.json";
import flmJson from "../assets/survey-flm.json";
import parentingJson from "../assets/survey-parenting.json";

export default {
  name: "FlappSurveys",
  components: {
    NavigationTopbar,
    NavigationFooter,
    NavigationSidebar,
    SurveySelector,
    Print
  },
  computed: {},
  data() {
    return {};
  },
  beforeCreate() {
    var startChoiceArray = [
      { value: 1, text: "Step 2 : " + fpoJson.title },
      { value: 2, text: "Step 3 : " + flmJson.title },
      { value: 3, text: "Step 4 : " + parentingJson.title }
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
        json: parentingJson,
        data: {},
        icon: "fa-child",
        pageIndex: 0,
        selected: true,
        completed: false
      }
    ];

    this.$store.dispatch("setSurveyArray", surveyArray);
    this.$store.dispatch("setSurveyIndex", 0);
  },
  methods: {}
};
</script>
