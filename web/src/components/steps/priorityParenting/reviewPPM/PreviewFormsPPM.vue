<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">           
            <form15 @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form15 from  "./pdf/Form15.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"
import { toggleStep } from '@/components/utils/TogglePages';
import { priorityParentingMatterOrderSurveyDataInfoType } from '@/types/Application/PriorityParentingMatter';

@Component({
    components:{       
        Form15,
        PageBase
    }
})
export default class PreviewFormsPpm extends Vue {

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
        if(this.checkErrorOnPages([this.stPgNo.COMMON._StepNo, this.stPgNo.PPM._StepNo])) this.dataReady = true;
        window.scrollTo(0, 0);
    }   

    public EnableNext(){
        this.determineReviewConnectStepRequired();
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
        //TODO: may need to add for connect step/page
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

    public determineReviewConnectStepRequired(){

        let ppmType = [];
        if(this.$store.state.Application.steps[this.stPgNo.PPM._StepNo].result?.ppmQuestionnaireSurvey?.data )
            ppmType = this.$store.state.Application.steps[this.stPgNo.PPM._StepNo].result.ppmQuestionnaireSurvey.data;
        
        let ppmOrder = {} as priorityParentingMatterOrderSurveyDataInfoType;
        if(this.$store.state.Application.steps[this.stPgNo.PPM._StepNo].result?.priorityParentingMatterOrderSurvey.data )
            ppmOrder = this.$store.state.Application.steps[this.stPgNo.PPM._StepNo].result?.priorityParentingMatterOrderSurvey.data;        


        if (ppmType.includes('childServices') && (ppmOrder.childRemoved == 'y') && (ppmOrder.confirmChildServices?.includes('applyPPM'))){
            toggleStep(this.stPgNo.CONNECT._StepNo, true);
        } else {
            toggleStep(this.stPgNo.CONNECT._StepNo, false);
        }

    }

    beforeDestroy() {
        const progress = this.dataReady? 100: 50
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }

}
</script>