<template>
    <step-base v-bind:step="step">    
        <affidavit                v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.Affidavit" />
        <affidavit-information    v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.AffidavitInformation" />
        <more-information-aff     v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.MoreInformationAFF" />
        <review-your-answers-aff  v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.ReviewYourAnswersAFF"/>
        <preview-forms-aff        v-bind:step="step"     v-if="step.currentPage == stPgNo.AFF.PreviewFormsAFF"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import Affidavit from "./Affidavit.vue";
import AffidavitInformation from "./AffidavitInformation.vue";
import MoreInformationAff from "./MoreInformationAFF.vue";
import ReviewYourAnswersAff from "./reviewAFF/ReviewYourAnswersAFF.vue";
import PreviewFormsAff from "./reviewAFF/PreviewFormsAFF.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        Affidavit,        
        AffidavitInformation,
        MoreInformationAff,
        ReviewYourAnswersAff,
        PreviewFormsAff        
    }
})
export default class AffidavitStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
