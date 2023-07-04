<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">           
            <form2 @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Form2 from  "./pdf/Form2.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{       
        Form2,
        PageBase
    }
})
export default class PreviewFormsNpr extends Vue {

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
        if(this.checkErrorOnPages([this.stPgNo.OTHER._StepNo, this.stPgNo.NPR._StepNo])) this.dataReady = true;
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

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit","Preview Forms", "File"]
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