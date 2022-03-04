<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/reply-appointing-guardian-of-child.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { togglePages } from '@/components/utils/TogglePages';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ReplyAppointingGuardianOfChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;     

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType; 

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep =0;
    currentPage =0;  

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
            Vue.filter('surveyChanged')('replyFlm')
            this.setPages();          
        })
    }  
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.replyAppointingGuardianOfChildSurvey) {
            this.survey.data = this.step.result.replyAppointingGuardianOfChildSurvey.data; 
            this.setPages();            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);             
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public setPages(){

        if (this.survey.data?.moreThanOneChild){
            const p = this.stPgNo.RFLM;
            if (this.survey.data.moreThanOneChild == 'y' && this.survey.data?.agreeCourtOrderChild){
                togglePages([p.DisagreeAppointingGuardianOfChild], this.survey.data.agreeCourtOrderChild != 'agreeAll', this.currentStep);
            } else if (this.survey.data.moreThanOneChild == 'n' && this.survey.data?.agreeCourtOrder){
                togglePages([p.DisagreeAppointingGuardianOfChild], this.survey.data.agreeCourtOrder == 'n', this.currentStep);
            }
        }
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
        this.UpdateStepResultData({step:this.step, data: {replyAppointingGuardianOfChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>


