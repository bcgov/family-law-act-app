<template>
    <step-base v-bind:step="step">
        <reply-to-flm-application v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyToFlmApplication"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import ReplyToFlmApplication from "./ReplyToFlmApplication.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        ReplyToFlmApplication      
    }
})
export default class ReplyFamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
