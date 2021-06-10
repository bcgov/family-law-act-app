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
            // console.log(options) 
            // if(options.name == 'listOfSituations'){
            //     if(options.value.includes('None of the above apply to my situation')){
            //         //console.log('clear')
            //         Vue.nextTick(()=>
            //             this.survey.setValue('listOfSituations',['None of the above apply to my situation'])
            //         )
            //     }                    
            // }           

        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
           
        if (this.step.result && this.step.result.priorityParentingOrderSurvey) {
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
