<template>
    <step-base v-bind:step="step">
        <family-law-manual v-bind:step="step" v-if="step.currentPage == stPgNo.RTFLM.FamilyLawManual"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import FamilyLawManual from "./FamilyLawManual.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        FamilyLawManual      
    }
})
export default class FamilyLawManualStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
