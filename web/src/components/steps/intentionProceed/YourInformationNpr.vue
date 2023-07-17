<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/your-information-npr.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class YourInformationNpr extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    // @applicationState.State
    // public types!: string[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    // surveyJsonCopy
    currentStep =0;
    currentPage =0;

    // editButton = false

    lawyerName = '';
    clientName = '';

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
        // this.adjustSurveyForPersonalInfo()
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            //TODO: may need to remove this
            // Vue.filter('surveyChanged')('allExPO')
            
            // if(options.name == 'editName'){ 
            //     this.$store.commit("Application/setCurrentStep", this.stPgNo.PO._StepNo);
            //     this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.PO._StepNo, currentPage: this.stPgNo.PO.YourinformationPO}); 
            // }

            if(options.name == "ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result?.yourInformationNprSurvey) {
            this.survey.data = this.step.result.yourInformationNprSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        // this.survey.setVariable("editButton",this.editButton);

        // if (this.types?.includes("Family Law Matter")){
        //     this.survey.setVariable("includesFlm", true);            
        // } else {
        //     this.survey.setVariable("includesFlm", false);
        // }

        // if (this.types?.includes("Reply to Application About a Family Law Matter")){
        //     this.survey.setVariable("includesRflm", true);            
        // } else {
        //     this.survey.setVariable("includesRflm", false);
        // }

        // const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        // const stepPO = this.steps[this.stPgNo.PO._StepNo]

        // if(includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.includes("protectionOrder") && stepPO.result?.yourinformationPOSurvey?.data){
                
        //     this.survey.setValue('ApplicantDOB',stepPO.result.yourinformationPOSurvey.data.ApplicantDOB);
        //     this.survey.setValue('ApplicantName',stepPO.result.yourinformationPOSurvey.data.ApplicantName);
        // }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }

    // public adjustSurveyForPersonalInfo(){
    //     this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));

    //     const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        
    //     if(includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.includes("protectionOrder")){
    //         this.surveyJsonCopy.pages[0].elements[0].elements[0].readOnly = true;
    //         this.surveyJsonCopy.pages[0].elements[0].elements[1].readOnly = true;
    //         this.editButton = true;
    //     }
    // }

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
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {yourInformationNprSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
