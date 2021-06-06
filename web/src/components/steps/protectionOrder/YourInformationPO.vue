<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/yourInformationPo.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class YourInformationPo extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

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
        this.survey.onValueChanged.add((sender, options) => {
            //console.log(this.survey.data);
            // console.log(options)
            Vue.filter('surveyChanged')('protectionOrder')
            if(options.name=="ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        //console.log(this.step.result)

        if (this.step.result && this.step.result.questionnaireSurvey && this.step.result.questionnaireSurvey.orderType) {
            const orderType = this.step.result.questionnaireSurvey.orderType
            if (orderType == 'changePO' || orderType == 'terminatePO') {
                this.survey.setVariable("newApp", false);

            } else if (orderType == 'needPO') {
                this.survey.setVariable("newApp", true);
            }        
        }

        if (this.step.result && this.step.result.yourInformationSurveyPO) {
            this.survey.data = this.step.result.yourInformationSurveyPO.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
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

        //console.log(this.survey.data["ApplicantName"])    

        if(this.survey.data && this.survey.data["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {yourInformationSurveyPO: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
       
        const step = this.steps[this.stPgNo.COMMON._StepNo]

        if (this.types.length > 1) {
            if (step.result && step.result.yourInformationSurvey && step.result.yourInformationSurvey.data) {
                const yourInformationSurveyCommon = step.result.yourInformationSurvey
                yourInformationSurveyCommon.data.ApplicantName = this.survey.data["ApplicantName"]
                yourInformationSurveyCommon.data.ApplicantDOB = this.survey.data["ApplicantDOB"]
                // console.log("common information already exists");
                // console.log(step.result.yourInformationSurvey)
                this.UpdateStepResultData({step:step, data: {yourInformationSurvey: yourInformationSurveyCommon }})
            } else {
                this.UpdateStepResultData({step:step, data: {yourInformationSurvey: Vue.filter('getSurveyResults')(this.survey, 2, 1)}});
            }
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
