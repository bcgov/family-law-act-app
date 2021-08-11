<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <survey v-bind:survey="survey"></survey>

        <b-modal size="xl" v-model="popInfo" header-class="bg-white" no-close-on-backdrop hide-header>
            
            <div class="m-3"> 
                <p>
                    You will need to attach a certified copy of the order to your request for filing. A certified copy is a copy of the original order from the other court, usually a photocopy, that has been endorsed using a stamp or certificate by the court to say that it is a true copy of the original.
                </p>
                <p>
                    If you do not have a certified copy of the order, you will need to contact the original court location to get a certified copy from them.
                </p>
                <p>
                    You cannot file a certified copy of an order through efiling. You will be required to file Request to File an Order in person or by mail.
                </p>
                <b-form-checkbox 
                    class="mt-4"
                    v-model="popInfoUnderstand"               
                    value="understand"
                    unchecked-value="">
                    <h4 style="margin: 0.26rem 0.5rem;">
                        I understand
                    </h4>
                </b-form-checkbox>            
            </div>   

            <template v-slot:modal-footer>
                <b-button :disabled="popInfoUnderstand != 'understand'" variant="success" @click="popInfo=false;">Continue</b-button>
            </template>
                    
        </b-modal>  
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import * as SurveyVue from "survey-vue";
import * as surveyEnv from "@/components/survey/survey-glossary";
import surveyJson from "./forms/enforce-agreement-order.json";


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

export default class EnforceAgreementOrder extends Vue {
    
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
    currentStep =0;
    currentPage =0; 
    
    popInfo = false;
    popInfoUnderstand = ''

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
            Vue.filter('surveyChanged')('agreementEnfrc')
            console.log(options)
            if(options.name == "existingType" && options.value =="courtOrder" ){
                this.popInfo = true;
            }
        })
    }
    
    public reloadPageInformation() { 
        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.step.result?.enforceAgreementOrOrderSurvey) {
            this.survey.data = this.step.result.enforceAgreementOrOrderSurvey.data; 
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
        Vue.filter('setSurveyProgress')(this.survey, this.currentStep, this.currentPage, 50, true);        
        this.UpdateStepResultData({step:this.step, data: {enforceAgreementOrOrderSurvey: Vue.filter('getSurveyResults')(this.survey, this.currentStep, this.currentPage)}})
    }
}
</script>