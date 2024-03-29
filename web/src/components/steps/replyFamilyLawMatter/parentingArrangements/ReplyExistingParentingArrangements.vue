<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/reply-existing-parenting-arrangements.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ReplyExistingParentingArrangements extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;     

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
            this.setVariables();          
        })
    }  
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.replyExistingParentingArrangementsSurvey) {
            this.survey.data = this.step.result.replyExistingParentingArrangementsSurvey.data; 
            this.setVariables();
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);             
        }

        this.survey.setValue("disagreeReasonQuestion",  "Why don’t you agree with the requested order?");
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public setVariables(){

        if (this.survey.data?.listOfOpApplications){

            let list = this.survey.data?.listOfOpApplications;
            let multipleTypes = false;
            
            
            const index = list.indexOf('none of the above')
            let agreePartialDescription = 'You indicated the other party applied to change or replace:<ul>';
            

            if (index != -1){ 
                multipleTypes =  list.length > 2;               
                this.survey.setValue("multipleTypes", multipleTypes);                               
            } else {
                multipleTypes = list.length > 1;
                this.survey.setValue("multipleTypes", multipleTypes);                
            } 
            
            for (const app of list){ 
                if (app != 'none of the above') {
                    agreePartialDescription = agreePartialDescription.concat('<li>' + app + '</li>');
                }
            }

            agreePartialDescription.concat('</ul>')

            this.survey.setValue("agreePartialDescription",  agreePartialDescription);

            if (multipleTypes && this.survey.data.agreeCourtOrder && 
                this.survey.data.agreeCourtOrder == 'n' && this.survey.data.agreePartial == 'y'){
                this.survey.setValue("disagreeReasonQuestion",  "Why don’t you agree to the other parts of the requested order?");
            } else {
                this.survey.setValue("disagreeReasonQuestion",  "Why don’t you agree with the requested order?");
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
        this.UpdateStepResultData({step:this.step, data: {replyExistingParentingArrangementsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>


