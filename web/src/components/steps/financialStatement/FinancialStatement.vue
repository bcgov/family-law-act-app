<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/financial-statement.json";
import _ from 'underscore';

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase
    }
})
export default class FinancialStatement extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;    
    disableNextButton = false;    

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;       
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

            if(this.survey.data?.situationType?.includes('None of the above')){
                this.survey.setValue('situationType', ['None of the above']);
            }

            this.determineFsRequired(); 
            this.determinePages(true);            
        })
    }

    public determineFsRequired(){

        if(this.survey.data?.spousalAppExists == 'n' && (this.survey.data?.childAppExists == 'n' || 
            (this.survey.data?.childAppExists == 'y' && this.survey.data?.situationType?.includes('None of the above')))){
            this.disableNextButton = true;
            this.survey.setVariable('fsNotRequired', true);            
        } else {
            this.disableNextButton = false;
            this.survey.setVariable('fsNotRequired', false);
        }
    }

    public determinePages(surveyChanged: boolean){

        const fsData = this.survey.data;
        const p = this.stPgNo.FS;
        const allPages = _.range(this.stPgNo.FS.IncomeInformation, Object.keys(p).length-2); 
       
        togglePages(allPages, false, this.currentStep); 

        if(!this.disableNextButton){

            const situationTypes = fsData.situationType?fsData.situationType:[];
            const part1Options = [
                "I am the person required to pay child support", 
                "Parenting time is `split or shared` for one or more of the children", 
                "There is a claim for section 7 special or extraordinary expenses",
                "There is a child 19 years or older for whom support is being applied for",
                "A party has been acting as a parent to a child of the other party",
                "The payor earns more than $150,000 per year",
                "I am claiming undue hardship",
                "The other party is claiming undue hardship"
            ];
            const part2and3Options = [            
                "Parenting time is `split or shared` for one or more of the children", 
                "There is a claim for section 7 special or extraordinary expenses",
                "There is a child 19 years or older for whom support is being applied for",
                "A party has been acting as a parent to a child of the other party",
                "The payor earns more than $150,000 per year",
                "I am claiming undue hardship",
                "The other party is claiming undue hardship"
            ];

            const part4Options = [
                "I am claiming undue hardship",
                "The other party is claiming undue hardship"
            ];

            const part5Options = [
                "I am claiming undue hardship"
            ];

            const part1Required = fsData.spousalAppExists == 'y' || (fsData.childAppExists = 'y' && part1Options.some(s=>situationTypes.indexOf(s) > -1));
            const part2and3Required = fsData.spousalAppExists == 'y' || (fsData.childAppExists = 'y' && part2and3Options.some(s=>situationTypes.indexOf(s) > -1));
            const part4Required = fsData.childAppExists = 'y' && part4Options.some(s=>situationTypes.indexOf(s) > -1);
            const part5Required = fsData.childAppExists = 'y' && part5Options.some(s=>situationTypes.indexOf(s) > -1);

            const part1Pages = [p.IncomeInformation, p.ChangesIncomeFS, p.IncomeSummaryFS, p.DisclosureInformationFS];
            const part2and3Pages = [p.ExpensesFS, p.DebtsFS, p.AssetsFS];
            const part4Pages = [p.IncomeOtherPersonHouseholdFS];
            const part5Pages = [p.UndueHardshipFS];
            const commonPages = [p.UnusuallyHighExpensesFS, p.LegalDutyDependentChildFS, p.LegalDutyAnotherPersonFS, p.OtherCircumstancesFS, p.AffidavitFS, p.AboutAffiantFs, p.ReviewYourAnswersFS];

            if (part1Required){
                togglePages(part1Pages, true, this.currentStep);
            } 
            
            if (part2and3Required){
                togglePages(part2and3Pages, true, this.currentStep);
            }          

            if (part4Required){
                togglePages(part4Pages, true, this.currentStep);
            }  

            if (part5Required){
                togglePages(part5Pages, true, this.currentStep);
            }  

            if (part1Required || part2and3Required || part4Required || part5Required){
                togglePages(commonPages, true, this.currentStep);   

                if (this.steps[this.stPgNo.OTHER._StepNo].result?.otherFormsSurvey?.data?.filingMethod){
                
                    const filingMethod = this.steps[this.stPgNo.OTHER._StepNo].result.otherFormsSurvey.data.filingMethod;
                    togglePages([p.FilingFS], filingMethod == 'eFile', this.currentStep);
                }
                
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.FilingFS, 0, false); 
                Vue.filter('setSurveyProgress')(null, this.currentStep, p.ReviewYourAnswersFS, 0, false);        
            } 

            if(surveyChanged){
                for (const page of allPages){
                    Vue.filter('setSurveyProgress')(null, this.currentStep, page, 0, false); 
                }
            }
        }
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;            

        if (this.step.result?.financialStatementSurvey?.data) {            
            this.survey.data = this.step.result.financialStatementSurvey.data;
            this.determineFsRequired();
            this.determinePages(false);
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }
   
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }  
    
    beforeDestroy() {         
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        this.UpdateStepResultData({step:this.step, data: {financialStatementSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
