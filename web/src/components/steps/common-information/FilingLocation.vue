<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="locationInfo" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div v-if="messageA" class="m-3">
               
                <p>
                    I am filing in a family justice registry and I understand I 
                    will be required to participate in a needs assessment and complete a parenting 
                    education program, unless exempt, before a family management conference can be scheduled.
                </p>
                
                <p>
                    For more information about family justice registry requirements, 
                    <a href="https://www2.gov.bc.ca/gov/content?id=065CC36FFE804085B96DF218DAB22AF3" target="blank">
                        click here
                    </a>.
                </p>
                
            </div>
            <div v-if="messageB" class="m-3">
               
                <p>
                    I am filing in a parenting education program registry 
                    and I understand I will be required to complete a parenting education 
                    program, unless exempt, before a family management conference can be scheduled.
                </p>
                
                <p>
                    For more information about the parenting education program requirements, 
                    <a href="https://www2.gov.bc.ca/gov/content?id=991A99470F9B4576B6BD3E97CB649B2A" target="blank">
                        click here
                    </a>.
                </p>  
            </div>


            <template v-slot:modal-footer>               
                <b-button variant="success" @click="closeLocationInfo">I understand</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/filing-location.json";
import * as surveyEnv from "@/components/survey/survey-glossary"
import { togglePages, toggleStep } from '@/components/utils/TogglePages';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import * as _ from 'underscore';

import { namespace } from "vuex-class";
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component({
    components:{
        PageBase
    }
})

export default class FilingLocation extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;   

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[];
    
    @applicationState.State
    public rejectedPathway!: boolean;
    
    @applicationState.State
    public rejectedFileNumber!: string;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
    disableNextButton = false;
    currentStep =0;
    currentPage =0;
    locationInfo = false;
    messageA = false;
    messageB = false;

    allPages = [];   
    form1Enabled = false;   
    editButton = false;  

    selectedForms = [];
    selectedReplyForms = [];

    rflmIncluded = false;
    wrIncluded = false;
    poIncluded = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;        
    }

    mounted(){
        this.initPageNumbers()
        this.locationInfo = false;
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initPageNumbers(){        
        this.allPages = _.range(this.stPgNo.FLM.FlmBackground, Object.keys(this.stPgNo.FLM).length-1)
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
            Vue.filter('surveyChanged')('allExPO')
            
            if (this.rflmIncluded){
                this.determineContinueRflm();
            }            
            
            if(options.name == 'editLocation'){  
                const stepPO = this.$store.state.Application.steps[this.stPgNo.PO._StepNo]
                let pageNO = this.stPgNo.PO.About
                if(stepPO.result?.poQuestionnaireSurvey?.data?.orderType == 'needPO')
                    pageNO = this.stPgNo.PO.PoFilingLocation              

                this.$store.commit("Application/setCurrentStep", this.stPgNo.PO._StepNo);
                this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.PO._StepNo, currentPage: pageNO }); 
            }

            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);
                this.messageForLocation();

                // //___Reset FLM____
                const p = this.stPgNo.FLM  
                const allFLMPages = _.range(0, Object.keys(this.stPgNo.FLM).length-1)
                
                for(const FLMpage in allFLMPages)
                    if(this.$store.state.Application.steps[p._StepNo].pages[FLMpage].progress==100)
                        Vue.filter('setSurveyProgress')(null, p._StepNo, FLMpage, 50, false); 

                if (options.value){
                    this.survey.setValue("selectedExistingCourt",  true);
                } else {
                    this.survey.setValue("selectedExistingCourt",  false);    
                }
            }
            //reset step FLM currentpage to 0
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
        })   
    }

    public determineContinueRflm(){
        const location = this.survey.data.ExistingCourt;
        if (Vue.filter('includedInRegistries')(location, 'early-resolutions')) {
            
            if(this.survey.data?.MetEarlyResolutionRequirements == 'n'){
                toggleStep(this.stPgNo.RFLM._StepNo, false);
                this.disableNextButton = true;
            } else {
                toggleStep(this.stPgNo.RFLM._StepNo, true);
                this.disableNextButton = false;
            }
        }
    }

    public determineRegistry(location){
        this.form1Enabled = false;
        
        if (Vue.filter('includedInRegistries')(location, 'family-justice')){
            this.survey.setValue("familyJusticeRegistry",   true);
            this.survey.setValue("familyEducationProgram",  false);
            this.survey.setValue("earlyResolutionRegistry", false);
        } else if (Vue.filter('includedInRegistries')(location, 'parenting-education')) { 
            this.survey.setValue("familyJusticeRegistry",   false);           
            this.survey.setValue("familyEducationProgram",  true);  
            this.survey.setValue("earlyResolutionRegistry", false); 
        } else if (Vue.filter('includedInRegistries')(location, 'early-resolutions')) {
            this.survey.setValue("familyJusticeRegistry",   false);            
            this.survey.setValue("familyEducationProgram",  false);
            this.survey.setValue("earlyResolutionRegistry", true);

            if(this.survey.data?.MetEarlyResolutionRequirements == 'n'){
                togglePages(this.allPages, false, this.stPgNo.FLM._StepNo);
                this.form1Enabled = true;
            }          
        } else {                       
            this.survey.setValue("familyJusticeRegistry",   false);
            this.survey.setValue("familyEducationProgram",  false);  
            this.survey.setValue("earlyResolutionRegistry", false);
        }  
    }

    public closeLocationInfo(){
        this.locationInfo = false;
    }

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[8]["choices"] = [];
        
        for(const location of this.locationsInfo){            
            this.surveyJsonCopy.pages[0].elements[0].elements[8]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[4]["choices"].push(location["name"])
        }

        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity?.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity?.includes('replyToApplication');

        this.selectedForms = (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms:[];
        
        this.poIncluded = this.selectedForms.includes("protectionOrder");

        if(this.poIncluded){
            this.surveyJsonCopy.pages[0].elements[0].elements[0].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[4].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[5].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[8].readOnly = true;
            this.editButton = true
        }
        
        this.selectedReplyForms = (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms:[];

        this.wrIncluded = this.selectedReplyForms.includes("writtenResponse");
        this.rflmIncluded = this.selectedReplyForms.includes("replyFlm");

        if(this.wrIncluded || this.rflmIncluded){
            this.surveyJsonCopy.pages[0].elements[0].elements[0].readOnly = true;
           
        }
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = Number(this.steps[this.currentStep].currentPage);

        if (this.step.result?.filingLocationSurvey){
            this.survey.data = this.step.result.filingLocationSurvey.data;
            
            if (this.survey.data?.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);  
                this.survey.setValue("selectedExistingCourt",  true);
            } else {
                this.survey.setValue("selectedExistingCourt",  false);    
            }   
            
            if (this.rflmIncluded){
                this.determineContinueRflm();
            }   
            
        }

        this.survey.setVariable("editButton",this.editButton);       
        
        const stepPO = this.steps[this.stPgNo.PO._StepNo]
        
        if(this.poIncluded){
            
            if( stepPO.result?.poFilingLocationSurvey?.data && stepPO.result?.poQuestionnaireSurvey?.data?.orderType == 'needPO')
            {
                this.survey.setValue('ExistingFamilyCase',stepPO.result.poFilingLocationSurvey.data.ExistingFamilyCase);
                this.survey.setValue('ExistingCourt',     stepPO.result.poFilingLocationSurvey.data.ExistingCourt);
                this.survey.setValue('ExistingFileNumber',stepPO.result.poFilingLocationSurvey.data.ExistingFileNumber);
            }
            else if(stepPO.result?.aboutSurvey?.data &&              
                (stepPO.result?.poQuestionnaireSurvey?.data?.orderType == 'changePO'||
                 stepPO.result?.poQuestionnaireSurvey?.data?.orderType == 'terminatePO')){
                
                    this.survey.setValue('ExistingFamilyCase','y');
                    this.survey.setValue('ExistingCourt',     stepPO.result.aboutSurvey.data.ExistingCourt);
                    this.survey.setValue('ExistingFileNumber',stepPO.result.aboutSurvey.data.ExistingFileNumber);
            }

            
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
        }

        if(this.wrIncluded || this.rflmIncluded){
            this.survey.setValue('ExistingFamilyCase','y');
        }

        this.survey.setVariable("rflmIncluded", this.rflmIncluded);

        if(this.selectedForms.includes("familyLawMatter")
            || this.selectedForms.includes("caseMgmt")
            || this.selectedForms.includes("priorityParenting")
            || this.selectedForms.includes("childReloc")){

                this.survey.setValue('RequiresReasonInfo',true);                
        }  
              
        if(this.selectedForms.includes("agreementEnfrc")){
            this.survey.setValue('RequiresFMEPInfo',true);                
        } else {
           this.survey.setValue('RequiresFMEPInfo',false); 
        }

        this.survey.setVariable("enableSurvey", !this.rejectedPathway)
        if(this.rejectedPathway && this.rejectedFileNumber){
            this.survey.setValue('ExistingFamilyCase','y');
            this.survey.setValue('ExistingFileNumber', this.rejectedFileNumber)
        }

        this.messageForLocation();

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage();                                 
        }
    }

    public messageForLocation(){
        const location = this.survey?.data?.ExistingCourt
        this.messageB = false;
        this.messageA = false;

        if (location && (this.types.includes('Family Law Matter') || this.types?.includes('Reply to Application About a Family Law Matter') )){

            if (Vue.filter('includedInRegistries')(location, 'family-justice')){
                this.messageA = true;
                this.locationInfo = true;
            } else if (Vue.filter('includedInRegistries')(location, 'parenting-education')) {
                this.messageB = true;
                this.locationInfo = true;                
            }
        } else {            
            this.locationInfo = false; 
        }
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);
        this.survey.setVariable("registryLocation", location);
        if(Vue.filter('includedInRegistries')(location, 'early-resolutions') && (this.types?.includes('Family Law Matter') || this.types?.includes('Reply to Application About a Family Law Matter'))){
            this.survey.setVariable("victoriaSurrey", true);
            this.survey.setValue("courtLocationVictoriaSurrey", true);
            this.survey.setValue("familyJusticeRegistry", false);
            this.survey.setValue("familyEducationProgram", false);
            this.survey.setValue("earlyResolutionRegistry", true);
        } else {
            this.survey.setVariable("victoriaSurrey", false);
            this.survey.setValue("courtLocationVictoriaSurrey", false);
            this.survey.setValue("earlyResolutionRegistry", false);
        }        
    }  

    public setExistingFileNumber(){
       
        let newExistingOrders = [];
        
        for(const selectedForm of this.selectedForms){
        
            let fileType = Vue.filter('getPathwayPdfType')(selectedForm)

            const fileTypeFLM  = Vue.filter('getPathwayPdfType')('familyLawMatter')
            const fileTypeFLMform1 = Vue.filter('getPathwayPdfType')('familyLawMatterForm1')
            if((fileType == fileTypeFLM) && this.form1Enabled ) fileType = fileTypeFLMform1
        
            const fileNumber = this.survey.data?.ExistingFamilyCase == "y"? this.survey.data.ExistingFileNumber: ''
            newExistingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber});                     
        }
        
        for(const selectedReplyForm of this.selectedReplyForms){
        
            let fileType = Vue.filter('getPathwayPdfType')(selectedReplyForm);   
            
            if (fileType == "WRA" || fileType == "RPL"){
                const fileNumber = this.survey.data.ExistingFileNumber;
                newExistingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber});
            }                                
        }
        
        this.UpdateCommonStepResults({data:{'existingOrders':newExistingOrders}});
    }

    beforeDestroy() {       
        this.determineRegistry(this.survey.data.ExistingCourt);       
        this.setExistingFileNumber();        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {filingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>