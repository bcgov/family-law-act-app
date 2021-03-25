<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

import surveyJson from "./forms/protectionFromWhom.json";
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

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
    step!: stepInfoType;
    
    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    applicantName = ""

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

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
            console.log(this.survey.data);
            // console.log(options)

            this.UpdateSurveyChangedPO(true);

            if(options.name == "RespondentName") {        
                this.$store.commit("Application/setRespondentName", options.value);
            }

            // if(options.name == "childPO" && options.value == "y" && this.$store.state.Application.steps[2].pages[5].progress) { 
            //     console.log('progress')       
            //     console.log(this.$store.state.Application.steps[2].result['backgroundSurvey'].data['ExistingOrders'])
            // }   
            this.determineNoContactPage()
            this.checkAnswersforContinue()

        })
    }

    public reloadPageInformation() {
        if (this.step.result && this.step.result['protectionWhomSurvey']){
            this.survey.data = this.step.result['protectionWhomSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
            this.checkAnswersforContinue()
        }
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.$store.state.Application.applicantName));
        
    }

    public determineNoContactPage(){       
        if (this.survey.ApplicantNeedsProtection == "y") {// Enable No Contact
            this.$store.commit("Application/setPageActive", {currentStep: 2, currentPage: 4, active: true});
        } else {// Disable No Contact
            this.$store.commit("Application/setPageActive", {currentStep: 2, currentPage: 4, active: false});
        }            
    }

    public checkAnswersforContinue(){
        if(this.survey.data.ApplicantNeedsProtection == 'n' && this.survey.data.anotherAdultPO == 'n' && this.survey.data.childPO == 'n'){
            this.togglePages([2,3,4,5,6,7,10,11,12,13,14,15,16], false);
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);
            return false
        }else{
            this.togglePages([2,3,5,6,7,10,11], true);
            this.determineNoContactPage()
            return true
        }
    }
    
    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: 2,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }
  
    beforeDestroy() {

        if(this.checkAnswersforContinue())
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        else
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);

        if (this.survey.data.anotherAdultPO == "y") {
            this.$store.commit("Application/setProtectedPartyName", this.survey.data.anotherAdultName);
        }else{
            this.$store.commit("Application/setProtectedPartyName", this.$store.state.Application.applicantName);
        }
        //console.log(this.survey.data)
        if(this.survey.data.childPO== "y" && (this.survey.data.ApplicantNeedsProtection == 'y' || this.survey.data.anotherAdultPO == 'n')) 
            this.$store.commit("Application/setProtectedChildName",this.survey.data.allchildren);
        else 
            this.$store.commit("Application/setProtectedChildName",[]);

        this.UpdateStepResultData({step:this.step, data: {protectionWhomSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
