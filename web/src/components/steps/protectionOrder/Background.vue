<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/background.json";

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
export default class Background extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

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
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('protectionOrder')
        })
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['backgroundSurvey']){
            this.survey.data = this.step.result['backgroundSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }
        //console.log(this.survey.currentPage.questions)        
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
       
        this.survey.setVariable("RespondentName", Vue.filter('getFullName')(this.$store.state.Application.respondentName));
        this.survey.setVariable("ProtectedPartyName", Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        
        let children ="";
        for(const child of this.$store.state.Application.protectedChildName){
            if(child.childName)
                children+='<li>'+ Vue.filter('getFullName')(child.childName) +'</li>'
        }
 
        this.survey.setVariable("protectedChildName",children)   
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

        this.UpdateStepResultData({step:this.step, data: {backgroundSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

        if (this.types.length > 1 && this.types.includes("Family Law Matter")) {
            if (this.steps[3].result && this.steps[3].result.flmBackgroundSurvey) {
                // console.log("flm background information already exists");
            } else {
                this.UpdateStepResultData({step:this.steps[3], data: {flmBackgroundSurvey: Vue.filter('getSurveyResults')(this.survey, 3, 1)}});
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
