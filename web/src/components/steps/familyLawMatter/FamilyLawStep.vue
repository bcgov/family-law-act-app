<template>
    <step-base v-bind:step="step">
        <flm-Questionnaire v-bind:step="step" v-if="step.currentPage == 0"></flm-Questionnaire>
        <flm-background v-bind:step="step" v-if="step.currentPage == 1"></flm-background>
        <children-info v-bind:step="step" v-if="step.currentPage == 2"></children-info>    
        
        
        <parenting-arrangements v-bind:step="step" v-if="step.currentPage == 3"></parenting-arrangements>    
        <parental-responsibilities v-bind:step="step" v-if="step.currentPage == 4"></parental-responsibilities> 
        <parenting-time v-bind:step="step" v-if="step.currentPage == 5"></parenting-time> 
        <parental-arrangements v-bind:step="step" v-if="step.currentPage == 6"></parental-arrangements> 
        
        <parenting-order-agreement v-bind:step="step" v-if="step.currentPage == 7"/>
        <about-parenting-arrangements v-bind:step="step" v-if="step.currentPage == 8"/>
        <parenting-arrangement-changes v-bind:step="step" v-if="step.currentPage == 9"/>
        <best-interests-of-child v-bind:step="step" v-if="step.currentPage == 10"/>

        
        <child-support v-bind:step="step" v-if="step.currentPage == 11"></child-support> 
        <contact-with-child v-bind:step="step" v-if="step.currentPage == 12"></contact-with-child>  
        <guardian-of-child v-bind:step="step" v-if="step.currentPage == 13"></guardian-of-child>  
        <spousal-support v-bind:step="step" v-if="step.currentPage == 14"></spousal-support>   

        <review-your-answers-flm v-bind:step="step" v-if="step.currentPage == 15"/>
        <preview-forms-flm v-bind:step="step" v-if="step.currentPage == 16"/>
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import FlmQuestionnaire from "./FlmQuestionnaire.vue";
import FlmBackground from "./FlmBackground.vue";
import ChildrenInfo from "./childInfo/ChildrenInfo.vue";


import ParentingArrangements from "./parentingArrangements/ParentingArrangements.vue";
import ParentalResponsibilities from "./parentingArrangements/ParentalResponsibilities.vue";
import ParentingTime from "./parentingArrangements/ParentingTime.vue";
import ParentalArrangements from "./parentingArrangements/ParentalArrangements.vue";
import ParentingOrderAgreement from "./parentingArrangements/ParentingOrderAgreement.vue";
import AboutParentingArrangements from "./parentingArrangements/AboutParentingArrangements.vue";
import ParentingArrangementChanges from "./parentingArrangements/ParentingArrangementChanges.vue";
import BestInterestsOfChild from "./parentingArrangements/BestInterestsOfChild.vue";

import ChildSupport from "./childSupport/ChildSupport.vue";

import ContactWithChild from "./contactWithChild/ContactWithChild.vue";

import GuardianOfChild from "./guardianOfChild/GuardianOfChild.vue";

import SpousalSupport from "./spousalSupport/SpousalSupport.vue";

import ReviewYourAnswersFlm from "./reviewFLM/ReviewYourAnswersFLM.vue"
import PreviewFormsFlm from "./reviewFLM/PreviewFormsFLM.vue"


@Component({
    components:{
        StepBase,      
        
        FlmQuestionnaire,
        FlmBackground, 
        ChildrenInfo,

        ParentingArrangements,
        ParentalResponsibilities,
        ParentingTime,
        ParentalArrangements,
        ParentingOrderAgreement,
        AboutParentingArrangements,
        ParentingArrangementChanges,
        BestInterestsOfChild, 
        
        ChildSupport,     
              
        ContactWithChild,

        GuardianOfChild,

        SpousalSupport,

        ReviewYourAnswersFlm,
        PreviewFormsFlm,
    }
})
export default class FamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType | Object

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../../styles/survey";
</style>
