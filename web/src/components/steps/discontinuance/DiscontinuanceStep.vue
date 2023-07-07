<template>
    <step-base v-bind:step="step">    
        <notice-discontinuance      v-bind:step="step"     v-if="step.currentPage == stPgNo.NDT.NoticeDiscontinuance" />
        <discontinuance-information v-bind:step="step"     v-if="step.currentPage == stPgNo.NDT.DiscontinuanceInformation" />
        <more-information           v-bind:step="step"     v-if="step.currentPage == stPgNo.NDT.MoreInformation" />
        <review-your-answers-ndt    v-bind:step="step"     v-if="step.currentPage == stPgNo.NDT.ReviewYourAnswersNDT"/>
        <preview-forms-ndt          v-bind:step="step"     v-if="step.currentPage == stPgNo.NDT.PreviewFormsNDT"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import NoticeDiscontinuance from "./NoticeDiscontinuance.vue";
import DiscontinuanceInformation from "./DiscontinuanceInformation.vue";
import MoreInformation from "./MoreInformation.vue";
import ReviewYourAnswersNdt from "./reviewNDT/ReviewYourAnswersNDT.vue";
import PreviewFormsNdt from "./reviewNDT/PreviewFormsNDT.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeDiscontinuance,        
        DiscontinuanceInformation,
        MoreInformation,
        ReviewYourAnswersNdt,
        PreviewFormsNdt        
    }
})
export default class DiscontinuanceStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
