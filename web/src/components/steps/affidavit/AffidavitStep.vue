<template>
    <step-base v-bind:step="step">    
        <affidavit                        v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.Affidavit" />
        <about-affiant                    v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.AboutAffiant" />
        <your-story-aff                   v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.YourStoryAFF" />
        <filing-aff                       v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.FilingAFF" />
        <electronic-filing-statement-aff  v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.ElectronicFilingStatementAFF" />
        <review-your-answers-aff          v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.ReviewYourAnswersAFF"/>
        <preview-forms-aff                v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.PreviewFormsAFF"/>
        <preview-forms-efsp               v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.PreviewFormsEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import Affidavit from "./Affidavit.vue";
import AboutAffiant from "./AboutAffiant.vue";
import YourStoryAff from "./YourStoryAFF.vue";
import FilingAff from "./FilingAFF.vue";
import ElectronicFilingStatementAff from "./ElectronicFilingStatementAFF.vue";
import ReviewYourAnswersAff from "./reviewAFF/ReviewYourAnswersAFF.vue";
import PreviewFormsAff from "./reviewAFF/PreviewFormsAFF.vue";
import PreviewFormsEfsp from "./reviewAFF/PreviewFormsEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        Affidavit,        
        AboutAffiant,
        YourStoryAff,
        FilingAff,
        ElectronicFilingStatementAff,
        ReviewYourAnswersAff,
        PreviewFormsAff,
        PreviewFormsEfsp
    }
})
export default class AffidavitStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
