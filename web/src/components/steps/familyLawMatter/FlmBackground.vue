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

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    selectedForms = [];
    allPages = _.range(3,30)
    commonPages = [];

    parentingArrangementsNewPages = [3, 4, 5, 6, 10]; 
    parentingArrangementsExistingPages = [7, 8];    

    childSupportNewPages = [11, 12, 13, 14, 17, 18, 19];
    childSupportExistingPages = [15, 16, 17, 20, 21];

    contactWithChildNewPages = [22, 24, 25]
    contactWithChildExistingPages = [23, 24, 25]

    guardianOfChildNewPages = [26, 27, 28]
    guardianOfChildExistingPages = []

    spousalSupportNewPages = [29]
    spousalSupportExistingPages = []

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
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            //console.log(options)
            console.log(this.survey.data)
            this.setPages()
        })
    }

    public reloadPageInformation() {  

        if (this.step.result && this.step.result['flmBackgroundSurvey'] && this.step.result['flmBackgroundSurvey'].data){
            this.survey.data = this.step.result['flmBackgroundSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        if (this.step.result && this.step.result['flmSelectedForm']){
            this.selectedForms = this.step.result['flmSelectedForm'].data
        }
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
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
                // if(this.survey.data.ExistingOrdersFLM == 'y' && this.survey.data.existingOrdersListFLM && this.survey.data.existingOrdersListFLM.includes('Guardianship of a Child'))
                //     this.togglePages(this.guardianOfChildExistingPages, true);
                // else
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
