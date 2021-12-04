<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >        
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/ppm-additional-documents.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { requiredDocumentsInfoType } from '@/types/Common';
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})
export default class PpmAdditionalDocuments extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    

    

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.State
    public requiredDocuments!: requiredDocumentsInfoType;

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 

    currentStep =0;
    currentPage =0;

    isRequiredDocument = false;
    requiredDocumentLists = [];
    appointedAsGuardian = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.getFLMResultData()
        this.getRequiredDocuments()
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.adjustSurveyForAdditionalDocs();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')

            this.determineCaseMgntNeeded();
        })
    }

    public determineCaseMgntNeeded(){
       
        if ((this.survey.data?.criminalChecked && this.survey.data.criminalChecked == 'n') 
            || (this.survey.data?.isFilingAdditionalDocs && this.survey.data.isFilingAdditionalDocs == 'n')) {
            
                
                this.toggleSteps(this.stPgNo.CM._StepNo,  true);
                const selectedForms = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms
               
                if(selectedForms && !selectedForms.includes('caseMgmt')){
                    selectedForms.push('caseMgmt')
                }

                this.UpdateCommonStepResults({data:{'selectedForms':selectedForms}});
        }
    }

    public adjustSurveyForAdditionalDocs(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));       
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        let descriptionHtml = "Based on your answers, you must file the following additional documents with your Application About a Family Law Matter:<br><br><ul>";
        for (const doc of this.requiredDocumentLists){
    
            if(doc.includes('Form 5'))
                this.appointedAsGuardian = true;
            if(doc.includes('form') || doc.includes('Form')){
                descriptionHtml += "<li>"+doc+"</li>"
                this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(doc);            
            }
        }  
        descriptionHtml += "</ul>"
        this.surveyJsonCopy.pages[0].elements[0].elements[0]["html"] = descriptionHtml
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.ppmAdditionalDocumentsSurvey?.data){
            this.survey.data = this.step.result.ppmAdditionalDocumentsSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        this.survey.setVariable('appointedAsGuardian', this.appointedAsGuardian);
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.determineCaseMgntNeeded(); 
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        if(this.requiredDocuments?.familyLawMatter?.required){
            this.requiredDocumentLists = this.requiredDocuments.familyLawMatter.required
            this.isRequiredDocument = true
        }       
    }

    public getFLMResultData() {         
        const steps = [this.stPgNo.COMMON._StepNo, this.stPgNo.FLM._StepNo]

        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of steps){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }

        const stepFLM = this.$store.state.Application.steps[this.stPgNo.FLM._StepNo]

        const childBestInterestAck = {childBestInterestAcknowledgement: stepFLM.result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        

        Vue.filter('extractRequiredDocuments')(result, 'familyLawMatter')
    }    

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
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

        this.UpdateStepResultData({step:this.step, data: {ppmAdditionalDocumentsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>