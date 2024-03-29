<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary"
import surveyJson from "./forms/aboutPO.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class About extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @applicationState.State
    public rejectedPathway!: boolean;

    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
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
        this.adjustSurveyForLocations();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('protectionOrder')
            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt)
                this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
            }
        })
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location); 
    } 

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));
        this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"] = [];        
        
        for(const location of this.locationsInfo){ 
            this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.aboutSurvey){
            this.survey.data = this.step.result.aboutSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        if(this.$store.state.Application.steps[this.currentStep].result?.poQuestionnaireSurvey?.data) {
            const order = this.$store.state.Application.steps[this.currentStep].result.poQuestionnaireSurvey.data;        
            this.survey.setVariable("userPreferredService", order.orderType);
        } 
        
        this.survey.setVariable("enableSurvey", !this.rejectedPathway)
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }
    
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }

    public setExistingFileNumber(){
        const fileType = Vue.filter('getPathwayPdfType')("protectionOrder")//'AAP'
        const existingOrders = this.$store.state.Application.steps[0]['result']['existingOrders']

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == fileType)})
            if(index >= 0 ){                
                existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}                                                                    
            }else{                
                existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber});
            }

            for(const inx in existingOrders){
                existingOrders[inx].filingLocation = this.survey.data.ExistingCourt
                existingOrders[inx].fileNumber = this.survey.data.ExistingFileNumber
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{            
            this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}]}});
        }
    }
  
    beforeDestroy() {

        this.setExistingFileNumber();

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);

        this.UpdateStepResultData({step:this.step, data: {aboutSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

        const step = this.steps[this.stPgNo.COMMON._StepNo]

        if (step.result?.filingLocationSurvey?.data) {
            const filingLocationSurveyCommon = step.result.filingLocationSurvey
            filingLocationSurveyCommon.data.ExistingCourt = this.survey.data["ExistingCourt"]
            filingLocationSurveyCommon.data.ExistingFileNumber = this.survey.data["ExistingFileNumber"]           
            this.UpdateStepResultData({step:step, data: {filingLocationSurvey: filingLocationSurveyCommon }})
        } else {
            this.UpdateStepResultData({step:step, data: {filingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.stPgNo.COMMON._StepNo, this.stPgNo.COMMON.FilingLocation)}});
        }
    }
}
</script>
