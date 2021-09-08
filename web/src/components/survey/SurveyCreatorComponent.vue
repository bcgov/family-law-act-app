<template>
    <div id="surveyCreator-component">
        <b-container>
            <hr />
            <h2>Survey Creator Component</h2>
            <div id="surveyCreatorContainer" />
        </b-container>
    </div>
</template>

<script>

import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";


SurveyCreator.StylesManager.applyTheme("bootstrap");

export default {
    name: "SurveycreatorComponent",
    data() {
        return {};
    },
    mounted() {
        let options = { showEmbededSurveyTab: true };
        this.container = new SurveyCreator.SurveyCreator(
            "surveyCreatorContainer",
            options
        );
        this.container.saveSurveyFunc = function () {
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
