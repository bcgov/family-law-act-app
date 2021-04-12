<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/aboutPO.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
const commonState = namespace("Common");

@Component({
    components:{
        PageBase
    }
})

export default class About extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @commonState.State
    public locationsInfo!: any[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    selectedPOOrder = null;
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
        this.adjustSurveyForLocations();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            this.UpdateSurveyChangedPO(true);
        })
    }

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        console.log(this.surveyJsonCopy.pages[0])
        
        this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"] = [];        
        
        for(const location of this.locationsInfo){ 
            this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['aboutPOSurvey']){
            this.survey.data = this.step.result['aboutPOSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        console.log(this.$store.state.Application.steps)

        const order = this.$store.state.Application.steps[this.currentStep].result.questionnaireSurvey;
        if(order) {
            this.survey.setVariable("userPreferredService", order.orderType);
        }       
        
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

        this.UpdateStepResultData({step:this.step, data: {aboutPOSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
