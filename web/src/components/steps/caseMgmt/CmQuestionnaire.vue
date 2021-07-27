<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
    <div v-if="dataReady" class="row">
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
                        <b-form-checkbox v-for="order,inx in orderItems " :key="inx" class="checkbox-choices" :value="order.value">
                            <div class="d-inline" >
                                {{processTooltip(order.text)[0]}}
                            </div>
                            <div v-if="processTooltip(order.text)[1]" class="d-inline">
                                <tooltip :index="0" :title="processTooltip(order.text)[1]" />
                            </div>
                            <div v-if="processTooltip(order.text)[2]" class="d-inline">
                                {{processTooltip(order.text)[2]}}
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

import {getOrderTypeCM} from './orderTypesCM'

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
    orderItems = [];
    dataReady = false

    allPages = []; 

    mounted(){
        this.dataReady = false;
        this.loadOrders()
        this.allPages = _.range(this.stPgNo.CM.OtherPersons, Object.keys(this.stPgNo.CM).length-1) 
        this.reloadPageInformation();
        this.dataReady = true
    }

    public loadOrders(){
        const orders = getOrderTypeCM('')
        this.orderItems = []
        for(const [key, value] of Object.entries(orders)){
            this.orderItems.push({value:key, text:value['text']})
        }
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.cmQuestionnaireSurvey) {
            this.selectedCaseManagement = this.step.result.cmQuestionnaireSurvey.data;
            
            if(this.selectedCaseManagement.length>0)
                this.setSteps(this.selectedCaseManagement,false);
        }
        
        const progress = this.selectedCaseManagement.length==0? 50 : 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }


    public onChange(selectedCaseManagement) {
        
        Vue.filter('surveyChanged')('caseMgmt');
        
        if(this.checkErrorOnPages())        
            this.setSteps(selectedCaseManagement, true);
        else{ 
            this.selectedCaseManagement = [];            
            this.togglePages(this.allPages, false); 
        }                
    }

    public setSteps(selectedCaseManagement, resetPagesProgress) {
       
        const p = this.stPgNo.CM
        
        if (selectedCaseManagement) {
            
            Vue.filter('surveyChanged')('caseMgmt')
            this.togglePages(this.allPages, false); 
            const progress = this.selectedCaseManagement.length==0? 50 : 100;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);

            if (selectedCaseManagement.length > 0){

                this.togglePages([p.OtherPersons, p.CmChildrenInfo, p.ReviewYourAnswersCM], true);                              
                
                for(const form of this.selectedCaseManagement)
                    getOrderTypeCM(form,true);           
        
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersCM, 0, false);

                if(resetPagesProgress){
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.OtherPersons, 0, false);                
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.WithoutNoticeOrAttendance, 0, false);                
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
                }

                if (this.step.result?.withoutNoticeOrAttendanceSurvey?.data?.needWithoutNotice) {
                    const needWithoutNotice = this.step.result.withoutNoticeOrAttendanceSurvey.data.needWithoutNotice
                    if (needWithoutNotice == 'n') {
                        this.togglePages([p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder], true); 
                    } else{                              
                        this.togglePages([p.ByConsent, p.CmNotice, p.AboutCaseManagementOrder], this.needConsent()); 
                    }                    
                    //schedule 1..5                    
                    for(const cmType of this.selectedCaseManagement)
                        getOrderTypeCM(cmType, true, (needWithoutNotice == 'y'));
                }
                
            }   
        }
    }  
    
    public needConsent(){        
        let needConsent = false;
        if (this.selectedCaseManagement.length>0){
            const selectedCaseManagementItems = this.selectedCaseManagement;            
            needConsent = selectedCaseManagementItems.filter(cmType => {return (getOrderTypeCM(cmType).turquoise == false)}).length>0;
        }
        return needConsent;
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
        
        for(const form of this.selectedCaseManagement){            
            result+='-'+getOrderTypeCM(form).text  +'\n';           
        }
        return result;
    }

    public processTooltip(text){
        
        let result = [text];
        const match: string = text.match(/`(.*)`/g)
        if(match)         
            result =text.split('`')        

        return result
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
