<template>
    <step-base v-bind:step="step">    
        <notice-discontinuance      v-bind:step="step"     v-if="step.currentPage == stPgNo.DIS.NoticeDiscontinuance" />
        <discontinuance-information v-bind:step="step"     v-if="step.currentPage == stPgNo.DIS.DiscontinuanceInformation" />
        <more-information           v-bind:step="step"     v-if="step.currentPage == stPgNo.DIS.MoreInformation" />
        <review-your-answers-dis    v-bind:step="step"     v-if="step.currentPage == stPgNo.DIS.ReviewYourAnswersDIS"/>
        <preview-forms-dis          v-bind:step="step"     v-if="step.currentPage == stPgNo.DIS.PreviewFormsDIS"/> 
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
import ReviewYourAnswersDis from "./reviewDIS/ReviewYourAnswersDIS.vue";
import PreviewFormsDis from "./reviewDIS/PreviewFormsDIS.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        NoticeDiscontinuance,        
        DiscontinuanceInformation,
        MoreInformation,
        ReviewYourAnswersDis,
        PreviewFormsDis        
    }
})
export default class DiscontinuanceStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
