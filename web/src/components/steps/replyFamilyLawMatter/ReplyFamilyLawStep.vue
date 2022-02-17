<template>
    <step-base v-bind:step="step">
        <rflm-questionnaire v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmQuestionnaire"/>
        <rflm-counter-app v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmCounterApp"/>
        <rflm-background v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmBackground"/>
        <rflm-children-info v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmChildrenInfo"/>

        <reply-new-parenting-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentingArrangements"/>
        <reply-new-parental-responsibilities v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentalResponsibilities"/>
        <reply-new-parenting-time v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentingTime"/>
        <reply-new-conditions-parenting-time v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewConditionsParentingTime"/>
        <reply-existing-parenting-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingParentingArrangements"/>

        <review-your-answers-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReviewYourAnswersRFLM"/>
        <preview-forms-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.PreviewFormsRFLM"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import RflmQuestionnaire from "./RflmQuestionnaire.vue";
import RflmCounterApp from "./RflmCounterApp.vue";
import RflmBackground from "./RflmBackground.vue";
import RflmChildrenInfo from "./childInfo/RflmChildrenInfo.vue";

import ReplyNewParentingArrangements from "./parentingArrangements/ReplyNewParentingArrangements.vue";
import ReplyNewParentalResponsibilities from "./parentingArrangements/ReplyNewParentalResponsibilities.vue";

import ReplyNewParentingTime from "./parentingArrangements/ReplyNewParentingTime.vue";
import ReplyNewConditionsParentingTime from "./parentingArrangements/ReplyNewConditionsParentingTime.vue";

import ReplyExistingParentingArrangements from "./parentingArrangements/ReplyExistingParentingArrangements.vue";

import PreviewFormsRFLM from "./reviewRFLM/PreviewFormsRFLM.vue";
import ReviewYourAnswersRFLM from "./reviewRFLM/ReviewYourAnswersRFLM.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        RflmQuestionnaire,
        RflmCounterApp,
        RflmBackground,
        RflmChildrenInfo,
        ReplyNewParentingArrangements,
        ReplyNewParentalResponsibilities,
        ReplyNewParentingTime,
        ReplyNewConditionsParentingTime,
        ReplyExistingParentingArrangements,
        ReviewYourAnswersRFLM,
        PreviewFormsRFLM  
    }
})
export default class ReplyFamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
