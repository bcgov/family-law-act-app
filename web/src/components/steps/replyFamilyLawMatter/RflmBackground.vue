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
import surveyJson from "./forms/rflm-background.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import {rflmQuestionnaireDataInfoType} from '@/types/Application/ReplyFamilyLawMatter';

@Component({
    components:{
        PageBase
    }
})
export default class RflmBackground extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;   

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);

    currentStep =0;
    currentPage =0;

    allPages = [];
    counter = false;
    counterList = []; 
    selectedCounterApplications = [];

    selectedRepliesData = {} as rflmQuestionnaireDataInfoType;
    
    commonPages = [];
    counterCommonPages = []

    parentingArrangementsNewPages = []; 
    parentingArrangementsExistingPages = [];    

    childSupportNewPages = [];
    childSupportExistingPages = [];

    contactWithChildNewPages = []
    contactWithChildExistingPages = []

    guardianOfChildNewPages = []

    spousalSupportNewPages = []
    spousalSupportExistingPages = []

    rflmChildRelatedPages = [];

    rflmParentingArrangementsNewPages = []
    rflmParentingArrangementsExistingPages = []

    rflmChildSupportNewPages = []
    rflmChildSupportExistingPages = []

    rflmContactWithChildNewPages = []
    rflmContactWithChildExistingPages = []

    rflmAppointingGuardianshipPages = []
    rflmCancellingGuardianshipPages = []

    rflmSpousalSupportNewPages = []
    rflmSpousalSupportExistingPages = []

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){        
        this.initPageNumbers();
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
            this.setPages();
           
        })
    }

    public setPages() {
        togglePages(this.allPages, false, this.currentStep);            
        togglePages(this.commonPages, true, this.currentStep);
        this.setCounterPages()
        this.setReplyPages()
    }
    
    public setCounterPages() {

        if (this.getSelectedCounters()) {
            
            this.selectedCounterApplications = [];
            
            togglePages(this.counterCommonPages, true, this.currentStep);

            if (this.counterList.includes("parentingArrangements")){                
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && 
                this.survey.data?.existingOrdersListFLM?.includes('Parenting Arrangements including `parental responsibilities` and `parenting time`')){
                    togglePages(this.parentingArrangementsExistingPages, true, this.currentStep);
                    this.selectedCounterApplications.push("existingParentingArrangements");
                } else {
                    togglePages(this.parentingArrangementsNewPages, true, this.currentStep);  
                    this.selectedCounterApplications.push("newParentingArrangements");
                }                                   
            } 

            if (this.counterList.includes("childSupport")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && 
                this.survey.data?.existingOrdersListFLM?.includes('Child Support')){
                    togglePages(this.childSupportExistingPages, true, this.currentStep);
                    this.selectedCounterApplications.push("existingChildSupport");
                } else {
                    togglePages(this.childSupportNewPages, true, this.currentStep);
                    this.selectedCounterApplications.push("newChildSupport");
                }                    
            }

            if (this.counterList.includes("contactWithChild")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Contact with a Child')){
                    togglePages(this.contactWithChildNewPages, false, this.currentStep);
                    togglePages(this.contactWithChildExistingPages, true, this.currentStep);
                    this.selectedCounterApplications.push("existingContactWithChild");
                } else {
                    togglePages(this.contactWithChildExistingPages, false, this.currentStep);
                    togglePages(this.contactWithChildNewPages, true, this.currentStep);
                    this.selectedCounterApplications.push("newContactWithChild");
                }                    
            }

            if (this.counterList.includes("guardianOfChild")) {                
                togglePages(this.guardianOfChildNewPages, true, this.currentStep);
                this.selectedCounterApplications.push("guardianOfChild");
            }

            if (this.counterList.includes("spousalSupport")) {
                if(this.survey.data?.ExistingOrdersFLM == 'y' && this.survey.data?.existingOrdersListFLM && this.survey.data?.existingOrdersListFLM?.includes('Spousal Support')) {
                    togglePages(this.spousalSupportExistingPages, true, this.currentStep);
                    this.selectedCounterApplications.push("existingSpousalSupport");
                } else {
                    togglePages(this.spousalSupportNewPages, true, this.currentStep);
                    this.selectedCounterApplications.push("newSpousalSupport");
                }
            }           
        }
    }

    public rflmChildRelatedCounter(){

        const childRelated = (this.counter && 
                (this.counterList.includes("parentingArrangements") ||
                this.counterList.includes("childSupport") ||
                this.counterList.includes("contactWithChild") ||
                this.counterList.includes("guardianOfChild")));

        return childRelated;
    }

    public setReplyPages() {

        if (this.getSelectedReplies) {

            togglePages(this.rflmChildRelatedPages, this.rflmChildRelatedCounter, this.currentStep);

            if (this.selectedRepliesData.selectedParentingArrangementsForm.length > 0){                
                if(this.selectedRepliesData.selectedParentingArrangementsForm.includes("existingParentingArrangements"))
                    togglePages(this.rflmParentingArrangementsExistingPages, true, this.currentStep);
                else    
                    togglePages(this.rflmParentingArrangementsNewPages, true, this.currentStep);               
            }
            
            if (this.selectedRepliesData.selectedChildSupportForm.length > 0){                
                if(this.selectedRepliesData.selectedChildSupportForm.includes("existingChildSupport"))
                    togglePages(this.rflmChildSupportExistingPages, true, this.currentStep);
                else    
                    togglePages(this.rflmChildSupportNewPages, true, this.currentStep);               
            } 

            if (this.selectedRepliesData.selectedContactWithChildForm.length > 0){                
                if(this.selectedRepliesData.selectedContactWithChildForm.includes("existingContact"))
                    togglePages(this.rflmContactWithChildExistingPages, true, this.currentStep);
                else    
                    togglePages(this.rflmContactWithChildNewPages, true, this.currentStep);               
            } 

            if (this.selectedRepliesData.selectedGuardianshipForm.length > 0){                
                if(this.selectedRepliesData.selectedGuardianshipForm.includes("appointing")){
                    togglePages(this.rflmAppointingGuardianshipPages, true, this.currentStep);
                }
                if (this.selectedRepliesData.selectedGuardianshipForm.includes("cancelling")){    
                    togglePages(this.rflmCancellingGuardianshipPages, true, this.currentStep);  
                }             
            } 

            if (this.selectedRepliesData.selectedSpousalSupportForm.length > 0){                
                if(this.selectedRepliesData.selectedSpousalSupportForm.includes("existingSpouseSupport"))
                    togglePages(this.rflmSpousalSupportExistingPages, true, this.currentStep);
                else    
                    togglePages(this.rflmSpousalSupportNewPages, true, this.currentStep);               
            }            
        }
    }

    public getSelectedCounters(){        
        return (this.counter && this.counterList.length>0);
    }

    public getSelectedReplies(){

        const selected = this.selectedRepliesData.selectedParentingArrangementsForm.length>0 || 
                        this.selectedRepliesData.selectedChildSupportForm.length>0 ||
                        this.selectedRepliesData.selectedContactWithChildForm.length>0 ||
                        this.selectedRepliesData.selectedGuardianshipForm.length>0 ||
                        this.selectedRepliesData.selectedSpousalSupportForm.length>0

        return selected;
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.rflmBackgroundSurvey?.data){
            this.survey.data = this.step.result.rflmBackgroundSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        } 

        if (this.step.result?.rflmCounterAppSurvey?.data){
            if (this.step.result.rflmCounterAppSurvey.data.counter == 'Yes'){
                this.survey.setVariable("includesCounter", true);
                this.counter = true;
                this.counterList = this.step.result.rflmCounterAppSurvey.data.counterList?.length>0?this.step.result.rflmCounterAppSurvey.data.counterList:[];
            } else {
                this.survey.setVariable("includesCounter", false);
                this.counterList = [];
            }
        }

        if (this.step.result?.selectedCounterApplications) {
            this.selectedCounterApplications = this.step.result.selectedCounterApplications;
        }

        if (this.step.result?.rflmQuestionnaireSurvey?.data) {
            this.selectedRepliesData = this.step.result.rflmQuestionnaireSurvey.data;
        }

        this.setPages();
       

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public initPageNumbers(){
        const p = this.stPgNo.RFLM        
        this.allPages = _.range(p.RflmChildrenInfo, p.FlmAdditionalDocuments);

        this.commonPages = [p.ReviewYourAnswersRFLM];  
        this.counterCommonPages = [p.YourApplication];
        
        //__Counter Pages_________

        this.parentingArrangementsNewPages = [p.ParentingArrangements, p.ParentalResponsibilities, p.ParentingTime, p.OtherParentingArrangements,  p.BestInterestsOfChild]; 
        this.parentingArrangementsExistingPages = [p.ParentingOrderAgreement, p.AboutParentingArrangements];    

        this.childSupportNewPages = [p.ChildSupport, p.ChildSupportCurrentArrangements, p.IncomeAndEarningPotential, p.AboutChildSupportOrder, p.CalculatingChildSupport, p.UndueHardship, p.SpecialAndExtraordinaryExpenses];
        this.childSupportExistingPages = [p.ChildSupportOrderAgreement, p.AboutExistingChildSupport, p.CalculatingChildSupport, p.AboutChildSupportChanges, p.UnpaidChildSupport];

        this.contactWithChildNewPages = [p.ContactWithChild, p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild]
        this.contactWithChildExistingPages = [p.ContactWithChildOrder, p.AboutContactWithChildOrder, p.ContactWithChildBestInterestsOfChild]

        this.guardianOfChildNewPages = [p.GuardianOfChild, p.IndigenousAncestryOfChild]       

        this.spousalSupportNewPages = [p.SpousalSupport, p.SpousalSupportIncomeAndEarningPotential, p.AboutSpousalSupportOrder, p.CalculatingSpousalSupport]
        this.spousalSupportExistingPages = [p.ExistingSpousalSupportOrderAgreement, p.CalculatingSpousalSupport, p.UnpaidSpousalSupport]

        //__Reply Pages_________        

        this.rflmChildRelatedPages = [p.RflmChildrenInfo];

        this.rflmParentingArrangementsNewPages = [p.RflmChildrenInfo, p.ReplyNewParentingArrangements, p.ReplyNewParentalResponsibilities, p.ReplyNewParentingTime, p.ReplyNewConditionsParentingTime]
        this.rflmParentingArrangementsExistingPages = [p.RflmChildrenInfo, p.ReplyExistingParentingArrangements]   

        this.rflmChildSupportNewPages = [p.RflmChildrenInfo, p.ReplyNewChildSupport, p.RelationshipToChild, p.DisagreeChildSupport, p.RflmCalculatingChildSupport, p.RflmAdditionalDocuments]
        this.rflmChildSupportExistingPages = [p.RflmChildrenInfo, p.ReplyExistingChildSupport, p.RflmUnpaidChildSupport, p.DisagreeExistingChildSupport, p.RflmCalculatingChildSupport]

        this.rflmContactWithChildNewPages = [p.RflmChildrenInfo, p.ReplyNewContactWithChild, p.DisagreeContactWithChild]
        this.rflmContactWithChildExistingPages = [p.RflmChildrenInfo, p.ReplyExistingContactWithChild]

        this.rflmAppointingGuardianshipPages = [p.RflmChildrenInfo, p.ReplyAppointingGuardianOfChild, p.DisagreeAppointingGuardianOfChild]
        this.rflmCancellingGuardianshipPages = [p.RflmChildrenInfo, p.ReplyCancellingGuardianOfChild, p.DisagreeCancellingGuardianOfChild]

        this.rflmSpousalSupportNewPages = [p.ReplyNewSpouseSupport, p.RelationshipToOtherParty, p.DisagreeSpouseSupport, p.RflmSpouseSupportOrder, p.RflmCalculatingSpouseSupport, p.RflmAdditionalDocuments]
        this.rflmSpousalSupportExistingPages = [p.ReplyExistingSpouseSupport, p.RflmUnpaidSpouseSupport, p.DisagreeExistingSpouseSupport, p.RflmCalculatingSpouseSupport, p.RflmAdditionalDocuments]


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

        this.UpdateStepResultData({step:this.step, data: {
            rflmBackgroundSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage), 
            selectedCounterApplications: this.selectedCounterApplications
        }})
    }
}
</script>