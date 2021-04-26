<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <input v-if="showUnpaidTemplate" style="display:inline; margin:0 0.5rem 0 0.5rem; width:8rem;" type="number" id='unpaid-amount' v-model="unpaidAmount"  @change="changeUnpaidAmount"/>
       
        <survey v-bind:survey="survey"></survey>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/unpaid-child-support.json";

import PageBase from "../../PageBase.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import moment from 'moment';
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase
    }
})

export default class UnpaidChildSupport extends Vue {
    
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

    survey = new SurveyVue.Model(surveyJson);   
    currentStep=0;
    currentPage=0;
    unpaidAmount = 0;
    showUnpaidTemplate = false;
   
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
            //console.log(options) 
            if (options == 'unpaid') {
                this.replaceUnpaidElement();
            }       

        })
    }
    
    public reloadPageInformation() {  
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['unpaidChildSupportSurvey']) {
            this.survey.data = this.step.result['unpaidChildSupportSurvey'].data;
            this.loadReplacedElementsData();

            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        
        const currentDate = moment().format("MMM DD, yyyy");        
        this.survey.setVariable("currentDate", currentDate); 
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
        this.replaceUnpaidElement();

        
    }

    public replaceUnpaidElement(){
        if (this.survey.data.unpaid == 'y') {
            this.showUnpaidTemplate = true;
            Vue.nextTick(()=>{
                const unpaidAmountTemplate = document.getElementById('unpaid-amount-template')
                const unpaidAmountEl = document.getElementById('unpaid-amount')          
                unpaidAmountTemplate.replaceWith(unpaidAmountEl)
            })
        } else {
            this.showUnpaidTemplate = false;
        }
        

    }

    public changeUnpaidAmount(){
        this.survey.setValue('unpaidAmount', this.unpaidAmount);
    }

    public loadReplacedElementsData(){

        if ((this.survey.data["unpaid"] == 'y') && this.survey.data["unpaidAmount"]){
            this.unpaidAmount = this.survey.data["unpaidAmount"];
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
        
        this.UpdateStepResultData({step:this.step, data: {unpaidChildSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
