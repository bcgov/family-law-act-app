<template>
    <step-base v-bind:step="step">
        <filing-options v-bind:step="step" v-if="step.currentPage == 0"/>
        <review-and-print v-bind:step="step" v-if="step.currentPage == 1"/>
        <review-and-save v-bind:step="step" v-if="step.currentPage == 2"/>
        <next-steps v-bind:step="step" v-if="step.currentPage == 3"/>
    </step-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    
    import { Step } from "@/types/models/step";
    import StepBase from "../StepBase.vue";
    import NextSteps from "./NextSteps.vue";
    import FilingOptions from "./FilingOptions.vue"

    import ReviewAndPrint from "./ReviewAndPrint.vue"
    import ReviewAndSave from "./ReviewAndSave.vue"

    @Component({
        components:{
            StepBase,
            FilingOptions,
            ReviewAndPrint,
            ReviewAndSave,
            NextSteps
        }
    })

    export default class submit extends Vue {
        
        @Prop({required: true})
        step!: Step;
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../styles/survey";
</style>
