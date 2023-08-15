<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="displayPopup" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">

                <p>
                    You have 
                    <span v-if="trialPrep">
                        already had a trial preparation conference
                    </span>

                    <span v-if="trialPrep && trialDateScheduled">
                        and
                    </span>

                    <span v-if="trialDateScheduled">
                        a trial scheduled within 30 days
                    </span>. 
                    Under 
                    <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#section191" target="_blank">
                        Rule 191
                    </a>
                    , you can only file your Notice of Discontinuance with the consent of the other party or 
                    with permission of the court.  
                </p>
                
                <p>
                    To give their consent, they must sign a copy of the Notice of Discontinuance 
                    before you file it with the court. It may be signed digitally or using pen and ink.
                </p>
                <p>
                    You must also sign the consent.
                </p>
                <p>
                    The signed copy of the document can be uploaded into this service to file 
                    electronically, or you can file a paper copy at the court registry.
                </p>
                <p>
                    If the other party will not give their consent, you can file an Application 
                    for Case Management Order asking the court for permission to discontinue 
                    your application or reply. Select Apply for an Order at the beginning 
                    of this service for help completing the form.
                </p>                
            </div>

            <template v-slot:modal-footer>               
                <b-button variant="success" @click="displayPopup = false;">I understand</b-button>
            </template>            
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import moment from 'moment-timezone';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/about-the-trial.json";

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
export default class AboutTheTrial extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);

    currentStep = 0;
    currentPage = 0;
    disableNextButton = false;

    trialPrep = false;
    trialDateScheduled = false;
    displayPopup = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;       
    }

    mounted(){
        this.displayPopup = false;
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

            this.validateDates();

            if(options.name == "TrialPrep" || options.name == "TrialDateScheduled") {
                    this.messageForConsent();              
            } 
           
        })
    }

    public validateDates(){

        const Form3FiledDate = this.survey.data?.Form3FiledDate;
        const ReplyFiledDate = this.survey.data?.ReplyFiledDate;
        const CounterFiledDate = this.survey.data?.CounterFiledDate;
        const CourtAppearanceDate = this.survey.data?.CourtAppearanceDate;

        this.disableNextButton = false;
        
        if(Form3FiledDate) {                
            const today = moment().format();
            if(Form3FiledDate > today){
                this.survey.setValue('InvalidForm3FiledDate',true);
                this.disableNextButton = true;

            } else {
                this.survey.setValue('InvalidForm3FiledDate',false);
            }
        }

        if(ReplyFiledDate) {               
            const today = moment().format();
            if(ReplyFiledDate > today){
                this.survey.setValue('InvalidReplyFiledDate',true);
                this.disableNextButton = true;

            } else {
                this.survey.setValue('InvalidReplyFiledDate',false);                
            }
        }

        if(CounterFiledDate) {                
            const today = moment().format();
            if(CounterFiledDate > today){
                this.survey.setValue('InvalidCounterFiledDate',true);
                this.disableNextButton = true;

            } else {
                this.survey.setValue('InvalidCounterFiledDate',false);
            }
        }

        if(CourtAppearanceDate) {                
            const today = moment().format();
            if(CourtAppearanceDate > today){
                this.survey.setValue('InvalidCourtAppearanceDate',false);
            } else {
                this.survey.setValue('InvalidCourtAppearanceDate',true);
                this.disableNextButton = true;                    
            }
        }

    }

    public messageForConsent(){
       
        this.trialPrep = this.survey.data?.TrialPrep == 'y';
        this.trialDateScheduled = this.survey.data?.TrialDateScheduled == 'y';       
        this.displayPopup = this.trialPrep || this.trialDateScheduled;                
        
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;        

        if (this.step.result?.noticeDiscontinuanceSurvey) {            
            const discontinuingDocs = this.step.result.noticeDiscontinuanceSurvey.data.discontinuanceDocs;
            console.log(discontinuingDocs)
            this.survey.setValue('discontinuingDocs',discontinuingDocs);
        }
        
        if (this.step.result?.moreInformationSurvey) {
            this.survey.data = this.step.result.moreInformationSurvey.data;
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);    
            this.validateDates();   
            this.messageForConsent();     
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }

    public determineFilingRequirements(){

        const existingOrders = this.$store.state.Application.steps[0]['result']['existingOrders']


        this.trialPrep = this.survey.data?.TrialPrep == 'y';
        this.trialDateScheduled = this.survey.data?.TrialDateScheduled == 'y';

        if(existingOrders){
            const index = existingOrders.findIndex(order=>{return(order.type == 'NDT')})
            if(index >= 0 ){                
                existingOrders[index].doNotIncludePdf = this.trialPrep || this.trialDateScheduled; 
            }            
            this.UpdateCommonStepResults({data:{'existingOrders':existingOrders}});
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
        
        this.determineFilingRequirements();
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);
        
        this.UpdateStepResultData({step:this.step, data: {moreInformationSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>
