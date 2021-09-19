<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" :disableNext="PPMList.length<1">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";

import surveyJson from "./forms/priority-parenting-matter-order.json";
import * as _ from 'underscore';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class PriorityParentingMatterOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[]; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep =0;
    currentPage =0;
    PPMpages = [];
    PPMList = [];

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        const p = this.stPgNo.PPM
        this.PPMpages = [p.PpmChildrenInfo, p.PpmBackground, p.AboutPriorityParentingMatterOrder, p.ReviewYourAnswersPPM]
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
            Vue.filter('surveyChanged')('priorityParenting') 
            togglePages(this.PPMpages, this.isChildDetailsRequired(), this.stPgNo.PPM._StepNo);
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
           
        if (this.step.result?.priorityParentingMatterOrderSurvey?.data) {
            this.survey.data = this.step.result.priorityParentingMatterOrderSurvey.data; 
            togglePages(this.PPMpages, this.isChildDetailsRequired(), this.stPgNo.PPM._StepNo);
        
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);        
        }

        if (this.step.result?.ppmQuestionnaireSurvey?.data) {
            const selectedPriorityParentingMatters = this.step.result.ppmQuestionnaireSurvey.data;
            this.determineIssues(selectedPriorityParentingMatters);            
        }                
    }

    public determineIssues(selectedPriorityParentingMatters){
        this.survey.setVariable("preventRemoval", selectedPriorityParentingMatters.includes('preventRemoval'));
        this.survey.setVariable("medical", selectedPriorityParentingMatters.includes('medical'));
        this.survey.setVariable("passport", selectedPriorityParentingMatters.includes('passport'));
        this.survey.setVariable("travel", selectedPriorityParentingMatters.includes('travel'));
        this.survey.setVariable("locationChange", selectedPriorityParentingMatters.includes('locationChange'));
        this.survey.setVariable("interjurisdictional", selectedPriorityParentingMatters.includes('interjurisdictional'));
        this.survey.setVariable("wrongfulRemoval", selectedPriorityParentingMatters.includes('wrongfulRemoval'));
        this.survey.setVariable("returnOfChild", selectedPriorityParentingMatters.includes('returnOfChild'));
    }

    public isChildDetailsRequired() {
        let isChildDetailsRequired = false;
        let ppmType = []
        if(this.step.result?.ppmQuestionnaireSurvey?.data )
            ppmType = this.step.result.ppmQuestionnaireSurvey.data

        if (this.survey.data) {  

           const data = this.survey.data;
                  
           const medical = (ppmType.includes('medical')) && (data.delayMedicalRisk == 'y') && (data.confirmMedicalRisk?.includes('applyPPM'));
           const passport = (ppmType.includes('passport')) && (data.delayPassportRisk == 'y') && (data.confirmDelayPassportRisk?.includes('applyPPM'));
           const travel = (ppmType.includes('travel')) && (data.delayTravelRisk == 'y') && (data.travelWrongfullyDenied == 'y') && (data.confirmTravelWrongfullyDenied?.includes('applyPPM'));
           const locationChange = (ppmType.includes('locationChange')) && (data.existingParentingArrangements == 'n') && (data.impactOnRelationship == 'y') && (data.confirmImpactOnRelationship?.includes('applyPPM'));
           const preventRemoval = (ppmType.includes('preventRemoval')) && (data.noReturnRisk == 'y') && (data.confirmNoReturnRisk?.includes('applyPPM')); 
           const interjurisdictional = (ppmType.includes('interjurisdictional')) && (data.childInBC == 'y') && (data.harm == 'y') && (data.confirmHarm?.includes('applyPPM'));
           const wrongfulRemoval = (ppmType.includes('wrongfulRemoval')) && (data.wrongfulInBC == 'y') && (data.confirmWrongfulInBC?.includes('applyPPM'));
           const returnOfChild = (ppmType.includes('returnOfChild')) && (data.wrongfulReturn == 'y') && (data.confirmWrongfulReturn?.includes('applyPPM'));

           isChildDetailsRequired = medical || passport || travel || locationChange || preventRemoval || interjurisdictional || wrongfulRemoval || returnOfChild;
           
           this.PPMList = [];
           if (medical){
               this.PPMList.push('medical');
           }
           if (passport){
               this.PPMList.push('passport');
           }
           if (travel){
               this.PPMList.push('travel');
           }
           if (locationChange){
               this.PPMList.push('locationChange');
           }
           if (preventRemoval){
               this.PPMList.push('preventRemoval');
           }
           if(interjurisdictional){
               this.PPMList.push('interjurisdictional');
           }
           if (wrongfulRemoval){
               this.PPMList.push('wrongfulRemoval');
           }
           if (returnOfChild){
               this.PPMList.push('returnOfChild');
           }
        }

        const progress = isChildDetailsRequired? 100: 50        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        return isChildDetailsRequired; 
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    } 

    public getPriorityParentingMatterNames(){
        let result = ''       
        for(const form of this.PPMList){
            if(form=='medical')             result+='-Medical, dental or other health-related treatments for a child'+'\n';
            if(form=='passport')            result+='-Application for a passport, license or other thing for a child'+'\n';
            if(form=='travel')              result+='-Travel or participation in an activity for the child'+'\n';
            if(form=='locationChange')      result+='-Change in location of a child’s residence'+'\n';
            if(form=='preventRemoval')      result+='-Preventing the removal of a child'+'\n';
            if(form=='interjurisdictional') result+='-Determining matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act'+'\n';
            if(form=='wrongfulRemoval')     result+='-Wrongful removal of a child in BC'+'\n';
            if(form=='returnOfChild')       result+='-Preventing the removal of a child'+'\n';
        }
        return result;
    }     

    public modifyPpmQuestionnaire(){

        const allPages = _.range(this.stPgNo.PPM.PriorityParentingMatterOrder, Object.keys(this.stPgNo.PPM).length-1)

        if(this.PPMList.length<1){
            togglePages(allPages, false, this.stPgNo.PPM._StepNo); 
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.PPM._StepNo, currentPage: this.stPgNo.PPM.PpmQuestionnaire });        
            Vue.filter('setSurveyProgress')(null, this.stPgNo.PPM._StepNo, this.stPgNo.PPM.PpmQuestionnaire, 50, true);
        }

        const questions = [{name:'PpmQuestionnaire',title:'I need help with the following priority parenting matter:',value:this.getPriorityParentingMatterNames()}]        
        this.UpdateStepResultData({step:this.step, data: {ppmQuestionnaireSurvey: {data: this.PPMList, questions: questions, pageName:"Questionnaire", currentStep:this.currentStep, currentPage:this.stPgNo.PPM.PpmQuestionnaire}}});      
    }
    
    beforeDestroy() {        
        this.modifyPpmQuestionnaire();
        this.UpdateStepResultData({step:this.step, data: {priorityParentingMatterOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
