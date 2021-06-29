<template>
    <step-base v-bind:step="step">    
        <ppm-Questionnaire                     v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PpmQuestionnaire"/>
        <priority-parenting-matter-order       v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PriorityParentingMatterOrder"/>
        <ppm-children-info                     v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PpmChildrenInfo"/>  
        <ppm-background                        v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PpmBackground"/>  
        <about-priority-parenting-matter-order v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.AboutPriorityParentingMatterOrder"/>
        <review-your-answers-ppm               v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.ReviewYourAnswersPPM"/>
        <preview-forms-ppm                     v-bind:step="step" v-if="step.currentPage == stPgNo.PPM.PreviewFormsPPM"/>
            
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import PpmQuestionnaire from "./PpmQuestionnaire.vue";
import PriorityParentingMatterOrder from "./PriorityParentingMatterOrder.vue"
import PpmBackground from "./PpmBackground.vue";
import PpmChildrenInfo from "./childInfo/PpmChildrenInfo.vue";
import AboutPriorityParentingMatterOrder from "./AboutPriorityParentingMatterOrder.vue"

import ReviewYourAnswersPpm from "./reviewPPM/ReviewYourAnswersPPM.vue"
import PreviewFormsPpm from "./reviewPPM/PreviewFormsPPM.vue"

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,
        PpmQuestionnaire,
        PriorityParentingMatterOrder,
        PpmBackground, 
        PpmChildrenInfo,
        AboutPriorityParentingMatterOrder,      
        ReviewYourAnswersPpm,
        PreviewFormsPpm
    }
})
export default class ParentingPriorityStep extends Vue {
  
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

};

</script>
