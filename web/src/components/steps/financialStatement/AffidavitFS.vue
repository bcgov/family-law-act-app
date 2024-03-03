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
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

@Component({
    components:{
        PageBase
    }
})
export default class ElectronicFilingStatementFs extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

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

            if(options.name == "ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;            

        if (this.step.result?.electronicFilingStatementFsSurvey) {            
            this.survey.data = this.step.result.electronicFilingStatementFsSurvey.data;   
                     
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        } else {
            this.survey.setValue('OtherPartyInfoEfsp',[]); 
            this.survey.setValue('PartyInfoEfsp',[]); 
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }    

    public mergeRespondants(){

        const respondentNames = [];

        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondents){
            const respondents = this.$store.state.Application.steps[0].result.respondents        
            respondentNames.push(...respondents)
        }

        if(this.survey.data?.Lawyer){

            const applicantIsLawyer = this.survey.data.Lawyer == 'y';

            if (applicantIsLawyer){

                if(this.survey.data?.PartyInfoEfsp && this.survey.data?.PartyInfoEfsp.length>0){
                    const respondentNamesEfsp = this.survey.data.PartyInfoEfsp.map(party=>party.name)
                    respondentNames.push(...respondentNamesEfsp)
                } 

            } else {
                if(this.survey.data?.OtherPartyInfoEfsp && this.survey.data?.OtherPartyInfoEfsp.length>0){
                    const respondentNamesEfsp = this.survey.data.OtherPartyInfoEfsp.map(otherParty=>otherParty.name)
                    respondentNames.push(...respondentNamesEfsp)
                } 
            }
        }        
        
        const fullNamesArray =[];
        for(const name of respondentNames ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentNames.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })
        
        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
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

        this.mergeRespondants();

        if(this.survey.data?.["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {electronicFilingStatementFsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
