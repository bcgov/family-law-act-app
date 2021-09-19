<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/contact-order.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
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

export default class ContactWithChildOrder extends Vue {
    
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
        
            this.setPages()
        })
    }    
            
    public setPages(){ 

        const p = this.stPgNo.FLM
        const pgPages =    [ p.AboutContactWithChildOrder,p.ContactWithChildBestInterestsOfChild]
        const pgPagesAll = [ p.AboutContactWithChildOrder,p.ContactWithChildBestInterestsOfChild, p.ReviewYourAnswersFLM, p.FlmAdditionalDocuments]


        togglePages([p.ReviewYourAnswersFLM], true, this.currentStep);           
        if (this.survey.data?.existingType == 'ExistingOrder') {
            this.disableNextButton = false;
            if(this.survey.data.orderDifferenceType == 'changeOrder'){
                togglePages(pgPages, true, this.currentStep);

            } else if(this.survey.data.orderDifferenceType == 'cancelOrder') {
                togglePages([p.ContactWithChildBestInterestsOfChild], true, this.currentStep);
                togglePages([p.AboutContactWithChildOrder], false, this.currentStep);
            }
        } else if (this.survey.data?.existingType == 'ExistingAgreement') {
            this.disableNextButton = false;
            if(this.survey.data.agreementDifferenceType == 'replacedAgreement'){
                togglePages(pgPages, true, this.currentStep);
                
            } else if(this.survey.data.agreementDifferenceType == 'setAsideAgreement') {
                togglePages([p.ContactWithChildBestInterestsOfChild], true, this.currentStep);
                togglePages([p.AboutContactWithChildOrder], false, this.currentStep);
            }
        } else if (this.survey.data?.existingType == 'Neither') {
            
            togglePages(pgPagesAll, false, this.currentStep);
            this.disableNextButton = true;            
        }
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.contactWithChildOrderSurvey?.data) {
            this.survey.data = this.step.result.contactWithChildOrderSurvey.data;
            if (this.survey.data?.existingType == 'Neither') {
                this.disableNextButton = true;
            }      
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);                  
        }

        if (this.step.result?.childrenInfoSurvey?.data) {            
            const childData = this.step.result.childrenInfoSurvey.data;            
            if (childData?.length>1){
                this.survey.setVariable("childWording", "children");                    
            } else {
                this.survey.setVariable("childWording", "child");
            }
        }       

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
        
        this.UpdateStepResultData({step:this.step, data: {contactWithChildOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>