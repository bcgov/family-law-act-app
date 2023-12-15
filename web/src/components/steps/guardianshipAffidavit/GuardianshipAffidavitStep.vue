<template>
    <step-base v-bind:step="step">    
        <guardianship-affidavit              v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.GuardianshipAffidavit" />
        <about-affiant-ga                    v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.AboutAffiantGa" />
        <children-details-ga                 v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.ChildrenDetailsGa" />
        <caring-for-child-ga                 v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.CaringForChildGa" />
        <background-family-violence          v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.BackgroundFamilyViolence" />
        <background-civil-court-proceedings  v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.BackgroundCivilCourtProceedings" />
        <background-criminal-history         v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.BackgroundCriminalHistory" />
        <exhibits                            v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.Exhibits" />
        <filing-ga                           v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.FilingGA" />
        <electronic-filing-statement-ga      v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.ElectronicFilingStatementGA" />
        <review-your-answers-ga              v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.ReviewYourAnswersGA"/>
        <preview-forms-ga                    v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.PreviewFormsGA"/>
        <preview-forms-ga-efsp               v-bind:step="step"     v-if="step.currentPage == stPgNo.GA.PreviewFormsGaEFSP"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";

import GuardianshipAffidavit from "./GuardianshipAffidavit.vue";
import AboutAffiantGa from "./AboutAffiantGA.vue";


import ChildrenDetailsGa from "./childrenDetailsGa/ChildrenDetailsGa.vue";
import CaringForChildGa from "./caringForChildGa/CaringForChildGa.vue";
import BackgroundFamilyViolence from "./BackgroundFamilyViolence.vue";
import BackgroundCivilCourtProceedings  from "./backgroundCivilProceedingsGa/BackgroundCivilCourtProceedings.vue";
import BackgroundCriminalHistory from "./BackgroundCriminalHistory.vue";

import Exhibits from "./Exhibits.vue";

import FilingGa from "./FilingGA.vue";
import ElectronicFilingStatementGa from "./ElectronicFilingStatementGA.vue";
import ReviewYourAnswersGa from "./reviewGA/ReviewYourAnswersGA.vue";
import PreviewFormsGa from "./reviewGA/PreviewFormsGA.vue";
import PreviewFormsGaEfsp from "./reviewGA/PreviewFormsGaEFSP.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        GuardianshipAffidavit,        
        AboutAffiantGa,
        ChildrenDetailsGa,
        CaringForChildGa,
        BackgroundFamilyViolence,
        BackgroundCivilCourtProceedings,
        BackgroundCriminalHistory,
        Exhibits,
        FilingGa,
        ElectronicFilingStatementGa,
        ReviewYourAnswersGa,
        PreviewFormsGa,
        PreviewFormsGaEfsp
    }
})
export default class GuardianshipAffidavitStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
