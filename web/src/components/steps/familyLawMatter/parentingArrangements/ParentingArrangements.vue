<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/parenting-arrangements.json";

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

export default class ParentingArrangements extends Vue {
    
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
    existing = false;

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
            // console.log(this.survey.data);
            // console.log(options)
            this.setPages()
        })
    }    
    
    public setPages(){
        const p = this.stPgNo.FLM
        const agPages = [p.ParentalResponsibilities, p.ParentingTime, p.OtherParentingArrangements,  p.BestInterestsOfChild]

        if (this.survey.data.applyingGuardianApplicant && this.survey.data.guardianApplicant) {
            if (this.survey.data.applyingGuardianApplicant == 'n' && this.survey.data.guardianApplicant == 'n') {
                this.disableNextButton = true;
                this.togglePages(agPages, false);
            } else {
                this.disableNextButton = false;
                this.togglePages(agPages, true);
            }
        }         
    }   
    
    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        //console.log(this.step.result)
        if (this.step.result && this.step.result.parentingArrangementsSurvey) {
            this.survey.data = this.step.result.parentingArrangementsSurvey.data;
            if (this.survey.data.applyingGuardianApplicant == 'n' && this.survey.data.guardianApplicant == 'n') {
                this.disableNextButton = true;
            } 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }        

        if (this.step.result && this.step.result.flmBackgroundSurvey && this.step.result.flmBackgroundSurvey.data){
            const backgroundSurveyData = this.step.result.flmBackgroundSurvey.data;
            if (backgroundSurveyData.ExistingOrdersFLM == 'y' && backgroundSurveyData.existingOrdersListFLM 
                && backgroundSurveyData.existingOrdersListFLM.length > 0 
                && backgroundSurveyData.existingOrdersListFLM.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                    this.survey.setVariable("existing", true);                    
                } else {
                    this.survey.setVariable("existing", false);
                }
        }

        if (this.step.result && this.step.result.childData) {
            const childData = this.step.result.childData.data;            
            if (childData.length>1){
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

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }
    
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {parentingArrangementsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>


