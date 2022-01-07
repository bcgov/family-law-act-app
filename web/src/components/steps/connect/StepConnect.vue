<template>
    <step-base v-bind:step="step"> 
        <review-and-connect  v-bind:step="step"  v-if="step.currentPage == stPgNo.CONNECT.ReviewAndConnect"/>
    </step-base>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    
    import { stepInfoType } from "@/types/Application";
    import StepBase from "@/components/steps/StepBase.vue";
    
    import ReviewAndConnect from "./ReviewAndConnect.vue";

    import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

    import { namespace } from "vuex-class";   
    import "@/store/modules/application";
    const applicationState = namespace("Application");

    @Component({
        components:{
            StepBase,
            ReviewAndConnect
        }
    })

    export default class StepConnect extends Vue {
        
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
