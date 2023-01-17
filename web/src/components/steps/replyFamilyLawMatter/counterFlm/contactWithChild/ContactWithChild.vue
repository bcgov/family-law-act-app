<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/contact-with-child.json";

import PageBase from "../../../PageBase.vue";
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

export default class ContactWithChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

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

    mounted(){
        this.disableNextButton = false;  
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
            Vue.filter('surveyChanged')('replyFlm')
            this.setPages()
        })
    }    
    
    public setPages(){        
        let pgPages = []
        let pgPagesAll = []
        
        const p = this.stPgNo.RFLM
        pgPages =    [p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild, p.ReviewYourAnswersRFLM]
        pgPagesAll = [p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild, p.ReviewYourAnswersRFLM]//, p.FlmAdditionalDocuments]
      
        if (this.survey.data?.parentGuardianApplicant) {
            if (this.survey.data.parentGuardianApplicant == 'y') {
                this.disableNextButton = true;
                togglePages(pgPagesAll, false, this.currentStep);
                Vue.filter('requestRflmRequiredDocs')(this.currentPage, this.currentStep, false, 'counter')
            } else {
                this.disableNextButton = false;
                togglePages(pgPages, true, this.currentStep);
            }
        }             
    }
    
    public reloadPageInformation() {
        if (this.step.result?.contactWithChildSurvey?.data) {
            this.survey.data = this.step.result.contactWithChildSurvey.data;

            if (this.survey.data?.parentGuardianApplicant == 'y') {
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

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.setPages()
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
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {contactWithChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>