<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        <survey v-bind:survey="survey"></survey>


        <!-- <b-modal size="xl" v-model="showPopup" header-class="bg-white" no-close-on-backdrop hide-header-close>
            
            <div class="m-3">
               
                <p>There is another form that you must complete when you are applying for guardianship of a child.
                    It is called <a href="https://www2.gov.bc.ca/gov/content?id=8202AD1B22B4494099F14EF3095B3178"
                                    target='blank'>Guardianship Affidavit Form 5</a>. Before you can complete the affidavit, 
                    you must complete the following background checks referenced in the form:</p>
                <ul>
                    <li>
                        a Ministry of Children and Family Development record check
                    </li>
                    <li>
                        a protection order record check from the Protection Order Registry, and
                    </li>
                    <li>
                        a criminal record check                       
                    </li>                    
                </ul>
                <p>To get a criminal record check, ask at the police station or RCMP detachment in your community.</p>
                <p>To get the Ministry of Children and Family Development and Protection Order Registry record checks, you must fill out:</p>
                 <ul>
                    <li>
                        a Consent for Child Protection Record Check, and
                    </li>
                    <li>
                        a Request for Protection Order Registry Search.
                    </li>                                      
                </ul>
                <p>
                    I understand that I am required to file a Guardianship Affidavit in Form 5 as described in 
                    <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/120_2020#section26" target='blank'>Rule 26</a> before 
                    the court can make a final order about guardianship.
                </p>
            </div>
            <template v-slot:modal-footer>
                <b-button variant="success" @click="showPopup = false">I understand</b-button>
            </template>            
        </b-modal> -->

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts";
import surveyJson from "./forms/indigenous-ancestry-of-child.json";

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

export default class IndigenousAncestryOfChild extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public steps!: stepInfoType[];   

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void

    survey = new SurveyVue.Model(surveyJson);    
    currentStep=0;
    currentPage=0;
    showPopup = false;

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
            Vue.filter('surveyChanged')('familyLawMatter')
            //console.log(this.survey.data);
            //console.log(options)
            
        })
    }
    
    public reloadPageInformation() {
        // console.log(this.step.result)
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result && this.step.result['indigenousAncestryOfChildSurvey']) {
            this.survey.data = this.step.result['indigenousAncestryOfChildSurvey'].data;
            
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);

        // if (this.determineShowPopup()) {
        //     this.showPopup = true;

        // } else {
        //     this.showPopup = false;
        // }
    }

    // public determineShowPopup(){
    //     if(this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress >0 &&
    //        this.$store.state.Application.steps[this.currentStep].result &&
    //        this.$store.state.Application.steps[this.currentStep].result.GuardianOfChildSurvey && 
    //        this.$store.state.Application.steps[this.currentStep].result.GuardianOfChildSurvey.data &&
    //        this.$store.state.Application.steps[this.currentStep].result.GuardianOfChildSurvey.data.applicationType && 
    //        this.$store.state.Application.steps[this.currentStep].result.GuardianOfChildSurvey.data.applicationType.includes('becomeGuardian'))
    //         return true;
    //     else
    //         return false;
    // }

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
        this.UpdateStepResultData({step:this.step, data: {indigenousAncestryOfChildSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../../styles/survey";
</style>
