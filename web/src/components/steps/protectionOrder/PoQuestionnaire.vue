<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/po-questionnaire.json";
import * as surveyEnv from "@/components/survey/survey-glossary"

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { togglePages } from '@/components/utils/TogglePages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import * as _ from 'underscore';

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        PageBase
    }
})

export default class PoQuestionnaire extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void

    

    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep =0;
    currentPage =0;
    
    allPageIndex = [];
    needPoPages =  [];
    changeTerminatePages = [ ];
    commonPages = []

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false; 
        if (this.step.result?.poQuestionnaireSurvey?.data) {            
            this.determinePeaceBondAndBlock();
        }
    }

    mounted(){
        this.initPageNumbers()
        
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
    }

    public initPageNumbers(){
        const p = this.stPgNo.PO
        this.allPageIndex = _.range(p.YourinformationPO, Object.keys(this.stPgNo.PO).length-1) 

        this.needPoPages =  [p.YourinformationPO, p.ProtectionFromWhom, p.PoFilingLocation, p.RemovePerson, p.NoGo, p.NoContact, p.WeaponsFirearms, p.Background, p.YourStory, p.Urgency, p.ReviewYourAnswers];
        this.changeTerminatePages = [ p.YourinformationPO, p.OtherParty, p.About, p.Urgency, p.ReviewYourAnswers];
        this.commonPages = [p.Urgency, p.ReviewYourAnswers, p.PreviewForms]
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

            let selectedOrder = this.survey.data.orderType;

            if (options.name == "orderType") { 

                this.removePages();
                this.resetProgress(this.commonPages); 

                this.updateApplicantType(selectedOrder)
    
                if (selectedOrder == "none") {
                    this.disableNextButton = true;
                    Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);

                } else if (selectedOrder == "changePO" || selectedOrder == "terminatePO") {
                    this.disableNextButton = false;
                    togglePages(this.changeTerminatePages, true, this.currentStep);                    
                    this.setConditionalProgress('aboutSurvey', this.stPgNo.PO.About)
                    this.resetProgress(this.stPgNo.PO.Urgency)
                   
                } else if (selectedOrder == "needPO") {
                    this.disableNextButton = false;
                    if (sender.data.PORConfirmed) {  
                        if(this.isSurveyAnsweredCorectly()){          
                            togglePages(this.needPoPages, true, this.currentStep);                                                
                            this.resetProgress(this.stPgNo.PO.Urgency)
                        }else{
                            togglePages([this.stPgNo.PO.YourinformationPO, this.stPgNo.PO.ProtectionFromWhom], true, this.currentStep);
                        }
                    }
                }
                
            }           

            if (options.name == "PORConfirmed" && selectedOrder == "needPO" ) {

                if (options.value.length !== 0) {
                    togglePages(this.needPoPages, true, this.currentStep);
                    this.resetProgress(this.stPgNo.PO.Urgency)
                } else {
                    togglePages(this.needPoPages, false, this.currentStep);                    
                }
            }           

            this.determinePeaceBondAndBlock();
        })   
    }

    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.poQuestionnaireSurvey?.data){
            this.survey.data = this.step.result.poQuestionnaireSurvey.data;
            if (this.survey.data.orderType == "none"){
                this.disableNextButton = true;
                Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
            }
        }       
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.determinePeaceBondAndBlock();
    }

    public toggleStep(step, active) {
        this.$store.commit("Application/setStepActive", {
            currentStep: step,
            active: active
        });
    }

    public updateApplicantType(selectedOrder){
        const applicationTypes = this.types;
        if (!applicationTypes.includes(this.getApplicationType(selectedOrder))){

            if (applicationTypes.indexOf("Protection Order") != -1){
                applicationTypes.splice(applicationTypes.indexOf("Protection Order"), 1);
            }
            if (applicationTypes.indexOf("New Protection Order") != -1){
                applicationTypes.splice(applicationTypes.indexOf("New Protection Order"), 1);
            }
            if (applicationTypes.indexOf("Change Protection Order") != -1){
                applicationTypes.splice(applicationTypes.indexOf("Change Protection Order"), 1);
            }
            if (applicationTypes.indexOf("Terminate Protection Order") != -1){
                applicationTypes.splice(applicationTypes.indexOf("Terminate Protection Order"), 1);
            }

            applicationTypes.push(this.getApplicationType(selectedOrder))
            this.UpdateApplicationType(Array.from(new Set(applicationTypes)))
        }
    }

    public setConditionalProgress(pagename, pagenumber: number){

        let progress = 0;
        if(this.steps[this.currentStep].pages[pagenumber-1].progress >0 && this.step.result?.[pagename]) progress = 50;

        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage: pagenumber, progress:progress });
    }

    public resetProgress(pages){
        for(const page of pages)
            this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage: page, progress:0 });	
    }

    public removePages() {        
        togglePages(this.allPageIndex, false, this.currentStep);
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }

    public getApplicationType(selectedOrder){
        if(selectedOrder == "none") selectedOrder = ""
        return Vue.filter('getFullOrderName')("protectionOrder", selectedOrder)
    }
    
    public determinePeaceBondAndBlock(){
        if((this.survey?.data?.familyUnsafe == 'n' || this.survey?.data?.unsafe == 'n') && this.survey?.data?.orderType == 'needPO'){ 
            togglePages(this.needPoPages, false, this.currentStep);
            this.disableNextButton = true;  
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);          
        }else{
            this.disableNextButton = false;                
            if (this.survey?.data?.PORConfirmed && this.survey?.data?.orderType == 'needPO') {
                if (this.isSurveyAnsweredCorectly())
                    togglePages(this.needPoPages, true, this.currentStep);
                else 
                    togglePages([this.stPgNo.PO.YourinformationPO, this.stPgNo.PO.ProtectionFromWhom], true, this.currentStep);
            }      
        }

        if (this.survey?.data?.orderType == 'none'){
            this.disableNextButton = true;
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        }
    } 

    public isSurveyAnsweredCorectly(){       
        if(this.step.result?.protectionFromWhomSurvey?.data?.ApplicantNeedsProtection== 'n' && this.step.result?.protectionFromWhomSurvey?.data?.anotherAdultPO == 'n' && this.step.result?.protectionFromWhomSurvey?.data?.childPO == 'n'){
            return false;
        }
        else return true;
    }

    beforeDestroy() {
        if(!this.disableNextButton) Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        
        this.UpdateStepResultData({step:this.step, data: {poQuestionnaireSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage, {pageName:" Protection Order Questionnaire"})}})
    }
}
</script>

