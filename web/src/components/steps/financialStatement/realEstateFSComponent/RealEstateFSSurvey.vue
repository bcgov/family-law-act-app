<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveRealEstate()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/real-estate-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";
import { realEstateFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class RealEstateFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    realEstate = {} as realEstateFSDataInfoType;

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

    public saveRealEstate() {
        if(!this.survey.isCurrentPageHasErrors){
            this.populateRealEstateModel(this.survey.data)
            let id = this.survey.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.realEstate);
            } else {
                this.$emit("editedData", { ...this.realEstate, id });
                id = null;
            }
        }
    }

    public populateRealEstateModel(realEstateData) {
        this.realEstate.realEstateDescription = realEstateData.realEstateDescription;       
        this.realEstate.realEstateValue = realEstateData.realEstateValue;
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("realEstateDescription", editRowProp.realEstateDescription);        
        survey.setValue("realEstateValue", editRowProp.realEstateValue);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
