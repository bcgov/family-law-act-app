<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/enforce-change-or-set-aside-determination.json";

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

export default class EnforceChangeSetAsideDetermination extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep =0;
    currentPage =0;
    listOfIssuesDescription = '';

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
            Vue.filter('surveyChanged')('caseMgmt')
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.aboutCaseManagementOrderSurvey) {
            this.survey.data = this.step.result.aboutCaseManagementOrderSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }

        if (this.step.result?.cmQuestionnaireSurvey?.data){
            // this.listOfIssuesDescription = this.getDescription();
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    // public getDescription() {

    //     let description = '';
    //     let listOfIssues = [];
    //     const firstDescriptionSection = 'You indicated you are applying for a case management order about:  '
       
       
    //     let withoutNotice = true;
    //     if (this.step.result?.withoutNoticeOrAttendanceSurvey?.data?.needWithoutNotice == 'n')
    //         withoutNotice = false;

    //     if(this.step.result?.cmQuestionnaireSurvey?.data ){
    //         for(const cmType of this.step.result.cmQuestionnaireSurvey.data){
                
    //             const order = getOrderTypeCM(cmType)
                
    //             if(order?.turquoise && !withoutNotice){
    //                 listOfIssues.push('<li>'+order.text+'</li>')
    //             } 
    //             else if(order?.turquoise == false){
    //                 listOfIssues.push('<li>'+order.text+'</li>')
    //             }
    //         }     
    //     } 
                          
    //     const initialList = listOfIssues.toString()            
    //     description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
       
    //     return description;
    // }

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
        this.UpdateStepResultData({step:this.step, data: {aboutCaseManagementOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
