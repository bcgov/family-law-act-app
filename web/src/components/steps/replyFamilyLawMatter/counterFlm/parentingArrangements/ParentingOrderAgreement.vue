<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/parenting-order.json";

import PageBase from "../../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase
    }
})

export default class ParentingOrderAgreement extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
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
            Vue.filter('surveyChanged')('replyFlm')
            this.setPages()
        })
    }

    public setPages(){

        const p = this.stPgNo.RFLM
        if (this.survey.data?.applyingGuardianApplicant == 'n' && this.survey.data?.guardianApplicant == 'n') {
            togglePages([p.AboutParentingArrangements, p.ParentingArrangementChanges, p.BestInterestsOfChild, p.ReviewYourAnswersRFLM, p.PreviewFormsRFLM], false, this.currentStep);//, p.FlmAdditionalDocuments
            Vue.filter('requestRflmRequiredDocs')(this.currentPage, this.currentStep, false, 'counter')
            
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);
        } else {
            togglePages([p.AboutParentingArrangements, p.ReviewYourAnswersRFLM], true, this.currentStep);
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        }      
 
    }

    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.parentingOrderAgreementSurvey){
            this.survey.data = this.step.result.parentingOrderAgreementSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        if (this.step.result?.childrenInfoSurvey) {
            const childData = this.step.result.childrenInfoSurvey.data;            
            if (childData?.length>1){
                this.survey.setVariable("childWording", "children");                    
            } else {
                this.survey.setVariable("childWording", "child");
            }
        }

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
        this.UpdateStepResultData({step:this.step, data: {parentingOrderAgreementSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>