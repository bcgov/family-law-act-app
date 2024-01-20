<template>
    <step-base v-bind:step="step">    
        <financial-statement             v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.FinancialStatement" />
        <about-affiant-fs                v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.AboutAffiantFs" />
        <your-story-fs                   v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.YourStoryFS" />
        <filing-fs                       v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.FilingFS" />
        <electronic-filing-statement-fs  v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ElectronicFilingStatementFS" />
        <review-your-answers-fs          v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.ReviewYourAnswersFS"/>
        <preview-forms-fs                v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.PreviewFormsFS"/>
        <preview-forms-fs-efsp           v-bind:step="step"     v-if="step.currentPage == stPgNo.FS.PreviewFormsFsEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import FinancialStatement from "./FinancialStatement.vue";
import AboutAffiantFs from "./AboutAffiantFS.vue";
import YourStoryFs from "./YourStoryFS.vue";
import FilingFs from "./FilingFS.vue";
import ElectronicFilingStatementFs from "./ElectronicFilingStatementFS.vue";
import ReviewYourAnswersFs from "./reviewFS/ReviewYourAnswersFS.vue";
import PreviewFormsFs from "./reviewFS/PreviewFormsFS.vue";
import PreviewFormsFsEfsp from "./reviewFS/PreviewFormsFsEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        FinancialStatement,        
        AboutAffiantFs,
        YourStoryFs,
        FilingFs,
        ElectronicFilingStatementFs,
        ReviewYourAnswersFs,
        PreviewFormsFs,
        PreviewFormsFsEfsp
    }
})
export default class FinancialStatementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
