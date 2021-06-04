<template>
    <step-base v-bind:step="step">
        <po-questionnaire v-bind:step="step" v-if="step.currentPage == 0" />
        <your-information-po v-bind:step="step" v-if="step.currentPage == 1" />
        <protection-from-whom v-bind:step="step" v-if="step.currentPage == 2" />
        <po-filing-location v-bind:step="step" v-if="step.currentPage == 3" />
        <remove-person v-bind:step="step" v-if="step.currentPage == 4" />
        <no-go v-bind:step="step" v-if="step.currentPage == 5" />
        <no-contact v-bind:step="step" v-if="step.currentPage == 6" />
        <weapons-firearms v-bind:step="step" v-if="step.currentPage == 7" />
        <background v-bind:step="step" v-if="step.currentPage == 8" />
        <your-story v-bind:step="step" v-if="step.currentPage == 9" />
        <other-party v-bind:step="step" v-if="step.currentPage == 10" />
        <about v-bind:step="step" v-if="step.currentPage == 11" />
        <urgency v-bind:step="step" v-if="step.currentPage == 12" />
        <review-your-answers v-bind:step="step" v-if="step.currentPage == 13" />
        <preview-forms v-bind:step="step" v-if="step.currentPage == 14" />      
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import PoQuestionnaire from "./PoQuestionnaire.vue";
import YourInformationPo from "./YourInformationPO.vue";
import OtherParty from "./otherPartyComponent/OtherParty.vue";

import ProtectionFromWhom from "./ProtectionFromWhom.vue";
import PoFilingLocation from "./PoFilingLocation.vue";
import RemovePerson from "./safetyNeeds/RemovePerson.vue";
import NoGo from "./safetyNeeds/NoGo.vue";
import NoContact from "./safetyNeeds/NoContact.vue";
import WeaponsFirearms from "./safetyNeeds/WeaponsFirearms.vue";
import Background from "./Background.vue";
import YourStory from "./YourStory.vue";

import About from "./About.vue";
import Urgency from "./Urgency.vue";

import ReviewYourAnswers from "./reviewPo/ReviewYourAnswers.vue"
import PreviewForms from "./reviewPo/PreviewForms.vue"

@Component({
    components:{
        StepBase,
        PoQuestionnaire,        
        YourInformationPo,
        OtherParty,

        ProtectionFromWhom,
        PoFilingLocation,
        RemovePerson,
        NoGo,
        NoContact,
        WeaponsFirearms,
        Background,
        YourStory,

        About,
        Urgency,

        ReviewYourAnswers,
        PreviewForms,
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
