<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="consentInfo" header-class="bg-white" no-close-on-backdrop hide-header>
            
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
import * as surveyEnv from "@/components/survey/survey-glossary"
import { togglePages } from '@/components/utils/TogglePages';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import {getOrderTypeCM} from './orderTypesCM'

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
            
            this.determinePages(true);
        })   
    }

    public reloadPageInformation() {
 
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.withoutNoticeOrAttendanceSurvey){
            this.survey.data = this.step.result.withoutNoticeOrAttendanceSurvey.data;
        }

        if (this.step.result?.cmQuestionnaireSurvey?.data){
            this.listOfIssuesDescription = this.getDescription();
            this.survey.setVariable('listOfIssuesDescription', this.listOfIssuesDescription);
        }        
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false); 
        
        this.determinePages(false);
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            if (this.survey.data?.needWithoutNotice == 'y' && this.needConsent()) {            
                this.consentInfo = true;
            } else {
                Vue.prototype.$UpdateGotoNextStepPage();
            }                        
        }
    }

    public closeConsentInfo(){
        this.consentInfo = false;
        Vue.prototype.$UpdateGotoNextStepPage();            
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
       
        if(this.step.result?.cmQuestionnaireSurvey?.data ){
            for(const cmType of this.step.result.cmQuestionnaireSurvey.data){
                const order = getOrderTypeCM(cmType)
                if(order?.turquoise){
                    listOfIssues.push('<li>'+order.text+'</li>')
                }
            }     
        }
                        
        const initialList = listOfIssues.toString()            
        description = firstDescriptionSection + '<ul>' + initialList.replace(/>,</g, '><') + '</ul>';
    
        return description;
    }

    public needConsent(){
        
        let needConsent = false;
        if (this.step.result?.cmQuestionnaireSurvey?.data){
            const selectedCaseManagementItems = this.step.result.cmQuestionnaireSurvey.data;            
            needConsent = selectedCaseManagementItems.filter(cmType => {return (getOrderTypeCM(cmType).turquoise == false)}).length>0;
        }

        return needConsent;
    }

    public determinePages(surveyChanged: boolean){
        
        if (this.survey.data?.needWithoutNotice) {

            const needWithoutNotice = this.survey.data.needWithoutNotice;

            if (needWithoutNotice == 'n') {
                togglePages([this.stPgNo.CM.ByConsent, this.stPgNo.CM.CmNotice, this.stPgNo.CM.AboutCaseManagementOrder], true, this.currentStep); 
            } else{                              
                togglePages([this.stPgNo.CM.ByConsent,this.stPgNo.CM.CmNotice, this.stPgNo.CM.AboutCaseManagementOrder], this.needConsent(), this.currentStep); 
            }

            if(surveyChanged){
                const p = this.stPgNo.CM
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ByConsent, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.CmNotice, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.Scheduling, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutCaseManagementOrder, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.CmChildrenInfo, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.AttendanceUsingElectronicCommunication, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ChangingOrCancellingAServiceOrNotice, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ChangingOrCancellingAnyOtherRequirement, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.RequiringAccessToInformation, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.RecognizingAnOrderFromOutsideBc, 0, false);                                                       
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ContactInformationOtherParty, 0, false);
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersCM, 0, false);
                togglePages([p.Scheduling], false, this.currentStep); 
            }
            
            //schedule 1..5
            if(this.step.result?.cmQuestionnaireSurvey?.data )
                for(const cmType of this.step.result.cmQuestionnaireSurvey.data)
                    getOrderTypeCM(cmType, true, (needWithoutNotice == 'y'));
        }
    }

    beforeDestroy() {
        this.determinePages(false);
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {withoutNoticeOrAttendanceSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
