<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/filingOptions.json";

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import PageBase from "../PageBase.vue";

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

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

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

        let progress = 50;
        if(Object.keys(this.survey.data).length)
            progress = this.survey.isCurrentPageHasErrors? 50 : 100;

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            //console.log(this.survey.data);
            // console.log(options)
            if(this.survey.data.selectedFilingType == 'byemail'){
                this.togglePages([0,2,3], true);
                this.togglePages([1], false);
            }else{
                this.togglePages([0,1,3], true);
                this.togglePages([2], false);
            }
        })
    }

    public togglePages(pageArr, activeIndicator) {
        //this.activateStep(activeIndicator);
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.step.id,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }
    
    public onPrev() {
        //this.$store.dispatch("application/gotoPrevStepPage");
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            //this.$store.dispatch("application/gotoNextStepPage");
            this.UpdateGotoNextStepPage()
        }
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }


    beforeDestroy() {

        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        const currPage = document.getElementById("step-" + this.currentStep+"-page-" + this.currentPage);
        if(currPage) currPage.style.color=this.survey.isCurrentPageHasErrors?"red":"";

        this.UpdateStepResultData({step:this.step, data: {filingOptions: this.survey.data}})
        
        // this.$store.commit("Application/updateStepResultData",{
        //     step: this.step,
        //     data:{filingOptions: this.survey.data}
        // })
    }
}
</script>