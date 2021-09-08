<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/parental-responsibilities.json";

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

export default class ParentalResponsibilities extends Vue {
    
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
    childData = [];
    currentStep =0;
    currentPage =0;
    existing = false;

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
  
            if (options.name == "childrenRequestedResponsibilities"){
                if (options.question?.choices?.length == options.value.length){
                    this.survey.setVariable("allChildrenSelected", true);
                } else {
                    this.survey.setVariable("allChildrenSelected", false);
                }
            }            
        })
    }

    public adjustSurveyForChildren(){

        this.surveyJsonCopy = JSON.parse(JSON.stringify(surveyJson));                
        this.surveyJsonCopy.pages[0].elements[2].elements[1]["choices"]=[];
        this.childData = [];        

        if (this.step.result?.childrenInfoSurvey) {
            const childData = this.step.result.childrenInfoSurvey.data;            
            for (const child of childData){                
                this.childData.push(child);                
                this.surveyJsonCopy.pages[0].elements[2].elements[1]["choices"].push(Vue.filter('getFullName')(child.name));
            }                       
        }
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.parentalResponsibilitiesSurvey) {
            this.survey.data = this.step.result.parentalResponsibilitiesSurvey.data; 
            
            const childList = []
            for (const child of this.childData)
                childList.push(Vue.filter('getFullName')(child.name))
            
            if(this.survey.data?.childrenRequestedResponsibilities){
                for(const child of this.survey.data.childrenRequestedResponsibilities){
                    if(childList.includes(child) == false){
                        this.survey.setValue('childrenRequestedResponsibilities', []);
                        break
                    }
                }
            }


            if (this.survey.data?.allResponsibilitiesOrder == 'y'                
                && this.survey.data?.childrenRequestedResponsibilities?.length == this.childData?.length)
            {
                this.survey.setVariable("allChildrenSelected", true);                    
            } else {
                this.survey.setVariable("allChildrenSelected", false);
            }
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }       

        if (this.step.result?.flmBackgroundSurvey?.data){
            const backgroundSurveyData = this.step.result.flmBackgroundSurvey.data;
            if (backgroundSurveyData?.ExistingOrdersFLM == 'y' 
                && backgroundSurveyData?.existingOrdersListFLM?.length > 0 
                && backgroundSurveyData?.existingOrdersListFLM?.includes("Parenting Arrangements including `parental responsibilities` and `parenting time`")){
                    this.survey.setVariable("existing", true);                    
                } else {
                    this.survey.setVariable("existing", false);
                }
        }
        
        if (this.childData?.length == 1){
            this.survey.setValue("childrenRequestedResponsibilities", [Vue.filter('getFullName')(this.childData[0].name)]);
            this.survey.setVariable("allChildrenSelected", true);  
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
        this.UpdateStepResultData({step:this.step, data: {parentalResponsibilitiesSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>


