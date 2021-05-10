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
    courtsA = [
            "Kelowna Law Courts", 
            "Nanaimo Law Courts", 
            "Vancouver Law Courts"
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
            //console.log(this.survey.data);            
            if(options.name == 'CourtLocation') {
                this.saveApplicationLocation(this.survey.data.CourtLocation);
            }

            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);
            }
        })   
    }

    public determineRegistry(location){
        console.log(location)
        
        if (this.courtsA.includes(location)){
            this.messageA = true;
            this.locationInfo = true;
            this.survey.setValue("familyJusticeRegistry", true);
            this.survey.setValue("familyEducationProgram", false);
            this.survey.setValue("earlyResolutionRegistry", false);
        } else if (this.courtsB.includes(location)) {
            this.messageB = true;
            this.locationInfo = true;
            this.survey.setValue("familyJusticeRegistry", false);
            this.survey.setValue("earlyResolutionRegistry", false);
            this.survey.setValue("familyEducationProgram", true);            
        } else {            
            this.locationInfo = false;
            this.survey.setValue("familyJusticeRegistry", false);
            this.survey.setValue("familyEducationProgram", false);           
            this.UpdateGotoNextStepPage();            
        }  
    }

    public closeLocationInfo(){
        this.locationInfo = false;
        this.UpdateGotoNextStepPage();
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
        //console.log(this.step.result)
        if (this.step.result && this.step.result["filingLocationSurvey"]){
            this.survey.data = this.step.result["filingLocationSurvey"].data;
            if(this.survey.data.ExistingFamilyCase && this.survey.data.ExistingFamilyCase == 'n' && this.survey.data.CourtLocation) {
                this.saveApplicationLocation(this.survey.data.CourtLocation);
            }

            if (this.survey.data.ExistingFamilyCase && this.survey.data.ExistingFamilyCase == 'y' && this.survey.data.ExistingCourt){
                this.saveApplicationLocation(this.survey.data.ExistingCourt);                
            }
        }

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.applicantName));
        this.survey.setVariable("RespondentName", Vue.filter('getFullName')(this.respondentName));
        //console.log(this.respondentName)
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            if (this.survey.data.ExistingFamilyCase == 'y' && this.survey.data.ExistingCourt){
                this.determineRegistry(this.survey.data.ExistingCourt);
            } else if (this.survey.data.ExistingFamilyCase == 'n' && this.survey.data.CourtLocation){
                this.determineRegistry(this.survey.data.CourtLocation);
            } else {
                this.UpdateGotoNextStepPage();
            }            
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
        const fileType = 'FLC'
        const existingOrders = this.$store.state.Application.steps[0]['result']?this.$store.state.Application.steps[0]['result']['existingOrders']:''
        
        const existingOrdersCondition = this.survey.data && this.survey.data.ExistingFamilyCase == "y"

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == fileType)})
            if(index >= 0 ){
                if(existingOrdersCondition)
                    existingOrders[index]={type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}                   
                else
                    existingOrders[index]={type: fileType, filingLocation: this.survey.data.CourtLocation, fileNumber: ''}                                 
            }else{
                if(existingOrdersCondition)
                    existingOrders.push({type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber});
                else
                    existingOrders.push({type: fileType, filingLocation: this.survey.data.CourtLocation, fileNumber: ''});                     
            }
            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});

        }else{
            if(existingOrdersCondition)
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.ExistingCourt, fileNumber: this.survey.data.ExistingFileNumber}]}});
            else
                this.UpdateCommonStepResults({data:{'existingOrders':[{type: fileType, filingLocation: this.survey.data.CourtLocation, fileNumber: '' }]}});    
        }
    }

    beforeDestroy() {
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
