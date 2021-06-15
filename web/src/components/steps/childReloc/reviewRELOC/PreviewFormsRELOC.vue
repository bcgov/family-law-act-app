<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
            <!-- <form3 v-if="requiredForm == 3" @enableNext="EnableNext"/> -->
            <form16 v-if="requiredForm == 16" @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Form16 from  "./pdf/Form16.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{       
        Form16,
        PageBase
    }
})
export default class PreviewFormsReloc extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void


    currentStep = 0;
    currentPage = 0;
    disableNext = true;
    dataReady = false;
    requiredForm = 16;
    

    mounted(){
        this.dataReady = false;
        this.disableNext = true;        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        this.determineRequiredForm();
        if(this.checkErrorOnPages([this.stPgNo.COMMON._StepNo, this.stPgNo.RELOC._StepNo])) this.dataReady = true;
    }

    public determineRequiredForm(){        

        const stepCOM =  this.$store.state.Application.steps[this.stPgNo.COMMON._StepNo]   

        // if( stepCOM && 
        //     stepCOM.result &&
        //     stepCOM.result.filingLocationSurvey &&
        //     stepCOM.result.filingLocationSurvey.data){
        //     const filingLocationData = stepCOM.result.filingLocationSurvey.data;
        //     const courtsC = ["Victoria Law Courts", "Surrey Provincial Court"];
    
        //     const location = filingLocationData.ExistingCourt;                            

        //     if(courtsC.includes(location) && 
        //         filingLocationData.MetEarlyResolutionRequirements == 'n'){
        //             this.requiredForm = 1;
                
        //     } else {
        //         this.requiredForm = 3;
        //     }
        
        // } else {
            this.requiredForm = 16;
        // }

               
    }

    public EnableNext(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
        this.disableNext=false;        
    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()
    }

    public checkErrorOnPages(steps){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit","Preview Forms"]
        for(const stepIndex of steps){
            const step = this.$store.state.Application.steps[stepIndex]
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });                        
                        return false;
                    }
                }
            }            
        }
        return true;        
    }

    beforeDestroy() {
        const progress = this.dataReady? 100: 50
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }

}
</script>