<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    
import { namespace } from "vuex-class";

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/admin-form-filing-location.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { locationsInfoType } from '@/types/Common';

import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
const commonState = namespace("Common");

import { togglePages, toggleStep } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase
    }
})
export default class AdminFormFilingLocation extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

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
    existingFamilyCase = 'y';

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
        this.adjustSurveyForLocations();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }    
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            
            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }

            toggleStep(this.stPgNo.SUBMIT._StepNo, !this.survey.isCurrentPageHasErrors);

            togglePages([this.stPgNo.SUBMIT.FilingOptions], this.survey.isCurrentPageHasErrors, this.stPgNo.SUBMIT._StepNo);
            togglePages([this.stPgNo.SUBMIT.StandaloneEfile], !this.survey.isCurrentPageHasErrors, this.stPgNo.SUBMIT._StepNo);            
        })   
    }   

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[0].elements[0]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"] = [];
        
        for(const location of this.locationsInfo){
            
            this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[0]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() {

        if (this.step.result?.adminFormsFilingLocationSurvey){
            this.survey.data = this.step.result.adminFormsFilingLocationSurvey.data;
           
            if (this.survey.data.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        }

        if (this.step.result?.adminFormsSubmissionSurvey?.data){
            this.existingFamilyCase = this.step.result.adminFormsSubmissionSurvey.data.ExistingFamilyCase;
            this.survey.setVariable("ExistingFamilyCase", this.existingFamilyCase)
        }        

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {           
            Vue.prototype.$UpdateGotoNextStepPage();                    
        }
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);
        this.survey.setVariable("registryLocation", location);        
    }     

    public setExistingFileNumber(){
        const newExistingOrders = [];      
        
        const fileNumber = this.existingFamilyCase == "y"? this.survey.data.ExistingFileNumber: ''
        newExistingOrders.push({type: '', filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber});                     
           
       this.UpdateCommonStepResults({data:{'existingOrders':newExistingOrders}});
   }

    beforeDestroy() {
        this.setExistingFileNumber(); 
        const progress = !this.survey.isCurrentPageHasErrors?100:50;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {adminFormsFilingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}});         
    }
}
</script>
