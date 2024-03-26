<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveLoansCredits()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/loans-credits-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";
import { loansCreditsFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class LoansCreditsFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    loansCredits = {} as loansCreditsFSDataInfoType;

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

    public saveLoansCredits() {
        if(!this.survey.isCurrentPageHasErrors){
            this.populateLoansCreditsModel(this.survey.data)
            let id = this.survey.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.loansCredits);
            } else {
                this.$emit("editedData", { ...this.loansCredits, id });
                id = null;
            }
        }
    }

    public populateLoansCreditsModel(loansCreditsData) {
        this.loansCredits.loansCreditsDescription = loansCreditsData.loansCreditsDescription;       
        this.loansCredits.loansCreditsValue = loansCreditsData.loansCreditsValue;
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("loansCreditsDescription", editRowProp.loansCreditsDescription);        
        survey.setValue("loansCreditsValue", editRowProp.loansCreditsValue);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
