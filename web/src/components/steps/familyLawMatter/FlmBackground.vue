<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as _ from 'underscore';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/flm-background.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class FlmBackground extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

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
    allPages = _.range(3,41)    
    
    //additional documents page && review-answers page
    commonPages = [39];

    parentingArrangementsNewPages = [2, 3, 4, 5, 6, 10]; 
    parentingArrangementsExistingPages = [2, 7, 8];    

    childSupportNewPages = [2, 11, 12, 13, 14, 17, 18, 19];
    childSupportExistingPages = [2, 15, 16, 17, 20, 21];

    contactWithChildNewPages = [2, 22, 24, 25]
    contactWithChildExistingPages = [2, 23, 24, 25]

    guardianOfChildNewPages = [2, 26, 28]
    guardianOfChildExistingPages = [2]

    spousalSupportNewPages = [29, 30, 31, 35]
    spousalSupportExistingPages = [32, 35, 37]

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
        //console.log(this.allPages)
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
            //console.log(options)
            //console.log(this.survey.data)
            this.setPages()
        })
    }

    public adjustSurveyForOtherParties(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));       
       
        if (this.steps[2].result && this.steps[2].result['otherPartyCommonSurvey'] && this.steps[2].result['otherPartyCommonSurvey'].data) {
            
            const otherPartyData = this.steps[2].result['otherPartyCommonSurvey'].data;            
            for (const otherParty of otherPartyData){
                this.surveyJsonCopy.pages[0].elements[0].elements[8]["choices"].push(Vue.filter('getFullName')(otherParty.name));
                this.otherPartyNames.push(Vue.filter('getFullName')(otherParty.name));
            }                 
        }
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['flmBackgroundSurvey'] && this.step.result['flmBackgroundSurvey'].data){
            this.survey.data = this.step.result['flmBackgroundSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }
        
        if (this.otherPartyNames.length > 1){
            this.survey.setVariable("multipleOP", true); 
            console.log("show")               
        } else {
            this.survey.setVariable("multipleOP", false);
        }       

        if (this.step.result && this.step.result['flmSelectedForm']){
            this.selectedForms = this.step.result['flmSelectedForm'].data
        }
        
        if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress<100){
            this.setPages()
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        //console.log(this.step.result['flmSelectedForm'].data)
        
    }


    public setPages() {
        
        // console.log(selectedForm)
        if (this.selectedForms) {
                        
            this.togglePages(this.allPages, false);

            if (this.selectedForms.length > 0){
                this.togglePages(this.commonPages, true);
            }

            if (this.selectedForms.includes("parentingArrangements")){                
                if(this.survey.data.ExistingOrdersFLM == 'y' && this.survey.data.existingOrdersListFLM && this.survey.data.existingOrdersListFLM.includes('Parenting Arrangements including `parental responsibilities` and `parenting time`'))
                    this.togglePages(this.parentingArrangementsExistingPages, true);
                else    
                    this.togglePages(this.parentingArrangementsNewPages, true);               
            } 

            if (this.selectedForms.includes("childSupport")) {
                if(this.survey.data.ExistingOrdersFLM == 'y' && this.survey.data.existingOrdersListFLM && this.survey.data.existingOrdersListFLM.includes('Child Support'))
                    this.togglePages(this.childSupportExistingPages, true);
                else
                    this.togglePages(this.childSupportNewPages, true);
            } 
            if (this.selectedForms.includes("contactWithChild")) {
                if(this.survey.data.ExistingOrdersFLM == 'y' && this.survey.data.existingOrdersListFLM && this.survey.data.existingOrdersListFLM.includes('Contact with a Child')){
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
                if(this.survey.data.ExistingOrdersFLM == 'y' && this.survey.data.existingOrdersListFLM && this.survey.data.existingOrdersListFLM.includes('Spousal Support'))
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
