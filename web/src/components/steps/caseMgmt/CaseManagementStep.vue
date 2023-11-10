<template>
    <step-base v-bind:step="step">
        <cm-questionnaire                               v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmQuestionnaire" />
        <other-persons                                  v-bind:step="step" v-if="step.currentPage == stPgNo.CM.OtherPersons" />
        <without-notice-or-attendance                   v-bind:step="step" v-if="step.currentPage == stPgNo.CM.WithoutNoticeOrAttendance" />
        <by-consent                                     v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ByConsent" />
        <cm-notice                                      v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmNotice" />
        <scheduling                                     v-bind:step="step" v-if="step.currentPage == stPgNo.CM.Scheduling" />
        <about-case-management-order                    v-bind:step="step" v-if="step.currentPage == stPgNo.CM.AboutCaseManagementOrder" />
        <cm-children-info                               v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmChildrenInfo" />
        <application-under-foaeaa                       v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ApplicationUnderFOAEAA" />
        <attendance-using-electronic-communication      v-bind:step="step" v-if="step.currentPage == stPgNo.CM.AttendanceUsingElectronicCommunication" />
        <changing-or-cancelling-a-service-or-notice     v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ChangingOrCancellingAServiceOrNotice" />
        <changing-or-cancelling-any-other-requirement   v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ChangingOrCancellingAnyOtherRequirement" />
        <requiring-access-to-information                v-bind:step="step" v-if="step.currentPage == stPgNo.CM.RequiringAccessToInformation" />
        <recognizing-an-order-from-outside-bc           v-bind:step="step" v-if="step.currentPage == stPgNo.CM.RecognizingAnOrderFromOutsideBc" />
        <contact-information-other-party                v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ContactInformationOtherParty" />
        <review-your-answers-cm                         v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ReviewYourAnswersCM" />
        <preview-form-10-cm                             v-bind:step="step" v-if="step.currentPage == stPgNo.CM.PreviewForm10CM" /> 
        <preview-form-11-cm                             v-bind:step="step" v-if="step.currentPage == stPgNo.CM.PreviewForm11CM" />
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import CmQuestionnaire from "./CmQuestionnaire.vue";
import OtherPersons from "./OtherPersons.vue";
import WithoutNoticeOrAttendance from "./WithoutNoticeOrAttendance.vue";
import ByConsent from "./ByConsent.vue";
import CmNotice from "./CmNotice.vue";
import Scheduling from "./Scheduling.vue";
import AboutCaseManagementOrder from "./AboutCaseManagementOrder.vue";
import CmChildrenInfo from "./childInfo/CmChildrenInfo.vue";
import ApplicationUnderFoaeaa from "./ApplicationUnderFOAEAA.vue";
import AttendanceUsingElectronicCommunication from "./AttendanceUsingElectronicCommunication.vue";
import ChangingOrCancellingAServiceOrNotice from "./ChangingOrCancellingAServiceOrNotice.vue";
import ChangingOrCancellingAnyOtherRequirement from "./ChangingOrCancellingAnyOtherRequirement.vue";
import RequiringAccessToInformation from "./RequiringAccessToInformation.vue";
import RecognizingAnOrderFromOutsideBc from "./RecognizingAnOrderFromOutsideBc.vue"
import ContactInformationOtherParty from "./ContactInformationOtherParty.vue"

import ReviewYourAnswersCm from "./reviewCM/ReviewYourAnswersCM.vue";
import PreviewForm10Cm from "./reviewCM/PreviewForm10CM.vue";
import PreviewForm11Cm from "./reviewCM/PreviewForm11CM.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,
        CmQuestionnaire,
        OtherPersons,        
        WithoutNoticeOrAttendance,
        ByConsent,
        CmNotice,
        Scheduling,
        AboutCaseManagementOrder,
        CmChildrenInfo,
        AttendanceUsingElectronicCommunication,
        ChangingOrCancellingAServiceOrNotice,
        ChangingOrCancellingAnyOtherRequirement,
        RequiringAccessToInformation,
        RecognizingAnOrderFromOutsideBc,
        ContactInformationOtherParty,
        ApplicationUnderFoaeaa,
        ReviewYourAnswersCm,
        PreviewForm10Cm,
        PreviewForm11Cm
    }
})
export default class CaseManagementStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
}
</script>