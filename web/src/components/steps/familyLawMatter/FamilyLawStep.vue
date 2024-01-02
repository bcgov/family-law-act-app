<template>
    <step-base v-bind:step="step">
        <flm-Questionnaire v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.FlmQuestionnaire"/>
        <flm-background    v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.FlmBackground"/>
        <children-info     v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ChildrenInfo"/>    
        
        
        <parenting-arrangements        v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ParentingArrangements"/>    
        <parental-responsibilities     v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ParentalResponsibilities"/> 
        <parenting-time                v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ParentingTime"/> 
        <other-parenting-arrangements  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.OtherParentingArrangements"/>         
        <parenting-order-agreement     v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ParentingOrderAgreement"/>
        <about-parenting-arrangements  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutParentingArrangements"/>
        <parenting-arrangement-changes v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ParentingArrangementChanges"/>
        <best-interests-of-child       v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.BestInterestsOfChild"/>

        
        <child-support                      v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ChildSupport"/> 
        <child-support-current-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ChildSupportCurrentArrangements"/> 
        <income-and-earning-potential       v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.IncomeAndEarningPotential"/> 
        <about-child-support-order          v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutChildSupportOrder"/>       
        <child-support-order-agreement      v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ChildSupportOrderAgreement"/>
        <about-existing-child-support       v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutExistingChildSupport"/>        
        <calculating-child-support          v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.CalculatingChildSupport"/>
        <undue-hardship                     v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.UndueHardship"/> 
        <special-and-extraordinary-expenses v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.SpecialAndExtraordinaryExpenses"/> 
        <about-child-support-changes        v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutChildSupportChanges"/> 
        <unpaid-child-support               v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.UnpaidChildSupport"/>


        <contact-with-child                         v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ContactWithChild"/>        
        <contact-with-child-order                   v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ContactWithChildOrder"/>        
        <about-contact-with-child-order             v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutContactWithChildOrder"/>
        <contact-with-child-best-interests-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ContactWithChildBestInterestsOfChild"/>
        
        <guardian-of-child                          v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.GuardianOfChild"/>
        <guardian-of-child-best-interests-of-child  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.GuardianOfChildBestInterestsOfChild"/>
        <indigenous-ancestry-of-child               v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.IndigenousAncestryOfChild"/>

        <spousal-support                              v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.SpousalSupport"/>
        <spousal-support-income-and-earning-potential v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.SpousalSupportIncomeAndEarningPotential"/> 
        <about-spousal-support-order                  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutSpousalSupportOrder"/>
        <existing-spousal-support-order-agreement     v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ExistingSpousalSupportOrderAgreement"/>
        <existing-spousal-support-final-order         v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ExistingSpousalSupportFinalOrder"/>
        <existing-spousal-support-agreement           v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ExistingSpousalSupportAgreement"/>        
        <calculating-spousal-support                  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.CalculatingSpousalSupport"/> 
        <about-existing-spousal-support-order         v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.AboutExistingSpousalSupportOrder"/>
        <unpaid-spousal-support                       v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.UnpaidSpousalSupport"/>

        <property-division-companion-animal           v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.PropertyDivisionCompanionAnimal"/>        
        <companion-animal-facts                       v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.CompanionAnimalFacts"/>
        <companion-animal-existing-agreement          v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.CompanionAnimalExistingAgreement"/>

        <flm-additional-documents v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.FlmAdditionalDocuments"/>
        <review-your-answers-flm  v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.ReviewYourAnswersFLM"/>
        <preview-forms-flm        v-bind:step="step" v-if="step.currentPage == stPgNo.FLM.PreviewFormsFLM"/>
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
import OtherParentingArrangements from "./parentingArrangements/OtherParentingArrangements.vue";
import ParentingOrderAgreement from "./parentingArrangements/ParentingOrderAgreement.vue";
import AboutParentingArrangements from "./parentingArrangements/AboutParentingArrangements.vue";
import ParentingArrangementChanges from "./parentingArrangements/ParentingArrangementChanges.vue";
import BestInterestsOfChild from "./parentingArrangements/BestInterestsOfChild.vue";

import ChildSupport from "./childSupport/ChildSupport.vue";
import ChildSupportCurrentArrangements from "./childSupport/ChildSupportCurrentArrangement.vue"
import IncomeAndEarningPotential from "./childSupport/IncomeAndEarningPotential.vue"
import AboutChildSupportOrder from "./childSupport/AboutChildSupportOrder.vue"
import ChildSupportOrderAgreement from "./childSupport/ChildSupportOrderAgreement.vue"
import AboutExistingChildSupport from "./childSupport/AboutExistingChildSupport.vue"
import CalculatingChildSupport from "./childSupport/CalculatingChildSupport.vue"
import UndueHardship from "./childSupport/UndueHardship.vue"
import SpecialAndExtraordinaryExpenses from "./childSupport/SpecialAndExtraordinaryExpenses.vue"
import AboutChildSupportChanges from "./childSupport/AboutChildSupportChanges.vue"
import UnpaidChildSupport from "./childSupport/UnpaidChildSupport.vue"

import ContactWithChild from "./contactWithChild/ContactWithChild.vue";
import AboutContactWithChildOrder from "./contactWithChild/AboutContactWithChildOrder.vue";
import ContactWithChildOrder from "./contactWithChild/ContactWithChildOrder.vue";
import ContactWithChildBestInterestsOfChild from "./contactWithChild/ContactWithChildBestInterestsOfChild.vue";

import GuardianOfChild from "./guardianOfChild/GuardianOfChild.vue";
import GuardianOfChildBestInterestsOfChild from "./guardianOfChild/GuardianOfChildBestInterestsOfChild.vue";
import IndigenousAncestryOfChild from "./guardianOfChild/IndigenousAncestryOfChild.vue";

import SpousalSupport from "./spousalSupport/SpousalSupport.vue";
import AboutSpousalSupportOrder from "./spousalSupport/AboutSpousalSupportOrder.vue";
import CalculatingSpousalSupport from "./spousalSupport/CalculatingSpousalSupport.vue";
import SpousalSupportIncomeAndEarningPotential from "./spousalSupport/SpousalSupportIncomeAndEarningPotential.vue";
import ExistingSpousalSupportAgreement from "./spousalSupport/ExistingSpousalSupportAgreement.vue";
import ExistingSpousalSupportFinalOrder from "./spousalSupport/ExistingSpousalSupportFinalOrder.vue";
import AboutExistingSpousalSupportOrder from "./spousalSupport/AboutExistingSpousalSupportOrder.vue";
import ExistingSpousalSupportOrderAgreement from "./spousalSupport/ExistingSpousalSupportOrderAgreement.vue";
import UnpaidSpousalSupport from "./spousalSupport/UnpaidSpousalSupport.vue";

import PropertyDivisionCompanionAnimal from "./companionAnimal/PropertyDivisionCompanionAnimal.vue";
import CompanionAnimalFacts from "./companionAnimal/CompanionAnimalFacts.vue";
import CompanionAnimalExistingAgreement from "./companionAnimal/CompanionAnimalExistingAgreement.vue"

import FlmAdditionalDocuments from "./FlmAdditionalDocuments.vue"
import ReviewYourAnswersFlm from "./reviewFLM/ReviewYourAnswersFLM.vue"
import PreviewFormsFlm from "./reviewFLM/PreviewFormsFLM.vue"

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        StepBase,     


        FlmQuestionnaire,
        FlmBackground, 
        ChildrenInfo,


        ParentingArrangements,
        ParentalResponsibilities,
        ParentingTime,
        OtherParentingArrangements,
        ParentingOrderAgreement,
        AboutParentingArrangements,
        ParentingArrangementChanges,
        BestInterestsOfChild, 


        ChildSupport, 
        ChildSupportCurrentArrangements,
        IncomeAndEarningPotential,
        AboutChildSupportOrder,
       
        ChildSupportOrderAgreement,
        AboutExistingChildSupport,
        
        CalculatingChildSupport,
        UndueHardship,
        SpecialAndExtraordinaryExpenses,

        AboutChildSupportChanges,
        UnpaidChildSupport,    
              
        ContactWithChild,
        AboutContactWithChildOrder,
        ContactWithChildOrder,
        ContactWithChildBestInterestsOfChild,

        GuardianOfChild,
        GuardianOfChildBestInterestsOfChild,
        IndigenousAncestryOfChild,

        SpousalSupport,
        AboutSpousalSupportOrder,
        CalculatingSpousalSupport,
        SpousalSupportIncomeAndEarningPotential,
       
        ExistingSpousalSupportAgreement,
        ExistingSpousalSupportFinalOrder,
        AboutExistingSpousalSupportOrder,
        ExistingSpousalSupportOrderAgreement,
        UnpaidSpousalSupport,

        PropertyDivisionCompanionAnimal,
        CompanionAnimalFacts,
        CompanionAnimalExistingAgreement,
        
        FlmAdditionalDocuments,

        ReviewYourAnswersFlm,
        PreviewFormsFlm,
    }
})
export default class FamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
