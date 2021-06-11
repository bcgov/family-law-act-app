<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";

import surveyJson from "./forms/priority-parenting-matter-order.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

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
            Vue.filter('surveyChanged')('priorityParenting') 
            this.togglePages(this.stPgNo.PPM._StepNo, [this.stPgNo.PPM.PpmChildrenInfo, this.stPgNo.PPM.PpmBackground, this.stPgNo.PPM.AboutPriorityParentingMatterOrder], this.isChildDetailsRequired());
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
           
        if (this.step.result && this.step.result.priorityParentingOrderSurvey && this.step.result.priorityParentingOrderSurvey.data) {
            this.survey.data = this.step.result.priorityParentingOrderSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);        
        }

        if (this.step.result && this.step.result.ppmQuestionnaireSurvey && this.step.result.ppmQuestionnaireSurvey.data) {
            const selectedPriorityParentingMatters = this.step.result.ppmQuestionnaireSurvey.data;
            this.determineIssues(selectedPriorityParentingMatters);            
        }
                
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
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

    public togglePages(step, pages, activeIndicator) {
        for(let i=0; i<pages.length; i++) {
            
            this.$store.commit("Application/setPageActive", {
                currentStep: step,
                currentPage: pages[i],
                active: (activeIndicator)
            });
        }
    }

    public isChildDetailsRequired() {
       let isChildDetailsRequired = false;
       
       if (this.survey.data) {

           const data = this.survey.data;          
           const medical = (data.delayMedicalRisk && data.delayMedicalRisk == 'y') && (data.confirmMedicalRisk && data.confirmMedicalRisk.includes('applyPPM'));
           const passport = (data.delayPassportRisk && data.delayPassportRisk == 'y') && (data.confirmDelayPassportRisk && data.confirmDelayPassportRisk.includes('applyPPM'));
           const travel = (data.delayTravelRisk && data.delayTravelRisk == 'y') && (data.travelWrongfullyDenied && data.travelWrongfullyDenied == 'y') && (data.confirmTravelWrongfullyDenied && data.confirmTravelWrongfullyDenied.includes('applyPPM'));
           const locationChange = (data.existingParentingArrangements && data.existingParentingArrangements == 'y') && (data.impactOnRelationship && data.impactOnRelationship == 'y') && (data.confirmImpactOnRelationship && data.confirmImpactOnRelationship.includes('applyPPM'));
           const preventRemoval = (data.noReturnRisk && data.noReturnRisk == 'y') && (data.confirmNoReturnRisk && data.confirmNoReturnRisk.includes('applyPPM')); 
           const interjurisdictional = (data.childInBC && data.childInBC == 'y') && (data.harm && data.harm == 'y') && (data.confirmHarm && data.confirmHarm.includes('applyPPM'));
           const wrongfulRemoval = (data.wrongfulInBC && data.wrongfulInBC == 'y') && (data.confirmWrongfulInBC && data.confirmWrongfulInBC.includes('applyPPM'));
           const returnOfChild = (data.wrongfulReturn && data.wrongfulReturn == 'y') && (data.confirmWrongfulReturn && data.confirmWrongfulReturn.includes('applyPPM'));

           isChildDetailsRequired = medical || passport || travel || locationChange || preventRemoval || interjurisdictional || wrongfulRemoval || returnOfChild
       }
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
    
    beforeDestroy() {

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {priorityParentingOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
