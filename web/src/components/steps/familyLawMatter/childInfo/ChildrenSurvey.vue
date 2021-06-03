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
import * as surveyEnv from "@/components/survey/survey-glossary.ts"

//import { addQuestionTypes } from "@/components/survey/question-types.ts";

@Component
export default class ChildrenSurvey extends Vue {
    
    @Prop({required: true})
    editRowProp!: Object;
    
    child = {} as childInfoType;

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;

    reviewYourAnswersPage = 39

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
        // addQuestionTypes(Survey);
        // Survey.defaultBootstrapCss.page.root = "sv_page";
        // Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
        // Survey.defaultBootstrapCss.page.description = "sv_page_description";
        // Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
        // Survey.defaultBootstrapCss.page.title = "sv_page_title";
        // Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
        // Survey.defaultBootstrapCss.question.title = "sv_q_title";
        // Survey.defaultBootstrapCss.question.description = "sv_q_description";
        // Survey.defaultBootstrapCss.panel.description = "sv_p_description";
        // Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-primary";
        // Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-primary";
        // Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic";
        // Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
        // Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
        // Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
        // Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
        // Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
        // Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
        // Survey.StylesManager.applyTheme("bootstrap");
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
    
    public saveChild() {
        Vue.filter('setProgressForPages')(this.currentStep,[3, 4, 5, 7, 10, 12, 14, 19, 22, 23, 24, 25, 26, this.reviewYourAnswersPage],50)
        this.survey.completeLastPage();
    }

    public populateChildModel(childData) {
        //console.log(childData)
        this.child.name.first = childData.childName.first;
        this.child.name.middle = childData.childName.middle;
        this.child.name.last = childData.childName.last;
        this.child.dob = childData.childDateOfBirth;
        this.child.relation = childData.relationToChild;
        this.child.opRelation = childData.childRelationToOtherParty;
        this.child.currentLiving = childData.childCurrentlyLivingWith;
        this.child.currentLivingComment = (childData.childCurrentlyLivingWith == 'other')?(childData.childCurrentlyLivingWithComment):"";        
        this.child.ack = childData.childInfoAckknowledge;
        this.child.additionalInfo = childData.childAdditionalInfo;
        this.child.additionalInfoDetails = childData.additionInfoDetails;
    }

    public populateFormWithPreExistingValues(editRowProp, survey) {
        survey.data = {
            childName: { first: editRowProp.name.first, middle: editRowProp.name.middle, last: editRowProp.name.last }
        };
        survey.setValue("childDateOfBirth", editRowProp.dob);
        survey.setValue("relationToChild", editRowProp.relation);
        survey.setValue("childRelationToOtherParty", editRowProp.opRelation);
        survey.setValue("childCurrentlyLivingWith", editRowProp.currentLiving);
        survey.setValue("childCurrentlyLivingWithComment", editRowProp.currentLivingComment?editRowProp.currentLivingComment:'');
        survey.setValue("childInfoAckknowledge", editRowProp.ack);
        survey.setValue("childAdditionalInfo", editRowProp.additionalInfo);
        survey.setValue("additionInfoDetails", editRowProp.additionalInfoDetails);
        survey.setVariable("id", editRowProp.id);
    }

    beforeDestroy() {
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        // const currPage = document.getElementById("step-" + this.currentStep+"-page-" + this.currentPage);
        // if(currPage){
        //     if(this.survey.isCurrentPageHasErrors)
        //         currPage.style.color = "red";
        //     else
        //     {
        //         currPage.style.color = "";
        //         currPage.className="current";
        //     }  
        // }  
    }
};
</script>
