<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div class="row">
      <div class="col-md-12 order-heading">
        <div>
            <h1>Questionnaire</h1>
            <p>
                Case management orders are procedural or administrative orders. A judge can make a case management order at any time 
                to manage a case. A judge can also make a case management order on application by a party. Some case management orders 
                can be made without notice to the other party, and without a court appearance. Other case management orders must be made 
                with notice to the other party but may not need a court appearance if each party gives written consent for the order to 
                be made. This service will help you complete the right form for the case management order you need.
            </p>
           
        </div>
        <div>
            <h2 style="color: #556077; font-size: 1.5em; line-height: 1.2;">What are you asking for (orders)?</h2>
            <p style="font-size: 1.25rem;">Select all options that apply.</p>
        </div>
        <div v class="checkbox-border">
            <b-form-group>
                <b-form-checkbox-group
                v-model="selectedCaseManagement"
                v-on:change="onChange($event)"
                name="orders"
                stacked
                >                
                    <div>
                        <b-form-checkbox class="checkbox-choices" value="changeServiceRequirement">
                            <div>
                                Changing or cancelling the requirement for service or notice to a person, including allowing another 
                                method for the service of a document
                            </div>                                      
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="changeRequirement">
                            <div>
                                Changing or cancelling <tooltip title="any other requirement" :index="0"/> under the rules, including a time limit
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="remoteAttendance">
                            <div>
                                Attending at a court appearance by telephone, video or other electronic means
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="adjourningAppearance">
                            <div>
                                Adjourning a court appearance    
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="fileTransfer">
                            <div>
                                Transferring a court file to another registry    
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="settingTime">
                            <div>
                                Setting a specified time to file and exchange information or evidence, including a financial statement in Form 4      
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="nonPartyDisclosure">
                            <div>
                                Disclosing of information by a person who is not a party           
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="rule112">
                            <div>
                                About the conduct of a party or management of a case, including pre-trial and trial process and evidence 
                                disclosure set out in Rule 112(1)
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="orderOfAbsenceChange">
                            <div>
                                Changing, suspending or cancelling an <tooltip title="order made in my absence" :index="0"/>           
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="section211">
                            <div>
                                Relating to a report under section 211, including requiring a person who prepared a report to attend trial as a witness       
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="fileAccess">
                            <div>
                                Management of a court record, file or document including access to a court file           
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="fileCorrection">
                            <div>
                                Correcting or changing a filed document, including correcting a name or date of birth              
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="orderSettlement">
                            <div>
                                Settling or correcting the terms of an order          
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="section204">
                            <div>
                                Adding or removing a party to a case, including leave to intervene under section 204 (2) of the Family Law Act       
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="lawyerAppointment">
                            <div>
                                Respecting the appointment of a lawyer to represent the interests of a child or a party       
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="otherProvinceOrder">
                            <div>
                                Recognizing a court order from another province or territory          
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="subpoenaCancelation">
                            <div>
                                Cancelling a subpoena       
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="section33">
                            <div>
                                Requiring that a parentage test be taken under section 33 of the Family Law Act           
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="section242">
                            <div>
                                Requiring access to information in accordance with section 242 of the Family Law Act           
                            </div>                        
                        </b-form-checkbox>
                    </div>
               
                </b-form-checkbox-group>
            </b-form-group>
        </div>

        <div class="mb-5">
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you get correct information is important. If you get the wrong information or do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a lawyer can help.<br/><br/><b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> at 1-800-663-1919<br/><br/><b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at <p style='display:inline-block'>1-866-577-2525.</p><br/><b>Legal Services and Resources:</b> Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> to find other free and low-cost legal services in your community
            </div>
        </div>
      </div>
    </div>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import * as _ from 'underscore';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class CmQuestionnaire extends Vue {
    
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
    public UpdatePathwayCompleted!: (changedpathway) => void
    
    selectedCaseManagement = [];

    showLegalAssistance = false

    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.allPages = _.range(this.stPgNo.CM.OtherPersons, Object.keys(this.stPgNo.CM).length-1) 
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result && this.step.result.cmQuestionnaireSurvey) {
            this.selectedCaseManagement = this.step.result.cmQuestionnaireSurvey.data;
        }
        
        const progress = this.selectedCaseManagement.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }


    public onChange(selectedCaseManagement) {

        this.UpdatePathwayCompleted({pathway:"caseMgmt", isCompleted:false});
        this.togglePages([this.stPgNo.CM.PreviewFormsCM], false);
        
        if(this.checkErrorOnPages())        
            this.setSteps(selectedCaseManagement);
        else{ 
            this.selectedCaseManagement = [];            
            this.togglePages(this.allPages, false); 
        }
        Vue.filter('surveyChanged')('caseMgmt')        
    }

    public setSteps(selectedCaseManagement) {
       
        const p = this.stPgNo.CM
        if (selectedCaseManagement) {

            this.togglePages(this.allPages, false); 
            const progress = this.selectedCaseManagement.length==0? 50 : 100;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

            if (selectedCaseManagement.length > 0){

                this.togglePages([p.OtherPersons, p.CmNotice, p.AboutCaseManagementOrder, p.CmChildrenInfo, p.ReviewYourAnswersCM], true);               
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.OtherPersons].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.OtherPersons, 50, false);
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.WithoutNoticeOrAttendance].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.WithoutNoticeOrAttendance, 50, false);
                
                if(this.$store.state.Application.steps[this.currentStep].pages[p.ByConsent].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ByConsent, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.CmNotice].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.CmNotice, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.Scheduling].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.Scheduling, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.AboutCaseManagementOrder].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutCaseManagementOrder, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.CmChildrenInfo]?.progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.CmChildrenInfo, 50, false);

                if(this.$store.state.Application.steps[this.currentStep].pages[p.AttendanceUsingElectronicCommunication].progress==100)
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AttendanceUsingElectronicCommunication, 50, false);

                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersCM, 0, false);
                
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

    public checkErrorOnPages(){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]
        for(const stepIndex of [this.stPgNo.COMMON._StepNo]){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.togglePages(this.allPages, false); 
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage();
    }

    public onNext() {
        this.UpdateGotoNextStepPage();       
    }   

    public getSelectedCaseManagementItems(){
        let result = ''
        this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance, this.stPgNo.CM.ByConsent], false);       
        for(const form of this.selectedCaseManagement){
            if(form=='changeServiceRequirement') {
                this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance], true);
                result+='-Changing or cancelling the requirement for service or notice to a person, including allowing another method for the service of a document'+'\n';
            }   
            if(form=='changeRequirement') {
                this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance], true);
                result+='-Changing or cancelling any other requirement under the rules, including a time limit'+'\n';
            }
            if(form=='remoteAttendance') {
                this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance], true);
                result+='-Attending at a court appearance by telephone, video or other electronic means'+'\n';
            }
            if(form=='adjourningAppearance') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Adjourning a court appearance'+'\n';
            }
            if(form=='fileTransfer') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Transferring a court file to another registry'+'\n';
            }
            if(form=='settingTime') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Setting a specified time to file and exchange information or evidence, including a financial statement in Form 4'+'\n';
            }
            if(form=='nonPartyDisclosure') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Disclosing of information by a person who is not a party'+'\n';
            }
            if(form=='rule112') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-About the conduct of a party or management of a case, including pre-trial and trial process and evidence disclosure set out in Rule 112(1)'+'\n';
            }
            if(form=='orderOfAbsenceChange') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Changing, suspending or cancelling an order made in my absence'+'\n';
            }
            if(form=='section211') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Relating to a report under section 211, including requiring a person who prepared a report to attend trial as a witness'+'\n';
            }
            if(form=='fileAccess') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Management of a court record, file or document including access to a court file'+'\n';
            }
            if(form=='fileCorrection') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Correcting or changing a filed document, including correcting a name or date of birth'+'\n';
            }
            if(form=='orderSettlement') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Settling or correcting the terms of an order'+'\n';
            }
            if(form=='section204') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Adding or removing a party to a case, including leave to intervene under section 204 (2) of the Family Law Act'+'\n';
            }
            if(form=='lawyerAppointment') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Respecting the appointment of a lawyer to represent the interests of a child or a party'+'\n';
            }
            if(form=='otherProvinceOrder') {
                this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance], true);
                result+='-Recognizing a court order from another province or territory'+'\n';
            }
            if(form=='subpoenaCancelation') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Cancelling a subpoena'+'\n';
            }
            if(form=='section33') {
                this.togglePages([this.stPgNo.CM.ByConsent], true);
                result+='-Requiring that a parentage test be taken under section 33 of the Family Law Act'+'\n';
            }
            if(form=='section242') {
                this.togglePages([this.stPgNo.CM.WithoutNoticeOrAttendance], true);
                result+='-Requiring access to information in accordance with section 242 of the Family Law Act'+'\n';
            }           
        }
        return result;
    }
  
    beforeDestroy() {
        const progress = this.selectedCaseManagement.length==0? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        const questions = [{name:'CmQuestionnaire',title:'What are you asking for (orders)?',value:this.getSelectedCaseManagementItems()}]        
        this.UpdateStepResultData({step:this.step, data: {cmQuestionnaireSurvey: {data: this.selectedCaseManagement, questions: questions, pageName:"Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/survey";
.checkbox-border {
  border: 1px solid rgba($gov-mid-blue, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.form-group .checkbox-choices{
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: normal;
  font-size: 17px;
}

input {
  padding-left: 20px;
}
</style>
