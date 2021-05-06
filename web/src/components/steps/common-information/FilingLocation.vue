<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="locationInfo" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3">
               
                <p>I understand the following people must be given notice of my application about a family law matter:</p>
                <ul>
                    <li>
                        all parents and current guardians of each child who is the subject of the family law matter
                    </li>
                    <li>
                        my spouse, if I am applying for spousal support
                    </li>
                    <li>
                        each other adult who the application about a family law matter is about                       
                    </li>                    
                </ul>
                <p>To give notice, they must each be served with a copy of this document and any supporting documents.</p>
                <p>They are the other party/parties I added in this case.</p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="locationInfo=false">Go back so I can fix something</b-button>
                <b-button variant="success" @click="closeLocationInfo">I agree</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/filing-location.json";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

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
    
    

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }


    mounted(){
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
            //console.log(options)            
            //console.log(this.survey.data);            
            if(options.name == 'CourtLocation'){
                this.saveUserLocation()
            }
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
        //console.log(this.step.result)
        if (this.step.result && this.step.result["filingLocationSurvey"]){
            this.survey.data = this.step.result["filingLocationSurvey"].data;
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
            this.UpdateGotoNextStepPage()
        }
    }

    public saveUserLocation(){
        const url = "/user-info/"
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }
        console.log(this.survey.data.CourtLocation)
        this.$http.put(url, {location:this.survey.data.CourtLocation}, header)            
        .then(() => {                    
            this.$store.commit("Application/setApplicationLocation", this.survey.data.CourtLocation);
            //this.saveApplication()
        }, err => {
            console.error(err);            
        });
    }

    public setExistingFileNumber(){
        const fileType = 'FLC'
        const existingOrders = this.$store.state.Application.steps[0]['result']?this.$store.state.Application.steps[0]['result']['existingOrders']:''
        //const currentLocation = this.$store.state.Application.applicationLocation
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
