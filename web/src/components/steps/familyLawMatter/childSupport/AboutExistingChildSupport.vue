<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/about-existing-child-support.json";

import PageBase from "../../PageBase.vue";
import { nameInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class AboutExistingChildSupport extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.State
    public applicantName!: nameInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);  
    
    currentStep=0;
    currentPage=0;
    existingType = "";

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
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            console.log(this.survey.data) 
            
            this.setPages();
            
        })
    }

    public setPages(){            
            
        if (this.existingType == 'ExistingOrder') {                
            if(this.survey.data.orderDifferenceType == 'changeOrder'){
                this.togglePages([20], true);
                
            } else if(this.survey.data.orderDifferenceType == 'cancelOrder') {
                
                this.togglePages([20], false);
            }
        } else if (this.existingType == 'ExistingAgreement') {
            
            if(this.survey.data.agreementDifferenceType == 'replacedAgreement'){
                this.togglePages([20], true);
                
            } else if(this.survey.data.agreementDifferenceType == 'setAsideAgreement') {
                
                this.togglePages([20], false);
            }
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
    
    public reloadPageInformation() {   
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['childSupportOrderAgreementSurvey']) {
            const existingTypeData = this.step.result['childSupportOrderAgreementSurvey'].data;
            // console.log(existingTypeData)
            this.survey.setVariable("existingType", existingTypeData.existingType)
            this.existingType = existingTypeData.existingType;
        }

        if (this.step.result && this.step.result['aboutExistingChildSupportSurvey']) {
            this.survey.data = this.step.result['aboutExistingChildSupportSurvey'].data;           
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }        
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        this.setPages();
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
        
        this.UpdateStepResultData({step:this.step, data: {aboutExistingChildSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
