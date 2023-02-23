<template>
    <step-base v-bind:step="step">        
        <filing-options    v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.FilingOptions"/>
        <review-and-print  v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.ReviewAndPrint"/>
        <review-and-save   v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.ReviewAndSave"/>
        <review-and-submit v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.ReviewAndSubmit"/>
        <standalone-efile  v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.StandaloneEfile"/>
        <next-steps        v-bind:step="step"  v-if="step.currentPage == stPgNo.SUBMIT.NextSteps"/>
    </step-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    
    import { stepInfoType } from "@/types/Application";
    import StepBase from "@/components/steps/StepBase.vue";
    
    import FilingOptions from "./FilingOptions.vue";
    import ReviewAndPrint from "./ReviewAndPrint.vue";
    import ReviewAndSave from "./ReviewAndSave.vue";
    import ReviewAndSubmit from "./ReviewAndSubmit.vue";
    import StandaloneEfile from "./StandaloneEfile.vue";
    import NextSteps from "./NextSteps.vue";

    import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

    import { namespace } from "vuex-class";   
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    @Component({
        components:{
            StepBase,
            FilingOptions,
            ReviewAndPrint,
            ReviewAndSave,
            ReviewAndSubmit,
            StandaloneEfile,
            NextSteps
        }
    })

    export default class StepSubmit extends Vue {
        
        @Prop({required: true})
        step!: stepInfoType;

        @applicationState.State
        public stPgNo!: stepsAndPagesNumberInfoType;

        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/survey";
</style>
