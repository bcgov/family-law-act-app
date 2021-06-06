<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/existing-spousal-support-order-agreement.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import ReviewYourAnswers from '../../protectionOrder/reviewPo/ReviewYourAnswers.vue';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ExistingSpousalSupportOrderAgreement extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;    
    currentStep=0;
    currentPage=0;

    existingSpousalSupportPages = [33, 34, 35, 36, 37, 38, 39]
    existingSpousalSupportFinalOrderPage = 33
    existingSpousalSupportAgreementPage = 34
    calculatingSpousalSupportPage = 35
    unpaidSpousalSupportPage = 37

    additionalDocumentsPage = 38 
    reviewYourAnswersPage = 39

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
            //console.log(this.survey.data)

            this.setPages()
            
            if (options.name = 'fillOutForm'){
                // console.log(options)
                if (options.value == 'completeNow'){
                    window.open('https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178')
                }
            }

        })
    }

    public setPages(){
        if (this.survey.data.existingType == 'ExistingOrder') {
            this.disableNextButton = false;
            this.togglePages([this.existingSpousalSupportFinalOrderPage, this.calculatingSpousalSupportPage, this.unpaidSpousalSupportPage,  this.reviewYourAnswersPage], true); 
            this.togglePages([this.existingSpousalSupportAgreementPage], false);               
        } else if (this.survey.data.existingType == 'ExistingAgreement') {
            this.disableNextButton = false;
            this.togglePages([this.existingSpousalSupportAgreementPage, this.calculatingSpousalSupportPage, this.unpaidSpousalSupportPage,  this.reviewYourAnswersPage], true); 
            this.togglePages([this.existingSpousalSupportFinalOrderPage], false);                
        } else if (this.survey.data.existingType == "Neither") {
            this.togglePages(this.existingSpousalSupportPages, false);
            this.disableNextButton = true;
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
        if (this.step.result && this.step.result.existingSpousalSupportOrderAgreementSurvey) {
            this.survey.data = this.step.result.existingSpousalSupportOrderAgreementSurvey.data; 
            
            if (this.survey.data.existingType == 'Neither') {
                this.disableNextButton = true;
            } 

            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.setPages()
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
        this.UpdateStepResultData({step:this.step, data: {existingSpousalSupportOrderAgreementSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
