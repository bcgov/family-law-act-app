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

const store = GlobalStore.getInstance();

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
          this.$store.dispatch("application/init");
          const userType = store.getters["application/getUserType"];      
          store.dispatch("application/setUserType", userType);
          const application = store.getters["application/getApplication"];
          this.$http.post(
            "/app/", application,
            {
              responseType: "json",
              headers: {
                "Content-Type": "application/json",
              }
            }
          )
          .then(res => {
            this.applicationId = res.data.app_id;  
            store.dispatch("application/setApplicationId", this.applicationId);
            this.error = "";
            this.$router.push({name: "flapp-surveys" }) 
          })
          .catch(err => {
            console.error(err);
            this.error = err;
          });
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
