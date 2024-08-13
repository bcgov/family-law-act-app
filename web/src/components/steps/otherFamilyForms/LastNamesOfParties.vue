<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    
import { namespace } from "vuex-class";

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/last-names-of-parties.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";

import { togglePages, toggleStep } from '@/components/utils/TogglePages';

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { otherFormPathwayInfoType } from '@/types/Application/OtherFamilyForm';

@Component({
    components:{
        PageBase
    }
})
export default class LastNamesOfParties extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep =0;
    currentPage =0;
    locationInfo = false; 
    filingMethod = null;
    selectedFormInfoList: otherFormPathwayInfoType[] = [];
    requiredGuidedPathways = [];

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.locationInfo = false;
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
            this.determineSteps();                        
        })   
    }     

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);
        
        if (this.step.result?.otherFormsLastNamesOfPartiesSurvey){
            this.survey.data = this.step.result.otherFormsLastNamesOfPartiesSurvey.data;
        }
        
        this.determineSteps();
        const progress = 100;        

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, progress, false);        
    }


    public determineSteps(){

        const submitStep = this.stPgNo.SUBMIT;

        // togglePages([submitStep.FilingOptions, submitStep.OtherFile, submitStep.NextSteps], false, submitStep._StepNo);
        // toggleStep(submitStep._StepNo, false);  

    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {           
            Vue.prototype.$UpdateGotoNextStepPage();                    
        }
    }

    beforeDestroy() {
        const progress = 100;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {otherFormsLastNamesOfPartiesSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}});         
    }
}
</script>
