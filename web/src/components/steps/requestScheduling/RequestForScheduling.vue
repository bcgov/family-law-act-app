<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import moment from 'moment';
import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/request-scheduling.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { togglePages } from '@/components/utils/TogglePages';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class RequestForScheduling extends Vue {
    
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

    created() {
        this.disableNextButton = false;       
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

        if (this.step.result?.requestForSchedulingSurvey) {            
            this.survey.data = this.step.result.requestForSchedulingSurvey.data;   
            this.setPages();         
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        } 
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }

    public setPages() {

        const p = this.stPgNo.RQS;
        const requestForSchedulingPagesAll = [p.ReasonForScheduling, p.NextAppearance, p.PartyInformationRQS, p.ReviewYourAnswersRQS]

        if (this.survey.data) {

            const surveyResponses = this.survey.data;

            const skipReasonForSchedulingPage = (surveyResponses.Unresolved == 'n' && surveyResponses.ReviewOrdered == 'y' );
            const canContinue = !(surveyResponses.Unresolved == 'n' && surveyResponses.ReviewOrdered == 'n' );               

            togglePages(requestForSchedulingPagesAll, canContinue, this.currentStep);   
            togglePages([p.ReasonForScheduling], !skipReasonForSchedulingPage, this.currentStep);              
            
            this.disableNextButton = !canContinue;

            let overOneYearHasPassed = false;

            if (surveyResponses.Unresolved == 'y' || (surveyResponses.Unresolved == 'n' && surveyResponses.ReviewOrdered == 'y')){
                if (surveyResponses.lastAppearanceDate) {
                    overOneYearHasPassed = moment(surveyResponses.lastAppearanceDate).isBefore(moment().add(-1,'years') );
                }  
            }

            this.survey.setValue('overOneYearHasPassed', overOneYearHasPassed);
        }
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
        
        this.UpdateStepResultData({step:this.step, data: {requestForSchedulingSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
