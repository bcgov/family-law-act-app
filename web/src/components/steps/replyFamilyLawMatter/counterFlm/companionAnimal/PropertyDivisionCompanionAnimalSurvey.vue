<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-secondary" @click="goBack()">Cancel</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-success" @click="saveAnimal()">Save</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { animalInfoType } from '@/types/Application/FamilyLawMatter/CompanionAnimal';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/property-division-companion-animal.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component
export default class PropertyDivisionCompanionAnimalSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    animal = {} as animalInfoType;

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
        Vue.filter('surveyChanged')('familyLawMatter')        
        this.survey.onComplete.add((sender, options) => {
            this.populateAnimalModel(sender.data);
            let id = sender.getVariable("id");
            if (id === null || id === undefined) {
                this.$emit("surveyData", this.animal);
            } else {
                this.$emit("editedData", { ...this.animal, id });
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
    
    public saveAnimal() {        
        this.survey.completeLastPage();
    }

    public populateAnimalModel(animalData) {
        if(animalData){
            this.animal.animalName = animalData.animalName;       
            this.animal.animalType = animalData.animalType;
            this.animal.animalOwnership = animalData.animalOwnership;            
        }
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        survey.setValue("animalName", editRowProp.animalName);
        survey.setValue("animalType", editRowProp.animalType);
        survey.setValue("animalOwnership", editRowProp.animalOwnership);        
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
}
</script>
