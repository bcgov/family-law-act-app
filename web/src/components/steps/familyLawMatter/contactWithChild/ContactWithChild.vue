<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/contact-with-child.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ContactWithChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;   

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep=0;
    currentPage=0;

    additionalDocumentsPage = 38 
    reviewAnswersPage = 39;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.disableNextButton = false;  
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
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(this.survey.data);
            // console.log(options)
            this.setPages()
        })
    }    
    
    public setPages(){
        if (this.survey.data.parentGuardianApplicant) {
            if (this.survey.data.parentGuardianApplicant == 'y') {
                this.disableNextButton = true;
                this.togglePages([24, 25, this.additionalDocumentsPage, this.reviewAnswersPage], false);
            } else {
                this.disableNextButton = false;
                this.togglePages([24, 25, this.reviewAnswersPage], true);
            }
        }             
    }
    
    public reloadPageInformation() {
        //console.log(this.step.result)
        if (this.step.result && this.step.result['contactWithChildSurvey'] && this.step.result['contactWithChildSurvey'].data) {
            this.survey.data = this.step.result['contactWithChildSurvey'].data;

            if (this.survey.data.parentGuardianApplicant && this.survey.data.parentGuardianApplicant == 'y') {
                this.disableNextButton = true;
            }

            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);                  
        }

        if (this.step.result && this.step.result['childData'] && this.step.result['childData'].data) {            
            const childData = this.step.result['childData'].data;            
            if (childData.length>1){
                this.survey.setVariable("childWording", "children");                    
            } else {
                this.survey.setVariable("childWording", "child");
            }
        }       

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.setPages()
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }
    
    public togglePages(pageArr, activeIndicator) {        
        for (let i = 0; i < pageArr.length; i++) {
            this.$store.commit("Application/setPageActive", {
                currentStep: this.currentStep,
                currentPage: pageArr[i],
                active: activeIndicator
            });
        }
    }
    
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {contactWithChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
