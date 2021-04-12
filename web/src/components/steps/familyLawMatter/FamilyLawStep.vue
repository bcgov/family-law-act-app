<template>
    <step-base v-bind:step="step">
        <flm-Questionnaire v-bind:step="step" v-if="step.currentPage == 0"></flm-Questionnaire>
        <flm-background v-bind:step="step" v-if="step.currentPage == 1"></flm-background>
        <children-info v-bind:step="step" v-if="step.currentPage == 2"></children-info>    
        <parenting-arrangements v-bind:step="step" v-if="step.currentPage == 3"></parenting-arrangements>    
        <parental-responsibilities v-bind:step="step" v-if="step.currentPage == 4"></parental-responsibilities> 
        <parenting-time v-bind:step="step" v-if="step.currentPage == 5"></parenting-time> 
        <parental-arrangements v-bind:step="step" v-if="step.currentPage == 6"></parental-arrangements> 
        <best-interests-of-child v-bind:step="step" v-if="step.currentPage == 7"></best-interests-of-child>
        <child-support v-bind:step="step" v-if="step.currentPage == 8"></child-support> 
        <contact-with-child v-bind:step="step" v-if="step.currentPage == 9"></contact-with-child>  
        <guardian-of-child v-bind:step="step" v-if="step.currentPage == 10"></guardian-of-child>  
        <spousal-support v-bind:step="step" v-if="step.currentPage == 11"></spousal-support>   
        <family-form v-bind:step="step" v-if="step.currentPage == 12"></family-form>
        <review-your-answers-flm v-bind:step="step" v-if="step.currentPage == 13"/>
        <preview-forms-flm v-bind:step="step" v-if="step.currentPage == 14"/>
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import FlmQuestionnaire from "./FlmQuestionnaire.vue";
import FlmBackground from "./FlmBackground.vue";
import ChildrenInfo from "./childComponent/ChildrenInfo.vue";
import ParentingArrangements from "./parentingArrangements/ParentingArrangements.vue";
import ParentalResponsibilities from "./parentingArrangements/ParentalResponsibilities.vue";
import ParentingTime from "./parentingArrangements/ParentingTime.vue";
import ParentalArrangements from "./parentingArrangements/ParentalArrangements.vue";
import BestInterestsOfChild from "./parentingArrangements/BestInterestsOfChild.vue";
import ChildSupport from "./ChildSupport.vue";
import ContactWithChild from "./ContactWithChild.vue";
import GuardianOfChild from "./GuardianOfChild.vue";
import SpousalSupport from "./SpousalSupport.vue";
import FamilyForm  from "./FamilyForm.vue"

import ReviewYourAnswersFlm from "./reviewFLM/ReviewYourAnswersFLM.vue"
import PreviewFormsFlm from "./reviewFLM/PreviewFormsFLM.vue"


@Component({
    components:{
        StepBase,      
        FlmQuestionnaire,
        ChildSupport,     
        FlmBackground,      
        ChildrenInfo,
        ParentingArrangements,
        ParentalResponsibilities,
        ParentingTime,
        ParentalArrangements,
        BestInterestsOfChild,       
        ContactWithChild,
        GuardianOfChild,
        SpousalSupport,    
        FamilyForm,
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
