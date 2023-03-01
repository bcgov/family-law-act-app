<template>
    <page-base :disableNext="disableNextButton" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card no-body v-if="dataReady" class="bg-white border-white my-5 ml-1 mr-5">
            
            <h1 >Getting Started</h1>          
                
            <p>
                This service will help you to complete the forms to apply for an order in 
                Provincial Court or to reply to an application. 
            </p>
            <p>
                If you need to reply to an application and make your own application, 
                this service can help you to do both. 
            </p>
            <p>
                You can also use this service to complete and file other forms for 
                your case like a Notice of Address Change, Request for Scheduling, 
                Trial Readiness Statement or other administrative or supporting forms.
            </p>
            <p>
                You can select one or more options below. When you’re finished, you 
                can save or print your forms and file them electronically or in person.
            </p>
            <p>                
                If you are replying to an Application About a Family Law Matter, 
                the reply pathway will include options to make your own counter application. 
                You may also want to apply for an order about protection from family violence, 
                case management or a priority parenting matter. If you are not sure which option 
                to select, start with the pathway you know you need. You can also talk to a family 
                justice counsellor or lawyer. If you select both options, this service will start 
                with the reply pathway and then your application.
            </p>
            
            <b-row class="my-5">                
                <b-col v-for="(btn, idx) in activityButtons"
                    :key="idx">
                    <b-button
                        style="height: 3rem;"
                        block
                        @click="changeSelectedActivity"
                        :pressed.sync="btn.state"
                        :variant="btn.state?'primary':'secondary'"
                    ><b-icon-check scale="1.5" class="mr-2" v-if="btn.state" />
                        {{ btn.label }}
                    </b-button>
                </b-col>                
            </b-row>           

            <b-row class="my-2 text-center" align-h="center">                
                
                <b-button
                    style="height: 3rem;"                    
                    @click="changeAdministrativeForms"
                    :pressed.sync="administrativeForms.state"
                    :variant="administrativeForms.state?'primary':'secondary'">
                    <b-icon-check scale="1.5" class="mr-2" v-if="administrativeForms.state" />
                    {{ administrativeForms.label }}
                </b-button>
                
            </b-row>
            
        </b-card>   

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class"; 

import PageBase from "../PageBase.vue";

import { toggleAllSteps, toggleStep, togglePages } from '@/components/utils/TogglePages';
import {incompleteProgressOfAllPages} from '@/components/utils/StepsAndPages/StepAndPageFunctions';

import { pathwayCompletedInfoType, stepInfoType, stepResultInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
  
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase        
    }
})
export default class SelectActivity extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    @applicationState.State
    public types!: string[];

    @applicationState.Action
    public UpdateApplicationType!: (newApplicationType: string[]) => void;

    @applicationState.Action
    public UpdateStepResultData!: (newStepResultData: stepResultInfoType) => void;

    @applicationState.State
    public pathwayCompleted!: pathwayCompletedInfoType;
    
    @applicationState.Action
    public UpdatePathwayCompletedFull!: (changedpathway: pathwayCompletedInfoType) => void;   

    disableNextButton = false;
  
    selectedActivity = [];

    activityButtons = [
        {
            label: 'Apply for an order',
            name: 'applyForOrder',
            state: false
        },
        {
            label: 'Reply to an Application',
            name: 'replyToApplication',
            state: false
        }
    ];
    
    administrativeForms = {
        label: 'Other family court form(s)',
        name: 'administrativeForms',
        state: false
    };
   
    currentStep =0;
    currentPage =0;
    dataReady = false;

    created() {
        this.disableNextButton = true;       
    }

    mounted(){ 
        this.dataReady = false;
        
        this.reloadPageInformation();
    }

    public reloadPageInformation(){               
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;

        if (this.steps[0].result) {

            const results = this.steps[0].result;
            this.selectedActivity = results.selectedActivity;
            this.administrativeForms.state = this.steps[0].result.administrativeForms;            

            for (const activity of this.activityButtons){
                activity.state = this.selectedActivity.includes(activity.name)
            }
            
        }  

        this.disableNextButton = !(this.selectedActivity.length > 0 || this.administrativeForms.state);        

        const progress = (this.selectedActivity.length==0 || !this.administrativeForms.state)? 50 : 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        this.dataReady = true;
    }

    public changeSelectedActivity(){

        const startPage = this.stPgNo.GETSTART;
        this.selectedActivity = [];
        for (const activity of this.activityButtons){
            if (activity.state){
                this.selectedActivity.push(activity.name)
            }
        }        

        if (!this.selectedActivity.includes('applyForOrder')){
            togglePages([startPage.FlmInfo], false, startPage._StepNo);
        }

        togglePages([startPage.GettingStarted], this.selectedActivity.includes('applyForOrder'), startPage._StepNo);
        togglePages([startPage.ReplyToApplication], this.selectedActivity.includes('replyToApplication'), startPage._StepNo);
        this.disableNextButton = !(this.selectedActivity.length > 0)

        toggleAllSteps([startPage._StepNo], false);
        incompleteProgressOfAllPages();
        if (this.selectedActivity.length > 0){
            this.administrativeForms.state = false;
        }
    }  

    public changeAdministrativeForms(){

        const adminStep = this.stPgNo.ADMIN;
        const startStep = this.stPgNo.GETSTART;
        
        if (this.administrativeForms.state){
            
            for (const activity in this.activityButtons){
                this.activityButtons[activity].state = false;               
            }  
            this.selectedActivity = [];
            togglePages([startStep.FlmInfo], false, startStep._StepNo);
            togglePages([startStep.GettingStarted], false, startStep._StepNo);
            togglePages([startStep.ReplyToApplication], false, startStep._StepNo);
            
        }         

        toggleStep(adminStep._StepNo, this.administrativeForms.state);       
        
        toggleAllSteps([startStep._StepNo, adminStep._StepNo], false);
        incompleteProgressOfAllPages();
        this.disableNextButton = !this.administrativeForms.state; 
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {        
        Vue.prototype.$UpdateGotoNextStepPage();                       
    }
  
    beforeDestroy() {
        const progress = (this.selectedActivity.length!=0 || this.administrativeForms.state)? 100 : 50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
        this.UpdateStepResultData({step:this.step, data: {selectedActivity: this.selectedActivity, administrativeForms: this.administrativeForms.state}})
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";

</style>