<template>
    <step-base v-bind:step="step">
        <po-questionnaire v-bind:step="step"     v-if="step.currentPage == stPgNo.PO.PoQuestionnaire" />
        <your-information-po v-bind:step="step"  v-if="step.currentPage == stPgNo.PO.YourinformationPO" />
        <protection-from-whom v-bind:step="step" v-if="step.currentPage == stPgNo.PO.ProtectionFromWhom" />
        <po-filing-location v-bind:step="step"   v-if="step.currentPage == stPgNo.PO.PoFilingLocation" />
        <remove-person v-bind:step="step"        v-if="step.currentPage == stPgNo.PO.RemovePerson" />
        <no-go v-bind:step="step"                v-if="step.currentPage == stPgNo.PO.NoGo" />
        <no-contact v-bind:step="step"           v-if="step.currentPage == stPgNo.PO.NoContact" />
        <weapons-firearms v-bind:step="step"     v-if="step.currentPage == stPgNo.PO.WeaponsFirearms" />
        <background v-bind:step="step"           v-if="step.currentPage == stPgNo.PO.Background" />
        <your-story v-bind:step="step"           v-if="step.currentPage == stPgNo.PO.YourStory" />
        <other-party v-bind:step="step"          v-if="step.currentPage == stPgNo.PO.OtherParty" />
        <about v-bind:step="step"                v-if="step.currentPage == stPgNo.PO.About" />
        <urgency v-bind:step="step"              v-if="step.currentPage == stPgNo.PO.Urgency" />
        <review-your-answers v-bind:step="step"  v-if="step.currentPage == stPgNo.PO.ReviewYourAnswers" />
        <preview-forms v-bind:step="step"        v-if="step.currentPage == stPgNo.PO.PreviewForms" />      
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

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

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

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
}
</script>
