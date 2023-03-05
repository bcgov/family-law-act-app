<template>
    <step-base v-bind:step="step">
        <select-activity v-bind:step="step" v-if="step.currentPage == stPgNo.GETSTART.SelectActivity" />
        <reply-to-application v-bind:step="step" v-if="step.currentPage == stPgNo.GETSTART.ReplyToApplication" />
        <getting-started v-bind:step="step" v-if="step.currentPage == stPgNo.GETSTART.GettingStarted" /> 
        <flm-info v-bind:step="step" v-if="step.currentPage == stPgNo.GETSTART.FlmInfo" />        
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
  
import StepBase from "../StepBase.vue";
import GettingStarted from "./GettingStarted.vue";
import FlmInfo from "./FlmInfo.vue";
import SelectActivity from "./SelectActivity.vue";
import ReplyToApplication from "./ReplyToApplication.vue";
import { stepInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,
        SelectActivity,
        ReplyToApplication,
        GettingStarted,
        FlmInfo
    }
})

export default class GetStartedStep extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;   
   
}
</script>