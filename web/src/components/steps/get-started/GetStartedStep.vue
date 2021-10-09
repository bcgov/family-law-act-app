<template>
    <step-base v-bind:step="step">
        <getting-started v-bind:step="step" v-if="step.currentPage == stPgNo.GETSTART.GettingStarted" />        
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
  
import StepBase from "../StepBase.vue";
import GettingStarted from "./GettingStarted.vue";
import { stepInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,
        GettingStarted
    }
})

export default class GetStartedStep extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    forms = []
    selectedForms = []
}
</script>
