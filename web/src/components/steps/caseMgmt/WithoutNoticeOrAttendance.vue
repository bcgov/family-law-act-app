<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/without-notice-or-attendance.json";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class WithoutNoticeOrAttendance extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
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
            //console.log(this.survey.data);                       
        })   
    }

    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result.withoutNoticeOrAttendanceSurvey){
            this.survey.data = this.step.result.withoutNoticeOrAttendanceSurvey.data;
        }

        if (this.step.result?.cmQuestionnaireSurvey?.data){
            this.listOfIssuesDescription = this.getDescription(this.step.result.cmQuestionnaireSurvey.data);
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }
        
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

     public getDescription(data) {
        let description = '';
        let listOfIssues = [];
        const firstDescriptionSection = 'Usually, an application for an order must be made with notice to all other parties so ' +
        'that they can decide if they want to participate in the application. There are circumstances when the court may make an ' + 
        'order without you having to tell the other party about the application and without you having to attend a court appearance.\n' + 
        'When you make an application without notice or attendance, it is up to the judge to decide if the order can be made without ' + 
        'notice or attendance at a court appearance. After reviewing your application, if the judge thinks notice to another party or ' + 
        'your attendance in court is needed, the registry staff will let you know.\n' + 
        'You can apply without notice or attendance for your order about:  '
       
        let cmType = []
        if(this.step.result?.cmQuestionnaireSurvey?.data )
            cmType = this.step.result.cmQuestionnaireSurvey.data

        
        if (cmType.includes('changeServiceRequirement')) {
            listOfIssues.push('<li>Changing or cancelling the requirement for service or notice to a person, including allowing another method for the service of a document</li>');
        }

        if (cmType.includes('changeRequirement')) {
            listOfIssues.push('<li>Changing or cancelling any other requirement under the rules, including a time limit</li>');
        }

        if (cmType.includes('remoteAttendance')) {
            listOfIssues.push('<li>Attending at a court appearance by telephone, video or other electronic means</li>');
        }

        if (cmType.includes('otherProvinceOrder')) {
            listOfIssues.push('<li>Recognizing a court order from another province or territory</li>');
        }

        if (cmType.includes('section242')) {
            listOfIssues.push('<li>Requiring access to information in accordance with section 242 of the Family Law Act</li>');
        }         
       
        if (listOfIssues.length == 1){            
            description = firstDescriptionSection + listOfIssues.toString().replace('<li>', '').replace('</li>', '')
        } else {           
            const initialList = listOfIssues.toString()            
            description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
        }

        return description;
    }

    public determineCaseMgntNeeded(){
        if (this.survey.data && this.survey.data.noticeType) {
            const noticeType = this.survey.data.noticeType;
            if (noticeType == 'askingForWithoutNotice' || noticeType == 'askingForUnder 7 DaysNotice') {
                //console.log('turn on case management')
                this.toggleSteps(this.stPgNo.CM._StepNo,  true);
                const selectedForms = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms
                //console.log(selectedForms)
                if(selectedForms && !selectedForms.includes('caseMgmt')){
                    selectedForms.push('caseMgmt')
                }
                this.UpdateCommonStepResults({data:{'selectedForms':selectedForms}});
            }
        }
    }

    public toggleSteps(stepId, activeIndicator) {       
        this.$store.commit("Application/setStepActive", {
            currentStep: stepId,
            active: activeIndicator
        });
    }

    beforeDestroy() {
        this.determineCaseMgntNeeded();
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {withoutNoticeOrAttendanceSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
