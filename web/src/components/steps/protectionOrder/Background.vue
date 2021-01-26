<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
import surveyJson from "./forms/background.json";

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
export default class Background extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;
   
    @Watch('pageIndex')
    pageIndexChange(newVal) 
    {
        this.survey.currentPageNo = newVal;        
    }

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

        if (this.step.result && this.step.result['backgroundSurvey']){
            this.survey.data = this.step.result['backgroundSurvey'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);
        }
        console.log(this.survey.currentPage.questions)
        //console.log(this.survey.current)
        
        let progress = 50;
        if(Object.keys(this.survey.data).length && this.survey.data.howPartiesRelated)
            progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })

        this.survey.setVariable("RespondentName", Vue.filter('getFullName')(this.$store.state.Application.respondentName));
        this.survey.setVariable("ProtectedPartyName", Vue.filter('getFullName')(this.$store.state.Application.protectedPartyName));
        
        let children ="";
        for(const child of this.$store.state.Application.protectedChildName){
            if(child.childName)
                children+='<li>'+ Vue.filter('getFullName')(child.childName) +'</li>'
        }
 
        this.survey.setVariable("protectedChildName",children)   
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.UpdateGotoNextStepPage()
        }
    }

    public onComplete() {
        this.$store.commit("Application/setAllCompleted", true);
    }

    // public getFullName(nameObject){
    //     if (nameObject) {
    //         return nameObject.first +
    //             " " +
    //             nameObject.middle +
    //             " " +
    //             nameObject.last;
    //     } else{
    //         return " "
    //     }
    // }
  
    beforeDestroy() {
        
        const progress = this.survey.isCurrentPageHasErrors? 50 : 100;
        this.$store.commit("Application/setPageProgress", { currentStep: this.currentStep, currentPage:this.currentPage, progress:progress })
        const currPage = document.getElementById("step-" + this.currentStep+"-page-" + this.currentPage);
        if(currPage){
            if(this.survey.isCurrentPageHasErrors)
                currPage.style.color = "red";
            else
            {
                currPage.style.color = "";
                currPage.className="";
            }  
        } 

        this.UpdateStepResultData({step:this.step, data: {backgroundSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
