<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    
import { namespace } from "vuex-class";

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/other-form-filing-location.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
const commonState = namespace("Common");

import { togglePages, toggleStep } from '@/components/utils/TogglePages';

import { stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { locationsInfoType } from '@/types/Common';
import { otherFormPathwayInfoType } from '@/types/Application/OtherFamilyForm';

@Component({
    components:{
        PageBase
    }
})
export default class OtherFormFilingLocation extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType; 
    
    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.State
    public rejectedPathway!: boolean;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    currentStep =0;
    currentPage =0;
    locationInfo = false; 
    filingMethod = null;
    selectedFormInfoList: otherFormPathwayInfoType[] = [];
    requiredGuidedPathways = [];

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.locationInfo = false;
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.adjustSurveyForLocations();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }    
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            
            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }

            this.determineSteps();                        
        })   
    }     

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"] = [];
        
        for(const location of this.locationsInfo){
            
            this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(location["name"])
        }
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);
        
        const stepResults = this.step.result;

        if (stepResults?.otherFormsSurvey?.data) {
            this.filingMethod = stepResults.otherFormsSurvey.data.filingMethod;
        }

        if (stepResults.completeOtherFormsSurvey?.data?.selectedFormInfoList){
            this.selectedFormInfoList = stepResults.completeOtherFormsSurvey.data.selectedFormInfoList;
        }

        if (stepResults?.otherFormsFilingLocationSurvey){
            this.survey.data = stepResults.otherFormsFilingLocationSurvey.data;
           
            if (this.survey.data.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        } 

        this.survey.setVariable("enableSurvey", !this.rejectedPathway)
        
        this.determineSteps();
        const progress = (this.determineContinue())? 100 : 50;        

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, progress, false);        
    }

    public determineContinue(){

        let requiredInfoExists = false;

        const existingCase = this.survey.data?.ExistingFamilyCase?this.survey.data.ExistingFamilyCase:'';

        if (existingCase == 'n'){
            requiredInfoExists = this.survey.data?.ExistingCourt?.length>0
        } else if (existingCase == 'y') {
            requiredInfoExists = this.survey.data?.ExistingCourt?.length>0 && this.survey.data?.ExistingFileNumber?.length>0;
        }

        return requiredInfoExists;        
    }

    public determineSteps(){

        const submitStep = this.stPgNo.SUBMIT;

        togglePages([submitStep.FilingOptions, submitStep.OtherFile, submitStep.NextSteps], false, submitStep._StepNo);
        toggleStep(submitStep._StepNo, false);  

        if (this.determineContinue()){
             
            this.setGuidedPathwaySteps();                    
            
            toggleStep(submitStep._StepNo, true);  
            togglePages([submitStep.OtherFile], true, submitStep._StepNo);

            this.UpdatePathwayCompleted({pathway:"other", isCompleted:true});
        }
    }

    public eFilingAffidavit(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("affidavit");                

    }

    public eFilingGuardianshipAffidavit(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("guardianshipAffidavit");                

    }

    public eFilingAffidavitPersonalService(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("affidavitPersonalService");                

    }

    public eFilingAffidavitPersonalServicePO(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("affidavitPersonalServicePO");                

    }

    public eFilingCertificateOfService(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("certificateOfService");                

    }

    public eFilingFinancialStatement(){

        const filingMethod = this.step.result.otherFormsSurvey?.data?.filingMethod?this.step.result.otherFormsSurvey.data.filingMethod:'';        
        return filingMethod == 'eFile' && this.requiredGuidedPathways.includes("financialStatement");                

    }

    public setGuidedPathwaySteps(){

        this.requiredGuidedPathways = [];
                
        for (const selectedForm of this.selectedFormInfoList){
            
            if (selectedForm.pathwayExists && selectedForm.pathwayState){
                this.requiredGuidedPathways.push(selectedForm.pathwayName);                
            }            
        }        
        toggleStep(this.stPgNo.NCD._StepNo, this.requiredGuidedPathways.includes("noticeOfAddressChange"));
        toggleStep(this.stPgNo.NDT._StepNo, this.requiredGuidedPathways.includes("noticeDiscontinuance"));     
        toggleStep(this.stPgNo.NPR._StepNo, this.requiredGuidedPathways.includes("noticeIntentionProceed"));        
        toggleStep(this.stPgNo.RQS._StepNo, this.requiredGuidedPathways.includes("requestScheduling"));
        toggleStep(this.stPgNo.TRIS._StepNo, this.requiredGuidedPathways.includes("trialReadinessStatement"));
        toggleStep(this.stPgNo.NLC._StepNo, this.requiredGuidedPathways.includes("noticeLawyerChild"));
        toggleStep(this.stPgNo.NLCR._StepNo, this.requiredGuidedPathways.includes("noticeRemoveLawyerChild"));
        toggleStep(this.stPgNo.NLP._StepNo, this.requiredGuidedPathways.includes("noticeLawyerParty"));
        toggleStep(this.stPgNo.NLPR._StepNo, this.requiredGuidedPathways.includes("noticeRemoveLawyerParty"));
        toggleStep(this.stPgNo.AFF._StepNo, this.requiredGuidedPathways.includes("affidavit"));
        togglePages([this.stPgNo.AFF.FilingAFF], this.eFilingAffidavit(), this.stPgNo.AFF._StepNo);
        toggleStep(this.stPgNo.GA._StepNo, this.requiredGuidedPathways.includes("guardianshipAffidavit"));
        togglePages([this.stPgNo.GA.FilingGA], this.eFilingGuardianshipAffidavit(), this.stPgNo.GA._StepNo);
        toggleStep(this.stPgNo.APS._StepNo, this.requiredGuidedPathways.includes("affidavitPersonalService"));
        togglePages([this.stPgNo.APS.ElectronicFilingStatementAPS], this.eFilingAffidavitPersonalService(), this.stPgNo.APS._StepNo);
        toggleStep(this.stPgNo.APSP._StepNo, this.requiredGuidedPathways.includes("affidavitPersonalServicePO"));
        togglePages([this.stPgNo.APSP.ElectronicFilingStatementAPSP], this.eFilingAffidavitPersonalServicePO(), this.stPgNo.APSP._StepNo);
        toggleStep(this.stPgNo.CSV._StepNo, this.requiredGuidedPathways.includes("certificateOfService"));
        togglePages([this.stPgNo.CSV.ElectronicFilingStatementCSV], this.eFilingCertificateOfService(), this.stPgNo.CSV._StepNo);
        toggleStep(this.stPgNo.FS._StepNo, this.requiredGuidedPathways.includes("financialStatement"));
        // togglePages([this.stPgNo.FS.FilingFS], this.eFilingFinancialStatement(), this.stPgNo.FS._StepNo); depends on responses on the initial page        
    }   

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);
        this.survey.setVariable("registryLocation", location);        
    }     

    public setExistingFileNumber(){
        const newExistingOrders = []; 
        
        if(this.step?.result?.completeOtherFormsSurvey?.data?.selectedFormInfoList?.length>0){
            const completeOtherFormsData = this.step.result.completeOtherFormsSurvey.data;
            const fileNumber = this.survey.data?.ExistingFamilyCase == 'y'? this.survey.data.ExistingFileNumber: ''
            for(const selectedform of completeOtherFormsData.selectedFormInfoList){
                // if(!selectedform.pathwayExists || selectedform.manualState) continue
                const pdfType = (Vue.filter('getPathwayPdfType')(selectedform.pathwayName))
                newExistingOrders.push({type: pdfType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber, doNotIncludePdf: pdfType == 'NDT'});                     
            }

            if(completeOtherFormsData.requiresEFSP){
                const pdfType = 'EFSP';
                newExistingOrders.push({type: pdfType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber, doNotIncludePdf: true});
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':newExistingOrders}});
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {           
            Vue.prototype.$UpdateGotoNextStepPage();                    
        }
    }

    beforeDestroy() {
        this.setExistingFileNumber();
        const progress = this.determineContinue()?100:50;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {otherFormsFilingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}});         
    }
}
</script>
