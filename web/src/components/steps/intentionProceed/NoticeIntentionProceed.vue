<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';   
import { namespace } from "vuex-class";  
import * as _ from 'underscore'; 
import moment from 'moment'; 

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/notice-intention-proceed.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

import { togglePages, toggleStep } from '@/components/utils/TogglePages';
import { lastStepDataInfoType } from '@/types/Application/IntentionProceed';

@Component({
    components:{
        PageBase
    }
})
export default class NoticeIntentionProceed extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep =0;
    currentPage =0;   

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = true;       
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

            this.setPages();
                              
        })   
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result?.noticeIntentionProceedSurvey){
            this.survey.data = this.step.result.noticeIntentionProceedSurvey.data; 
            this.setPages();
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);              
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);     
    }

    public setPages() {

        const p = this.stPgNo.NPR;
        const noticeIntentionProceedPagesAll = [p.YourInformationNpr, p.OtherPartyNpr, p.ReviewYourAnswersNPR]
        const previewFormPage = [p.PreviewFormsNPR]

        if (this.survey.data) {

            const surveyResponses = this.survey.data;
            let canContinue = false;

            if (surveyResponses?.lastStep?.selected){
                const overOneYearPassed = this.overYear(surveyResponses.lastStep);

                canContinue = (surveyResponses.unresolvedFlm == 'y') 
                                        && (surveyResponses.lastStep?.selected?.length > 0) 
                                        && overOneYearPassed;            

                this.survey.setValue('unresolvedLessThanYear', !overOneYearPassed);

                let requiresForm39 = false; 
                const selectedStep = surveyResponses.lastStep.selected;

                requiresForm39 = selectedStep == 'flm' || selectedStep == 'other';
                this.survey.setValue('requiresForm39',requiresForm39)

            }
          
            togglePages(noticeIntentionProceedPagesAll, canContinue, this.currentStep);
            toggleStep(this.stPgNo.SUBMIT._StepNo, canContinue)
            if(!canContinue) {
                togglePages(previewFormPage, canContinue, this.currentStep);
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ReviewYourAnswersNPR].progress>0)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersNPR, 50, false);
            }
            this.disableNextButton = !canContinue;
        }
    }

    public overYear(lastStep: lastStepDataInfoType){

        let overYearHasPassed = false;
        const selectedStep = lastStep.selected;

        let lastStepDate = '';
        if (selectedStep == 'consensualDisputeResolution'){
            lastStepDate = lastStep.consensualDisputeResolutionDate;
        } else if (selectedStep == 'flm'){
            lastStepDate = lastStep.flmDate;
        } else if (selectedStep == 'needsAssessment'){
            lastStepDate = lastStep.needsAssessmentDate;
        } else if (selectedStep == 'parentingEducationProgram'){
            lastStepDate = lastStep.parentingEducationProgramDate;
        } else if (selectedStep == 'resolveFlm'){
            lastStepDate = lastStep.resolveFlmDate;
        } else if (selectedStep == 'other'){
            lastStepDate = lastStep.otherDate;
        }

        overYearHasPassed = moment(lastStepDate).isBefore(moment().add(-1,'years') );

        return overYearHasPassed;
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {noticeIntentionProceedSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>