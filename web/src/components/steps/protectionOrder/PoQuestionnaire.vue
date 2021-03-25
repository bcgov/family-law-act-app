<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';    

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/po-questionnaire.json";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class PoQuestionnaire extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;

    needPoPages = [1, 2, 3, 5, 6, 7, 10, 11];
    changeTerminatePages = [ 8, 9, 10, 11];
    commonPages = [10,12,13,14,15,16]
    noContantPage = [4];
    aboutPage = 9;
    urgencyPage = 10;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        if (this.step.result && this.step.result['questionnaireSurvey']) {            
            this.determinePeaceBondAndBlock();
        }
    }

    mounted(){
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
            //console.log(this.survey.data);
            //console.log(options)

            this.UpdateSurveyChangedPO(true);

            let selectedOrder = this.survey.data.orderType;

            if (options.name == "orderType") { 

                this.removePages();
                this.resetProgress(this.commonPages); 
                
                this.$store.commit("Application/setApplicationType",this.getApplicationType(selectedOrder));
                this.UpdateStepResultData({step:this.step, data: {selectedPOOrder: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

                if (selectedOrder == "changePO" || selectedOrder == "terminatePO") {
                    this.togglePages(this.changeTerminatePages, true);
                    //this.resetProgress(this.commonPages)
                    console.log(this.step.result)//['aboutPOSurvey'])
                    this.setConditionalProgress('aboutPOSurvey', this.aboutPage, 8)
                    this.setConditionalProgress('urgencySurvey', this.urgencyPage, this.aboutPage);
                } 

                if (selectedOrder == "needPO") {
                    if (sender.data.PORConfirmed) {  
                        if(this.isSurveyAnsweredCorectly()){          
                            this.togglePages(this.needPoPages, true);
                            this.determineNoContactPage(true);
                            this.setConditionalProgress('urgencySurvey', this.urgencyPage, 7);
                        }else{
                            this.togglePages([1], true);
                        }
                    }
                }                
            }

            if (options.name == "PORConfirmed" && selectedOrder == "needPO" ) {

                if (options.value.length !== 0) {
                    this.togglePages(this.needPoPages, true);
                    this.determineNoContactPage(true);
                    this.setConditionalProgress('urgencySurvey', this.urgencyPage, 7);
                } else {
                    this.togglePages(this.needPoPages, false);
                    this.determineNoContactPage(false);
                }
            }

            this.determinePeaceBondAndBlock();
        })   
    }

    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result["questionnaireSurvey"]){
            this.survey.data = this.step.result["questionnaireSurvey"];
        }
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.determinePeaceBondAndBlock();
    }

    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: 2,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }

    public toggleStep(step, active) {
        this.$store.commit("Application/setStepActive", {
            currentStep: step,
            active: active
        });
    }

    public setConditionalProgress(pagename, pagenumber: number, previouspagenumber: number){
        
        console.log(this.steps[this.currentStep].pages[previouspagenumber].progress)
        let progress = 0;
        if(this.steps[this.currentStep].pages[pagenumber-1].progress >0 && this.step.result && this.step.result[pagename]) progress = 50;
            this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage: pagenumber, progress:progress });
    }

    public resetProgress(pages){
        for(const page of pages)
            this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage: page, progress:0 });	
    }

    public removePages() {
        let allPageIndex = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 11, 12, 13, 14, 15, 16];
        this.togglePages(allPageIndex, false);
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public getApplicationType(selectedOrder){
        if (selectedOrder == "needPO") return "New Protection Order";
        else if (selectedOrder == "changePO") return "Change Protection Order";
        else if (selectedOrder == "terminatePO") return "Terminate Protection Order";
        else return "Protection Order";
    }
    
    public determinePeaceBondAndBlock(){
        if(this.survey &&((this.survey.data.familyUnsafe == 'n' && this.survey.data.orderType == 'needPO')||(this.survey.data.unsafe == 'n' && this.survey.data.orderType == 'needPO'))){ 
            this.togglePages(this.needPoPages, false);            
        }else{                
            if (this.isSurveyAnsweredCorectly() && this.survey.data.PORConfirmed && this.survey.data.orderType == 'needPO') {
                this.togglePages(this.needPoPages, true);
            }       
        }
    }

    public determineNoContactPage(enablePage){
    
        if(enablePage && this.step.result && this.step.result['protectionWhomSurvey'] && this.step.result['protectionWhomSurvey'].data['ApplicantNeedsProtection']=='y')
            this.togglePages(this.noContantPage, true);
        else
            this.togglePages(this.noContantPage, false);
            //console.log(this.step.result['protectionWhomSurvey'].data['ApplicantNeedsProtection'])                    
    } 

    public isSurveyAnsweredCorectly(){
        //console.log(this.step.result['protectionWhomSurvey'].data)
        if(this.step.result && this.step.result['protectionWhomSurvey'] && this.step.result['protectionWhomSurvey'].data['ApplicantNeedsProtection']== 'n' && this.step.result['protectionWhomSurvey'].data['anotherAdultPO'] == 'n' && this.step.result['protectionWhomSurvey'].data['childPO'] == 'n'){
            return false;
        }
        else return true;
    }

    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {questionnaireSurvey: this.survey.data}});
        //this.UpdateStepResultData({step:this.step, data: {questionnaireSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
