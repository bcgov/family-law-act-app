<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveOtherAssets()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/other-assets-fs.json";
import * as surveyEnv from "@/components/survey/survey-glossary";
import { otherAssetsFSDataInfoType } from '@/types/Application/FinancialStatement';

@Component
export default class OtherAssetsFSSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    otherAssets = {} as otherAssetsFSDataInfoType;

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

    public saveOtherAssets() {
        if(!this.survey.isCurrentPageHasErrors){
            this.populateOtherAssetsModel(this.survey.data)
            let id = this.survey.getVariable("id");
            if (id == null || id == undefined) {
                this.$emit("surveyData", this.otherAssets);
            } else {
                this.$emit("editedData", { ...this.otherAssets, id });
                id = null;
            }
        }
    }

    public populateOtherAssetsModel(otherAssetsData) {
        this.otherAssets.otherAssetsDescription = otherAssetsData.otherAssetsDescription;       
        this.otherAssets.otherAssetsValue = otherAssetsData.otherAssetsValue;
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        
        survey.setValue("otherAssetsDescription", editRowProp.otherAssetsDescription);        
        survey.setValue("otherAssetsValue", editRowProp.otherAssetsValue);
        survey.setVariable("id", editRowProp.id);
    } 
  
}
</script>
