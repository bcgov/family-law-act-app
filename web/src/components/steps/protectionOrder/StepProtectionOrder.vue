<template>
  <step-base v-bind:step="step">
    <protection-fromWhom v-bind:step="step" v-if="step.currentPage == 0"></protection-fromWhom>
    <remove-person v-bind:step="step" v-if="step.currentPage == 1"></remove-person>
    <no-go v-bind:step="step" v-if="step.currentPage == 2"></no-go>
    <no-contact v-bind:step="step" v-if="step.currentPage == 3"></no-contact>
    <weapons-firearms v-bind:step="step" v-if="step.currentPage == 4"></weapons-firearms>
    <background v-bind:step="step" v-if="step.currentPage == 5"></background>
    <your-story v-bind:step="step" v-if="step.currentPage == 6"></your-story>
    <about v-bind:step="step" v-if="step.currentPage == 7"></about>
    <urgency v-bind:step="step" v-if="step.currentPage == 8"></urgency>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";
import ProtectionFromWhom from "./ProtectionFromWhom.vue";
import Background from "./Background.vue";
import YourStory from "./YourStory.vue";
import Urgency from "./Urgency.vue";
import NoGo from "./safetyNeeds/NoGo.vue";
import RemovePerson from "./safetyNeeds/RemovePerson.vue";
import NoContact from "./safetyNeeds/NoContact.vue";
import WeaponsFirearms from "./safetyNeeds/WeaponsFirearms.vue";
import About from "./About.vue";

@Component({
    components:{
        StepBase,
        ProtectionFromWhom,
        Background,
        YourStory,
        Urgency,
        NoGo,
        RemovePerson,
        NoContact,
        WeaponsFirearms,
        About
    }
})

export default class ProtectionOrder extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    // @Watch('pageIndex')
    // pageIndexChange(newVal) 
    // {
    //     this.survey.currentPageNo = newVal;        
    // }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
