<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/spousal-support.json";

import PageBase from "../../PageBase.vue";
import { nameInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

@Component({
    components:{
        PageBase
    }
})

export default class SpousalSupport extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;  
    otherPartyNames = [];  
    currentStep=0;
    currentPage=0;
    applicantFullName ='';

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
        this.adjustSurveyForOtherParties();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public adjustSurveyForOtherParties(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));
        
        this.otherPartyNames = [Vue.filter('getFullName')(this.applicantName)]
             
        this.surveyJsonCopy.pages[0].elements[1].elements[0]["choices"]=[Vue.filter('getFullName')(this.applicantName)];

        const stepCOM = this.steps[this.stPgNo.COMMON._StepNo]        

        if (stepCOM.result && stepCOM.result.otherPartyCommonSurvey && stepCOM.result.otherPartyCommonSurvey.data) {
            const otherPartyData = stepCOM.result.otherPartyCommonSurvey.data;            
            for (const otherParty of otherPartyData){
               this.surveyJsonCopy.pages[0].elements[1].elements[0]["choices"].push(Vue.filter('getFullName')(otherParty.name));
               this.otherPartyNames.push(Vue.filter('getFullName')(otherParty.name));
            }
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(this.survey.data);
            // console.log(options)
            if (this.survey.data && this.survey.data.listOfSupportPayors && this.survey.data.listOfSupportPayors.length > 0 && this.otherPartyNames.length > 0){
                for (const otherPartyName of this.otherPartyNames) {
                    if (!this.survey.data.listOfSupportPayors.includes(otherPartyName)){
                        this.survey.setVariable("Payee", otherPartyName);
                    }
                }
            }
            
        })
    }
    
    public reloadPageInformation() {
       
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result.spousalSupportSurvey) {
            this.survey.data = this.step.result.spousalSupportSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        if (this.survey.data && this.survey.data.listOfSupportPayors && this.survey.data.listOfSupportPayors.length > 0 && this.otherPartyNames.length > 0){
            for (const otherPartyName of this.otherPartyNames) {
                if (!this.survey.data.listOfSupportPayors.includes(otherPartyName)){
                    this.survey.setVariable("Payee", otherPartyName);
                }
            }
        }

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
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
        this.UpdateStepResultData({step:this.step, data: {spousalSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
