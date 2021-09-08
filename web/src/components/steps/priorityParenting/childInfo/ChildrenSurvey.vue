<template>
    <div>
        <survey v-bind:survey="survey"></survey>
        <div class="row">
            <div class="col-6">
                <button type="button" class="btn btn-primary" @click="goBack()">Back</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary" @click="saveChild()">Save Changes</button>
            </div>
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { childInfoType } from '@/types/Application/CommonInformation';
import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/survey-childInfo.json";
import * as surveyEnv from "@/components/survey/survey-glossary"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component
export default class ChildrenSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
    child = {} as childInfoType;

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
        Vue.filter('surveyChanged')('priorityParenting')        
        this.survey.onComplete.add((sender, options) => {
            this.populateChildModel(sender.data);
            let id = sender.getVariable("id");
            if (id === null || id === undefined) {
                this.$emit("surveyData", this.child);
            } else {
                this.$emit("editedData", { ...this.child, id });
                id = null;
            }
        });
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.editRowProp != null) {
            this.populateFormWithPreExistingValues(this.editRowProp, this.survey);
        }
        
        let progress = 50;
        if(Object.keys(this.survey.data).length)
            progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })       
    }
  
    public goBack() {
        this.$emit("showTable", true);
    }
    
    public saveChild() {
        const p = this.stPgNo.PPM
        const pages = [            
            p.ReviewYourAnswersPPM
        ]
        Vue.filter('setProgressForPages')(this.currentStep, pages,50)
        this.survey.completeLastPage();
    }

    public populateChildModel(childData) {
        this.child.name = childData.childName;       
        this.child.dob = childData.childDateOfBirth;
        this.child.relation = childData.relationToChild;
        this.child.opRelation = childData.childRelationToOtherParty;       
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        survey.data = {
            childName: { first: editRowProp.name.first, middle: editRowProp.name.middle, last: editRowProp.name.last }
        };
        survey.setValue("childDateOfBirth", editRowProp.dob);
        survey.setValue("relationToChild", editRowProp.relation);
        survey.setValue("childRelationToOtherParty", editRowProp.opRelation);       
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
    }
};
</script>
