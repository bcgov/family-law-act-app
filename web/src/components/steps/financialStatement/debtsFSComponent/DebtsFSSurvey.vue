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
import surveyJson from "./forms/debts-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";
import { debtsFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class DebtsFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    creditor = {} as debtsFSDataInfoType;

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.initializeSurvey();
        this.reloadPageInformation();
    }

    public initializeSurvey(){
        this.survey = new SurveyVue.Model(surveyJson);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
        
    public reloadPageInformation() {
      
        if (this.editRowProp != null) {
            this.populateFormWithPreExistingValues(this.editRowProp, this.survey);
        }        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;     
    }
 
    public goBack() {
        this.$emit("showTable", true);
    }

    public saveDebt() {
        if(!this.survey.isCurrentPageHasErrors){
            this.populateCreditorModel(this.survey.data)
            let id = this.survey.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.creditor);
            } else {
                this.$emit("editedData", { ...this.creditor, id });
                id = null;
            }
        }
    }

    public populateCreditorModel(creditorData) {
        this.creditor.creditorName = creditorData.creditorName;       
        this.creditor.reasonForBorrowing = creditorData.reasonForBorrowing;
        this.creditor.balanceOwing = creditorData.balanceOwing;        
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("creditorName", editRowProp.creditorName);        
        survey.setValue("reasonForBorrowing", editRowProp.reasonForBorrowing);
        survey.setValue("balanceOwing", editRowProp.balanceOwing);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
