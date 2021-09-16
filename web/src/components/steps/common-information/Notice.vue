<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/notice.json";
import * as surveyEnv from "@/components/survey/survey-glossary"

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import * as _ from 'underscore';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class Notice extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep =0;
    currentPage =0;   

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
            
            this.determineCaseMgntNeeded();                       
        })   
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.noticeSurvey){
            this.survey.data = this.step.result.noticeSurvey.data;
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.determineCaseMgntNeeded();        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public determineCaseMgntNeeded(){
        if (this.survey.data?.noticeType) {

            const noticeType = this.survey.data.noticeType;

            const stepNoCM = this.stPgNo.CM._StepNo;
            const pageNoCMQ = this.stPgNo.CM.CmQuestionnaire;
            const step = this.$store.state.Application.steps[stepNoCM];

            const selectedForms = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms
            const selectedCaseManagement = step.result?.cmQuestionnaireSurvey?.data? step.result.cmQuestionnaireSurvey.data : [];                


            if (noticeType == 'askingForWithoutNotice' || noticeType == 'askingForUnder 7 DaysNotice') {
                
                this.toggleSteps(stepNoCM,  true);                
               
                if(selectedForms && !selectedForms.includes('caseMgmt')){
                    selectedForms.push('caseMgmt')
                }                
                
                //Case Management Pre Select
                if(!selectedCaseManagement.includes('changeServiceRequirement')){
                    selectedCaseManagement.push('changeServiceRequirement')                
                    const allPages = _.range(pageNoCMQ, Object.keys(this.stPgNo.CM).length-1)
                    for(const page of allPages)
                        Vue.filter('setSurveyProgress')(null, stepNoCM, page, 0, false);
                
                    this.UpdatePathwayCompleted({pathway:"caseMgmt", isCompleted:false});
                    this.$store.commit("Application/setCurrentStepPage", {currentStep: stepNoCM, currentPage: pageNoCMQ }); 
                    this.UpdateStepResultData({step:step, data: {cmQuestionnaireSurvey: {data: selectedCaseManagement, questions: [], pageName:"Questionnaire", currentStep:stepNoCM, currentPage:pageNoCMQ}}});
                }                
            } 
            else if(selectedCaseManagement.length == 1 && selectedCaseManagement.includes('changeServiceRequirement')){
                
                this.toggleSteps(stepNoCM,  false);

                if(selectedForms?.includes('caseMgmt')){
                    selectedForms.splice(selectedForms.indexOf('caseMgmt'),1);                    
                }

                selectedCaseManagement.pop();                
                this.UpdateStepResultData({step:step, data: {cmQuestionnaireSurvey: {data: selectedCaseManagement, questions: [], pageName:"Questionnaire", currentStep:stepNoCM, currentPage:pageNoCMQ}}});                
            }

            this.UpdateCommonStepResults({data:{'selectedForms':selectedForms}});
        }
    }

    public toggleSteps(stepId, activeIndicator) {       
        this.$store.commit("Application/setStepActive", {
            currentStep: stepId,
            active: activeIndicator
        });
    }

    beforeDestroy() {        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {noticeSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>