<template>
    <page-base  v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
        <b-card style="background-color: #f6e4e6; margin:4rem 0;" v-if="!allCompleted">
            The survey has some incomplete pages ( Forms have not been reviewed, Required questions left unanswered, ... ).
            <div style="width:18rem;margin:1rem auto"> 
                <b-button class="ml-5" variant="primary" @click="checkErrorOnPages"> Navigate to the Error Page </b-button>
            </div>
        </b-card>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/filingOptions.json";

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class FilingOptions extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public allCompleted!: boolean

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

    @Watch('allCompleted')
    statusChanged(newVal) 
    {
        //console.log(newVal)        
        this.determineSelectedFilingType()       
    }

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation()
        //console.log(this.step)
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result["filingOptions"]){
            this.survey.data = this.step.result["filingOptions"];
        }
       
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        
        this.determineSelectedFilingType()
        
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            console.log(this.survey.data);
            // console.log(options)
            this.resetReviewSteps()
            this.determineSelectedFilingType()
        })
    }

    public togglePages(pageArr, activeIndicator) {
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.step.id,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public determineSelectedFilingType(){
        if(this.allCompleted && this.survey.data.selectedFilingType == 'byemail'){
            this.togglePages([2,4], true);
            this.togglePages([1,3], false);
        }else if(this.allCompleted && this.survey.data.selectedFilingType == 'inperson'){
            this.togglePages([1,4], true);
            this.togglePages([2,3], false);
        }else if(this.allCompleted && this.survey.data.selectedFilingType == 'byefiling'){
            this.togglePages([3], true);
            this.togglePages([1,2,4], false);
        }else{
            this.togglePages([1,2,3,4], false);
        }
    }

    public resetReviewSteps(){
        for(let i=1; i<=4; i++)
            this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:i, progress:0 });
    }
    
    public checkErrorOnPages(){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
        for(const stepIndex of [1,2,3,4,5,6,7,8]){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
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
        
        this.UpdateStepResultData({step:this.step, data: {filingOptions: this.survey.data}})
    }
}
</script>