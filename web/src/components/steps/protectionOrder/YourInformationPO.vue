<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/yourInformationPo.json";

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

export default class YourInformationPo extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: any

    @applicationState.State
    public types!: string[]

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateSurveyChangedPO!: (newSurveyChangedPO: boolean) => void


    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep=0;
    currentPage=0;
   

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
            //console.log(this.survey.data);
            // console.log(options)
            this.UpdateSurveyChangedPO(true);
            if(options.name=="ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        // console.log(this.steps[0].result)

        if (this.step.result && this.step.result['yourInformationSurveyPO']) {
            this.survey.data = this.step.result['yourInformationSurveyPO'].data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
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

        //console.log(this.survey.data["ApplicantName"])    

        if(this.survey.data && this.survey.data["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {yourInformationSurveyPO: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
       
        if (this.types.length > 1) {
            if (this.steps[2].result && this.steps[2].result.yourInformationSurvey) {
                console.log("common information already exists");
            } else {
                this.UpdateStepResultData({step:this.steps[2], data: {yourInformationSurvey: Vue.filter('getSurveyResults')(this.survey, 2, 1)}});
            }
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
