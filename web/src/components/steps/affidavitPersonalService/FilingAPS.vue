<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/filling-affidavit-aps.json";

import PageBase from "../PageBase.vue";
import { electronicFilingDocumentInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
import { togglePages } from '@/components/utils/TogglePages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class FilingAps extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;    
    disableNextButton = false;

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

        if (this.survey.data?.sworn && this.steps[this.stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
            const eFiling = this.steps[this.stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';
            togglePages([this.stPgNo.APS.ElectronicFilingStatementAPS], this.survey.data.sworn == 'y' && eFiling, this.currentStep);
        }
            
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;            

        if (this.step.result?.filingApsSurvey) {            
            this.survey.data = this.step.result.filingApsSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
                       
        } 

        if (this.steps[this.stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod) {
            const eFiling = this.steps[this.stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod == 'eFile';           
            this.survey.setVariable('eFiling', eFiling)
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

    public setEfsDocumentList(){
       
        const efsDocumentList: electronicFilingDocumentInfoType[] = this.steps[this.stPgNo.GETSTART._StepNo].result?.apsEfsDocuments?.length>0?this.steps[this.stPgNo.GETSTART._StepNo].result.apsEfsDocuments:[];
      
        if (this.step.result.aboutAffiantApsSurvey?.data?.ApplicantName){
            const applicantName = this.step.result.aboutAffiantApsSurvey.data.ApplicantName
            efsDocumentList.push({documentName: 'Affidavit of Personal service', efsApplicantName: applicantName});
        }
              
       this.UpdateCommonStepResults({data:{'apsEfsDocuments':efsDocumentList}});
    }
    
    beforeDestroy() {   
        
        this.setEfsDocumentList();
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {filingApsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
