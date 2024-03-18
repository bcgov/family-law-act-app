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

        const situationTypes = fsData.situationType?fsData.situationType:[];
        const part1Options = [
            "I am the person required to pay child support", 
            "Parenting time is `split or shared` for one or more of the children", 
            "There is a claim for section 7 special or extraordinary expenses",
            "There is a child 19 years or older for whom support is being applied for",
            "A party has been acting as a parent to a child of the other party",
            "The payor earns more than $150,000 per year",
            "I am claiming undue hardship",
            "The other party is claiming undue hardship"
        ];
        const part2and3Options = [            
            "Parenting time is `split or shared` for one or more of the children", 
            "There is a claim for section 7 special or extraordinary expenses",
            "There is a child 19 years or older for whom support is being applied for",
            "A party has been acting as a parent to a child of the other party",
            "The payor earns more than $150,000 per year",
            "I am claiming undue hardship",
            "The other party is claiming undue hardship"
        ];
        const part4Options = [
            "I am claiming undue hardship",
            "The other party is claiming undue hardship"
        ];
        const part5Options = [
            "I am claiming undue hardship"
        ];

        const part1Required = fsData.spousalAppExists == 'y' || (fsData.childAppExists = 'y' && part1Options.some(s=>situationTypes.indexOf(s) > -1));
        const part2and3Required = fsData.spousalAppExists == 'y' || (fsData.childAppExists = 'y' && part2and3Options.some(s=>situationTypes.indexOf(s) > -1));
        const part4Required = fsData.childAppExists = 'y' && part4Options.some(s=>situationTypes.indexOf(s) > -1);
        const part5Required = fsData.childAppExists = 'y' && part5Options.some(s=>situationTypes.indexOf(s) > -1);

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
