<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card no-body class="bg-white border-white my-5">        
            <h1>Complete your form(s)</h1>          
            <p>
                For some forms, you can choose to complete the form using 
                our guided pathway or as a fillable PDF document. The guided 
                pathways ask you questions and then put your answers into 
                the required forms. The questions include information to 
                explain what is needed. The guided pathways are free to use.
            </p>
            
            <p>
                Note: This service does not currently support the completion 
                of all the forms using a guided pathway. For unsupported forms, 
                you can complete the fillable PDFs to print and file, or upload 
                and file electronically, during the Review and File step of this process. 
            </p>

            <div class="info-section mt-4 mb-5" style="background: #f6e4e6; border-color: #e6d0c9; color: #5a5555; border-radius:10px;">
                <div class="row justify-content-center text-warning">
                    <p class="bg-primary py-0 px-2 mt-2 " style="border-radius: 10px; font-size: 20px;">SAFETY CHECK</p>
                </div>
                <div style="font-size: 18px;" class="mx-3 mb-1 pb-3">
                    By clicking on the 'Complete PDF form' button below, a PDF version of the form will 
                    download or open. Depending on your browser settings, your PDF might save the form 
                    to your computer or it will open in a new tab or window. For more information 
                    about opening and saving PDF forms, click on 
                    <span @click="navigateToGuide" class="text-primary" >
                        <span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
                        Get help opening and saving PDF forms
                    </span> 
                    below. If you are concerned about having a copy saved to your computer, may want to 
                    review and print from a safe computer, tablet or device, for example a computer, 
                    tablet or device of a trusted friend, at work, a library, school or an internet café.                
                </div>
            </div>
          
            <h4 class="primary">
                You have selected the following form(s) to complete and 
                <span v-if="filingMethod == 'inPerson'">
                    print for filing in person or by mail
                </span>
                <span v-else>file electronically</span>.
            </h4>
                    
            <ul>
                <div v-for="otherForm, inx in selectedFormInfoList" :key="inx">
                    <li>
                        <b-row  class="my-2">
                            <b-col cols="6">
                                {{otherForm.formName}} ({{ otherForm.formNumber }})
                                <span class="text-muted" style="display:block; font-size: 0.75rem;" v-if="otherForm.formName == 'Fax Filing Cover Page'">
                                    This form is only used when transmitting documents to the court registry by fax for filing.<br>
                                    Documents transmitted by fax are subject to the limitations set out in the Provincial Court Family Rules.
                                </span>
                            </b-col>
                            <b-col cols="4">                                
                                <b-button  
                                    v-if="otherForm.pathwayExists"
                                    :disabled="rejectedPathway"
                                    style="min-height: 2.5rem; font-size: 0.8rem; width: 90%;"
                                    @click="changeSelectedActivity(inx, true, otherForm.formName)"
                                    :pressed.sync="otherForm.pathwayState"
                                    :variant="otherForm.pathwayState?'primary':'secondary'">
                                    <b-icon-check v-if="otherForm.pathwayState" variant="success" scale="2" class="ml-n2 mr-2" /> Complete form using guided pathway
                                </b-button>
                            </b-col>
                            <b-col>
                                <b-button
                                    :disabled="rejectedPathway && !otherForm.manualState"
                                    style="min-height: 2.5rem; font-size: 0.8rem; width: 120%; margin-left:-2rem;"
                                    @click="changeSelectedActivity(inx, false, otherForm.formName)"
                                    :pressed.sync="otherForm.manualState"
                                    :variant="otherForm.manualState?'primary':'secondary'">
                                    <b-icon-check v-if="otherForm.manualState" variant="success" scale="2" class="ml-n2 mr-2" /> Complete PDF form
                                </b-button>
                            </b-col>
                        </b-row>                                
                    </li>
                </div>                       
            </ul>

            <p>
                If a guided pathway is available, click on the button “Complete 
                form using guided pathway” next to the form name to complete 
                the form using this service.
            </p>
            <p>
                To download or open the PDF version of the form to fill out 
                and save, click on the button “Complete PDF form” next to 
                the form name. The PDF will download or open in another window. 
            </p>

            <p v-if="requiresEFSP">
                If you are completing the PDF version of the form to fill out, 
                you will also need to submit an Electronic Filing Statement 
                when efiling. 
            </p>

            <ul v-if="requiresEFSP">
                <li>
                    <b-row  class="my-2">
                        <b-col cols="6">
                            Electronic Filing Statement (Form 51)                            
                        </b-col>
                        <b-col cols="4">
                        </b-col>
                        <b-col>
                            <b-button
                                :disabled="rejectedPathway"
                                style="min-height: 2.5rem; font-size: 0.8rem; width: 120%; margin-left:-2rem;"
                                variant="primary"
                                @click="downloadEFSP()">
                                <b-icon-check variant="success" scale="2" class="ml-n2 mr-2" /> Complete PDF form
                            </b-button>
                        </b-col>
                    </b-row>                                
                </li>
            </ul>

            <div name="pdf-guide" class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
            </div>    
            
            <p>
                By clicking the Next button below, you will be taken to the guided pathway(s) 
                you have selected, if applicable, and to the step to prepare for filing. If 
                you are completing your forms as fillable PDFs to file electronically through 
                this service, you will need to fill them out and save them to complete the next step.
            </p>
            <p>
                Note: If you no longer want to prepare a form to submit electrically, go back to 
                the previous page, edit your selection and return to this page before clicking Next.
            </p>
           
        </b-card>
        
        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf :isForm="true"/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="primary" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import PageBase from "../PageBase.vue";
import GetHelpForPdf from "@/components/steps/submit/helpPages/GetHelpForPDF.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import {stepInfoType, stepResultInfoType } from "@/types/Application";
import { otherFormInfoType, otherFormPathwayInfoType } from '@/types/Application/OtherFamilyForm';
import { togglePages, toggleStep } from '@/components/utils/TogglePages';
import { nameInfoType } from '@/types/Application/CommonInformation';

@Component({
    components:{
        PageBase,
        GetHelpForPdf
    }
})
export default class CompleteOtherForms extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public rejectedPathway!: boolean;

    @applicationState.State
    public loggedInUserName!: nameInfoType;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void      

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void
    
    selectedForms: otherFormInfoType[] = [];
    selectedFormInfoList: otherFormPathwayInfoType[] = [];
    filingMethod = null;
    requiresEFSP = false;

    showGetHelpForPDF = false;

    eFiling = false;
    efspNotSelected = false;    

    currentStep =0;
    currentPage =0;  

    // Temporarily turning off guided pathway for forms listed in PFCF-490: we need to revert this change after implementing new changes to the forms
    otherFormsList: otherFormPathwayInfoType[] = [
        {formName: 'Affidavit – General',                                   formNumber: 'Form 45',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'affidavit',                    formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa762.pdf?forcedownload=true'},
        {formName: 'Affidavit of Personal service',                         formNumber: 'Form 48',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'affidavitPersonalService',     formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa765.pdf?forcedownload=true'},
        {formName: 'Affidavit of Personal Service of Protection Order',     formNumber: 'Form 49',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'affidavitPersonalServicePO',   formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa766.pdf?forcedownload=true'},
        {formName: 'Certificate of Service',                                formNumber: 'Form 7',   pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'certificateOfService',         formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa714.pdf?forcedownload=true'},
        {formName: 'Consent adjournment',                                   formNumber: 'PFA920',   pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'consentAdjournment',           formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa920.pdf?forcedownload=true'},
        {formName: 'Consent Order',                                         formNumber: 'Form 18',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'consentOrder',                 formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa739.pdf?forcedownload=true'},
        {formName: 'Consent to an Informal Trial (Kamloops only)',          formNumber: 'PFA709',   pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'consentInformalTrial',         formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa709.pdf?forcedownload=true'},
        {formName: 'Electronic Filing Statement',                           formNumber: 'Form 51',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'electronicFilingStatement',    formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa768.pdf?forcedownload=true'},
        {formName: 'Fax Filing Cover Page',                                 formNumber: 'Form 52',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'faxFilingCoverPage',           formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa734.pdf'},
        {formName: 'Financial Statement',                                   formNumber: 'Form 4',   pathwayExists: true,     pathwayState: false, manualState: false,   pathwayName:'financialStatement',           formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa713.pdf?forcedownload=true'},
        {formName: 'Guardianship Affidavit',                                formNumber: 'Form 5',   pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'guardianshipAffidavit',        formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa733.pdf?forcedownload=true'},
        {formName: 'Notice of Address Change',                              formNumber: 'Form 46',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeOfAddressChange',        formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa763.pdf?forcedownload=true'},
        {formName: 'Notice of Discontinuance',                              formNumber: 'Form 50',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeDiscontinuance',         formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa767.pdf?forcedownload=true'},
        {formName: 'Notice of Exemption from Parenting Education Program',  formNumber: 'Form 20',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'noticeExemptionParentingEducationProgram', formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa740.pdf?forcedownload=true'},
        {formName: 'Notice of Intention to Proceed',                        formNumber: 'Form 2',   pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeIntentionProceed',       formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa711.pdf?forcedownload=true'},
        {formName: 'Notice of Lawyer for Child',                            formNumber: 'Form 40',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeLawyerChild',            formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa758.pdf?forcedownload=true'},
        {formName: 'Notice of Lawyer for Party',                            formNumber: 'Form 42',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeLawyerParty',            formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa760.pdf?forcedownload=true'},
        {formName: 'Notice of Participation',                               formNumber: 'PFA747',   pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'noticeParticipation',          formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa747.pdf?forcedownload=true '},
        {formName: 'Notice of Removal of Lawyer for Child',                 formNumber: 'Form 41',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeRemoveLawyerChild',      formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa761.pdf?forcedownload=true'},
        {formName: 'Notice of Removal of Lawyer for Party',                 formNumber: 'Form 43',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'noticeRemoveLawyerParty',      formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa759.pdf?forcedownload=true'},
        {formName: 'Order – General',                                       formNumber: 'Form 44',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'order',                        formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa719.pdf?forcedownload=true'},
        {formName: 'Referral Request',                                      formNumber: 'Form 21',  pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'referralRequest',              formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa741.pdf?forcedownload=true'},
        {formName: 'Request for Scheduling',                                formNumber: 'Form 39',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'requestScheduling',            formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa732.pdf?forcedownload=true'},
        {formName: 'Request for Service of Documents',                      formNumber: 'PFA110',   pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'requestServiceDocuments',      formLink:'https://www2.gov.bc.ca/assets/download/2EA3479AA5804C98A103B066BA37AF56?forcedownload=true'},
        {formName: 'Request for Service of Family Protection Order',        formNumber: 'PFA916',   pathwayExists: false,    pathwayState: false, manualState: false,   pathwayName:'requestServiceFPO',            formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa916.pdf?forcedownload=true'},
        {formName: 'Trial Readiness Statement',                             formNumber: 'Form 22',  pathwayExists: false,     pathwayState: false, manualState: false,   pathwayName:'trialReadinessStatement',      formLink:'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa735.pdf?forcedownload=true'}
    ]   

    mounted(){            
        this.reloadPageInformation();
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        const stepResults = this.step.result;

        if (stepResults?.otherFormsSurvey?.data) {
            this.selectedForms = stepResults.otherFormsSurvey.data.selectedOtherForms;
            this.filingMethod = stepResults.otherFormsSurvey.data.filingMethod;
        }
        this.selectedFormInfoList = [];
        this.requiresEFSP = false;

        if (stepResults.completeOtherFormsSurvey?.data?.selectedFormInfoList){

            const originalFormsPathwayInfo = stepResults.completeOtherFormsSurvey.data.selectedFormInfoList;
            
            //check to ensure all selected forms in previous page are in the selectedFormInfoList
            for (const selected of this.selectedForms){

                const index = originalFormsPathwayInfo.findIndex((selectedFormInfo) => {if(selectedFormInfo.formName == selected.formName)return true})

                if (index == -1){

                    const pathwayInfoIndex = this.otherFormsList.findIndex((otherForm) => {if(otherForm.formName == selected.formName)return true})
                    this.selectedFormInfoList.push(this.otherFormsList[pathwayInfoIndex])

                } else {
                    this.selectedFormInfoList.push(originalFormsPathwayInfo[index])
                }
            }

        } else {                    

            for(const otherForm of this.otherFormsList){

                if (this.selectedForms.findIndex((form) => {if(form.formName == otherForm.formName)return true}) != -1){                    
                    this.selectedFormInfoList.push(otherForm);                        
                }
            }   
        }

        this.eFiling = this.filingMethod != "inPerson"
        const efspIndex = this.selectedFormInfoList.findIndex((selectedFormInfo) => {if(selectedFormInfo.formName == 'Electronic Filing Statement')return true})
        this.efspNotSelected = efspIndex == -1;

        this.determineEfspRequired();        

        this.determineSteps(false);      

        const progress = (this.allFormsDecided())? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }

    public determineSteps(selectionChanged){

        const submitStep = this.stPgNo.SUBMIT;
        const p = this.stPgNo.OTHER;
        
        togglePages([p.OtherFormsFilingLocation], false, this.currentStep);
        
        togglePages([submitStep.FilingOptions, submitStep.ReviewAndPrint,submitStep.ReviewAndSave,submitStep.ReviewAndSubmit, submitStep.OtherFile, submitStep.NextSteps], false, submitStep._StepNo);
        if(selectionChanged) toggleStep(submitStep._StepNo, false);  

        if (this.allFormsDecided()){            

            if (this.filingMethod == "inPerson"){

                if (this.requiresGuidedPathway()){ 
                    togglePages([p.OtherFormsFilingLocation], true, this.currentStep);
                } else {
                    
                    toggleStep(submitStep._StepNo, true);                

                    togglePages([submitStep.NextSteps], true, submitStep._StepNo);
                    this.UpdatePathwayCompleted({pathway:"other", isCompleted:true})
                }

            } else {
                togglePages([p.OtherFormsFilingLocation], true, this.currentStep);                
            }
        }
    }   

    public requiresGuidedPathway(){

        let includesGuided = false;
        for (const selectedForm of this.selectedFormInfoList){
            
            if (selectedForm.pathwayExists && selectedForm.pathwayState){
                includesGuided = true;
                break;
            }            
        }
        return includesGuided;
    }   

    async downloadEFSP(){ 
        
        const efspIndex = this.otherFormsList.findIndex((formInfo) => {if(formInfo.formName == 'Electronic Filing Statement')return true})
       
        if (efspIndex != -1) {
            window.open(this.otherFormsList[efspIndex].formLink, '_blank'); 
        }  
    }

    async changeSelectedActivity(index: number, pathwaySelected: boolean, formName){           

        this.selectedFormInfoList[index].pathwayState = pathwaySelected;
        this.selectedFormInfoList[index].manualState = !pathwaySelected;

        this.requiresEFSP = false;

        this.determineEfspRequired();        

        if (!pathwaySelected){
            window.open(this.selectedFormInfoList[index].formLink, '_blank');        

            //_____TODO___ add other generated pathways here 
            let pdf_type=''
            if(formName=='Notice of Address Change') {
                const step = this.stPgNo.NCD._StepNo
                const page = this.stPgNo.NCD.PreviewFormsNCD
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)                
            }else if(formName=='Notice of Discontinuance'){
                const step = this.stPgNo.NDT._StepNo
                const page = this.stPgNo.NDT.PreviewFormsNDT
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Notice of Intention to Proceed'){
                const step = this.stPgNo.NPR._StepNo
                const page = this.stPgNo.NPR.PreviewFormsNPR
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Request for Scheduling'){
                const step = this.stPgNo.RQS._StepNo
                const page = this.stPgNo.RQS.PreviewFormsRQS
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Trial Readiness Statement'){
                const step = this.stPgNo.TRIS._StepNo
                const page = this.stPgNo.TRIS.PreviewFormsTRIS
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Notice of Lawyer for Child'){
                const step = this.stPgNo.NLC._StepNo
                const page = this.stPgNo.NLC.PreviewFormsNLC
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Notice of Removal of Lawyer for Child'){
                const step = this.stPgNo.NLCR._StepNo;
                const page = this.stPgNo.NLCR.PreviewFormsNLCR;
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Notice of Lawyer for Party'){
                const step = this.stPgNo.NLP._StepNo;
                const page = this.stPgNo.NLP.PreviewFormsNLP;
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Notice of Removal of Lawyer for Party'){
                const step = this.stPgNo.NLPR._StepNo;
                const page = this.stPgNo.NLPR.PreviewFormsNLPR;
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName);
            }else if(formName=='Affidavit – General'){
                const step = this.stPgNo.AFF._StepNo
                const page = this.stPgNo.AFF.PreviewFormsAFF
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Guardianship Affidavit'){
                const step = this.stPgNo.GA._StepNo
                const page = this.stPgNo.GA.PreviewFormsGA
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Affidavit of Personal service'){
                const step = this.stPgNo.APS._StepNo
                const page = this.stPgNo.APS.PreviewFormsAPS
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Affidavit of Personal Service of Protection Order'){
                const step = this.stPgNo.APSP._StepNo
                const page = this.stPgNo.APSP.PreviewFormsAPSP
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Certificate of Service'){
                const step = this.stPgNo.CSV._StepNo
                const page = this.stPgNo.CSV.PreviewFormsCSV
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }else if(formName=='Financial Statement'){
                const step = this.stPgNo.FS._StepNo
                const page = this.stPgNo.FS.PreviewFormsFS
                Vue.filter('setSurveyProgress')(null, step, page, 50, false);
                toggleStep(step, false);
                pdf_type=Vue.filter('fullNameToPdfType')(formName)
            }
            
            if(pdf_type) await this.removeGeneratedPDF(pdf_type)
        }

        const step = this.stPgNo.OTHER._StepNo
        const page = this.stPgNo.OTHER.OtherFormsFilingLocation
        Vue.filter('setSurveyProgress')(null, step, page, 50, false);
        this.determineSteps(true);
                
    } 

    public determineEfspRequired(){       
//TODO: add all pathways that require EFSP
        const formsRequiringEfsp = ["Affidavit – General", "Guardianship Affidavit", "Affidavit of Personal service", "Affidavit of Personal Service of Protection Order", "Certificate of Service", "Financial Statement"];

        if (this.eFiling && this.efspNotSelected){
            for(const selectedForm of this.selectedFormInfoList){

                if (formsRequiringEfsp.findIndex((formName) => {if(formName == selectedForm.formName && selectedForm.manualState)return true}) != -1){                    
                    this.requiresEFSP = true;                            
                }
            } 
        }
    }

    public allFormsDecided(){

        let decided = true;
        for (const selectedForm of this.selectedFormInfoList){
            
            if (!(selectedForm.manualState || (selectedForm.pathwayExists && selectedForm.pathwayState))){
                decided = false;
                break;
            }            
        }
        return decided;
    } 
    
    async removeGeneratedPDF(pdf_type){
        const applicationId = this.$store.state.Application.id;       
        const url = '/survey-print/'+applicationId+'/?pdf_type=' + pdf_type
       
        return this.$http.delete(url)
        .then(res => {
            // console.log(res)            
        },err => {
            console.error(err);        
        });
    }

    public navigateToGuide(){
        Vue.filter('scrollToLocation')("pdf-guide");
    } 
    
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }    

    public onNext() { 
        Vue.prototype.$UpdateGotoNextStepPage();
    }    
  
    beforeDestroy() {
        const progress = this.allFormsDecided()? 100 : 50;
        const pageData = {selectedFormInfoList: this.selectedFormInfoList, requiresEFSP: this.requiresEFSP};
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);  
        this.UpdateStepResultData({step:this.step, data: {completeOtherFormsSurvey: {data: pageData, currentStep:this.currentStep, currentPage:this.currentPage}}});
        
        if (!this.requiresGuidedPathway()) {

            const commonData = {
                'applicantName':{first:this.loggedInUserName.first, middle:"", last:this.loggedInUserName.last},
                'respondents':[{first:"firstRespondent", middle:"", last:"lastRespondent"}]
            };

            this.UpdateCommonStepResults({data:commonData});
        }      
        
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";
@import "../../../styles/common";

.closeButton {
	background-color: transparent !important;
	color: white;
	border: white;
	font-weight: 700;
	font-size: 2rem;
	padding-top: 0;
	margin-top: 0;
}




</style>
