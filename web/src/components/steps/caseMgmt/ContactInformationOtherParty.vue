<template>
    <page-base class="contact" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/contact-information-other-party.json";

import PageBase from "../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class ContactInformationOtherParty extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];    

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

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
        this.survey.onValueChanged.add((sender, options) => {
            Vue.filter('surveyChanged')('caseMgmt') 
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        let otherPartyNames = []
        if(this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo].result?.otherPartyCommonSurvey?.data?.otherPartyCommonData){
            otherPartyNames = this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo].result.otherPartyCommonSurvey.data.otherPartyCommonData
        }

        if (this.step.result?.contactInformationOtherPartySurvey?.data?.otherPartyInfo?.length == otherPartyNames.length) {
            this.survey.data = this.step.result.contactInformationOtherPartySurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }else {            
            const otherPartyInfo = []
            for(const otherparty of otherPartyNames){
                otherPartyInfo.push({name: otherparty.name})
            }
            this.survey.setValue('otherPartyInfo',otherPartyInfo)        
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

    public getOtherPartyResults(){
        const questionResults: {name:string; value: any; title:string; inputType:string}[] =[];
        if(this.survey.data.otherPartyInfo)
            for(const otherParty of this.survey.data.otherPartyInfo)
            {
                questionResults.push({name:'otherPartyContactInformationSurvey', value: this.getOtherPartyInfo(otherParty), title:Vue.filter('getFullName')(otherParty.name) +'\'s Contact Information', inputType:''})
            }
        return {data: this.survey.data, questions:questionResults, pageName:'Contact Information Other Party', currentStep: this.currentStep, currentPage:this.currentPage}
    }

    public getOtherPartyInfo(otherParty){
        const resultString = [];
        resultString.push(Vue.filter('styleTitle')("Name: ")+Vue.filter('getFullName')(otherParty.name));
        resultString.push(Vue.filter('styleTitle')("Birthdate: ")+Vue.filter('beautify-date')(otherParty.dob));
        resultString.push(Vue.filter('styleTitle')("Lawyer: ")+(otherParty.lawyer? otherParty.lawyer:''));
        resultString.push(Vue.filter('styleTitle')("Address: ")+Vue.filter('getFullAddress')(otherParty.address))
        resultString.push(Vue.filter('styleTitle')("Contact: ")+Vue.filter('getFullContactInfo')(otherParty.contactInfo))
        
        return resultString
    }
    
    beforeDestroy() {       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);                
        this.UpdateStepResultData({step:this.step, data: {contactInformationOtherPartySurvey: this.getOtherPartyResults()}})       
    }
}
</script>
<style >

.contact .sv_main .sv-paneldynamic__remove-btn {
    background-color: rgb(255, 255, 255) !important;
    border: 0px;
    pointer-events: none;
} 

.contact .sv_main .sv-paneldynamic__add-btn{
    background-color: rgb(255, 255, 255) !important;
    border: 0px;
    pointer-events: none;
} 


</style>