<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/calculating-child-support.json";

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

export default class CalculatingChildSupport extends Vue {
    
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
    childData = [];
    overAgeChildren = [];
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
        this.adjustSurveyForChildren();
       
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));                
       
    }

  
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            
            console.log(options)
           

        })
    }
    
    public reloadPageInformation() {        
        if (this.step.result && this.step.result['childSupportSurvey']) {
            this.survey.data = this.step.result['childSupportSurvey'].data;

            const overAgeSelected = [];
            for (const overAge of this.overAgeChildren) {
                if (this.survey.data["childrenRequireSupportChoices"] && 
                    this.survey.data["childrenRequireSupportChoices"].includes(overAge)){
                    overAgeSelected.push(overAge);
                }
            }
            if (overAgeSelected.length > 0) {
                this.survey.setVariable("overAgeChildSelected", true);
            } else {
                this.survey.setVariable("overAgeChildSelected", false);
            }

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
        
        this.UpdateStepResultData({step:this.step, data: {childSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
