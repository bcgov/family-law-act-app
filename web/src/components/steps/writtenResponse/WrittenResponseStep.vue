<template>
    <step-base v-bind:step="step">
        <written-response-application v-bind:step="step" v-if="step.currentPage == stPgNo.WR.WrittenResponseApplication"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import WrittenResponseApplication from "./WrittenResponseApplication.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        WrittenResponseApplication      
    }
})
export default class WrittenResponseStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
