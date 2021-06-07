<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/about-parenting-order.json";

import PageBase from "../../PageBase.vue";
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

export default class AboutParentingArrangements extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void    

    
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
            Vue.filter('surveyChanged')('familyLawMatter')
            this.setPages();
        })
    }

    public setPages(){

        const p = this.stPgNo.FLM
        const paPages =    [p.ParentingArrangementChanges, p.BestInterestsOfChild]
        const paPagesAll = [p.ParentingArrangementChanges, p.BestInterestsOfChild, p.FlmAdditionalDocuments, p.ReviewYourAnswersFLM]

        this.togglePages([p.ReviewYourAnswersFLM], true);
        if (this.survey.data.existingType == 'ExistingOrder') {
            this.disableNextButton = false;
            if(this.survey.data.orderDifferenceType == 'changeOrder'){
                this.togglePages(paPages, true);

            } else if(this.survey.data.orderDifferenceType == 'cancelOrder') {
                this.togglePages([p.BestInterestsOfChild], true);
                this.togglePages([p.ParentingArrangementChanges], false);
            }
        } else if (this.survey.data.existingType == 'ExistingAgreement') {
            this.disableNextButton = false;
            if(this.survey.data.agreementDifferenceType == 'replacedAgreement'){
                this.togglePages(paPages, true);

            } else if(this.survey.data.agreementDifferenceType == 'setAsideAgreement') {
                this.togglePages([p.BestInterestsOfChild], true);
                this.togglePages([p.ParentingArrangementChanges], false);
            }
        } else if (this.survey.data.existingType == 'Neither') {
            this.disableNextButton = true;
            this.togglePages(paPagesAll, false);
        }         
    }     
       

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result.aboutParentingArrangementsSurvey){
            this.survey.data = this.step.result.aboutParentingArrangementsSurvey.data;
            if (this.survey.data.existingType == 'Neither') {
                this.disableNextButton = true;
            } 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }         
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.setPages();
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

        this.UpdateStepResultData({step:this.step, data: {aboutParentingArrangementsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
