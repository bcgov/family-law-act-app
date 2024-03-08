<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >        
        <survey v-bind:survey="survey"></survey>        
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';   
import { namespace } from "vuex-class";  
import * as _ from 'underscore';  

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/disposition-assets-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class DispositionAssetsFS extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void    

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep =0;
    currentPage =0;   

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

        if (this.step.result?.dispositionAssetsFSSurvey){
            this.survey.data = this.step.result.dispositionAssetsFSSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);              
        }
        
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

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {dispositionAssetsFSSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>