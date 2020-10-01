<template>
  <b-container class="container home-content" id="service-locator">
    <survey v-bind:survey="survey"></survey>
    <b-button
      @click="onSubmit"
      variant="primary"
      class="locator-button"
      >Next
    </b-button>
  </b-container>
</template>

<script>
import GlobalStore from "@/store";
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey-glossary.ts";
import surveyJson from "@/assets/service-locator.json";

export default {
  name: "ServiceLocator",
  data() {
    
    var survey = new SurveyVue.Model(surveyJson);
    survey.showNavigationButtons = false;
    surveyEnv.setGlossaryMarkdown(survey);

    return {
      survey: survey
    };
  },
  beforeCreate() {
    const Survey = SurveyVue;
    surveyEnv.setCss(Survey);    
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if(!this.survey.isCurrentPageHasErrors) 
      {
        if (this.survey.data.isVictoriaLawCourt == 'y') 
        {
          const store = GlobalStore.getInstance();
          this.userId = store.getters["application/getUserId"]
          // TODO: complete setup of POST body as application once API is in place
          const application = {"userId": this.userId}
          this.$store.dispatch("application/init");
          this.$store.dispatch("common/saveNewApplication", application);
          this.$router.push({ name: "flapp-surveys" });
        } else {
          location.replace(
            "https://family-protection-order-dev.pathfinder.gov.bc.ca/protection-order/"
          );
        }
      }
    },
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
  padding-bottom: 20px;
  padding-top: 2rem;
  max-width: 950px;
  color: black;
}
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 4rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.custom-form {
  margin-top: 1rem;
}
.locator-button {
  margin-top: 2.5rem;
  margin-left: 1rem;
  float: left;
  width: 8rem;
}
</style>
