<template>
    <step-base v-bind:step="step">
        <review-your-answers v-bind:step="step" v-if="step.currentPage == 0"/>
        <filing-options v-bind:step="step" v-if="step.currentPage == 1"/>
        <review-and-print v-bind:step="step" v-if="step.currentPage == 2"/>
        <review-and-save v-bind:step="step" v-if="step.currentPage == 3"/>
        <review-and-submit v-bind:step="step" v-if="step.currentPage == 4"/>
        <next-steps v-bind:step="step" v-if="step.currentPage == 5"/>
    </step-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    
    import { stepInfoType } from "@/types/Application";
    import StepBase from "../StepBase.vue";
    import NextSteps from "./NextSteps.vue";
    import FilingOptions from "./FilingOptions.vue"

    import ReviewAndPrint from "./ReviewAndPrint.vue"
    import ReviewAndSave from "./ReviewAndSave.vue"
    import ReviewAndSubmit from "./ReviewAndSubmit.vue"
    import ReviewYourAnswers from "./ReviewYourAnswers.vue"

    @Component({
        components:{
            StepBase,
            ReviewYourAnswers,
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
