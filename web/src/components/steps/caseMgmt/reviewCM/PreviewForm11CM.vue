<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
            <form-11 @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form11 from  "./pdf/Form11.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        Form11,
        PageBase
    }
})
export default class PreviewForm11Cm extends Vue {

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

        const pageForm10 =  this.$store.state.Application.steps[this.stPgNo.CM._StepNo].pages[this.stPgNo.CM.PreviewForm10CM]
        
        if(pageForm10.active && pageForm10.progress !=100){
            this.$store.commit("Application/setCurrentStepPage", {currentStep: this.stPgNo.CM._StepNo, currentPage: this.stPgNo.CM.PreviewForm10CM});
        }
        else if(this.checkErrorOnPages([this.stPgNo.COMMON._StepNo, this.stPgNo.CM._StepNo])) 
            this.dataReady = true;

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

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit","Preview Forms", "Preview Form 10","Preview Form 11"]
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