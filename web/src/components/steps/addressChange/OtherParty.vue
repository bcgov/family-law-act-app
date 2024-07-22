<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';   
import { namespace } from "vuex-class";  
import * as _ from 'underscore';  

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/other-party.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class OtherParty extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;   
    disableNextButton = false;

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
            this.determineProgress();                     
        })   
    }

    public isValid(): boolean {
        return !this.survey.isCurrentPageHasErrors 
            && this.survey.data.otherPartyNamesDynamicPanel?.length > 0;
    }

    public reloadPageInformation() {
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.otherPartySurvey){
            this.survey.data = this.step.result.otherPartySurvey.data;
        }

        this.determineProgress();    
    }

    public determineProgress(){
        if (this.isValid()) {      
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 100, false);
            
        } else {
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.determineProgress();
        if(this.isValid()) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }

    beforeDestroy() {      
        this.determineProgress();  

        this.UpdateStepResultData({step:this.step, data: {otherPartySurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>