<template>
    <div v-if="dataReady" >
        <page-base :disableNext="disableNext" v-on:onPrev="onPrev()" v-on:onNext="onNext()">
            <form-11 v-if="requiredForm.includes('11')" @enableNext="EnableNext"/>
            <form-10 v-if="requiredForm.includes('10')" @enableNext="EnableNext"/>
        </page-base>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form10 from  "./pdf/Form10.vue"
import Form11 from  "./pdf/Form11.vue"
import PageBase from "@/components/steps/PageBase.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        Form10,
        Form11,
        PageBase
    }
})
export default class PreviewFormsCm extends Vue {

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
    requiredForm = [];    

    mounted(){
        this.dataReady = false;
        this.disableNext = true;        
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 50, false);
        this.determineRequiredForm();
        if(this.checkErrorOnPages([this.stPgNo.COMMON._StepNo, this.stPgNo.CM._StepNo])) this.dataReady = true;
    }

    public determineRequiredForm(){        
        this.requiredForm = [];
        const stepCM = this.$store.state.Application.steps[this.stPgNo.CM._StepNo]   

        if(stepCM.result?.withoutNoticeOrAttendanceSurvey?.data && stepCM.result?.cmQuestionnaireSurvey?.data){
            const withoutNoticeOrAttendanceData = stepCM.result.withoutNoticeOrAttendanceSurvey.data;
            if(withoutNoticeOrAttendanceData.needWithoutNotice == 'y' && this.needNotice(stepCM.result)){
                    this.requiredForm.push('11');                
            } else {
                this.requiredForm.push('10');
            }        
        } else {
            this.requiredForm.push('10');
        }               
    }

    public needNotice(results){

        let needNotice = false;
        
        const selectedCaseManagementItems = results.cmQuestionnaireSurvey.data;
        const needNoticeList = [
            'changeServiceRequirement',
            'changeRequirement',
            'remoteAttendance',
            'otherProvinceOrder',
            'section242'
        ]

        needNotice = needNoticeList.some(i => selectedCaseManagementItems.includes(i));        

        return needNotice;
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