<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
       <review-your-answers-page :questionResults="questionResults" :step="step" @pageHasError="handlePageHasError" />
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import {whichAgreementEnfrcForm} from './RequiredFormEnfrc'
import { togglePages } from '@/components/utils/TogglePages';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import ReviewYourAnswersPage from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersPage.vue"
import {getQuestionResults} from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersQuestions"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase,
        ReviewYourAnswersPage
    }
})

export default class ReviewYourAnswersEnfrc extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    questionResults = [];
    currentStep =0;
    currentPage =0;
    pageHasError = false;

    form26 = false;
    form27 = false;
    form28 = false;
    form29 = false;
 

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        if(this.pageHasError) this.UpdatePathwayCompleted({pathway:"agreementEnfrc", isCompleted:false});        
        this.toggleFormPages();
        this.setFormsProgress(); 
    }

    mounted(){
        this.pageHasError = false;
        const requiredForm = whichAgreementEnfrcForm();
        this.form26 = requiredForm.includes('P26');
        this.form27 = requiredForm.includes('P27');
        this.form28 = requiredForm.includes('P28');
        this.form29 = requiredForm.includes('P29');    

        for(const form of ['26','27','28']){
            if(requiredForm.includes('P'+form) == false){
                Vue.filter('removeRequiredDocuments')('agreementEnfrc'+form)
            }
        }
        
        this.reloadPageInformation();
        this.checkStepHasError();
    }

    public setFormsProgress(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.ENFRC.PreviewForm26ENFRC,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.ENFRC.PreviewForm27ENFRC,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.ENFRC.PreviewForm28ENFRC,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.ENFRC.PreviewForm29ENFRC,  50, false);
        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
    }

    public checkStepHasError(){

        const optionalLabels = ["Preview Form 26","Preview Form 27","Preview Form 28","Preview Form 29"]        
        const step = this.$store.state.Application.steps[this.currentStep]            
        for(const page of step.pages){
            if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                this.pageHasError = true;
                break;
            }
        }
    }

    public toggleFormPages(){
        togglePages([this.stPgNo.ENFRC.PreviewForm26ENFRC], !this.pageHasError && this.form26, this.currentStep);
        togglePages([this.stPgNo.ENFRC.PreviewForm27ENFRC], !this.pageHasError && this.form27, this.currentStep);
        togglePages([this.stPgNo.ENFRC.PreviewForm28ENFRC], !this.pageHasError && this.form28, this.currentStep);
        togglePages([this.stPgNo.ENFRC.PreviewForm29ENFRC], !this.pageHasError && this.form29, this.currentStep);
    }

    public handlePageHasError(event){
        this.pageHasError = event
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress<100){            
           this.setFormsProgress();
        }
        
        this.questionResults = getQuestionResults([this.stPgNo.COMMON._StepNo, this.stPgNo.ENFRC._StepNo], this.currentStep)
    
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
        
        this.toggleFormPages();
    }   
    
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()       
    }
   
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, true);       
    }
}
</script>