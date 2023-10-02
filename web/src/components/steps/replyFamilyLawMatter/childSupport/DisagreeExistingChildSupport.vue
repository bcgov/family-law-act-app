<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="legalInfo" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">               
                <p>If you do not give your complete, true, and up-to-date financial information when needed, the court can:</p>
                <ul>
                    <li>
                        order that the income information be provided
                    </li>
                    <li>
                        assume a party’s income is a certain amount for support purposes and make an order based on it
                    </li>
                    <li>
                        require a party to give security                      
                    </li>
                    <li>
                        require a party to pay the other party’s expenses, an amount to the other party up to $5,000, or a fine up to $5,000                      
                    </li>
                    <li>
                        make any other order the court considers appropriate                       
                    </li>
                </ul>
                <p>
                    If you have not filed your financial information with the court and are required to do so, 
                    or your financial information filed with the court is not up to date, you must file a 
                    <a 
                        href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa713.pdf?forcedownload=true"
                        target="_blank">Financial Statement Form 4</a> 
                    with your Reply to an Application About a Family Law Matter.
                </p>

                <p>You are required to provide financial disclosure if any of the following apply to your situation:</p>
                <ul>
                    <li>
                        you are required to pay child support
                    </li>
                    <li>
                        there is <tooltip title="split" size="lg" :index="0"/> or <tooltip title="shared" size="lg" :index="0"/> parenting time
                    </li>
                    <li>
                        there is a child 19 years or older for who support is for                      
                    </li>
                    <li>
                        a party has been acting as a parent to a child of the other party, for example a step-parent                      
                    </li>
                    <li>
                        the paying parent earns more than $150,000 per year                       
                    </li>
                    <li>
                        there is a claim for <tooltip title="special and extraordinary expenses" size="md" :index="0"/> for a child
                    </li>
                    <li>
                        you are claiming <tooltip title="undue hardship" size="lg" :index="0"/>                        
                    </li>
                </ul>

            </div>
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="closeLegalInfo">I Understand</b-button>
            </template>            
        </b-modal>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/disagree-existing-child-support.json";

import PageBase from "../../PageBase.vue";
import Tooltip from "@/components/survey/Tooltip.vue";
import { stepInfoType, stepResultInfoType } from "@/types/Application";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase,
        Tooltip
    }
})

export default class DisagreeExistingChildSupport extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;     

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);   
    currentStep =0;
    currentPage =0;  
    legalInfo = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    mounted(){
        this.legalInfo = false;
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
            Vue.filter('surveyChanged')('replyFlm')
  
                       
        })
    }  
    
    public reloadPageInformation() {

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.disagreeExistingChildSupportSurvey) {
            this.survey.data = this.step.result.disagreeExistingChildSupportSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);             
        }
       
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {            
            this.legalInfo = true;
        }
    } 
    
    public closeLegalInfo(){
        this.legalInfo = false;
        Vue.prototype.$UpdateGotoNextStepPage();
    }
    
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {disagreeExistingChildSupportSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>


