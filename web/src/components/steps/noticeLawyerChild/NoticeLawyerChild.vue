<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()" >   
        <survey v-bind:survey="survey"></survey>
        <b-modal size="xl" v-model="servicePopUp" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">               
                <p>
                    I understand I must give notice of my Notice of Removal of Lawyer for Party to each party.  
                    To give notice, each party <b>must be served</b> with a filed copy of the document as soon as possible. 
                </p>
              
                <b-form-checkbox 
                    class="mt-4"
                    v-model="serveUnderstand"               
                    value="understand"
                    unchecked-value="">
                    <h4 style="margin: 0.26rem 0.5rem;">
                        I understand
                    </h4>
                </b-form-checkbox>
            </div>
            <template v-slot:modal-footer>
                <b-button :disabled="serveUnderstand != 'understand'" variant="success" @click="closeServicePopUp();">Continue</b-button>
            </template>            
        </b-modal>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/notice-lawyer-child.json";

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
export default class NoticeLawyerChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    @applicationState.Action
    public UpdateCommonStepResults!: (newCommonStepResults) => void

    survey = new SurveyVue.Model(surveyJson);
    currentStep =0;
    currentPage =0;    
    disableNextButton = false;
    serveUnderstand = '';
    servicePopUp = false;
    confirmed = false;

    beforeCreate() {
        const Survey = SurveyVue;
        surveyEnv.setCss(Survey);
    }

    created() {
        this.disableNextButton = false;       
    }

    mounted(){
        this.servicePopUp = false;
        this.confirmed = false;
        this.serveUnderstand = '';
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

            if(options.name == "ApplicantName") {
                this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
                this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
            }
        })
    }
    
    public reloadPageInformation() {
    
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;            

        if (this.step.result?.noticeLawyerChildSurvey) {            
            this.survey.data = this.step.result.noticeLawyerChildSurvey.data;   
                
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        } else {
            this.survey.setValue('OtherPartyInfoNlc',[]);
            this.survey.setValue('ChildInfoNlc',[]); 
        }

        if(this.step.result?.otherPartyNLCConfirmationSurvey?.data?.confirmation == 'Confirmed'){
            this.confirmed = true
        }

        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);       
    }

    public mergeRespondants(){
        const respondentNames =[]
        if(this.$store.state.Application.steps[0].result && this.$store.state.Application.steps[0].result.respondents){
            const respondents = this.$store.state.Application.steps[0].result.respondents        
            respondentNames.push(...respondents)
        }

        if(this.survey.data?.OtherPartyInfoNlc && this.survey.data?.OtherPartyInfoNlc.length>0){            
            const respondentNamesNlc = this.survey.data.OtherPartyInfoNlc.map(otherParty=>otherParty.name)
            respondentNames.push(...respondentNamesNlc)
        }  
        
        const fullNamesArray =[];
        for(const name of respondentNames ){
            fullNamesArray.push(Vue.filter('getFullName')(name))
        }

        const uniqueArray = respondentNames.filter(function(item, index) {
            const fullName = Vue.filter('getFullName')(item)
            return fullNamesArray.indexOf(fullName) == index;
        })
        
        this.UpdateCommonStepResults({data:{'respondents':uniqueArray}})
    }
   
    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
            this.servicePopUp = true;            
        }
    }  
    
    public closeServicePopUp(){
        this.servicePopUp = false;
        this.confirmed = true;
        Vue.prototype.$UpdateGotoNextStepPage();            
    }

    public getConfirmationResults( confirmation){
        const questionResults: {name: string; value: any; title: string; inputType: string}[] =[];
        questionResults.push({name:'otherPartyNLCSurveyConfirmation', value:confirmation, title:'I understand each other party must be given notice of my application', inputType:''})
        return {data: {confirmation:confirmation}, questions:questionResults, pageName:'Other Party Confirmation', currentStep: this.currentStep, currentPage:this.currentPage}
    }
    
    beforeDestroy() {

        this.mergeRespondants();

        if(this.survey.data?.["ApplicantName"]) {
            this.$store.commit("Application/setApplicantName", this.survey.data["ApplicantName"]);
            this.UpdateCommonStepResults({data:{'applicantName':this.survey.data["ApplicantName"]}})
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);

        this.UpdateStepResultData({
            step:this.step, 
            data: {
                noticeLawyerChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage),
                otherPartyNLCConfirmationSurvey: this.getConfirmationResults(this.confirmed?'Confirmed':'')
            }
        })       
        
    }
}
</script>
