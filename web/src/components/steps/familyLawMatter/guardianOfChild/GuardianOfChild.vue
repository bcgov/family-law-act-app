<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/guardian-of-child.json";

import PageBase from "../../PageBase.vue";
import { nameInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class GuardianOfChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

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
    currentStep=0;
    currentPage=0;
   
    @Watch('pageIndex')
    pageIndexChange(newVal) 
    {
        this.survey.currentPageNo = newVal;        
    }

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
        this.adjustSurveyForChildren();
        this.adjustSurveyForOtherParties();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));         
        this.surveyJsonCopy.pages[0].elements[1].elements[0]["choices"]=[];
        this.surveyJsonCopy.pages[0].elements[2].elements[0].columns[1]["choices"] = [];

        if (this.step.result && this.step.result['childData']) {
            const childData = this.step.result['childData'];            
            for (const child of childData){
                this.surveyJsonCopy.pages[0].elements[1].elements[0]["choices"].push(Vue.filter('getFullName')(child.name));
                this.surveyJsonCopy.pages[0].elements[2].elements[0].columns[1]["choices"].push(Vue.filter('getFullName')(child.name));
            }
        }
    }

    public adjustSurveyForOtherParties(){
             
        this.surveyJsonCopy.pages[0].elements[2].elements[0].columns[0]["choices"]=[];

        if (this.steps[2].result && this.steps[2].result['otherPartyCommonSurvey'] && this.steps[2].result['otherPartyCommonSurvey'].data) {
            const otherPartyData = this.steps[2].result['otherPartyCommonSurvey'].data;            
            for (const otherParty of otherPartyData){
                this.surveyJsonCopy.pages[0].elements[2].elements[0].columns[0]["choices"].push(Vue.filter('getFullName')(otherParty.name));
            }
        }
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            //console.log(this.survey.data);
            console.log(options)
            
        })
    }
    
    public reloadPageInformation() {
        // console.log(this.step.result)
        if (this.step.result && this.step.result['contactWithChildSurvey']) {
            this.survey.data = this.step.result['contactWithChildSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
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
        this.UpdateStepResultData({step:this.step, data: {contactWithChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
