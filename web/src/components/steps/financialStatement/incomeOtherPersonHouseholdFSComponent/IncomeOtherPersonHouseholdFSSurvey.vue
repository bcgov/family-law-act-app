<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveAdult()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/income-other-person-household-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import { incomeOtherPersonHouseholdFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class IncomeOtherPersonHouseholdFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;    
    
    adult = {} as incomeOtherPersonHouseholdFSDataInfoType;

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
                this.$emit("surveyData", this.adult);
            } else {
                this.$emit("editedData", { ...this.adult, id });
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
    
    public saveAdult() {
        
        this.survey.completeLastPage();
    }

    public populateChildModel(adultData) {
        if(adultData){
            this.adult.adultFullName = adultData.adultFullName;       
            this.adult.adultAnnualIncome = adultData.adultAnnualIncome;
            this.adult.married = adultData.married;
        }
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("adultFullName", editRowProp.adultFullName);
        survey.setValue("adultAnnualIncome", editRowProp.adultAnnualIncome);
        survey.setValue("married", editRowProp.married);
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
}
</script>
