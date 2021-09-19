<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <review-your-answers-page :questionResults="questionResults" :step="step" @pageHasError="handlePageHasError" />
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";
import { togglePages } from '@/components/utils/TogglePages';

import ReviewYourAnswersPage from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersPage.vue"
import {getQuestionResults} from "@/components/utils/ReviewYourAnswers/ReviewYourAnswersQuestions"

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

export default class ReviewYourAnswersFlm extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    questionResults = [];
    currentStep =0;
    currentPage =0;
    pageHasError = false;

    @Watch('pageHasError')
    nextPageChange(newVal) 
    {
        togglePages([this.stPgNo.FLM.PreviewFormsFLM], !this.pageHasError, this.currentStep);
        if(this.pageHasError) this.UpdatePathwayCompleted({pathway:"familyLawMatter", isCompleted:false})
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.FLM.PreviewFormsFLM,  50, false);
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
    }

    mounted(){
        this.pageHasError = false;
        this.reloadPageInformation();  
        this.checkStepHasError()      
    }

    public handlePageHasError(event){
        this.pageHasError = event
    }  
    
    public checkStepHasError(){

        const optionalLabels = ["Preview Forms"]        
        const step = this.$store.state.Application.steps[this.currentStep]            
        for(const page of step.pages){
            if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                this.pageHasError = true;
                break;
            }
        }
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress<100){            
           Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.FLM.PreviewFormsFLM,  50, false);
        }

        this.questionResults = getQuestionResults([this.stPgNo.COMMON._StepNo, this.stPgNo.FLM._StepNo], this.currentStep)        
         
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, false);
        togglePages([this.stPgNo.FLM.PreviewFormsFLM], !this.pageHasError, this.currentStep);         
    }
    
    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()       
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, this.pageHasError? 50: 100, true);
    }
}
</script>