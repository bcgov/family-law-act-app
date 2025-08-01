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
export default class FlmBackground extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 
    otherPartyNames = [];
    currentStep =0;
    currentPage =0;

    formOneRequired = false;

    selectedForms = [];
    allPages = []    
    
    commonPages = [];

    childRelatedPages = [];

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

    companionAnimalNewPages = []
    companionAnimalExistingPages = []

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
        this.allPages = _.range(p.ParentingArrangements, Object.keys(this.stPgNo.FLM).length-1) 

        this.commonPages = [p.ReviewYourAnswersFLM];

        this.childRelatedPages = [p.ChildrenInfo];

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

        this.companionAnimalNewPages = [p.PropertyDivisionCompanionAnimal, p.CompanionAnimalFacts]
        this.companionAnimalExistingPages = [p.CompanionAnimalExistingAgreement]

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
       
        if (stepCOM.result?.otherPartyCommonSurvey?.data) {
            
            const otherPartyData = stepCOM.result.otherPartyCommonSurvey.data;            
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

        this.formOneRequired = false;

        const stepCOM = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo]

        if( stepCOM.result?.filingLocationSurvey?.data){
            const filingLocationData = stepCOM.result.filingLocationSurvey.data;
            this.formOneRequired = this.determineFormOneRequired(filingLocationData);            
        }

        this.survey.setVariable("formOneRequired", this.formOneRequired);
        
        this.setPages()
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public setPages() {
        if (this.selectedForms) {
                        
            togglePages(this.allPages, false, this.currentStep);

            if (this.selectedForms.length > 0){
                togglePages(this.commonPages, true, this.currentStep);
            }
            if (this.formOneRequired){
                if (this.selectedForms.includes("parentingArrangements") || 
                    this.selectedForms.includes("childSupport") ||
                    this.selectedForms.includes("contactWithChild") ||
                    this.selectedForms.includes("guardianOfChild")){
                        togglePages(this.childRelatedPages, true, this.currentStep);
                    } else {
                        togglePages(this.childRelatedPages, false, this.currentStep);
                    }

            } else {

                if (this.selectedForms.includes("parentingArrangements")){                
                    if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Parenting Arrangements including `parental responsibilities` and `parenting time`'))
                        togglePages(this.parentingArrangementsExistingPages, true, this.currentStep);
                    else    
                        togglePages(this.parentingArrangementsNewPages, true, this.currentStep);               
                } 

                if (this.selectedForms.includes("childSupport")) {
                    if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Child Support'))
                        togglePages(this.childSupportExistingPages, true, this.currentStep);
                    else
                        togglePages(this.childSupportNewPages, true, this.currentStep);
                }

                if (this.selectedForms.includes("contactWithChild")) {
                    if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Contact with a Child')){
                        togglePages(this.contactWithChildNewPages, false, this.currentStep);
                        togglePages(this.contactWithChildExistingPages, true, this.currentStep);
                    } else {
                        togglePages(this.contactWithChildExistingPages, false, this.currentStep);
                        togglePages(this.contactWithChildNewPages, true, this.currentStep);
                    }                    
                }

                if (this.selectedForms.includes("guardianOfChild")) {                
                    togglePages(this.guardianOfChildNewPages, true, this.currentStep);
                }

                if (this.selectedForms.includes("spousalSupport")) {
                    if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Spousal Support'))
                        togglePages(this.spousalSupportExistingPages, true, this.currentStep);
                    else
                        togglePages(this.spousalSupportNewPages, true, this.currentStep);
                }

                if (this.selectedForms.includes("companionAnimal")) { 
                    if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Property Division in Respect of a Companion Animal'))
                        togglePages(this.companionAnimalExistingPages , true, this.currentStep);
                    else          
                        togglePages(this.companionAnimalNewPages, true, this.currentStep);
                }

            }

           
        }
    }

    public determineFormOneRequired(filingLocationData){
        
        let location = ''
        location = filingLocationData?.ExistingCourt;                
        
        if(Vue.filter('includedInRegistries')(location, 'early-resolutions') && (filingLocationData?.MetEarlyResolutionRequirements == 'n' && filingLocationData?.courtLocationVictoriaSurrey)){
            return true;
        } else {
            return false;
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
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true); 

        this.UpdateStepResultData({step:this.step, data: {flmBackgroundSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>