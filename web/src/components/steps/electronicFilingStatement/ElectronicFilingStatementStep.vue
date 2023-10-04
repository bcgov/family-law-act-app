<template>
    <step-base v-bind:step="step">    
        <electronic-filing-statement  v-bind:step="step"     v-if="step.currentPage == stPgNo.EFSP.ElectronicFilingStatement" />        
        <review-your-answers-efsp     v-bind:step="step"     v-if="step.currentPage == stPgNo.EFSP.ReviewYourAnswersEFSP"/>
        <preview-forms-efsp           v-bind:step="step"     v-if="step.currentPage == stPgNo.EFSP.PreviewFormsEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import ElectronicFilingStatement from "./ElectronicFilingStatement.vue";
import ReviewYourAnswersEfsp from "./reviewEFSP/ReviewYourAnswersEFSP.vue";
import PreviewFormsEfsp from "./reviewEFSP/PreviewFormsEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        ElectronicFilingStatement,
        ReviewYourAnswersEfsp,
        PreviewFormsEfsp        
    }
})
export default class ElectronicFilingStatementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>