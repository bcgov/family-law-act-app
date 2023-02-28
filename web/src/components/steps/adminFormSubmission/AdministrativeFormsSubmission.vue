<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>    
    </page-base>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/admin-form-submission.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepInfoType, stepResultInfoType } from '@/types/Application';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

@Component({
    components:{
        PageBase        
    }
})
export default class AdministrativeFormsSubmission extends Vue {     

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void
  
    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;


    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    } 

   
    
    mounted(){
        this.initializeSurvey();
        // this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
       
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }      

    public reloadPageInformation() {
        if (this.step.result?.adminFormsSubmissionSurvey){
            this.survey.data = this.step.result.adminFormsSubmissionSurvey.data;
                    
        }

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 
        Vue.prototype.$UpdateGotoNextStepPage();
    }    
  
    beforeDestroy() {
        const progress = 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {adminFormsSubmissionSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }

}
</script>

<style lang="scss">
@import "../../../styles/survey";



</style>