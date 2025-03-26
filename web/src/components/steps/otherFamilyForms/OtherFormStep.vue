<template>
    <step-base v-bind:step="step">
       
        <other-forms v-bind:step="step" v-if="step.currentPage == stPgNo.OTHER.OtherForms" />
        <complete-other-forms v-bind:step="step" v-if="step.currentPage == stPgNo.OTHER.CompleteOtherForms" />
        <other-form-filing-location v-bind:step="step" v-if="step.currentPage == stPgNo.OTHER.OtherFormsFilingLocation" />
        <last-names-of-parties v-bind:step="step" v-if="step.currentPage == stPgNo.OTHER.LastNamesOfParties" />
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import StepBase from "../StepBase.vue";
import OtherFormFilingLocation from "./OtherFormFilingLocation.vue";
import OtherForms from "./OtherForms.vue";
import CompleteOtherForms from "./CompleteOtherForms.vue";
import LastNamesOfParties from './LastNamesOfParties.vue';

import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,
        OtherFormFilingLocation,
        OtherForms,
        CompleteOtherForms,
        LastNamesOfParties
    }
})

export default class OtherFormStep extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
}
</script>
