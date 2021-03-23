<template>
  <step-base v-bind:step="step">
    <po-questionnaire v-bind:step="step" v-if="step.currentPage == 0"></po-questionnaire>
    <protection-fromWhom v-bind:step="step" v-if="step.currentPage == 1"></protection-fromWhom>
    <remove-person v-bind:step="step" v-if="step.currentPage == 2"></remove-person>
    <no-go v-bind:step="step" v-if="step.currentPage == 3"></no-go>
    <no-contact v-bind:step="step" v-if="step.currentPage == 4"></no-contact>
    <weapons-firearms v-bind:step="step" v-if="step.currentPage == 5"></weapons-firearms>
    <background v-bind:step="step" v-if="step.currentPage == 6"></background>
    <your-story v-bind:step="step" v-if="step.currentPage == 7"></your-story>
    <other-party v-bind:step="step" v-if="step.currentPage == 8"></other-party>
    <about v-bind:step="step" v-if="step.currentPage == 9"></about>
    <urgency v-bind:step="step" v-if="step.currentPage == 10"></urgency>
    <review-your-answers v-bind:step="step" v-if="step.currentPage == 11"/>
    <filing-options v-bind:step="step" v-if="step.currentPage == 12"/>
    <review-and-print v-bind:step="step" v-if="step.currentPage == 13"/>
    <review-and-save v-bind:step="step" v-if="step.currentPage == 14"/>
    <review-and-submit v-bind:step="step" v-if="step.currentPage == 15"/>
    <next-steps v-bind:step="step" v-if="step.currentPage == 16"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import PoQuestionnaire from "./PoQuestionnaire.vue";
import ProtectionFromWhom from "./ProtectionFromWhom.vue";
import Background from "./Background.vue";
import YourStory from "./YourStory.vue";
import Urgency from "./Urgency.vue";
import NoGo from "./safetyNeeds/NoGo.vue";
import RemovePerson from "./safetyNeeds/RemovePerson.vue";
import NoContact from "./safetyNeeds/NoContact.vue";
import WeaponsFirearms from "./safetyNeeds/WeaponsFirearms.vue";
import About from "./About.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";

import ReviewYourAnswers from "./submit/ReviewYourAnswers.vue"
import FilingOptions from "./submit/FilingOptions.vue"
import ReviewAndPrint from "./submit/ReviewAndPrint.vue"
import ReviewAndSave from "./submit/ReviewAndSave.vue"
import ReviewAndSubmit from "./submit/ReviewAndSubmit.vue"
import NextSteps from "./submit/NextSteps.vue";

@Component({
    components:{
        StepBase,
        PoQuestionnaire,
        ProtectionFromWhom,
        Background,
        YourStory,
        Urgency,
        NoGo,
        RemovePerson,
        NoContact,
        WeaponsFirearms,
        About,
        OtherParty,
        ReviewYourAnswers,
        FilingOptions,
        ReviewAndPrint,
        ReviewAndSave,
        ReviewAndSubmit,
        NextSteps
    }
})

export default class ProtectionOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
