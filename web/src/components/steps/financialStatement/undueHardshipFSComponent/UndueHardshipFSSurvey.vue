<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveDebt()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/undue-hardship-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import { undueHardshipFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class UndueHardshipFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;    
    
    debt = {} as undueHardshipFSDataInfoType;

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
        this.survey.onComplete.add((sender, options) => {
            this.populateChildModel(sender.data);
            let id = sender.getVariable("id");
            if (id === null || id === undefined) {
                this.$emit("surveyData", this.debt);
            } else {
                this.$emit("editedData", { ...this.debt, id });
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
    
    public saveDebt() {
        
        this.survey.completeLastPage();
    }

    public populateChildModel(adultData) {
        if(adultData){
            this.debt.creditorFullName = adultData.creditorFullName;       
            this.debt.debtReason = adultData.debtReason;
            this.debt.debTotal = adultData.debTotal;
            this.debt.debtAnnualPayment = adultData.debtAnnualPayment;
        }
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("creditorFullName", editRowProp.creditorFullName);
        survey.setValue("debtReason", editRowProp.debtReason);
        survey.setValue("debTotal", editRowProp.debTotal);
        survey.setValue("debtAnnualPayment", editRowProp.debtAnnualPayment);
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
}
</script>
