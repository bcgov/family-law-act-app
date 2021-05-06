<template>
    <step-base v-bind:step="step">        
        <filing-options v-bind:step="step" v-if="step.currentPage == 0"/>
        <review-and-print v-bind:step="step" v-if="step.currentPage == 1"/>
        <review-and-save v-bind:step="step" v-if="step.currentPage == 2"/>
        <review-and-submit v-bind:step="step" v-if="step.currentPage == 3"/>
        <next-steps v-bind:step="step" v-if="step.currentPage == 4"/>
    </step-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    
    import { stepInfoType } from "@/types/Application";
    import StepBase from "@/components/steps/StepBase.vue";
    
    import FilingOptions from "./FilingOptions.vue"
    import ReviewAndPrint from "./ReviewAndPrint.vue"
    import ReviewAndSave from "./ReviewAndSave.vue"
    import ReviewAndSubmit from "./ReviewAndSubmit.vue"
    import NextSteps from "./NextSteps.vue";

    @Component({
        components:{
            StepBase,
            FilingOptions,
            ReviewAndPrint,
            ReviewAndSave,
            ReviewAndSubmit,
            NextSteps
        }
    })

    export default class submit extends Vue {
        
        @Prop({required: true})
        step!: stepInfoType;
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
