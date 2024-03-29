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
import surveyJson from "./forms/assets-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase
    }
})
export default class AssetsFs extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

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
            this.determinePages();                               
        })   
    }

    public determinePages(){

        const assetTypes = this.survey.data?.assetTypes?this.survey.data.assetTypes:[];
        
        togglePages([this.stPgNo.FS.RealEstateFS], assetTypes.includes('realEstate'), this.currentStep);
        togglePages([this.stPgNo.FS.CarsBoatsVehiclesFS], assetTypes.includes('cars'), this.currentStep);
        togglePages([this.stPgNo.FS.CashAssetsFS], assetTypes.includes('cash'), this.currentStep);
        togglePages([this.stPgNo.FS.InvestmentsFS], assetTypes.includes('investments'), this.currentStep);
        togglePages([this.stPgNo.FS.LoansCreditsFS], assetTypes.includes('loans'), this.currentStep);
        togglePages([this.stPgNo.FS.OtherAssetsFS], assetTypes.includes('otherAssets'), this.currentStep);
        togglePages([this.stPgNo.FS.DispositionAssetsFS], assetTypes.length>0, this.currentStep);
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result?.assetsFSSurvey){
            this.survey.data = this.step.result.assetsFSSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);              
        }

        this.determinePages();
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);     
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
        this.UpdateStepResultData({step:this.step, data: {assetsFSSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>