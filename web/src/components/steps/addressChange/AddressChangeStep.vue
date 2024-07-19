<template>
    <step-base v-bind:step="step">        
        <address-change           v-bind:step="step"     v-if="step.currentPage == stPgNo.NCD.AddressChange" />
        <other-party              v-bind:step="step"     v-if="step.currentPage == stPgNo.NCD.OtherParty" />
        <address-change-notice    v-bind:step="step"     v-if="step.currentPage == stPgNo.NCD.AddressChangeNotice" />
        <review-your-answers-ncd  v-bind:step="step"     v-if="step.currentPage == stPgNo.NCD.ReviewYourAnswersNCD"/>
        <preview-forms-ncd        v-bind:step="step"     v-if="step.currentPage == stPgNo.NCD.PreviewFormsNCD"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import AddressChange from "./AddressChange.vue";
import AddressChangeNotice from "./AddressChangeNotice.vue";
import ReviewYourAnswersNcd from "./reviewNCD/ReviewYourAnswersNCD.vue";
import PreviewFormsNcd from "./reviewNCD/PreviewFormsNCD.vue";
import OtherParty from "./OtherParty.vue";

import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        StepBase,        
        AddressChange,       
        OtherParty,
        AddressChangeNotice,
        ReviewYourAnswersNcd,
        PreviewFormsNcd        
    }
})
export default class AddressChangeStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}
</script>
