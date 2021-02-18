<template>
    <b-container class="container home-content" id="service-locator">
        <survey v-bind:survey="survey"></survey>
        <b-button
            @click="onSubmit"
            variant="primary"
            class="locator-button"
            >Next
        </b-button>

        <b-modal size="xl" v-model="showDisclaimer" header-class="bg-white" no-close-on-backdrop hide-header-close>
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Disclaimer</h1> 
            </template>
            <h3>Warranty Disclaimer </h3>
            <p>This information is provided as a public service by the Government of British Columbia, Box 9411, Victoria, British Columbia, Canada V8W 9V1. </p>
            <p>This website and all of the information it contains are provided "as is" without warranty of any kind, whether express or implied. All implied warranties, including, without limitation, implied warranties of merchantability, fitness for a particular purpose, and non-infringement, are hereby expressly disclaimed. Links and references to any other websites are provided for information only and listing shall not be taken as endorsement of any kind. The Government of British Columbia is not responsible for the content or reliability of the linked websites and does not endorse the content, products, services or views expressed within them. </p>
            <h3>Limitation of Liabilities </h3>
            <p> Under no circumstances will the Government of British Columbia be liable to any person or business entity for any direct, indirect, special, incidental, consequential, or other damages based on any use of this website or any other website to which this site is linked, including, without limitation, any lost profits, business interruption, or loss of programs or information, even if the Government of British Columbia has been specifically advised of the possibility of such damages.</p>
            <template v-slot:modal-footer>
                <b-button variant="primary" style="font-size:22px;font-weight:bold;" size="lg" @click="showDisclaimer=false">Accept</b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import store from "@/store";

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/service-locator.json";

@Component
export default class ServiceLocator extends Vue {

    error = "";
    applicationId = 0;
    survey = new SurveyVue.Model(surveyJson);
    showDisclaimer = true;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);    
    }

    mounted(){
        this.showDisclaimer = true;
        this.initializeSurvey();
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
  
    public onSubmit(evt) {
        evt.preventDefault();      

        if(!this.survey.isCurrentPageHasErrors) 
        {
            if (this.survey.data.isVictoriaLawCourt == 'y') 
            {
                this.saveUserLocation()
            } else {
                // const webFpoHref = process.env.WEB_FPO_URL;
                // console.log(webFpoHref)
                //location.replace(webFpoHref);
                location.replace("https://family-protection-order-dev.pathfinder.gov.bc.ca/protection-order/");
            }
        }
    }

    public saveUserLocation(){
        const url = "/user-info/"
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }
        this.$http.put(url, {location:this.survey.data.ServiceLocation}, header)            
        .then(() => {        
            this.error = "";
            this.saveApplication()
        }, err => {
            console.error(err);
            this.error = err;
        });
    }

    public saveApplication(){

        this.$store.commit("Application/init");
        const userType = store.state.Application.userType;      
        store.commit("Application/setUserType", userType);
        const application = store.state.Application;
        //console.log(store.state.Application)
        const url = "/app/"
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }
        this.$http.post(url, application, header)
        .then(res => {
            this.applicationId = res.data.app_id;  
            store.commit("Application/setApplicationId", this.applicationId);
            this.error = "";
            this.$router.push({name: "flapp-surveys" }) 
        }, err => {
            console.error(err);
            this.error = err;
        });
    }

    beforeDestroy() {
        //console.log(this.step)
        //console.log(this.survey.data)
        this.$store.commit("Application/setApplicationLocation", this.survey.data.ServiceLocation);
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
