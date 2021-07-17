<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="locationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div v-if="messageA" class="m-3">
               
                <p>
                    I am filing my application in a family justice registry and I understand I 
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
                    I am filing my application in a parenting education program registry 
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

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { nameInfoType } from "@/types/Application/CommonInformation";
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
    public applicantName!: nameInfoType;

    @applicationState.State
    public respondentName!: nameInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

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
    editButton = false

    courtsA = [
        "Kelowna Law Courts", 
        "Nanaimo Law Courts", 
        "Robson Square Provincial Court"
    ];

    courtsB = [
        "Abbotsford Provincial Court", 
        "Campbell River Court", 
        "Chilliwack Law Courts",
        "Courtenay Law Courts",
        "Kamloops Court",
        "New Westminster Law Courts",
        "North Vancouver Court",
        "Penticton Law Courts",
        "Port Coquitlam Court",
        "Prince George Law Courts",
        "Richmond Court Small Claims and Family Court",
        "Richmond Provincial Court",
        "Vernon Law Courts"
    ];

    courtsC = [
        "Victoria Law Courts",
        "Surrey Provincial Court"
    ];    

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.allPages = _.range(this.stPgNo.FLM.FlmBackground, Object.keys(this.stPgNo.FLM).length-1)
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
            Vue.filter('surveyChanged')('allExPO')    
            
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
            }
            //reset step FLM currentpage to 0
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
        })   
    }

    public determineRegistry(location){
        this.form1Enabled = false;
        if (this.courtsA?.includes(location)){           
            this.survey.setValue("familyJusticeRegistry",   true);
            this.survey.setValue("familyEducationProgram",  false);
            this.survey.setValue("earlyResolutionRegistry", false);
        } else if (this.courtsB?.includes(location)) {           
            this.survey.setValue("familyJusticeRegistry",   false);           
            this.survey.setValue("familyEducationProgram",  true);  
            this.survey.setValue("earlyResolutionRegistry", false); 
        } else if (this.courtsC?.includes(location)) {           
            this.survey.setValue("familyJusticeRegistry",   false);            
            this.survey.setValue("familyEducationProgram",  false);
            if(this.survey.data?.MetEarlyResolutionRequirements == 'n'){                
                this.togglePages(this.allPages,false);
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
        
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"] = [];
        
        for(const location of this.locationsInfo){            
            this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(location["name"])
        }

        if(this.steps[0].result?.selectedForms?.includes("protectionOrder")){
            this.surveyJsonCopy.pages[0].elements[0].elements[0].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[3].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[4].readOnly = true;
            this.surveyJsonCopy.pages[0].elements[0].elements[7].readOnly = true;
            this.editButton = true
        }
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.steps[this.currentStep].currentPage;

        if (this.step.result?.filingLocationSurvey){
            this.survey.data = this.step.result.filingLocationSurvey.data;
            
            if (this.survey.data?.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        }

        this.survey.setVariable("editButton",this.editButton);

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));
        this.survey.setVariable("RespondentName", Vue.filter('getFullName')(this.respondentName));
        
        const stepPO = this.steps[this.stPgNo.PO._StepNo]

        if(this.steps[0].result?.selectedForms?.includes("protectionOrder")){
            
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

            this.messageForLocation();
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.FLM._StepNo, currentPage: this.stPgNo.FLM.FlmQuestionnaire });
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage();                                 
        }
    }

    public messageForLocation(){
        const location = this.survey.data.ExistingCourt

        if (this.types.includes('Family Law Matter')){

            if (this.courtsA?.includes(location)){
                this.messageA = true;
                this.locationInfo = true;
            } else if (this.courtsB?.includes(location)) {
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
        if(this.courtsC?.includes(location) && this.types?.includes('Family Law Matter')){
            this.survey.setVariable("victoriaSurrey", true);
            this.survey.setValue("familyJusticeRegistry", false);
            this.survey.setValue("familyEducationProgram", false);
            this.survey.setValue("earlyResolutionRegistry", true);
        } else {
            this.survey.setVariable("victoriaSurrey", false);
            this.survey.setValue("earlyResolutionRegistry", false);
        } 
    }  

    public setExistingFileNumber(){
        let newExistingOrders = [];
        const selectedForms = this.$store.state.Application.steps[0].result? this.$store.state.Application.steps[0].result.selectedForms: []
        
        for(const selectedForm of selectedForms){
        
            let fileType = Vue.filter('getPathwayPdfType')(selectedForm)

            const fileTypeFLM  = Vue.filter('getPathwayPdfType')('familyLawMatter')
            const fileTypeFLMform1 = Vue.filter('getPathwayPdfType')('familyLawMatterForm1')
            if((fileType == fileTypeFLM) && this.form1Enabled ) fileType = fileTypeFLMform1
        
            const fileNumber = this.survey.data?.ExistingFamilyCase == "y"? this.survey.data.ExistingFileNumber: ''
            newExistingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: fileNumber});                     
        }
        
        this.UpdateCommonStepResults({data:{'existingOrders':newExistingOrders}});
    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {            
            this.$store.commit("Application/setPageActive", {
                currentStep: this.stPgNo.FLM._StepNo,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    beforeDestroy() {

        this.determineRegistry(this.survey.data.ExistingCourt);
        this.setExistingFileNumber();
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        this.UpdateStepResultData({step:this.step, data: {filingLocationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
};
</script>