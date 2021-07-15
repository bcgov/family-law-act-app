<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/about-case-management-order.json";

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

export default class AboutCaseManagementOrder extends Vue {
    
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
            this.listOfIssuesDescription = this.getDescription();
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public getDescription() {

        let description = '';
        let listOfIssues = [];
        const firstDescriptionSection = 'You indicated you are applying for a case management order about:  '
       
        let cmType = []
        if(this.step.result?.cmQuestionnaireSurvey?.data )
            cmType = this.step.result.cmQuestionnaireSurvey.data

        let withoutNotice = true;
        if (this.step.result?.withoutNoticeOrAttendanceSurvey?.data?.needWithoutNotice == 'n')
            withoutNotice = false;
        
        if (cmType.includes('changeServiceRequirement') && !withoutNotice) {
            listOfIssues.push('<li>Changing or cancelling the requirement for service or notice to a person, including allowing another method for the service of a document</li>');
        }

        if (cmType.includes('changeRequirement') && !withoutNotice) {
            listOfIssues.push('<li>Changing or cancelling any other requirement under the rules, including a time limit</li>');
        }

        if (cmType.includes('remoteAttendance') && !withoutNotice) {
            listOfIssues.push('<li>Attending at a court appearance by telephone, video or other electronic means</li>');
        }

        if (cmType.includes('adjourningAppearance')) {
            listOfIssues.push('<li>Adjourning a court appearance</li>')
        }

        if (cmType.includes('fileTransfer')) {
            listOfIssues.push('<li>Transferring a court file to another registry</li>')
        }

        if (cmType.includes('settingTime')) {
            listOfIssues.push('<li>Setting a specified time to file and exchange information or evidence, including a financial statement in Form 4</li>')
        }

        if (cmType.includes('nonPartyDisclosure')) {
            listOfIssues.push('<li>Disclosing of information by a person who is not a party</li>')
        }

        if (cmType.includes('rule112')) {
            listOfIssues.push('<li>About the conduct of a party or management of a case, including pre-trial and trial process and evidence disclosure set out in Rule 112(1)</li>')
        }

        if (cmType.includes('orderOfAbsenceChange')) {
            listOfIssues.push('<li>Changing, suspending or cancelling an order made in my absence</li>')
        }

        if (cmType.includes('section211')) {
            listOfIssues.push('<li>Relating to a report under section 211, including requiring a person who prepared a report to attend trial as a witness</li>')
        }

        if (cmType.includes('fileAccess')) {
            listOfIssues.push('<li>Management of a court record, file or document including access to a court file</li>')
        }

        if (cmType.includes('fileCorrection')) {
            listOfIssues.push('<li>Correcting or changing a filed document, including correcting a name or date of birth</li>')
        }

        if (cmType.includes('orderSettlement')) {
            listOfIssues.push('<li>Settling or correcting the terms of an order</li>')
        }

        if (cmType.includes('section204')) {
            listOfIssues.push('<li>Adding or removing a party to a case, including leave to intervene under section 204 (2) of the Family Law Act</li>')
        }

        if (cmType.includes('lawyerAppointment')) {
            listOfIssues.push('<li>Respecting the appointment of a lawyer to represent the interests of a child or a party</li>')
        }

        if (cmType.includes('subpoenaCancelation')) {
            listOfIssues.push('<li>Cancelling a subpoena</li>')
        }

        if (cmType.includes('section33')) {
            listOfIssues.push('<li>Requiring that a parentage test be taken under section 33 of the Family Law Act</li>')
        }           

        if (cmType.includes('otherProvinceOrder') && !withoutNotice) {
            listOfIssues.push('<li>Recognizing a court order from another province or territory</li>');
        }

        if (cmType.includes('section242') && !withoutNotice) {
            listOfIssues.push('<li>Requiring access to information in accordance with section 242 of the Family Law Act</li>');
        }         
                          
        const initialList = listOfIssues.toString()            
        description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
       
        return description;
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
        this.UpdateStepResultData({step:this.step, data: {aboutCaseManagementOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
