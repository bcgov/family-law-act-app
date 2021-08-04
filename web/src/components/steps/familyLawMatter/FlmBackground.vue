<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as _ from 'underscore';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/flm-background.json";

import PageBase from "../PageBase.vue";
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
export default class FlmBackground extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 
    otherPartyNames = [];
    currentStep =0;
    currentPage =0;

    selectedForms = [];
    allPages = []    
    
    commonPages = [];

    parentingArrangementsNewPages = []; 
    parentingArrangementsExistingPages = [];    

    childSupportNewPages = [];
    childSupportExistingPages = [];

    contactWithChildNewPages = []
    contactWithChildExistingPages = []

    guardianOfChildNewPages = []
    guardianOfChildExistingPages = []

    spousalSupportNewPages = []
    spousalSupportExistingPages = []

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initPageNumbers()
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initPageNumbers(){
        const p = this.stPgNo.FLM        
        this.allPages = _.range(p.ParentingArrangements, Object.keys(this.stPgNo.PO).length-1) 

        this.commonPages = [p.ReviewYourAnswersFLM];

        this.parentingArrangementsNewPages = [p.ChildrenInfo, p.ParentingArrangements, p.ParentalResponsibilities, p.ParentingTime, p.OtherParentingArrangements,  p.BestInterestsOfChild]; 
        this.parentingArrangementsExistingPages = [p.ChildrenInfo, p.ParentingOrderAgreement, p.AboutParentingArrangements];    

        this.childSupportNewPages = [p.ChildrenInfo, p.ChildSupport, p.ChildSupportCurrentArrangements, p.IncomeAndEarningPotential, p.AboutChildSupportOrder, p.CalculatingChildSupport, p.UndueHardship, p.SpecialAndExtraordinaryExpenses];
        this.childSupportExistingPages = [p.ChildrenInfo, p.ChildSupportOrderAgreement, p.AboutExistingChildSupport, p.CalculatingChildSupport, p.AboutChildSupportChanges, p.UnpaidChildSupport];

        this.contactWithChildNewPages = [p.ChildrenInfo, p.ContactWithChild, p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild]
        this.contactWithChildExistingPages = [p.ChildrenInfo, p.ContactWithChildOrder, p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild]

        this.guardianOfChildNewPages = [p.ChildrenInfo, p.GuardianOfChild, p.IndigenousAncestryOfChild]
        this.guardianOfChildExistingPages = [p.ChildrenInfo]

        this.spousalSupportNewPages = [p.SpousalSupport, p.SpousalSupportIncomeAndEarningPotential, p.AboutSpousalSupportOrder, p.CalculatingSpousalSupport]
        this.spousalSupportExistingPages = [p.ExistingSpousalSupportOrderAgreement, p.CalculatingSpousalSupport, p.UnpaidSpousalSupport]
    }

    public initializeSurvey(){
        this.adjustSurveyForOtherParties();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
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

    public adjustSurveyForOtherParties(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));
        
        const stepCOM = this.steps[this.stPgNo.COMMON._StepNo]
       
        if (stepCOM.result?.otherPartyCommonSurvey?.data?.otherPartyCommonData) {
            
            const otherPartyData = stepCOM.result.otherPartyCommonSurvey.data.otherPartyCommonData;            
            for (const otherParty of otherPartyData){
                this.surveyJsonCopy.pages[0].elements[0].elements[8]["choices"].push(Vue.filter('getFullName')(otherParty.name));
                this.otherPartyNames.push(Vue.filter('getFullName')(otherParty.name));
            }                 
        }
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.flmBackgroundSurvey?.data){
            this.survey.data = this.step.result.flmBackgroundSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }
        
        if (this.otherPartyNames?.length > 1){
            this.survey.setVariable("multipleOP", true);              
        } else {
            this.survey.setVariable("multipleOP", false);
        }       

        if (this.step.result?.flmQuestionnaireSurvey){
            this.selectedForms = this.step.result.flmQuestionnaireSurvey.data
        }
        
        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress<100){
            this.setPages()
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public setPages() {

        if (this.selectedForms) {
                        
            this.togglePages(this.allPages, false);

            if (this.selectedForms.length > 0){
                this.togglePages(this.commonPages, true);
            }

            if (this.selectedForms.includes("parentingArrangements")){                
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Parenting Arrangements including `parental responsibilities` and `parenting time`'))
                    this.togglePages(this.parentingArrangementsExistingPages, true);
                else    
                    this.togglePages(this.parentingArrangementsNewPages, true);               
            } 

            if (this.selectedForms.includes("childSupport")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Child Support'))
                    this.togglePages(this.childSupportExistingPages, true);
                else
                    this.togglePages(this.childSupportNewPages, true);
            }

            if (this.selectedForms.includes("contactWithChild")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Contact with a Child')){
                    this.togglePages(this.contactWithChildNewPages, false);
                    this.togglePages(this.contactWithChildExistingPages, true);
                } else {
                    this.togglePages(this.contactWithChildExistingPages, false);
                    this.togglePages(this.contactWithChildNewPages, true);
                }                    
            }

            if (this.selectedForms.includes("guardianOfChild")) {                
                this.togglePages(this.guardianOfChildNewPages, true);
            }

            if (this.selectedForms.includes("spousalSupport")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Spousal Support'))
                    this.togglePages(this.spousalSupportExistingPages, true);
                else
                    this.togglePages(this.spousalSupportNewPages, true);
            }
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

        this.UpdateStepResultData({step:this.step, data: {flmBackgroundSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>