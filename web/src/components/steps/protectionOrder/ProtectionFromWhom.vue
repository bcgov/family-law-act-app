<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

import surveyJson from "./Forms/protectionFromWhom.json";
import PageBase from "../PageBase.vue";
import { Step } from "@/types/models/step";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ProtectionFromWhom extends Vue {
    
    @Prop({required: true})
    step!: Step;
    
    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void


    applicantName = ""
    disableNextButton = false

    survey = new SurveyVue.Model(surveyJson);

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);        
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }
    
    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    } 

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            //console.log(this.survey.data);
            // console.log(options)
            if (options.name === "ApplicantNeedsProtection") {
                if (options.value === "y") {
                    this.$store.commit("Application/setPageActive", {
                        currentStep: 2,
                        currentPage: 3,
                        active: true
                    });
                } else {
                    this.$store.commit("Application/setPageActive", {
                        currentStep: 2,
                        currentPage: 3,
                        active: false
                    });
                }
            }

            if(options.name === "RespondentName") {        
                this.$store.commit("Application/setRespondentName", options.value);
            }      

            if(this.survey.data.ApplicantNeedsProtection === 'n' && this.survey.data.anotherAdultPO === 'n' && this.survey.data.childPO === 'n'){
                this.disableNextButton = true;
            }else{
                this.disableNextButton = false;
            }

        })
    }

    public reloadPageInformation() {
        if (this.step.result['protectionWhomSurvey']){
            this.survey.data = this.step.result['protectionWhomSurvey'];
        }

        const applicantNameObject = this.$store.state.Application.applicantName;
        
        if (applicantNameObject) {
            this.applicantName =
                applicantNameObject.first +
                " " +
                applicantNameObject.middle +
                " " +
                applicantNameObject.last;
        }

        if (this.applicantName) {
            this.survey.setVariable("ApplicantName", this.applicantName);
        }
    }
    

    public onPrev() {
        //this.$store.dispatch("application/gotoPrevStepPage");
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            //this.$store.dispatch("application/gotoNextStepPage");
            this.UpdateGotoNextStepPage()
        }
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }
  
    beforeDestroy() {
        if (this.survey.data.anotherAdultPO === "y") {
            this.$store.commit("Application/setProtectedPartyName", this.survey.data.anotherAdultName);
        }else{
            this.$store.commit("Application/setProtectedPartyName", this.$store.state.Application.applicantName);
        }
        //console.log(this.survey.data)
        if(this.survey.data.childPO== "y" && (this.survey.data.ApplicantNeedsProtection == 'y' || this.survey.data.anotherAdultPO == 'n')) 
            this.$store.commit("Application/setProtectedChildName",this.survey.data.allchildren);
        else 
            this.$store.commit("Application/setProtectedChildName",[]);

        this.$store.commit("Application/updateStepResultData",{
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
