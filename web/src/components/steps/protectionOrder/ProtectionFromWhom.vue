<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary"

import * as _ from 'underscore';

import surveyJson from "./forms/protectionFromWhom.json";
import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class ProtectionFromWhom extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];
    
    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void


    survey = new SurveyVue.Model(surveyJson); 
    disableNextButton = false;
    currentStep =0;
    currentPage =0;

    beforeCreate() {        
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);        
    }

    mounted(){
        this.disableNextButton = false; 
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }
    
    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    } 

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {

            Vue.filter('surveyChanged')('protectionOrder')

            if(options.name == "RespondentName") {        
                this.$store.commit("Application/setRespondentName", this.survey.data["RespondentName"]);
                this.UpdateCommonStepResults({data:{'respondentsPO':[this.survey.data["RespondentName"]]}});
            }

            if (options.name == 'ExistingCourt'){
                this.saveApplicationLocation(this.survey.data.ExistingCourt)
            }

            if(options.name == "childPO") {
                const step = this.stPgNo.PO._StepNo
                const page = this.stPgNo.PO.Background
                if(this.$store.state.Application.steps[step].pages[page].progress == 100){            
                    Vue.filter('setSurveyProgress')(null, step, page,  50, false);
                }
            }              
            
            this.checkAnswersforContinue()
        })
    }

    public saveApplicationLocation(location){       
        this.$store.commit("Application/setApplicationLocation", location); 
    }    

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.protectionFromWhomSurvey){
            this.survey.data = this.step.result.protectionFromWhomSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
            this.checkAnswersforContinue()
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.survey.setVariable("ApplicantName", Vue.filter('getFullName')(this.$store.state.Application.applicantName));
    }

    public checkAnswersforContinue(){
        const p = this.stPgNo.PO
        const needPoPages = [p.PoFilingLocation, p.RemovePerson, p.NoGo, p.NoContact, p.WeaponsFirearms, p.Background, p.YourStory,  p.Urgency, p.ReviewYourAnswers];
        const PoAllPages = _.range(p.PoFilingLocation, Object.keys(this.stPgNo.PO).length-1) 

        if(this.survey.data?.ApplicantNeedsProtection == 'n' && this.survey.data.anotherAdultPO == 'n' && this.survey.data.childPO == 'n'){
            this.togglePages(PoAllPages, false);
            this.disableNextButton = true;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);
            return false
        } else {
            this.togglePages(needPoPages, true);   
            this.disableNextButton = false;         
            return true
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

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public setRelatedNames(){
        if(this.survey.data?.["RespondentName"]) {        
            this.$store.commit("Application/setRespondentName", this.survey.data["RespondentName"]);
            this.UpdateCommonStepResults({data:{'respondentsPO':[this.survey.data["RespondentName"]]}});
        }
        this.mergeRespondants();

        if (this.survey.data?.ApplicantNeedsProtection == "n" && this.survey.data?.anotherAdultPO == "y") {
            this.$store.commit("Application/setProtectedPartyName", this.survey.data.anotherAdultName);
            this.UpdateCommonStepResults({data:{'protectedPartyName':this.survey.data.anotherAdultName}})
        }else{
            const applicantname = this.$store.state.Application.applicantName
            this.$store.commit("Application/setProtectedPartyName",applicantname);
            this.UpdateCommonStepResults({data:{'protectedPartyName':applicantname}})
        }        
        
        if(this.survey.data?.childPO== "y" && (this.survey.data?.ApplicantNeedsProtection == 'y' || this.survey.data?.anotherAdultPO == 'n')) {
            this.$store.commit("Application/setProtectedChildName",this.survey.data.allchildren);
            this.UpdateCommonStepResults({data:{'protectedChildName':this.survey.data.allchildren}});           
        }else{ 
            this.$store.commit("Application/setProtectedChildName",[]);
            this.UpdateCommonStepResults({data:{'protectedChildName':[]}});
        }
    }

    public mergeRespondants(){

        const respondentName =[]
        if(this.$store.state.Application.steps[0].result?.respondentsPO){
            const respondentPO = this.$store.state.Application.steps[0].result.respondentsPO        
            respondentName.push(...respondentPO)
        }
        if(this.$store.state.Application.steps[0].result?.respondentsCommon){
            const respondentCommon = this.$store.state.Application.steps[0].result.respondentsCommon
            respondentName.push(...respondentCommon)
        }

        const fullNamesArray =[];
        for(const name of respondentName ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentName.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })

        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
    }
  
    beforeDestroy() {

        this.setRelatedNames();

        if(this.checkAnswersforContinue())
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        else
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, true);

        this.UpdateStepResultData({step:this.step, data: {protectionFromWhomSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>