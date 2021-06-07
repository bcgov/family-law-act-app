<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
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
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import moment from 'moment-timezone';

import PageBase from "../PageBase.vue";
import { nameInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";
import * as _ from 'underscore';

import { namespace } from "vuex-class";

import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
const commonState = namespace("Common");

@Component({
    components:{
        PageBase
    }
})

export default class FilingLocation extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;   

    @commonState.State
    public locationsInfo!: any[];

    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.State
    public respondentName!: nameInfoType;

    @applicationState.State
    public steps!: any

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
    currentStep=0;
    currentPage=0;
    locationInfo = false;
    messageA = false;
    messageB = false;

    form1Enabled = false;

    aboutPOpage = 11
    filingLocationPOpage = 3
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
    
    allPages = _.range(1,41)

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
            Vue.filter('surveyChanged')('familyLawMatter')
            // console.log(options)            
            
            if(options.name == 'editLocation'){  

                let pageNO = this.aboutPOpage
                if( this.$store.state.Application.steps[1].result && 
                    this.$store.state.Application.steps[1].result.selectedPOOrder &&
                    this.$store.state.Application.steps[1].result.selectedPOOrder.data &&
                    this.$store.state.Application.steps[1].result.selectedPOOrder.data.orderType == 'needPO')
                        pageNO = this.filingLocationPOpage              

                this.$store.commit("Application/setCurrentStep", 1);
                this.$store.commit("Application/setCurrentStepPage", {currentStep: 1, currentPage: pageNO }); 
            }

            //console.log(this.survey.data);
            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);
                this.messageForLocation();
            }
            //reset step 3 page to 0
            this.$store.commit("Application/setCurrentStepPage", {currentStep: 3, currentPage: 0 });
        })   
    }

    public determineRegistry(location){
        this.form1Enabled = false;
        if (this.courtsA.includes(location)){           
            this.survey.setValue("familyJusticeRegistry",   true);
            this.survey.setValue("familyEducationProgram",  false);
            this.survey.setValue("earlyResolutionRegistry", false);
        } else if (this.courtsB.includes(location)) {           
            this.survey.setValue("familyJusticeRegistry",   false);           
            this.survey.setValue("familyEducationProgram",  true);  
            this.survey.setValue("earlyResolutionRegistry", false); 
        } else if (this.courtsC.includes(location)) {           
            this.survey.setValue("familyJusticeRegistry",   false);            
            this.survey.setValue("familyEducationProgram",  false);
            if(this.survey.data.MetEarlyResolutionRequirements == 'n'){                
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
        //this.UpdateGotoNextStepPage();
    }

    public adjustSurveyForLocations(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson)); 
        
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"] = [];
        
        for(const location of this.locationsInfo){
            
            this.surveyJsonCopy.pages[0].elements[0].elements[7]["choices"].push(location["name"])
            this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(location["name"])
        }

        if(this.steps[0].result && this.steps[0].result['selectedForms'].includes("protectionOrder")){
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
        //console.log(this.step.result)
        if (this.step.result && this.step.result["filingLocationSurvey"]){
            this.survey.data = this.step.result["filingLocationSurvey"].data;
            
            if (this.survey.data.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        }

        this.survey.setVariable("editButton",this.editButton);

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));
        this.survey.setVariable("RespondentName", Vue.filter('getFullName')(this.respondentName));
        //console.log(this.respondentName)        

        if(this.steps[0].result && this.steps[0].result['selectedForms'].includes("protectionOrder")){
            
            if( this.steps[1].result && 
                this.steps[1].result['poFilingLocationSurvey'] && 
                this.steps[1].result['poFilingLocationSurvey'].data &&
                this.steps[1].result['selectedPOOrder'] &&
                this.steps[1].result['selectedPOOrder'].data &&
                this.steps[1].result['selectedPOOrder'].data.orderType == 'needPO')
            {
                // console.log('case1')
                // console.log(this.steps[1].result['poFilingLocationSurvey'].data.ExistingCourt)
                this.survey.setValue('ExistingFamilyCase',this.steps[1].result['poFilingLocationSurvey'].data.ExistingFamilyCase);
                this.survey.setValue('ExistingCourt',     this.steps[1].result['poFilingLocationSurvey'].data.ExistingCourt);
                this.survey.setValue('ExistingFileNumber',this.steps[1].result['poFilingLocationSurvey'].data.ExistingFileNumber);
                // console.log(this.survey.data)

            }
            else if( this.steps[1].result &&
                this.steps[1].result['aboutPOSurvey'] &&
                this.steps[1].result['aboutPOSurvey'].data &&
                this.steps[1].result['selectedPOOrder'] &&
                this.steps[1].result['selectedPOOrder'].data &&
                (this.steps[1].result['selectedPOOrder'].data.orderType == 'changePO'||this.steps[1].result['selectedPOOrder'].data.orderType == 'terminatePO'))
            {//console.log('case2')
                this.survey.setValue('ExistingFamilyCase','y');
                this.survey.setValue('ExistingCourt',     this.steps[1].result['aboutPOSurvey'].data.ExistingCourt);
                this.survey.setValue('ExistingFileNumber',this.steps[1].result['aboutPOSurvey'].data.ExistingFileNumber);
            }

            this.messageForLocation();
            this.$store.commit("Application/setCurrentStepPage", {currentStep: 3, currentPage: 0 });
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

        if (this.courtsA.includes(location)){
            this.messageA = true;
            this.locationInfo = true;
        } else if (this.courtsB.includes(location)) {
            this.messageB = true;
            this.locationInfo = true;                
        } else {            
            this.locationInfo = false; 
        }
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location);
        this.survey.setVariable("registryLocation", location);
        if(this.courtsC.includes(location)){
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
        const fileTypeI  = 'FLC'
        const fileTypeII = 'NTRF'
        const fileType = this.form1Enabled? fileTypeII : fileTypeI

        const existingOrders = this.$store.state.Application.steps[0]['result']?this.$store.state.Application.steps[0]['result']['existingOrders']:''
        
        const existingOrdersCondition = this.survey.data && this.survey.data.ExistingFamilyCase == "y"

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == fileTypeI || order.type == fileTypeII)})
            if(index >= 0 ){
                if(existingOrdersCondition)
                    existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}                   
                else
                    existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: ''}                                 
            }else{
                if(existingOrdersCondition)
                    existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber});
                else
                    existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: ''});                     
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{
            if(existingOrdersCondition)
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}]}});
            else
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: '' }]}});    
        }
    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {            
            this.$store.commit("Application/setPageActive", {
                currentStep: 3,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
