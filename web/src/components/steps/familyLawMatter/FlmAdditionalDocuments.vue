<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">        
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as _ from 'underscore';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/flm-additional-documents.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})
export default class FlmAdditionalDocuments extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.State
    public requiredDocuments!: any

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy; 

    currentStep =0;
    currentPage =0;

    isRequiredDocument = false;
    requiredDocumentLists = [];
    appointedAsGuardian = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.getFLMResultData()
        this.getRequiredDocuments()
        this.initializeSurvey();
        this.addSurveyListener();
        this.reloadPageInformation();
        //console.log(this.allPages)
    }

    public initializeSurvey(){
        this.adjustSurveyForAdditionalDocs();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }

    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(options)
            //console.log(this.survey.data)
        })
    }

    public adjustSurveyForAdditionalDocs(){  
        
        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));       
        this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"] = [];
        let descriptionHtml = "Based on your answers, you must file the following additional documents with your Application About a Family Law Matter:<ul>";
        for (const doc of this.requiredDocumentLists){
            //console.log(doc)
            //console.log(doc.includes('Form 5'))
            if(doc.includes('Form 5'))
                this.appointedAsGuardian = true;
            if(doc.includes('form') || doc.includes('Form')){
                descriptionHtml += "<li>"+doc+"</li>"
                this.surveyJsonCopy.pages[0].elements[0].elements[3]["choices"].push(doc);            
            }
        }  
        descriptionHtml += "</ul>"
        this.surveyJsonCopy.pages[0].elements[0].elements[0]["html"] = descriptionHtml
    }

    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['flmAdditionalDocsSurvey'] && this.step.result['flmAdditionalDocsSurvey'].data){
            this.survey.data = this.step.result['flmAdditionalDocsSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }

        this.survey.setVariable('appointedAsGuardian', this.appointedAsGuardian);
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        if(this.requiredDocuments['familyLawMatter'] && this.requiredDocuments['familyLawMatter'].required){
            this.requiredDocumentLists = this.requiredDocuments['familyLawMatter'].required
            this.isRequiredDocument = true
        }
       // console.log(this.requiredDocuments['familyLawMatter'])
       // console.log(this.requiredDocumentLists)
    }

    public getFLMResultData() {         
        
        let result = Object.assign({},this.$store.state.Application.steps[0].result); 
        for(let i=2;i<4; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                if(stepResults[stepResult])
                    result[stepResult]=stepResults[stepResult].data; 
            }
        }

        const childBestInterestAck = {childBestInterestAcknowledgement:this.$store.state.Application.steps[3].result.childBestInterestAcknowledgement};
        Object.assign(result, result, childBestInterestAck);
        
        const applicationLocation = this.$store.state.Application.applicationLocation;
        const userLocation = this.$store.state.Common.userLocation;
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        
        
        //console.log(result)

        Vue.filter('extractRequiredDocuments')(result, 'familyLawMatter')

        //return result;
    }    

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }
  
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true); 

        this.UpdateStepResultData({step:this.step, data: {flmAdditionalDocsSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
