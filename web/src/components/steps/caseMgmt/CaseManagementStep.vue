<template>
  <step-base v-bind:step="step">
    <cm-questionnaire v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmQuestionnaire" />

    <other-persons v-bind:step="step" v-if="step.currentPage == stPgNo.CM.OtherPersons" />
    <without-notice-or-attendance v-bind:step="step" v-if="step.currentPage == stPgNo.CM.WithoutNoticeOrAttendance" />
    <by-consent v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ByConsent" />
    <cm-notice v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmNotice" />
    <scheduling v-bind:step="step" v-if="step.currentPage == stPgNo.CM.Scheduling" />
    <about-case-management-order v-bind:step="step" v-if="step.currentPage == stPgNo.CM.AboutCaseManagementOrder" />
    <cm-children-info v-bind:step="step" v-if="step.currentPage == stPgNo.CM.CmChildrenInfo" />
    <attendance-using-electronic-communication v-bind:step="step" v-if="step.currentPage == stPgNo.CM.AttendanceUsingElectronicCommunication" />
    <review-your-answers-cm v-bind:step="step" v-if="step.currentPage == stPgNo.CM.ReviewYourAnswersCM" />
    <preview-forms-cm v-bind:step="step" v-if="step.currentPage == stPgNo.CM.PreviewFormsCM" />
  
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import AboutCaseManagementOrder from "./AboutCaseManagementOrder.vue";
import AttendanceUsingElectronicCommunication from "./AttendanceUsingElectronicCommunication.vue";
import ByConsent from "./ByConsent.vue";
import CmNotice from "./CmNotice.vue";
import CmQuestionnaire from "./CmQuestionnaire.vue";
import OtherPersons from "./OtherPersons.vue";
import Scheduling from "./Scheduling.vue";
import WithoutNoticeOrAttendance from "./WithoutNoticeOrAttendance.vue";
import CmChildrenInfo from "./childInfo/CmChildrenInfo.vue";
import ReviewYourAnswersCM from "./reviewCM/ReviewYourAnswersCM.vue";
import PreviewFormsCM from "./reviewCM/PreviewFormsCM.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
      StepBase,
      AboutCaseManagementOrder,
      AttendanceUsingElectronicCommunication,
      ByConsent,
      CmNotice,
      CmQuestionnaire,
      OtherPersons,
      Scheduling,
      WithoutNoticeOrAttendance,
      CmChildrenInfo
    }
})
export default class CaseManagementStep extends Vue {
  
  @Prop({required: true})
  step!: stepInfoType;

  @applicationState.State
  public stPgNo!: stepsAndPagesNumberInfoType;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
