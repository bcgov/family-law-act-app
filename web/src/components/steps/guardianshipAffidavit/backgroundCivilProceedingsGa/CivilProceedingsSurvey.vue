<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveChild()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/background-civil-court-proceedings.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { courtProceedingsDataInfoType } from '@/types/Application/GuardianshipAffidavit';

@Component
export default class CivilProceedingsSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;    

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    courtProceeding = {} as courtProceedingsDataInfoType;

    survey = new SurveyVue.Model(surveyJson);
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
        Vue.filter('surveyChanged')('guardianshipAffidavit')        
        this.survey.onComplete.add((sender, options) => {
            this.populateProceedingModel(sender.data);
            let id = sender.getVariable("id");
            if (id === null || id === undefined) {
                this.$emit("surveyData", this.courtProceeding);
            } else {
                this.$emit("editedData", { ...this.courtProceeding, id });
                id = null;
            }
        });
    }
    
    public reloadPageInformation() {
        if (this.editRowProp != null) {
            this.populateFormWithPreExistingValues(this.editRowProp, this.survey);
        } else {
            this.survey.setValue("courtOrderDates", []);
        }
        
        let progress = 50;
        if(Object.keys(this.survey.data).length)
            progress = this.survey.isCurrentPageHasErrors? 50 : 100;
            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })   
         
    }
  
    public goBack() {
        this.$emit("showTable", true);
    }
    
    public saveChild() {
        
        this.survey.completeLastPage();
    }

    public populateProceedingModel(courtProceedingData) {
        if(courtProceedingData){
            this.courtProceeding.partyNames = courtProceedingData.partyNames;       
            this.courtProceeding.courtLocation = courtProceedingData.courtLocation;
            this.courtProceeding.courtOrdersExist = courtProceedingData.courtOrdersExist;
            this.courtProceeding.courtOrderDates = courtProceedingData.courtOrderDates;                       
        }
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
       
        survey.setValue("partyNames", editRowProp.partyNames);
        survey.setValue("courtLocation", editRowProp.courtLocation);
        survey.setValue("courtOrdersExist", editRowProp.courtOrdersExist);        
        survey.setValue("courtOrderDates", editRowProp.courtOrderDates);       
        
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
}
</script>
