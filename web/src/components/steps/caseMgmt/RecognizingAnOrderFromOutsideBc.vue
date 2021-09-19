<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>
        <b-modal size="xl" v-model="outsideBcConfirm" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3">               
                <p>You will need to attach a certified copy of the order to this application for filing. 
                    A certified copy is a copy of the original order from the other court, usually a 
                    photocopy, that has been endorsed using a stamp or certificate by the court to say 
                    that it is a true copy of the original.
                </p>
                <p>
                    If you do not have a certified copy of the order, you will need to contact the original 
                    court location to get a certified copy from them.
                </p>
                <p>
                    You cannot file a certified copy of an order through efiling. You will be required to file 
                    this application in person or by mail. 
                </p>
                <b-form-checkbox 
                    class="mt-4"
                    v-model="outsideBcUnderstand"               
                    value="understand"
                    unchecked-value="">
                    <h4 style="margin: 0.26rem 0.5rem;">
                        I understand
                    </h4>
                </b-form-checkbox>
            </div>
            <template v-slot:modal-footer>
                <b-button :disabled="outsideBcUnderstand != 'understand'" variant="success" @click="closeOutsideBcConfirm();">Continue</b-button>
            </template>            
        </b-modal>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/recognizing-an-order-from-outside-bc.json";

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

export default class RecognizingAnOrderFromOutsideBc extends Vue {
    
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
    outsideBcConfirm = false
    outsideBcUnderstand = ''

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

        if (this.step.result?.recognizingAnOrderFromOutsideBcSurvey) {
            this.survey.data = this.step.result.recognizingAnOrderFromOutsideBcSurvey.data; 
            Vue.filter('scrollToLocation')(this.$store.state.Application.scrollToLocationName);            
        }     
        
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, false);
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        if(!this.survey.isCurrentPageHasErrors) {
             if (this.survey.data?.outsideBcOrder == 'y') {            
                this.outsideBcConfirm = true;
            } else {
                this.UpdateGotoNextStepPage();
            }                        
        }
    }

    public closeOutsideBcConfirm(){
        this.outsideBcConfirm = false;
        this.UpdateGotoNextStepPage();            
    }
    
    beforeDestroy() {
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {recognizingAnOrderFromOutsideBcSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>