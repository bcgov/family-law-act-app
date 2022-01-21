<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >        
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/wr-replying-to-application.json";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import PageBase from "../PageBase.vue";
import { getWrittenResponseApplications } from '@/components/utils/ReplyPathways';
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})
export default class WrReplyingToApplication extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public types!: string[];

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void   

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 

    currentStep =0;
    currentPage =0;
    
    applicationLists = [];
    otherParties = [];

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        
        this.getInformation();
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.adjustSurveyForOtherParties();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('writtenResponse')
            
        })
    }

    public adjustSurveyForOtherParties(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));       
        this.surveyJsonCopy.pages[0].elements[0].elements[0]["choices"] = this.otherParties;        
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.wrReplyingToApplicationSurvey?.data){
            this.survey.data = this.step.result.wrReplyingToApplicationSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        this.survey.setValue('applicationList', this.applicationLists.join(' and '));
        if (this.applicationLists.length > 1){
            this.survey.setValue('verb', 'were');
            this.survey.setValue('applicationIdentifier', 'applications');
        } else {
            this.survey.setValue('verb', 'was');
            this.survey.setValue('applicationIdentifier', 'application');

        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        
    }

    public getInformation(){

        this.applicationLists = getWrittenResponseApplications(this.types);
        
        this.otherParties = [];

        if (this.steps[this.stPgNo.COMMON._StepNo]?.result?.otherPartyCommonSurvey?.data){

            const otherPartyInfo = this.steps[this.stPgNo.COMMON._StepNo].result.otherPartyCommonSurvey.data;
            
            for (const party of otherPartyInfo ){
                const fullName = Vue.filter('getFullName')(party.name);
                this.otherParties.push(fullName);
            }
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
        this.UpdateStepResultData({step:this.step, data: {wrReplyingToApplicationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}

</script>