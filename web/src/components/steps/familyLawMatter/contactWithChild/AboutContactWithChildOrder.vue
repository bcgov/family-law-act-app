<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/about-contact-with-child-order.json";

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

export default class AboutContactWithChildOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;   

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    surveyJsonCopy;
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
        this.adjustSurveyForChildren();
        this.survey = new SurveyVue.Model(this.surveyJsonCopy);
        this.survey.commentPrefix = "Comment";
        this.survey.showQuestionNumbers = "off";
        this.survey.showNavigationButtons = false;
        surveyEnv.setGlossaryMarkdown(this.survey);
    }
    
    public addSurveyListener(){
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('familyLawMatter')
            if (options.name == "contactTypeChoices"){
                if(options.value.includes('No contact of any type')){
                    
                    Vue.nextTick(()=>
                        this.survey.setValue('contactTypeChoices',['No contact of any type'])
                    )
                    this.survey.setVariable("InPerson", false);
                } else if(options.value.includes("In person")){                    
                    this.survey.setVariable("InPerson", true);
                } else {
                    this.survey.setVariable("InPerson", false);
                }
            } 
            
            if (this.survey.data.childrenRequireContactChoices){
                if (this.survey.data.childrenRequireContactChoices.length>1){
                    this.survey.setVariable("selectedChildWording", "children");                    
                } else {
                    this.survey.setVariable("selectedChildWording", "child");
                }
            }
        })
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));                
        this.surveyJsonCopy.pages[0].elements[3].elements[0]["choices"]=[];        

        if (this.step.result?.childrenInfoSurvey) {
            const childData = this.step.result.childrenInfoSurvey.data;            
            for (const child of childData){
                this.surveyJsonCopy.pages[0].elements[3].elements[0]["choices"].push(Vue.filter('getFullName')(child.name));
            }                       
        }        
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.childrenInfoSurvey?.data) { 
            const childData = this.step.result.childrenInfoSurvey.data;            
            if (childData?.length>1){
                this.survey.setVariable("childWording", "children");
                this.survey.setVariable("selectedChildWording", "children");         
            } else {
                this.survey.setVariable("childWording", "child");
                this.survey.setValue("childrenRequireContactChoices", [Vue.filter('getFullName')(childData[0].name)]);
                this.survey.setVariable("selectedChildWording", "child");
            }
        }  

        if (this.step.result?.aboutContactWithChildOrderSurvey?.data) {
            
            this.survey.data = this.step.result.aboutContactWithChildOrderSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);

            if (this.survey.data?.childrenRequireContactChoices){
                if (this.survey.data.childrenRequireContactChoices?.length>1){
                    this.survey.setVariable("selectedChildWording", "children");                    
                } else {                    
                    this.survey.setVariable("selectedChildWording", "child");
                }
            }

            if (this.survey.data?.contactTypeChoices?.includes("In person")){                    
                this.survey.setVariable("InPerson", true);
            } else {
                this.survey.setVariable("InPerson", false);
            }            
        }

        if (this.step.result?.flmBackgroundSurvey?.data){
            const backgroundSurveyData = this.step.result.flmBackgroundSurvey.data;
            if ( backgroundSurveyData?.ExistingOrdersFLM == 'y' 
                && backgroundSurveyData?.existingOrdersListFLM?.length > 0 
                && backgroundSurveyData?.existingOrdersListFLM?.includes("Contact with a Child")){
                    this.survey.setVariable("existing", true);                    
            } else {
                this.survey.setVariable("existing", false);
            }
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
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
        
        this.UpdateStepResultData({step:this.step, data: {aboutContactWithChildOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>