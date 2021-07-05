<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="consentInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3">               
                <p>The following series of questions are about the application for case management 
                    order that cannot be made without notice to the other party. After we complete 
                    these questions, you will be presented with questions about the without notice 
                    order.
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="success" @click="closeConsentInfo">Continue</b-button>
            </template>            
        </b-modal>

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
    currentStep =0;
    currentPage =0;  
    
    consentInfo = false;
    listOfIssuesDescription = '';
    cmType: string[] = [];

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.consentInfo = false;
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
            Vue.filter('surveyChanged')('caseMgmt'); 
            
            this.determinePages();
        })   
    }

    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result.withoutNoticeOrAttendanceSurvey){
            this.survey.data = this.step.result.withoutNoticeOrAttendanceSurvey.data;
        }

        if (this.step.result?.cmQuestionnaireSurvey?.data){
            this.listOfIssuesDescription = this.getDescription();
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false); 
        
        this.determinePages();
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            if (this.survey.data?.needWithoutNotice == 'y' && this.needConsent()) {            
                this.consentInfo = true;
            } else {
                this.UpdateGotoNextStepPage();
            }                        
        }
    }

    public closeConsentInfo(){
        this.consentInfo = false;
        this.UpdateGotoNextStepPage();            
    }

    public getDescription() {
        let description = '';
        let listOfIssues = [];
        const firstDescriptionSection = 'Usually, an application for an order must be made with notice to all other parties so ' +
        'that they can decide if they want to participate in the application. There are circumstances when the court may make an ' + 
        'order without you having to tell the other party about the application and without you having to attend a court appearance.<br><br>\n' + 
        'When you make an application without notice or attendance, it is up to the judge to decide if the order can be made without ' + 
        'notice or attendance at a court appearance. After reviewing your application, if the judge thinks notice to another party or ' + 
        'your attendance in court is needed, the registry staff will let you know.<br><br>' + 
        'You can apply without notice or attendance for your order about:<br>'
       
        this.cmType = []
        if(this.step.result?.cmQuestionnaireSurvey?.data )
            this.cmType = this.step.result.cmQuestionnaireSurvey.data

        
        if (this.cmType.includes('changeServiceRequirement')) {
            listOfIssues.push('<li>Changing or cancelling the requirement for service or notice to a person, including allowing another method for the service of a document</li>');
        }

        if (this.cmType.includes('changeRequirement')) {
            listOfIssues.push('<li>Changing or cancelling any other requirement under the rules, including a time limit</li>');
        }

        if (this.cmType.includes('remoteAttendance')) {
            listOfIssues.push('<li>Attending at a court appearance by telephone, video or other electronic means</li>');
        }

        if (this.cmType.includes('otherProvinceOrder')) {
            listOfIssues.push('<li>Recognizing a court order from another province or territory</li>');
        }

        if (this.cmType.includes('section242')) {
            listOfIssues.push('<li>Requiring access to information in accordance with section 242 of the Family Law Act</li>');
        }         
       
                 
        const initialList = listOfIssues.toString()            
        description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
    

        return description;
    }

    public needConsent(){
        let needConsent = false;
        if (this.step.result?.cmQuestionnaireSurvey?.data){
            const selectedCaseManagementItems = this.step.result?.cmQuestionnaireSurvey?.data;
            const byConsentRequiredList = [
                "adjourningAppearance",
                "fileTransfer",
                "settingTime",
                "nonPartyDisclosure",
                "rule112",
                "orderOfAbsenceChange",
                "section211",
                "fileAccess",
                "fileCorrection",
                "orderSettlement",
                "section204",
                "lawyerAppointment",
                "subpoenaCancelation",
                "section33"
            ]

            needConsent = byConsentRequiredList.some(i => selectedCaseManagementItems.includes(i));
        }

        return needConsent;
    }

    public determinePages(){
        
        if (this.survey.data?.needWithoutNotice) {
            const needWithoutNotice = this.survey.data.needWithoutNotice;
            
            if (needWithoutNotice == 'n') {
                this.togglePages([this.stPgNo.CM.ByConsent, this.stPgNo.CM.CmNotice, this.stPgNo.CM.AboutCaseManagementOrder], true); 
            } else if (needWithoutNotice == 'y'){
                
                this.togglePages([this.stPgNo.CM.CmNotice, this.stPgNo.CM.AboutCaseManagementOrder], false); 
                //schedule 1
                this.togglePages([this.stPgNo.CM.AttendanceUsingElectronicCommunication], this.cmType.includes('remoteAttendance'));

                if (!this.needConsent()) {
                    this.togglePages([this.stPgNo.CM.ByConsent], false);  
                }
            }
        }
    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {            
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    beforeDestroy() {
        this.determinePages();
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {withoutNoticeOrAttendanceSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>
