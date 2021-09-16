<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/po-filing-location.json";
import * as surveyEnv from "@/components/survey/survey-glossary"

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";

import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase
    }
})

export default class PoFilingLocation extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep =0;
    currentPage =0;
    locationInfo = false;   

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.locationInfo = false;
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
                this.saveApplicationLocation(this.survey.data.ExistingCourt);
                this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
            }
        })   
    }   

    public closeLocationInfo(){
        this.locationInfo = false;
        this.UpdateGotoNextStepPage();
    }

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"] = [];
        
        for(const location of this.locationsInfo){
            
            this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() {
        if (this.step.result?.poFilingLocationSurvey){
            this.survey.data = this.step.result.poFilingLocationSurvey.data;
           
            if (this.survey.data.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        }

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {           
            this.UpdateGotoNextStepPage();                    
        }
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);
        this.survey.setVariable("registryLocation", location);        
    }  

    public setExistingFileNumber(){
        const fileType = Vue.filter('getPathwayPdfType')("protectionOrder")//'AAP'
        const existingOrders = this.$store.state.Application.steps[0]['result']? this.$store.state.Application.steps[0]['result']['existingOrders']:''
        
        const existingOrdersCondition = this.survey.data && this.survey.data.ExistingFamilyCase == "y"
        const fileNumber = existingOrdersCondition? this.survey.data.ExistingFileNumber: ''
        
        if(existingOrders){
            
            const index = existingOrders.findIndex(order=>{return(order.type == fileType)})
            if(index >= 0 ){                
                existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber}
            }else{
                existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber});                     
            }

            for(const inx in existingOrders){
                existingOrders[inx].filingLocation = this.survey.data.ExistingCourt;
                existingOrders[inx].fileNumber = fileNumber;
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{            
            this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber }]}});    
        }
    }

    beforeDestroy() {
        this.setExistingFileNumber();

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        this.UpdateStepResultData({step:this.step, data: {poFilingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

        const step = this.steps[this.stPgNo.COMMON._StepNo]

        if (step.result?.filingLocationSurvey?.data) {
            const filingLocationSurveyCommon = step.result.filingLocationSurvey
            filingLocationSurveyCommon.data.ExistingCourt = this.survey.data["ExistingCourt"]
            filingLocationSurveyCommon.data.ExistingFileNumber = this.survey.data["ExistingFileNumber"]
            filingLocationSurveyCommon.data.ExistingFamilyCase = this.survey.data["ExistingFamilyCase"]
            this.UpdateStepResultData({step:step, data: {filingLocationSurvey: filingLocationSurveyCommon }})
        } else {
            this.UpdateStepResultData({step:step, data: {filingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.stPgNo.COMMON._StepNo, this.stPgNo.COMMON.FilingLocation )}});
        }
    }
}
</script>
