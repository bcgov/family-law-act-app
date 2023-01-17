<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" :disableNext="PPMList.length<1">
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="showPopup" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">
               
                <p>There is another form that you must complete when you are applying for guardianship of a child.
                    It is called <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa733.pdf?forcedownload=true"
                                    target='blank'>Guardianship Affidavit Form 5</a>. Before you can complete the affidavit, 
                    you must complete the following background checks referenced in the form:</p>
                <ul>
                    <li>
                        a Ministry of Children and Family Development record check
                    </li>
                    <li>
                        a protection order record check from the Protection Order Registry, and
                    </li>
                    <li>
                        a criminal record check                       
                    </li>                    
                </ul>
                <p>To get a criminal record check, ask at the police station or RCMP detachment in your community.</p>
                <p>To get the Ministry of Children and Family Development and Protection Order Registry record checks, you must fill out:</p>
                 <ul>
                    <li>
                        a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/supreme-family/s-51-consent-child-protection-record-check.pdf?forcedownload=true"
                        target='blank'>Consent for Child Protection Record Check</a>, and
                    </li>
                    <li>
                        a <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa914.pdf?forcedownload=true"
                        target='blank'>Request for Protection Order Registry Search</a>.
                    </li>                                      
                </ul>
                <p>
                    I understand that I am required to file a Guardianship Affidavit in Form 5 as described in 
                    <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#section26" target='blank'>Rule 26</a> before 
                    the court can make a final order about guardianship.
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="success" @click="closePopup">I understand</b-button>
            </template>            
        </b-modal>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";

import surveyJson from "./forms/priority-parenting-matter-order.json";
import * as _ from 'underscore';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class PriorityParentingMatterOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[]; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep =0;
    currentPage =0;
    PPMpages = [];
    PPMList = [];
    showPopup = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        const p = this.stPgNo.PPM
        this.PPMpages = [p.PpmChildrenInfo, p.PpmBackground, p.AboutPriorityParentingMatterOrder, p.ReviewYourAnswersPPM]
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
            Vue.filter('surveyChanged')('priorityParenting') 

            togglePages(this.PPMpages, this.isChildDetailsRequired(), this.stPgNo.PPM._StepNo);
        
            this.setPages();

            if(options.name == "confirmChildServicesPathway" && options.value?.includes("applyGuardianship")){                
                this.showPopup = true;                 

                if(this.$store.state.Application.steps[this.currentStep].pages[this.stPgNo.PPM.PpmIndigenousAncestryOfChild].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.PPM.PpmIndigenousAncestryOfChild, 50, false);
                if(this.$store.state.Application.steps[this.currentStep].pages[this.stPgNo.PPM.PpmAdditionalDocuments].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, this.stPgNo.PPM.PpmAdditionalDocuments, 50, false);

            }        
        
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
           
        if (this.step.result?.priorityParentingMatterOrderSurvey?.data) {
            this.survey.data = this.step.result.priorityParentingMatterOrderSurvey.data; 
            togglePages(this.PPMpages, this.isChildDetailsRequired(), this.stPgNo.PPM._StepNo);
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);        
        }

        this.setPages();

        if (this.step.result?.ppmQuestionnaireSurvey?.data) {
            const selectedPriorityParentingMatters = this.step.result.ppmQuestionnaireSurvey.data;
            this.determineIssues(selectedPriorityParentingMatters);            
        }                
    }

    public setPages(){         
        if(this.step.result.ppmQuestionnaireSurvey.data.includes('childServices') &&
            this.survey.data?.confirmChildServicesPathway?.includes("applyGuardianship") &&
            this.survey.data?.childRemoved == 'y' &&
            this.survey.data?.confirmChildServices?.includes('applyPPM')){
                togglePages([this.stPgNo.PPM.PpmAdditionalDocuments, this.stPgNo.PPM.PpmIndigenousAncestryOfChild], true, this.currentStep);           
            
        } else {
            togglePages([this.stPgNo.PPM.PpmAdditionalDocuments, this.stPgNo.PPM.PpmIndigenousAncestryOfChild], false, this.currentStep);
        }
    }

    public closePopup(){
        this.showPopup = false;
    }

    public determineIssues(selectedPriorityParentingMatters){
        this.survey.setVariable("preventRemoval", selectedPriorityParentingMatters.includes('preventRemoval'));
        this.survey.setVariable("medical", selectedPriorityParentingMatters.includes('medical'));
        this.survey.setVariable("passport", selectedPriorityParentingMatters.includes('passport'));
        this.survey.setVariable("travel", selectedPriorityParentingMatters.includes('travel'));
        this.survey.setVariable("locationChange", selectedPriorityParentingMatters.includes('locationChange'));
        this.survey.setVariable("interjurisdictional", selectedPriorityParentingMatters.includes('interjurisdictional'));
        this.survey.setVariable("wrongfulRemoval", selectedPriorityParentingMatters.includes('wrongfulRemoval'));
        this.survey.setVariable("returnOfChild", selectedPriorityParentingMatters.includes('returnOfChild'));
        this.survey.setVariable("childServices", selectedPriorityParentingMatters.includes('childServices'));
    }

    public isChildDetailsRequired() {
        let isChildDetailsRequired = false;
        let ppmType = []
        if(this.step.result?.ppmQuestionnaireSurvey?.data )
            ppmType = this.step.result.ppmQuestionnaireSurvey.data

        if (this.survey.data) {  

            const data = this.survey.data;
                    
            const medical = (ppmType.includes('medical')) && (data.delayMedicalRisk == 'y') && (data.confirmMedicalRisk?.includes('applyPPM'));
            const passport = (ppmType.includes('passport')) && (data.delayPassportRisk == 'y') && (data.confirmDelayPassportRisk?.includes('applyPPM'));
            const travel = (ppmType.includes('travel')) && (data.delayTravelRisk == 'y') && (data.travelWrongfullyDenied == 'y') && (data.confirmTravelWrongfullyDenied?.includes('applyPPM'));
            const locationChange = (ppmType.includes('locationChange')) && (data.existingParentingArrangements == 'n') && (data.impactOnRelationship == 'y') && (data.confirmImpactOnRelationship?.includes('applyPPM'));
            const preventRemoval = (ppmType.includes('preventRemoval')) && (data.noReturnRisk == 'y') && (data.confirmNoReturnRisk?.includes('applyPPM')); 
            const interjurisdictional = (ppmType.includes('interjurisdictional')) && (data.childInBC == 'y') && (data.harm == 'y') && (data.confirmHarm?.includes('applyPPM'));
            const wrongfulRemoval = (ppmType.includes('wrongfulRemoval')) && (data.wrongfulInBC == 'y') && (data.confirmWrongfulInBC?.includes('applyPPM'));
            const returnOfChild = (ppmType.includes('returnOfChild')) && (data.wrongfulReturn == 'y') && (data.confirmWrongfulReturn?.includes('applyPPM'));
            const childServices = (ppmType.includes('childServices')) && (data.childRemoved == 'y') && (data.confirmChildServices?.includes('applyPPM'));

           isChildDetailsRequired = medical || passport || travel || locationChange || preventRemoval || interjurisdictional || wrongfulRemoval || returnOfChild || childServices;
           
           this.PPMList = [];
           if (medical){
               this.PPMList.push('medical');
           }
           if (passport){
               this.PPMList.push('passport');
           }
           if (travel){
               this.PPMList.push('travel');
           }
           if (locationChange){
               this.PPMList.push('locationChange');
           }
           if (preventRemoval){
               this.PPMList.push('preventRemoval');
           }
           if(interjurisdictional){
               this.PPMList.push('interjurisdictional');
           }
           if (wrongfulRemoval){
               this.PPMList.push('wrongfulRemoval');
           }
           if (returnOfChild){
               this.PPMList.push('returnOfChild');
           }
           if (childServices){
               this.PPMList.push('childServices');
           }
        }

        const progress = isChildDetailsRequired? 100: 50        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        return isChildDetailsRequired; 
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    } 

    public getPriorityParentingMatterNames(){
        let result = ''       
        for(const form of this.PPMList){
            if(form=='medical')             result+='-Medical, dental or other health-related treatments for a child'+'\n';
            if(form=='passport')            result+='-Application for a passport, license or other thing for a child'+'\n';
            if(form=='travel')              result+='-Travel or participation in an activity for the child'+'\n';
            if(form=='locationChange')      result+='-Change in location of a child’s residence'+'\n';
            if(form=='preventRemoval')      result+='-Preventing the removal of a child'+'\n';
            if(form=='interjurisdictional') result+='-Determining matters relating to interjurisdictional issues under section 74(2)(c) of the Family Law Act'+'\n';
            if(form=='wrongfulRemoval')     result+='-Wrongful removal of a child in BC'+'\n';
            if(form=='returnOfChild')       result+='-Preventing the removal of a child'+'\n';
            if(form=='childServices')       result+='-Parenting arrangements or guardianship of a child who has been removed or is at risk of being removed by the Director'+'\n';
        }
        return result;
    }     

    public modifyPpmQuestionnaire(){

        const allPages = _.range(this.stPgNo.PPM.PriorityParentingMatterOrder, Object.keys(this.stPgNo.PPM).length-1)

        if(this.PPMList.length<1){
            togglePages(allPages, false, this.stPgNo.PPM._StepNo); 
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.PPM._StepNo, currentPage: this.stPgNo.PPM.PpmQuestionnaire });        
            Vue.filter('setSurveyProgress')(null, this.stPgNo.PPM._StepNo, this.stPgNo.PPM.PpmQuestionnaire, 50, true);
        }       

        const questions = [{name:'PpmQuestionnaire',title:'I need help with the following priority parenting matter:',value:this.getPriorityParentingMatterNames()}]        
        this.UpdateStepResultData({step:this.step, data: {ppmQuestionnaireSurvey: {data: this.PPMList, questions: questions, pageName:"Questionnaire", currentStep:this.currentStep, currentPage:this.stPgNo.PPM.PpmQuestionnaire}}});      
    }
    
    beforeDestroy() {        
        this.modifyPpmQuestionnaire();
        this.setPages();
        this.UpdateStepResultData({step:this.step, data: {priorityParentingMatterOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
