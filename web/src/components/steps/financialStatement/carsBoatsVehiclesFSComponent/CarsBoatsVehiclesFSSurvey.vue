<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveCarsBoatsVehicles()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/cars-boats-vehicles-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";
import { carsBoatsVehiclesFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class CarsBoatsVehiclesFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    carsBoatsVehicles = {} as carsBoatsVehiclesFSDataInfoType;

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

    public saveCarsBoatsVehicles() {
        if(!this.survey.isCurrentPageHasErrors){
            this.populateCarsBoatsVehiclesModel(this.survey.data)
            let id = this.survey.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.carsBoatsVehicles);
            } else {
                this.$emit("editedData", { ...this.carsBoatsVehicles, id });
                id = null;
            }
        }
    }

    public populateCarsBoatsVehiclesModel(carsBoatsVehiclesData) {
        this.carsBoatsVehicles.carsBoatsVehiclesDescription = carsBoatsVehiclesData.carsBoatsVehiclesDescription;       
        this.carsBoatsVehicles.carsBoatsVehiclesValue = carsBoatsVehiclesData.carsBoatsVehiclesValue;
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("carsBoatsVehiclesDescription", editRowProp.carsBoatsVehiclesDescription);        
        survey.setValue("carsBoatsVehiclesValue", editRowProp.carsBoatsVehiclesValue);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
