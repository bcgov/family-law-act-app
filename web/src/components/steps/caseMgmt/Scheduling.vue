<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/scheduling.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { priorityParentingMatterOrderSurveyDataInfoType } from '@/types/Application/PriorityParentingMatter';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class Scheduling extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep=0;
    currentPage=0;
    listOfIssuesDescription = '';

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
            Vue.filter('surveyChanged')('caseMgmt')            
            // console.log(options)              

        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.schedulingSurvey) {
            this.survey.data = this.step.result.schedulingSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        if (this.step.result?.priorityParentingMatterOrderSurvey?.data){
            this.listOfIssuesDescription = this.getDescription(this.step.result.priorityParentingMatterOrderSurvey.data);
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public getDescription(data: priorityParentingMatterOrderSurveyDataInfoType) {
        let description = '';
        const firstDescriptionSection = 'You indicated you are applying for an order about a priority parenting matter '
       
        let ppmType = []
        if(this.step.result?.ppmQuestionnaireSurvey?.data )
            ppmType = this.step.result.ppmQuestionnaireSurvey.data

        let listOfIssues = [];
        const medical = (ppmType.includes('medical') && data.delayMedicalRisk == 'y') && (data.confirmMedicalRisk && data.confirmMedicalRisk.includes('applyPPM'));
        const passport = (ppmType.includes('passport') && data.delayPassportRisk == 'y') && (data.confirmDelayPassportRisk && data.confirmDelayPassportRisk.includes('applyPPM'));
        const travel = (ppmType.includes('travel') && data.delayTravelRisk == 'y') && (data.travelWrongfullyDenied == 'y') && (data.confirmTravelWrongfullyDenied && data.confirmTravelWrongfullyDenied.includes('applyPPM'));
        const locationChange = (ppmType.includes('locationChange') && data.existingParentingArrangements == 'y') && (data.impactOnRelationship == 'y') && (data.confirmImpactOnRelationship && data.confirmImpactOnRelationship.includes('applyPPM'));
        const preventRemoval = (ppmType.includes('preventRemoval') && data.noReturnRisk == 'y') && (data.confirmNoReturnRisk && data.confirmNoReturnRisk.includes('applyPPM')); 
        const interjurisdictional = (ppmType.includes('interjurisdictional') && data.childInBC == 'y') && (data.harm == 'y') && (data.confirmHarm && data.confirmHarm.includes('applyPPM'));
        const wrongfulRemoval = (ppmType.includes('wrongfulRemoval') && data.wrongfulInBC == 'y') && (data.confirmWrongfulInBC && data.confirmWrongfulInBC.includes('applyPPM'));
        const returnOfChild = (ppmType.includes('returnOfChild') && data.wrongfulReturn == 'y') && (data.confirmWrongfulReturn && data.confirmWrongfulReturn.includes('applyPPM'));

        if (medical) {
            listOfIssues.push('<li>because a guardian has given, refused or withdrawn consent to medical, dental or other health-related treatment for a child and delay will result in risk to the child’s health</li>');
        }

        if (passport) {
            listOfIssues.push('<li>because a guardian needs to apply for a passport, licence, permit, benefit, privilege or other thing for a child and a delay will result in risk of harm to the child’s physical, psychological or emotional safety, security or well-being</li>');
        }

        if (travel) {
            listOfIssues.push('<li>because a guardian wrongfully denied consent for travel with a child or participation by a child in an activity</li>')
        }

        if (locationChange) {
            listOfIssues.push('<li>because a change in location of a child’s residence, or a guardian’s plan to change the location of a child’s residence, can reasonably be expected to have a significant impact on the child’s relationship with another guardian</li>')
        }

        if (preventRemoval) {
            listOfIssues.push('<li>to prevent the removal of a child under section 64 of the Family Law Act </li>')
        }

        if (interjurisdictional) {
            listOfIssues.push('<li>to determine matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act because you believe the child, currently in BC, would suffer serious harm if they were to remain with, or be returned to, the child’s guardian or be removed from BC</li>')
        }

        if (wrongfulRemoval) {
            listOfIssues.push('<li>under section 77(2) of the Family Law Act because you believe a child has been wrongfully brought to or kept in BC</li>')
        }

        if (returnOfChild) {
            listOfIssues.push('<li>relating to the return of a child alleged to have been wrongfully removed or retained under the 1980 Hague Convention</li>')
        }
       
        if (listOfIssues.length == 1){            
            description = firstDescriptionSection + listOfIssues.toString().replace('<li>', '').replace('</li>', '')
        } else {           
            const initialList = listOfIssues.toString()            
            description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
        }

        return description;
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
        this.UpdateStepResultData({step:this.step, data: {schedulingSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
