<template>
    <step-base v-bind:step="step">    
        <trial-readiness-statement       v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.TrialReadinessStatement" />
        <people-at-trial                 v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.PeopleAtTrial" />
        <issues-for-trial                v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.IssuesForTrial" />
        <background-tris                 v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.BackgroundTris" />
        <disclosure-of-information       v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.DisclosureOfInformation" />
        <witnesses                       v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.Witnesses" />
        <requirements-and-considerations v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.RequirementsAndConsiderations" />
        <about-the-trial                 v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.AboutTheTrial" />
        <orders-at-tpc                   v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.OrdersAtTpc" />
        <review-your-answers-tris        v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.ReviewYourAnswersTRIS"/>
        <preview-forms-tris              v-bind:step="step"     v-if="step.currentPage == stPgNo.TRIS.PreviewFormsTRIS"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import TrialReadinessStatement from "./TrialReadinessStatement.vue";
import PeopleAtTrial from "./PeopleAtTrial.vue";
import IssuesForTrial from "./IssuesForTrial.vue";
import BackgroundTris from "./BackgroundTris.vue";
import DisclosureOfInformation from "./DisclosureOfInformation.vue";
import Witnesses from "./Witnesses.vue";
import RequirementsAndConsiderations from "./RequirementsAndConsiderations.vue";
import AboutTheTrial from "./AboutTheTrial.vue";
import OrdersAtTpc from "./OrdersAtTpc.vue";

import ReviewYourAnswersTris from "./reviewTRIS/ReviewYourAnswersTRIS.vue";
import PreviewFormsTris from "./reviewTRIS/PreviewFormsTRIS.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        TrialReadinessStatement,        
        PeopleAtTrial,
        IssuesForTrial,
        BackgroundTris,
        DisclosureOfInformation,
        Witnesses,
        RequirementsAndConsiderations,
        AboutTheTrial,
        OrdersAtTpc,
        ReviewYourAnswersTris,
        PreviewFormsTris        
    }
})
export default class TrialReadinessStatementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
