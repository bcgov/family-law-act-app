<template>
  <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()"  :disableNext="selectedEnforcementQuestionnaire.length==0">
    
    <div class="row">
    <div class="col-md-12 order-heading">
        <div>
            <h2>Enforcement Questionnaire</h2>

            <p>
                The Provincial Court Family Rules include a range of enforcement options. In most cases, it is up to each person to let the 
                court know that they believe the other party is not following an agreement, order, or determination.
            </p>

            <p>
                This pathway can help you to apply to enforce orders or written agreements about parenting arrangements, including parenting 
                time, and contact with a child. It can also be used to apply to enforce disclosure orders, conduct orders and orders generally 
                under both the Provincial Court Family Rules and the Family Law Act. It can’t be used to enforce child support and spousal 
                support orders under the Family Maintenance Enforcement Act.
            </p>

            <p>
                You may want to talk to a lawyer or <a target="_blank" href="https://www2.gov.bc.ca/gov/content?id=E12512BAACDF45979AEF905033BE4CEA">family justice counsellor</a> to help you understand:                
                <ul> 
                    <li>
                        if the other person is not following the agreement, order, or determination,
                    </li>
                    <li>
                        what consequences you can ask the court to order, and 
                    </li>
                    <li>
                        if there might be another way to solve the problem.
                    </li>
                </ul>
            </p>
            
        </div>

        <div class="mb-5">
            <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showLegalAssistance" class="mx-4 mb-5 mt-3">
                Understanding the law and making sure you ask for the right order is important. If you ask for the wrong order or 
                do not know how the law applies to your situation, it can be harder to resolve your case. Getting advice from a 
                lawyer can help.<br/><br/>
                <b>Lawyers:</b> To find a lawyer or to have a free consultation with a lawyer for up to 30 minutes, contact the 
                    <a href='https://www.cbabc.org/For-the-Public/Lawyer-Referral-Service' target="_blank">Lawyer Referral Service</a> 
                    at 1-800-663-1919<br/><br/>
                <b>Legal Aid, Duty Counsel and Family Advice Lawyers:</b> To find out if you qualify for free legal advice or representation, contact 
                <a href='https://lss.bc.ca/legal_aid/howToApply.php' target="_blank">Legal Aid BC</a> at 
                <p style='display:inline-block'>1-866-577-2525.</p><br/>
                <b>Legal Services and Resources:</b> 
                Visit <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">Clicklaw</a> at 
                <a href='https://www.clicklaw.bc.ca/helpmap' target="_blank">www.clicklaw.bc.ca/helpmap</a> 
                to find other free and low-cost legal services in your community
            </div>
        </div>

        <div class="mb-5">
            <div class="m-4 text-primary" @click="showEnforceOrder= !showEnforceOrder" style="border-bottom:1px solid; width:50rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
                    How can I enforce a child or spousal support order under the Family Maintenance Enforcement Act? 
                <span v-if="showEnforceOrder" class='ml-2 fa fa-chevron-up'/>
                <span v-if="!showEnforceOrder" class='ml-2 fa fa-chevron-down'/>
            </div>
            <div v-if="showEnforceOrder" class="mx-4 mb-5 mt-3">

                <p>
                    The <a href="https://www.fmep.gov.bc.ca/" target="_blank">Family Maintenance Enforcement Program</a> is a free BC government service that will monitor support payments as they are made (or not made), calculate interest on unpaid support and enforce the support orders that are registered with the program.
                </p>
                <p>
                    If you need to enforce a child support or spousal support order or written agreement, you may want to contact them first to see if they can help. Visit their website at <a href="https://www.fmep.gov.bc.ca/" target="_blank">www.fmep.gov.bc.ca</a> or contact them by telephone at 1-800-663-3455.
                </p>
                <p>
                    Individuals can also enforce child support and spousal support agreements or court orders on their own or with a lawyer using the <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96127_01" target="_blank">Family Maintenance Enforcement Act</a>. The Provincial Court Family Rules about enforcement under the Family Maintenance Enforcement Act can be found under <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#division_d1e8990" target="_blank">Division 2 of Part 10</a>.
                </p>
                <p>
                    The <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa749.pdf?forcedownload=true" target="_blank">Application for Garnishment, Summons or Warrant Form 30</a> and <a target="_blank" href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa754.pdf?forcedownload=true">Application for Order Under the Family Maintenance Enforcement Act Form 35</a> may be used.
                </p>

            </div>
        </div>

        <div>
            <h2 style="color: #556077; font-size: 1.35em; line-height: 1.2;">I want to apply to:</h2>
            <p style="font-size: 1.1rem;">
                Please select each option you want to ask the court for an order about. You will be asked to give more details later.
            </p>
        </div>
        <div v class="checkbox-border">
            <b-form-group>
                <b-form-checkbox-group
                v-model="selectedEnforcementQuestionnaire"
                v-on:change="onChange($event)"
                name="orders"
                stacked
                >                
                    <div>
                        <b-form-checkbox class="checkbox-choices" value="writtenAgreementOrder">
                            <b>
                                Enforce a written agreement or order       
                            </b>
                            <div>
                                Sometimes people don’t follow written agreements or court orders. If this happens, you can apply 
                                to have the court help enforce it and ask that the court impose consequences on the person who 
                                isn’t following the agreement or order.    
                            </div>                                      
                        </b-form-checkbox>
                    </div>

                    <div >
                        <b-form-checkbox class="checkbox-choices" value="parentingCoordinatorDetermination">
                            <b>
                                Enforce, Change or Set Aside a <tooltip title="Determination of a Parenting Coordinator" :index="0"/>
                            </b>
                            <div>
                                Sometimes people don’t follow a determination of a parenting coordinator. If this happens, you 
                                can apply to have the court help enforce it just like a court order and ask that the court 
                                impose consequences on the person who isn’t following the determination. If you believe the 
                                parenting coordinator’s decision was made outside their <tooltip title="authority" :index="0"/> 
                                or that they made a mistake about the law or about how the facts and the law work together, you 
                                can apply to court to have it changed or set aside.    
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="expenses">
                            <b>
                                Set an amount of money owing for <tooltip title="expenses" :index="0"/> for 
                                <tooltip title="failure to comply" :index="0"/>                                
                            </b>
                            <div>
                                If the court made an order requiring the other party to pay expenses to you because they failed 
                                to comply with an order, or because of their actions, and the court did not determine the amount 
                                or schedule a hearing to determine the amount, you can apply to have the court set an amount.       
                            </div>                         
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="arrears">
                            <b>
                                Determine if <tooltip title="arrears" :index="0"/> are owing from a support order or agreement 
                                made under the Family Law Act and, if so, the amount of the arrears    
                            </b>
                            <div>
                                When a person who must pay child or spousal support doesn’t, a debt called arrears starts to 
                                add up. Determining if arrears are owing is important for a person who owes arrears, the payor, 
                                and the person who support is owed to, the recipient. If arrears are owing, the court can also 
                                determine the amount owing. You can apply to the court to determine if arrears are owing and 
                                the amount. 
                            </div>                        
                        </b-form-checkbox>
                    </div>

                    <div>
                        <b-form-checkbox class="checkbox-choices" value="foreignSupport">
                            <b>
                                Set aside the registration of a foreign support order    
                            </b>
                            <div>
                                If you received notice of registration of a foreign order from the BC Provincial Court, you 
                                can apply to set aside the registration within 30 days after receiving the notice. A foreign 
                                support order registered in BC Provincial Court under 
                                <a target="_blank" href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/02029_01#section18">s. 18 of the Interjurisdictional Support Orders Act</a> can be enforced under BC laws.            
                            </div>                        
                        </b-form-checkbox>
                    </div>                   
            
                </b-form-checkbox-group>
            </b-form-group>
        </div>

        
    </div>
    </div>

    <b-card v-if="confirmedError" name="next-error" class="alert-danger p-3 my-4 " no-body>You need to click the 'Next' button</b-card>

    <b-modal size="xl" v-model="popInfo" header-class="bg-white" no-close-on-backdrop hide-header>
        
        <div class="m-3">               
            <p>
                An application to set aside the registration of a foreign order under the Interjurisdictional 
                Support Orders Act must be <b>served on the designated authority at least 30 days</b> before the date 
                referred to in the application for the court appearance. You <b>do not need to serve the other party.</b> 
                The designated registry will do that for you.
            </p>                
            <p>
                To serve the designated registry, you must send the application and a copy of the foreign order by registered mail to:
            </p>
            <p class="mb-0">Interjurisdictional Support Services</p>
            <p class="my-0">Vancouver Main Office Boxes</p>
            <p class="my-0">P.O. Box 2074</p>
            <p>Vancouver, BC V6B 3S3</p>
            <p>
                You must also include a copy of the foreign order when you file your documents. You will be reminded to include a copy at the end of the service.
            </p>
            <b-form-checkbox 
                class="mt-4"
                v-model="popInfoUnderstand"               
                value="understand"
                unchecked-value="">
                <h4 style="margin: 0.26rem 0.5rem;">
                    I understand
                </h4>
            </b-form-checkbox>
        </div>   

        <template v-slot:modal-footer>
            <b-button :disabled="popInfoUnderstand != 'understand'" variant="success" @click="closePopupConfirm();">Continue</b-button>
        </template>
    </b-modal>

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
export default class EnfrcQuestionnaire extends Vue {
    
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
    
    selectedEnforcementQuestionnaire = [];

    showLegalAssistance = false;
    showEnforceOrder = false;
    popInfo = false;
    popInfoUnderstand = '';    

    confirmedError = false;

    currentStep = 0;
    currentPage = 0;

    allPages = []; 

    mounted(){
        this.confirmedError = false
        this.allPages = _.range(this.stPgNo.ENFRC.EnforceAgreementOrOrder, Object.keys(this.stPgNo.ENFRC).length-1) 
        this.reloadPageInformation();
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.enfrcQuestionnaireSurvey) {
            this.selectedEnforcementQuestionnaire = this.step.result.enfrcQuestionnaireSurvey.data;
        }

        this.setSteps(this.selectedEnforcementQuestionnaire, false);
        
        this.setProgress(false)
    }


    public onChange(selectedEnforcementQuestionnaire) {
        const p = this.stPgNo.ENFRC
        this.UpdatePathwayCompleted({pathway:"agreementEnfrc", isCompleted:false});
        this.togglePages([p.PreviewForm26ENFRC, p.PreviewForm27ENFRC, p.PreviewForm28ENFRC, p.PreviewForm29ENFRC], false);
        
        if(this.checkErrorOnPages())        
            this.setSteps(selectedEnforcementQuestionnaire, true);
        else{ 
            this.selectedEnforcementQuestionnaire = [];             
        }
        Vue.filter('surveyChanged')('agreementEnfrc')        
    }

    public setSteps(selectedEnforcementQuestionnaire, surveyChanged) {

        const p = this.stPgNo.ENFRC
        if (selectedEnforcementQuestionnaire) {
            
            // const progress = this.selectedEnforcementQuestionnaire.length==0? 50 : 100;
            // Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
            this.setProgress(surveyChanged)

            if (selectedEnforcementQuestionnaire.length > 0){
                
                this.togglePages([p.AboutTheOrderEnforcement, p.ReviewYourAnswersENFRC],true)
                this.togglePages([p.DetermineAnAmountOwingForExpenses], this.selectedEnforcementQuestionnaire.includes("expenses"));
                this.togglePages([p.DetermineArrears], this.selectedEnforcementQuestionnaire.includes("arrears"));
                this.togglePages([p.EnforceAgreementOrOrder], this.selectedEnforcementQuestionnaire.includes("writtenAgreementOrder"));
                this.togglePages([p.EnforceChangeOrSetAsideDetermination], this.selectedEnforcementQuestionnaire.includes("parentingCoordinatorDetermination"));    
                
                if(surveyChanged){
                    if(this.$store.state.Application.steps[this.currentStep].pages[p.EnforceAgreementOrOrder].progress==100)
                        Vue.filter('setSurveyProgress')(null, this.currentStep, p.EnforceAgreementOrOrder, 50, false);
                                    
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.EnforceChangeOrSetAsideDetermination, 0, false); 
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.DetermineAnAmountOwingForExpenses, 0, false);  
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.DetermineArrears, 0, false);         
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.AboutTheOrderEnforcement, 0, false);                            
                    Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersENFRC, 0, false);
                }
                
            }else{
                this.togglePages(this.allPages, false);  
                this.confirmedError = false
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
        if (this.selectedEnforcementQuestionnaire.includes('foreignSupport')) {            
            this.popInfo = true;
        } else {
            this.UpdateGotoNextStepPage();
        }
    }

    public closePopupConfirm(){
        this.popInfo = false;
        this.UpdateGotoNextStepPage();            
    }

    public getselectedEnforcementQuestionnaireNames(){
        let result = ''       
        for(const form of this.selectedEnforcementQuestionnaire){
            if(form=='writtenAgreementOrder')   result+='-Enforce a written agreement or order'+'\n';
            if(form=='parentingCoordinatorDetermination')  result+='-Enforce, Change or Set Aside a Determination of a Parenting Coordinator'+'\n';
            if(form=='expenses')    result+='-Set an amount of money owing for expenses for failure to comply'+'\n';
            if(form=='arrears')         result+='-Determine if arrears are owing from a support order or agreement made under the Family Law Act and, if so, the amount of the arrears'+'\n';
            if(form=='foreignSupport')          result+='-Set aside the registration of a foreign support order'+'\n';
            
        }
        return result;
    }

    public setProgress(surveyChanged){
        
        const initProgress = this.step.pages[this.currentPage].progress
        
        let progress = this.selectedEnforcementQuestionnaire.length==0? 50 : 100;
  
        if(surveyChanged || initProgress != 100){           
                
            if (this.selectedEnforcementQuestionnaire?.includes('foreignSupport') && this.popInfoUnderstand != 'understand'){
                Vue.filter('surveyChanged')('agreementEnfrc')
                progress = 50
            }
        }

        if(progress == 50 && this.selectedEnforcementQuestionnaire.length>0){ 
            this.confirmedError = true
            Vue.filter('scrollToLocation')('next-error')
        }
        else
            this.confirmedError = false

        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }
  
    beforeDestroy() {
        this.setProgress(false)
        const questions = [{name:'EnfrcQuestionnaire',title:'I want to apply for the following Enforcement options:',value:this.getselectedEnforcementQuestionnaireNames()}]        
        this.UpdateStepResultData({step:this.step, data: {enfrcQuestionnaireSurvey: {data: this.selectedEnforcementQuestionnaire, questions: questions, pageName:"Enforcement Questionnaire", currentStep:this.currentStep, currentPage:this.currentPage}}});
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
