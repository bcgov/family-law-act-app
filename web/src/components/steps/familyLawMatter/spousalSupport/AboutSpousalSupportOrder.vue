<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <input style="display:inline; margin:0 0.5rem 0 0.5rem; width:8rem;" type="number" id='monthly-amount' v-model="monthlyAmount"  @change="changeMonthlyAmount"/>
        <input style="display:inline; margin:1rem 0.5rem 0 0.5rem; width:9rem" type="number" id='lump-sum-amount' v-model="lumpSumAmount"  @change="changeLumpSumAmount"/>

        <input style="display:inline; margin:0 0.5rem 0 0.5rem;" type="date" id='start-date' v-model="startDate"  @change="changeStartDate"/>
        <input style="display:inline; margin:1rem 0.5rem 0 0.5rem;" type="date" id='end-date' v-model="endDate"  @change="changeEndDate"/>

        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/about-spousal-support-order.json";

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
export default class AboutSpousalSupportOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;       

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);    
    currentStep =0;
    currentPage =0;
    monthlyAmount = 0;
    startDate='';
    endDate='';
    lumpSumAmount = 0;   
    
    choise1 = "in the amount of $<input id='monthly-amount-template'/> per month starting on <input id='start-date-template'/> until <input id='end-date-template'/>"
    choise2 = "in a lump sum of $<input id='lump-sum-amount-template'/>"

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
            //console.log(this.survey.pages[0].questions)           
            console.log(this.survey.data)
            this.determineHowToPay()
        })
    }

    public determineHowToPay(){
        
        if(this.survey.data.howToPaySpousalSupport){
            const howToPay: string[]=[];           
            if(this.survey.data.howToPaySpousalSupport.includes(this.choise1)){
                howToPay.push('monthly');                
            }
            if(this.survey.data.howToPaySpousalSupport.includes(this.choise2)){
                howToPay.push('lumpsum');             
            }
            if(this.survey.data.howToPaySpousalSupport.includes('other')){
                howToPay.push('other');              
            }
        
            this.survey.setValue('howToPay',howToPay)
        }
        else 
            this.survey.clearValue('howToPay')  
    }
    
    public reloadPageInformation() {
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['aboutSpousalSupportOrderSurvey']) {
            this.survey.data = this.step.result['aboutSpousalSupportOrderSurvey'].data;
            this.loadReplacedElementsData();   
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        Vue.nextTick(()=>{
            const monthlyAmountTemplate = document.getElementById('monthly-amount-template')
            const monthlyAmountEl = document.getElementById('monthly-amount')          
            monthlyAmountTemplate.replaceWith(monthlyAmountEl)

            const lumpSumAmountTemplate = document.getElementById('lump-sum-amount-template')
            const lumpSumAmountEl = document.getElementById('lump-sum-amount')          
            lumpSumAmountTemplate.replaceWith(lumpSumAmountEl)

            const startDateTemplate = document.getElementById('start-date-template')
            const startDateEl = document.getElementById('start-date')          
            startDateTemplate.replaceWith(startDateEl)

            const endDateTemplate = document.getElementById('end-date-template')
            const endDateEl = document.getElementById('end-date')          
            endDateTemplate.replaceWith(endDateEl)

        })
        
        this.determineHowToPay()                
    }

    public changeMonthlyAmount(){
        this.survey.setValue('monthlyAmount', this.monthlyAmount);
    }

    public changeLumpSumAmount(){
        this.survey.setValue('lumpSumAmount', this.lumpSumAmount);        
    }

    public changeStartDate(){
        this.survey.setValue('startDate', this.startDate);
    }

    public changeEndDate(){
        this.survey.setValue('endDate', this.endDate);        
    }

    public loadReplacedElementsData(){

        if (this.survey.data["monthlyAmount"]){
            this.monthlyAmount = this.survey.data["monthlyAmount"];
        }

        if (this.survey.data["lumpSumAmount"]){
            this.lumpSumAmount = this.survey.data["lumpSumAmount"];
        }

        if (this.survey.data["startDate"]){
            this.startDate = this.survey.data["startDate"];
        }

        if (this.survey.data["endDate"]){
            this.endDate = this.survey.data["endDate"];
        }
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
        
        this.UpdateStepResultData({step:this.step, data: {aboutSpousalSupportOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
