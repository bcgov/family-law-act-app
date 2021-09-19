<template>
    <page-base  v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
        <b-card style="background-color: #f6e4e6; margin:4rem 0;" v-if="!allCompleted">
            The survey has some incomplete pages ( Forms have not been reviewed, Required questions left unanswered, ... ).
            <div style="width:18rem;margin:1rem auto"> 
                <b-button class="ml-5" variant="primary" @click="checkErrorOnPages"> Navigate to the Error Page </b-button>
            </div>
        </b-card>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary"
import surveyJson from "./forms/filingOptions.json";

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class FilingOptions extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public allCompleted!: boolean

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    @Watch('allCompleted')
    statusChanged(newVal) 
    {       
        this.determineSelectedFilingType()       
    }

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

    public reloadPageInformation() {
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.filingOptionsSurvey){
            this.survey.data = this.step.result.filingOptionsSurvey;
        }
       
       this.allowEfiling();
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        
        this.determineSelectedFilingType();        
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            this.resetReviewSteps()
            this.determineSelectedFilingType()
        })
    }

    public allowEfiling(){
        const stepFLM = this.$store.state.Application.steps[this.stPgNo.FLM._StepNo]
        const stepCM = this.$store.state.Application.steps[this.stPgNo.CM._StepNo]
        const stepENFRC = this.$store.state.Application.steps[this.stPgNo.ENFRC._StepNo]


        if (
            !this.$store.state.Common.efilingEnabled || 
            (stepFLM.active   && stepFLM.pages[this.stPgNo.FLM.FlmAdditionalDocuments].active && stepFLM.result?.flmAdditionalDocumentsSurvey?.data?.isFilingAdditionalDocs == "n") ||            
            (stepFLM.active   && stepFLM.pages[this.stPgNo.FLM.FlmAdditionalDocuments].active && stepFLM.result?.flmAdditionalDocumentsSurvey?.data?.criminalChecked == "n") ||
            (stepCM.active    && stepCM.pages[this.stPgNo.CM.RecognizingAnOrderFromOutsideBc].active && stepCM.result?.recognizingAnOrderFromOutsideBcSurvey?.data?.outsideBcOrder == 'y') ||
            (stepENFRC.active && stepENFRC.pages[this.stPgNo.ENFRC.EnforceAgreementOrOrder].active && stepENFRC.result?.enforceAgreementOrOrderSurvey?.data?.enforceOrder == "n" && stepENFRC.result?.enforceAgreementOrOrderSurvey?.data?.filedOrder == "n" && stepENFRC.result?.enforceAgreementOrOrderSurvey?.data?.existingType == "courtOrder")
        )
                this.survey.setVariable('efilingAllowed','n')
        else 
                this.survey.setVariable('efilingAllowed','y')
    }

    public determineSelectedFilingType(){
        const p = this.stPgNo.SUBMIT

        if(this.allCompleted && this.survey.data.selectedFilingType == 'byemail'){
            togglePages([p.ReviewAndSave, p.NextSteps], true, this.currentStep);
            togglePages([p.ReviewAndPrint, p.ReviewAndSubmit], false, this.currentStep);
        }else if(this.allCompleted && this.survey.data.selectedFilingType == 'inperson'){
            togglePages([p.ReviewAndPrint, p.NextSteps], true, this.currentStep);
            togglePages([p.ReviewAndSave, p.ReviewAndSubmit], false, this.currentStep);
        }else if(this.allCompleted && this.survey.data.selectedFilingType == 'byefiling'){
            togglePages([p.ReviewAndSubmit], true, this.currentStep);
            togglePages([p.ReviewAndPrint, p.ReviewAndSave, p.NextSteps], false, this.currentStep);
        }else{
            togglePages([p.ReviewAndPrint, p.ReviewAndSave, p.ReviewAndSubmit, p.NextSteps], false, this.currentStep);
        }
    }

    public resetReviewSteps(){
        const p = this.stPgNo.SUBMIT
        for(const pageIndex of [p.ReviewAndPrint, p.ReviewAndSave, p.ReviewAndSubmit, p.NextSteps])
            this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:pageIndex, progress:0 });
    }
    
    public checkErrorOnPages(){
        const s = this.stPgNo
        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
        for(const stepIndex of [s.PO._StepNo, s.COMMON._StepNo, s.FLM._StepNo, s.CM._StepNo, s.PPM._StepNo, s.RELOC._StepNo, s.ENFRC._StepNo, s.SUBMIT._StepNo]){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
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
        
        this.UpdateStepResultData({step:this.step, data: {filingOptionsSurvey: this.survey.data}})
    }
}
</script>