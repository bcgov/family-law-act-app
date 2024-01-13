<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <review-your-answers-page :questionResults="questionResults" :step="step" @pageHasError="handlePageHasError" />
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import {whichForm} from './RequiredFormCsvEFSP';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import ReviewYourAnswersPage from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersPage.vue"
import {getQuestionResults} from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersQuestions"
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase,
        ReviewYourAnswersPage
    }
})

export default class ReviewYourAnswersCsv extends Vue {
    
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

    form49 = false;
    form51 = false;

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        if(this.pageHasError) this.UpdatePathwayCompleted({pathway:"affidavitPersonalServicePO", isCompleted:false})
        this.toggleFormPages();
        this.setFormsProgress(); 
    }

    mounted(){
        this.pageHasError = false;
        const requiredForm = whichForm();
        this.form49 = requiredForm.includes('P49');
        this.form51 = requiredForm.includes('P51');        
        this.reloadPageInformation();
        this.checkStepHasError();
    }

    public toggleFormPages(){
        togglePages([this.stPgNo.CSV.PreviewFormsCSV], !this.pageHasError && this.form49, this.currentStep);
        togglePages([this.stPgNo.CSV.PreviewFormsCsvEFSP], !this.pageHasError && this.form51, this.currentStep);        
    }

    public setFormsProgress(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.CSV.PreviewFormsCSV,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.CSV.PreviewFormsCsvEFSP,  50, false);      
        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
    }

    public checkStepHasError(){

        const optionalLabels = ["Preview Form 49","Preview Form 51"];        
        const step = this.$store.state.Application.steps[this.currentStep];

        for(const page of step.pages){
            if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                this.pageHasError = true;
                break;
            }
        }
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

        this.questionResults = getQuestionResults([this.stPgNo.OTHER._StepNo, this.stPgNo.CSV._StepNo], this.currentStep)
           
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