<template>
  <div id="surveyCreatorComponent">
    <b-container>
      <hr />
      <h2>Survey Creator Component</h2>
      <div id="surveyCreatorContainer" />
      <!--div id="surveyResult"></div-->
    </b-container>
  </div>
</template>

<script>
//import * as SurveyVue from "survey-vue";
import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";

//import "inputmask/dist/inputmask/phone-codes/phone.js";

SurveyCreator.StylesManager.applyTheme("bootstrap");

export default {
  name: "SurveyCreatorComponent",
  data() {
    return {};
  },
  mounted() {
    let options = { showEmbededSurveyTab: true };
    this.container = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.container.saveSurveyFunc = function() {
      //console.log(JSON.stringify(this.text));
    };
  }
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
