<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">           
            <form51 @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { namespace } from "vuex-class"; 

import Form51 from  "./pdf/Form51.vue"
import PageBase from "@/components/steps/PageBase.vue";
  
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{       
        Form51,
        PageBase
    }
})
export default class PreviewFormsEfsp extends Vue {

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;    

    currentStep = 0;
    currentPage = 0;
    disableNext = true;
    dataReady = false;    

    mounted(){
        this.dataReady = false;
        this.disableNext = true;        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        
        const affPageNumber = this.stPgNo.AFF.PreviewFormsAFF;
        
        let nonCompleteForm = false;
        let nonCompleteFormPage = 0;
        
        const pageForm = this.$store.state.Application.steps[this.stPgNo.AFF._StepNo].pages[affPageNumber]
        if(pageForm.active && pageForm.progress !=100){
            nonCompleteForm = true;
            nonCompleteFormPage = affPageNumber            
        }

        if(nonCompleteForm){
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.AFF._StepNo, currentPage: nonCompleteFormPage});
        }
        else if(this.checkErrorOnPages([this.stPgNo.COMMON._StepNo, this.stPgNo.AFF._StepNo])) 
            this.dataReady = true;
        
        if(this.checkErrorOnPages([this.stPgNo.OTHER._StepNo, this.stPgNo.AFF._StepNo])) this.dataReady = true;
        window.scrollTo(0, 0);
    }   

    public EnableNext(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
        this.disableNext=false;        
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()
    }

    public checkErrorOnPages(steps){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit","Preview Form 45","Preview Form 51", "File"]
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
        const progress = this.dataReady && !this.disableNext? 100: 50
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }
}
</script>