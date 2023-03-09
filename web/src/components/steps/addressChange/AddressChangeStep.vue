<template>
    <step-base v-bind:step="step">        
        <address-change           v-bind:step="step"     v-if="step.currentPage == stPgNo.NAC.AddressChange" />
        <address-change-notice    v-bind:step="step"     v-if="step.currentPage == stPgNo.NAC.AddressChangeNotice" />
        <review-your-answers-nac  v-bind:step="step"     v-if="step.currentPage == stPgNo.NAC.ReviewYourAnswersNAC"/>
        <preview-forms-nac        v-bind:step="step"     v-if="step.currentPage == stPgNo.NAC.PreviewFormsNAC"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import AddressChange from "./AddressChange.vue";

import AddressChangeNotice from "./AddressChangeNotice.vue";
import { stepInfoType } from "@/types/Application";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,        
        AddressChange,        
        AddressChangeNotice        
    }
})
export default class AddressChangeStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
