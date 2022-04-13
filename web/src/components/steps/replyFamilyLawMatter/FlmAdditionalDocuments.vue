<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >        
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/flm-additional-documents.json";

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
export default class FlmAdditionalDocuments extends Vue {
    
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

    @applicationState.State
    public rflmRequiredDocsRequests!: any[];

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
            Vue.filter('surveyChanged')('replyFlm')

            this.determineCaseMgntNeeded();
        })
    }

    public isCounterApplication(){

        for(const req of this.rflmRequiredDocsRequests){
            const pageActive = this.$store.state.Application.steps[req.step]?.pages[req.page]?.active

            if(pageActive && req.toggle && req?.type=='counter' ){                 
                return true
            }
        }
        return false 
    }

    public isReplyApplication(){
        
        for(const req of this.rflmRequiredDocsRequests){
            const pageActive = this.$store.state.Application.steps[req.step]?.pages[req.page]?.active

            if(pageActive && req.toggle && req?.type=='reply' ){                 
                return true
            }
        }
        return false
    }



    public determineCaseMgntNeeded(){
        
        const includesOrderActivities = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity?.includes('applyForOrder');

        if (   (this.isCounterApplication() && this.survey.data?.criminalChecked && this.survey.data.criminalChecked == 'n') 
            || (this.isCounterApplication() && this.survey.data?.isFilingAdditionalDocs && this.survey.data.isFilingAdditionalDocs == 'n')) {            
                
                this.toggleSteps(this.stPgNo.CM._StepNo,  true);
                const selectedForms = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms
               
                if(selectedForms && !selectedForms.includes('caseMgmt')){
                    selectedForms.push('caseMgmt')
                }

                this.UpdateCommonStepResults({data:{'selectedForms':selectedForms}});
        }else if(!includesOrderActivities) {
            this.toggleSteps(this.stPgNo.CM._StepNo,  false);
        }
    }

    public adjustSurveyForAdditionalDocs(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));       
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        let descriptionHtml = "Based on your answers, you must file the following additional documents with "

        if(this.isReplyApplication()) descriptionHtml +="your Reply to an Application About a Family Law Matter"
        if(this.isReplyApplication() && this.isCounterApplication()) descriptionHtml +=" and "
        if(this.isCounterApplication()) descriptionHtml +="your Application About a Family Law Matter"     
        descriptionHtml +=":<br><br><ul>";

        for (const doc of this.requiredDocumentLists){
    
            if(doc.includes('Form 5'))
                this.appointedAsGuardian = true;
            if(doc.includes('form') || doc.includes('Form')){
                descriptionHtml += "<li>"+doc+"</li>"
                this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(doc);            
            }
        }  
        descriptionHtml += "</ul>"
        const rfmlNotes = "If you do not give your complete, true, and up-to-date financial information when needed, the court can:"+
            "<ul><li>order that the income information be provided</li>"+
            "<li>assume a party’s income is a certain amount for support purposes and make an order based on it</li>"+
            "<li>require a party to give security</li>"+
            "<li>require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000</li>"+
            "<li>make any other order the court considers appropriate</li></ul>"
        
        if(this.isReplyApplication()) descriptionHtml += rfmlNotes;
        
        this.surveyJsonCopy.pages[0].elements[0].elements[0]["html"] = descriptionHtml
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.flmAdditionalDocumentsSurvey?.data){
            this.survey.data = this.step.result.flmAdditionalDocumentsSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        this.survey.setVariable('appointedAsGuardian', this.appointedAsGuardian);
        this.survey.setVariable('isCounterApp', this.isCounterApplication());
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.determineCaseMgntNeeded(); 
    }

    public getRequiredDocuments(){
        
        this.requiredDocumentLists = [];

        if(this.isCounterApplication() && this.requiredDocuments?.familyLawMatter?.required){
            this.requiredDocumentLists = this.requiredDocuments.familyLawMatter.required
            this.isRequiredDocument = true
        }  
        
        if(this.isReplyApplication()){
            for(const doc of this.requiredDocumentLists){
                if(doc.includes('Financial Statement Form 4')){
                    return
                }
            }
            this.requiredDocumentLists.push("Completed <a target='_blank' href='https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa713.pdf?forcedownload=true'>Financial Statement Form 4</a>")
        }
                
        
    }

    public getFLMResultData() {          
        
        const stepNo = this.stPgNo.RFLM._StepNo

        const steps = [this.stPgNo.COMMON._StepNo, stepNo]

        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(const stepIndex of steps){
            const stepResults = this.$store.state.Application.steps[stepIndex].result
            for(const stepResultInx in stepResults){
                if(stepResults[stepResultInx])
                    result[stepResultInx]=stepResults[stepResultInx].data; 
            }
        }

        const stepFLM = this.$store.state.Application.steps[stepNo]

        const childBestInterestAck = {childBestInterestAcknowledgement: stepFLM.result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        
        // TODO: determine what to use
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

        this.UpdateStepResultData({step:this.step, data: {flmAdditionalDocumentsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>