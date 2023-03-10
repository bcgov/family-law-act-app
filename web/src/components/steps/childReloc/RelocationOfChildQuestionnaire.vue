<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/reloc-questionnaire.json";

import PageBase from "../PageBase.vue";
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

export default class RelocationOfChildQuestionnaire extends Vue {
    
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
            Vue.filter('surveyChanged')('childReloc')

            this.setPages();
        })
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.relocQuestionnaireSurvey?.data) {
            this.survey.data = this.step.result.relocQuestionnaireSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName); 
            this.setPages();                 
        }        

        this.determineProgress();
    }

    public setPages() {

        const p = this.stPgNo.RELOC;
        const relocationOfChildPagesAll = [p.RelocChildrenInfo, p.RelocChildBestInterestInfo, p.ReviewYourAnswersRELOC ]

        if (this.survey.data?.ExistingParentingArrangements == 'n' || 
           (this.survey.data?.ExistingParentingArrangements == 'y' && this.survey.data?.impactOnChild == 'n')) {
                togglePages(relocationOfChildPagesAll, false, this.currentStep);
                Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
                this.disableNextButton = true;
        } else {
            togglePages(relocationOfChildPagesAll, true, this.currentStep);
            this.disableNextButton = false;
        }
    }

    public determineProgress(){
        if (this.survey.data?.ExistingParentingArrangements == 'n' || 
            (this.survey.data?.ExistingParentingArrangements == 'y' && this.survey.data?.impactOnChild == 'n')) {            
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
            
        } else {
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        }
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
        this.determineProgress();
        this.UpdateStepResultData({step:this.step, data: {relocQuestionnaireSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}});
    }
}
</script>
