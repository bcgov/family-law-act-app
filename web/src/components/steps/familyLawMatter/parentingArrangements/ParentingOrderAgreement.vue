<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/parenting-order.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ParentingOrderAgreement extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    selectedPOOrder = null;
    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

    additionalDocumentsPage = 38; 
    reviewAnswersPage = 39;
    previewPdfPage = 40 ;

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
            Vue.filter('surveyChanged')('familyLawMatter')
            this.setPages()
        })
    }

    public setPages(){
        if (this.survey.data.applyingGuardianApplicant && this.survey.data.guardianApplicant) {
            if (this.survey.data.applyingGuardianApplicant == 'n' && this.survey.data.guardianApplicant == 'n') {
                this.togglePages([8, 9, 10, this.additionalDocumentsPage, this.reviewAnswersPage, this.previewPdfPage], false);
            } else {
                this.togglePages([8,  this.reviewAnswersPage], true);
            }
        }   
    }

    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result.parentingOrderAgreementSurvey){
            this.survey.data = this.step.result.parentingOrderAgreementSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }
        // console.log(this.step.result)

        if (this.step.result && this.step.result.childData) {
            const childData = this.step.result.childData.data;            
            if (childData.length>1){
                this.survey.setVariable("childWording", "children");                    
            } else {
                this.survey.setVariable("childWording", "child");
            }
        }

        this.setPages()
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
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

        this.UpdateStepResultData({step:this.step, data: {parentingOrderAgreementSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
