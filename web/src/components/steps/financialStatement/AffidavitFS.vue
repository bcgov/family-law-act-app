<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/affidavit-fs.json";
import PageBase from "../PageBase.vue";

import { stepInfoType, stepResultInfoType } from "@/types/Application";

@Component({
    components:{
        PageBase
    }
})
export default class AffidavitFs extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;   

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void   

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;    
    disableNextButton = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;       
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
            
        })
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;            

        if (this.step.result?.affidavitFSSurvey?.data) {            
            this.survey.data = this.step.result.affidavitFSSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        } 

        let displayDisclosure = false;
        let listOfItems = '';

        if (this.step.result?.financialStatementSurvey?.data){
            listOfItems = this.getFsItems(this.step.result.financialStatementSurvey.data); 
            displayDisclosure = listOfItems.length>0;           
        } 

        this.survey.setVariable('displayDisclosure', displayDisclosure);
        this.survey.setVariable('listOfItems', listOfItems);
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }   

    public getFsItems(fsData) {
        let description = '';
        const listOfIssues = [];

        const requiredParts = Vue.filter('getFsRequiredParts')(fsData);            

        const part1Required = requiredParts.part1Required;
        const part2and3Required = requiredParts.part2and3Required;
        const part4Required = requiredParts.part4Required;
        const part5Required = requiredParts.part4Required;
                
        if (part1Required){
            listOfIssues.push('<li>my income, including benefits and adjustments, if any</li>')
        } 
        
        if (part2and3Required){
            listOfIssues.push('<li>my expenses and debts</li><li>my assets</li>')
        }          

        if (part4Required){
            listOfIssues.push('<li>income of other person(s) in my household</li>')
        }  

        if (part5Required){
            listOfIssues.push('<li>undue hardship</li>')
        }  
            
        const initialList = listOfIssues.toString()            
        description = '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
                  
        return description;
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
        this.UpdateStepResultData({step:this.step, data: {affidavitFSSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
