<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';   
import { namespace } from "vuex-class";  
import * as _ from 'underscore';  

import * as SurveyVue from "survey-vue";
import surveyJson from "./forms/address-change-notice.json";
import * as surveyEnv from "@/components/survey/survey-glossary";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

import { togglePages } from '@/components/utils/TogglePages';

@Component({
    components:{
        PageBase
    }
})

export default class AddressChangeNotice extends Vue {
        
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    survey = new SurveyVue.Model(surveyJson);
    disableNextButton = false;
    currentStep =0;
    currentPage =0;   

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;       
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
            this.setPages();                     
        })   
    }

    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.addressChangeNoticeSurvey){
            this.survey.data = this.step.result.addressChangeNoticeSurvey.data;
            this.setPages();
        }

        this.determineProgress();

        //Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);     
    }

    public setPages() {

        const p = this.stPgNo.NAC;
        const noticeOfAddressChangePagesAll = [p.ReviewYourAnswersNAC ]

        if (this.survey.data?.acknowledgement?.length > 0) {

            togglePages(noticeOfAddressChangePagesAll, true, this.currentStep);
            this.disableNextButton = false;
                
        } else { 
            togglePages(noticeOfAddressChangePagesAll, false, this.currentStep);
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
            this.disableNextButton = true;
        }
    }

    public determineProgress(){
        if (this.survey.data?.acknowledgement?.length > 0 ) {            
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 100, false);
            
        } else {
            Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        }
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            Vue.prototype.$UpdateGotoNextStepPage()
        }
    }

    beforeDestroy() {      
        this.determineProgress();  
        //Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);       
        this.UpdateStepResultData({step:this.step, data: {addressChangeNoticeSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>