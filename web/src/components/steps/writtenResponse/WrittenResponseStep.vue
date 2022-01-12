<template>
    <step-base v-bind:step="step">
        <wr-replying-to-application   v-bind:step="step" v-if="step.currentPage == stPgNo.WR.WrReplyingToApplication"/> 
        <agree-disagree               v-bind:step="step" v-if="step.currentPage == stPgNo.WR.AgreeDisagree"/>
        <about-written-response-order v-bind:step="step" v-if="step.currentPage == stPgNo.WR.AboutWrittenResponseOrder"/>
    
        <review-your-answers-w-r       v-bind:step="step" v-if="step.currentPage == stPgNo.WR.ReviewYourAnswersWR"/>
        <preview-forms-w-r             v-bind:step="step" v-if="step.currentPage == stPgNo.WR.PreviewFormsWR"/>
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import WrReplyingToApplication from "./WrReplyingToApplication.vue";
import AgreeDisagree from "./AgreeDisagree.vue";
import AboutWrittenResponseOrder from "./AboutWrittenResponseOrder.vue";

import ReviewYourAnswersWR from "./reviewWR/ReviewYourAnswersWR.vue"
import PreviewFormsWR from "./reviewWR/PreviewFormsWR.vue"

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        WrReplyingToApplication,
        AgreeDisagree,
        AboutWrittenResponseOrder,
        ReviewYourAnswersWR,
        PreviewFormsWR      
    }
})
export default class WrittenResponseStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
