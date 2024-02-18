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
import surveyJson from "./forms/about-affiant-csv.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { electronicFilingDocumentInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class AboutAffiantCsv extends Vue {
        
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

            if(options.name == "ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }  
                              
        })   
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result?.aboutAffiantCsvSurvey){
            this.survey.data = this.step.result.aboutAffiantCsvSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);              
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);     
    }

    public setEfsDocumentList(ApplicantName){
       
       const efsDocumentList: electronicFilingDocumentInfoType[] = this.steps[this.stPgNo.GETSTART._StepNo].result?.csvEfsDocuments?.length>0?this.steps[this.stPgNo.GETSTART._StepNo].result.csvEfsDocuments:[];
       efsDocumentList.push({documentName: 'Certificate of Service', efsApplicantName: ApplicantName});
     
       return efsDocumentList;
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

        if(this.survey.data?.["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            const efsDocumentList = this.setEfsDocumentList(this.survey.data?.["ApplicantName"]);
            const commonData = {
                'applicantName':this.survey.data["ApplicantName"],
                'respondents':[{first:"firstRespondent", middle:"", last:"lastRespondent"}],
                'csvEfsDocuments':efsDocumentList
            };
            this.UpdateCommonStepResults({data:commonData});
            
        }



        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {aboutAffiantCsvSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>