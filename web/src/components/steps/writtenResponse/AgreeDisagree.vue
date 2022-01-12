<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey> 
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/agree-disagree.json";

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

export default class AgreeDisagree extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];   

    @applicationState.State
    public types!: string[];

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);    
    currentStep =0;
    currentPage =0;
    showPopup = false;

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
            Vue.filter('surveyChanged')('writtenResponse')
        })
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        const description = "In your reply to the application, you may:<ul><li>Agree to all or part of the orders requested in the application</li><li>Disagree with all or part of the orders requested in the application, stating your reason you do not agree</li><li>Propose changes to the order or another order about the same issue before the court that you would agree to</li></ul>Look at the application you were served. For each order identified, consider if you agree or disagree with it."; 
        const poIncludedDescription = "</br></br>To reply to an application for a protection order, review the information presented in the application. The court will consider the evidence presented and will determine if a protection order should be made, and if so, what terms or conditions (list of things a person must or must not do) should be included in the order. The terms or conditions may include who a person cannot contact, places a person cannot go, restrictions on possession of weapons or firearms, directions to a police officer, and other terms or conditions the court considers necessary to protect the safety and security of the at-risk family member or to implement the order."
        if (this.types.includes("Reply to Application About a Protection Order")){
            this.survey.setValue('description', description + poIncludedDescription);
        } else {
            this.survey.setValue('description', description);
        }

        if ( this.step.result?.agreeDisagreeSurvey) {
            this.survey.data = this.step.result.agreeDisagreeSurvey.data;
            
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
        this.UpdateStepResultData({step:this.step, data: {agreeDisagreeSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>