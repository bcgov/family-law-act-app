<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveChildExpense()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/legal-duty-dependent-child-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import { legalDutyDependentChildFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class LegalDutyDependentChildFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;    
    
    childExpense = {} as legalDutyDependentChildFSDataInfoType;

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

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
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){

        this.survey.onValueChanged.add((sender, options) => {
            
            if(options.name == 'monthlyPayment')
                this.survey.setValue('yearlyPayment',options.value * 12);
            else if(options.name == 'yearlyPayment')
                this.survey.setValue('monthlyPayment',options.value/12);
                              
        })

        this.survey.onComplete.add((sender, options) => {
            this.populateChildModel(sender.data);
            let id = sender.getVariable("id");
            if (id === null || id === undefined) {
                this.$emit("surveyData", this.childExpense);
            } else {
                this.$emit("editedData", { ...this.childExpense, id });
                id = null;
            }
        });
    }
    
    public reloadPageInformation() {
        if (this.editRowProp != null) {
            this.populateFormWithPreExistingValues(this.editRowProp, this.survey);
        }
        
        let progress = 50;
        if(Object.keys(this.survey.data).length)
            progress = this.survey.isCurrentPageHasErrors? 50 : 100;
            
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })      
    }
  
    public goBack() {
        this.$emit("showTable", true);
    }
    
    public saveChildExpense() {        
        this.survey.completeLastPage();
    }

    public populateChildModel(childExpenseData) {
        if(childExpenseData){
            this.childExpense.childFullName = childExpenseData.childFullName;       
            this.childExpense.monthlyPayment = childExpenseData.monthlyPayment;
            this.childExpense.yearlyPayment = childExpenseData.yearlyPayment;
        }
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("childFullName", editRowProp.childFullName);
        survey.setValue("debtReason", editRowProp.monthlyPayment);
        survey.setValue("yearlyPayment", editRowProp.yearlyPayment);
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
}
</script>
