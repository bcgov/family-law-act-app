<template>
    <step-base v-bind:step="step">
        <rflm-questionnaire v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmQuestionnaire"/>
        <rflm-counter-app v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmCounterApp"/>
        <rflm-background v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmBackground"/>
        <rflm-children-info v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmChildrenInfo"/>

        <reply-new-parenting-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentingArrangements"/>
        <reply-new-parental-responsibilities v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentalResponsibilities"/>
        <reply-new-parenting-time v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewParentingTime"/>
        <reply-new-conditions-parenting-time v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewConditionsParentingTime"/>
        <reply-existing-parenting-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingParentingArrangements"/>

        <reply-new-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewChildSupport"/>
        <relationship-to-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RelationshipToChild"/>
        <disagree-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeChildSupport"/>
        
        <reply-existing-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingChildSupport"/>
        <rflm-unpaid-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmUnpaidChildSupport"/>
        <disagree-existing-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeExistingChildSupport"/>
        
        <rflm-calculating-child-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmCalculatingChildSupport"/>

        <reply-new-contact-with-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewContactWithChild"/>
        <disagree-contact-with-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeContactWithChild"/>

        <reply-existing-contact-with-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingContactWithChild"/>

        <reply-appointing-guardian-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyAppointingGuardianOfChild"/>
        <disagree-appointing-guardian-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeAppointingGuardianOfChild"/>

        <reply-cancelling-guardian-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyCancellingGuardianOfChild"/>
        <disagree-cancelling-guardian-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeCancellingGuardianOfChild"/>

        <reply-new-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewSpouseSupport"/>
        <relationship-to-other-party v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RelationshipToOtherParty"/>
        <disagree-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeSpouseSupport"/>        
        <rflm-spouse-support-order v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmSpouseSupportOrder"/>
        
        <reply-existing-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingSpouseSupport"/>
        <rflm-unpaid-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmUnpaidSpouseSupport"/>
        <disagree-existing-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeExistingSpouseSupport"/>
        
        <rflm-calculating-spouse-support v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmCalculatingSpouseSupport"/>
       
        <rflm-additional-documents v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.RflmAdditionalDocuments"/>

        <your-application v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.YourApplication"/>

        <parenting-arrangements        v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ParentingArrangements"/>    
        <parental-responsibilities     v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ParentalResponsibilities"/> 
        <parenting-time                v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ParentingTime"/> 
        <other-parenting-arrangements  v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.OtherParentingArrangements"/>         
        <parenting-order-agreement     v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ParentingOrderAgreement"/>
        <about-parenting-arrangements  v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutParentingArrangements"/>
        <parenting-arrangement-changes v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ParentingArrangementChanges"/>
        <best-interests-of-child       v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.BestInterestsOfChild"/>

        
        <child-support                      v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ChildSupport"/> 
        <child-support-current-arrangements v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ChildSupportCurrentArrangements"/> 
        <income-and-earning-potential       v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.IncomeAndEarningPotential"/> 
        <about-child-support-order          v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutChildSupportOrder"/>       
        <child-support-order-agreement      v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ChildSupportOrderAgreement"/>
        <about-existing-child-support       v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutExistingChildSupport"/>        
        <calculating-child-support          v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.CalculatingChildSupport"/>
        <undue-hardship                     v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.UndueHardship"/> 
        <special-and-extraordinary-expenses v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.SpecialAndExtraordinaryExpenses"/> 
        <about-child-support-changes        v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutChildSupportChanges"/> 
        <unpaid-child-support               v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.UnpaidChildSupport"/>


        <contact-with-child                         v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ContactWithChild"/>        
        <contact-with-child-order                   v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ContactWithChildOrder"/>        
        <about-contact-with-child-order             v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutContactWithChildOrder"/>
        <contact-with-child-best-interests-of-child v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ContactWithChildBestInterestsOfChild"/>
        
        <guardian-of-child                          v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.GuardianOfChild"/>
        <guardian-of-child-best-interests-of-child  v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.GuardianOfChildBestInterestsOfChild"/>
        <indigenous-ancestry-of-child               v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.IndigenousAncestryOfChild"/>

        <spousal-support                              v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.SpousalSupport"/>
        <spousal-support-income-and-earning-potential v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.SpousalSupportIncomeAndEarningPotential"/> 
        <about-spousal-support-order                  v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutSpousalSupportOrder"/>
        <existing-spousal-support-order-agreement     v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ExistingSpousalSupportOrderAgreement"/>
        <existing-spousal-support-final-order         v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ExistingSpousalSupportFinalOrder"/>
        <existing-spousal-support-agreement           v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ExistingSpousalSupportAgreement"/>        
        <calculating-spousal-support                  v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.CalculatingSpousalSupport"/> 
        <about-existing-spousal-support-order         v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AboutExistingSpousalSupportOrder"/>
        <unpaid-spousal-support                       v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.UnpaidSpousalSupport"/>

        <flm-additional-documents v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.FlmAdditionalDocuments"/>


        <review-your-answers-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReviewYourAnswersRFLM"/>
        <preview-forms-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.PreviewFormsRFLM"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import StepBase from "../StepBase.vue";
import RflmQuestionnaire from "./RflmQuestionnaire.vue";
import RflmCounterApp from "./RflmCounterApp.vue";
import RflmBackground from "./RflmBackground.vue";
import RflmChildrenInfo from "./childInfo/RflmChildrenInfo.vue";

import ReplyNewParentingArrangements from "./parentingArrangements/ReplyNewParentingArrangements.vue";
import ReplyNewParentalResponsibilities from "./parentingArrangements/ReplyNewParentalResponsibilities.vue";

import ReplyNewParentingTime from "./parentingArrangements/ReplyNewParentingTime.vue";
import ReplyNewConditionsParentingTime from "./parentingArrangements/ReplyNewConditionsParentingTime.vue";

import ReplyExistingParentingArrangements from "./parentingArrangements/ReplyExistingParentingArrangements.vue";

import ReplyNewChildSupport from "./childSupport/ReplyNewChildSupport.vue";
import RelationshipToChild from "./childSupport/RelationshipToChild.vue";
import DisagreeChildSupport from "./childSupport/DisagreeChildSupport.vue";

import ReplyExistingChildSupport from "./childSupport/ReplyExistingChildSupport.vue";
import RflmUnpaidChildSupport from "./childSupport/RflmUnpaidChildSupport.vue";
import DisagreeExistingChildSupport from "./childSupport/DisagreeExistingChildSupport.vue";

import RflmCalculatingChildSupport from "./childSupport/RflmCalculatingChildSupport.vue";

import ReplyNewContactWithChild from "./contactWithChild/ReplyNewContactWithChild.vue";
import DisagreeContactWithChild from "./contactWithChild/DisagreeContactWithChild.vue";

import ReplyExistingContactWithChild from "./contactWithChild/ReplyExistingContactWithChild.vue";

import ReplyAppointingGuardianOfChild from "./guardianOfChild/ReplyAppointingGuardianOfChild.vue";
import DisagreeAppointingGuardianOfChild from "./guardianOfChild/DisagreeAppointingGuardianOfChild.vue";

import ReplyCancellingGuardianOfChild from "./guardianOfChild/ReplyCancellingGuardianOfChild.vue";
import DisagreeCancellingGuardianOfChild from "./guardianOfChild/DisagreeCancellingGuardianOfChild.vue";

import ReplyNewSpouseSupport from "./spouseSupport/ReplyNewSpouseSupport.vue";
import RelationshipToOtherParty from "./spouseSupport/RelationshipToOtherParty.vue";
import DisagreeSpouseSupport from "./spouseSupport/DisagreeSpouseSupport.vue";
import RflmSpouseSupportOrder from "./spouseSupport/RflmSpouseSupportOrder.vue";
import RflmCalculatingSpouseSupport from "./spouseSupport/RflmCalculatingSpouseSupport.vue";

import ReplyExistingSpouseSupport from "./spouseSupport/ReplyExistingSpouseSupport.vue";
import RflmUnpaidSpouseSupport from "./spouseSupport/RflmUnpaidSpouseSupport.vue";
import DisagreeExistingSpouseSupport from "./spouseSupport/DisagreeExistingSpouseSupport.vue";

import RflmAdditionalDocuments from "./RflmAdditionalDocuments.vue";

import YourApplication from './YourApplication.vue';


import ParentingArrangements from "../familyLawMatter/parentingArrangements/ParentingArrangements.vue";
import ParentalResponsibilities from "../familyLawMatter/parentingArrangements/ParentalResponsibilities.vue";
import ParentingTime from "../familyLawMatter/parentingArrangements/ParentingTime.vue";
import OtherParentingArrangements from "../familyLawMatter/parentingArrangements/OtherParentingArrangements.vue";
import ParentingOrderAgreement from "../familyLawMatter/parentingArrangements/ParentingOrderAgreement.vue";
import AboutParentingArrangements from "../familyLawMatter/parentingArrangements/AboutParentingArrangements.vue";
import ParentingArrangementChanges from "../familyLawMatter/parentingArrangements/ParentingArrangementChanges.vue";
import BestInterestsOfChild from "../familyLawMatter/parentingArrangements/BestInterestsOfChild.vue";

import ChildSupport from "../familyLawMatter/childSupport/ChildSupport.vue";
import ChildSupportCurrentArrangements from "../familyLawMatter/childSupport/ChildSupportCurrentArrangement.vue"
import IncomeAndEarningPotential from "../familyLawMatter/childSupport/IncomeAndEarningPotential.vue"
import AboutChildSupportOrder from "../familyLawMatter/childSupport/AboutChildSupportOrder.vue"
import ChildSupportOrderAgreement from "../familyLawMatter/childSupport/ChildSupportOrderAgreement.vue"
import AboutExistingChildSupport from "../familyLawMatter/childSupport/AboutExistingChildSupport.vue"
import CalculatingChildSupport from "../familyLawMatter/childSupport/CalculatingChildSupport.vue"
import UndueHardship from "../familyLawMatter/childSupport/UndueHardship.vue"
import SpecialAndExtraordinaryExpenses from "../familyLawMatter/childSupport/SpecialAndExtraordinaryExpenses.vue"
import AboutChildSupportChanges from "../familyLawMatter/childSupport/AboutChildSupportChanges.vue"
import UnpaidChildSupport from "../familyLawMatter/childSupport/UnpaidChildSupport.vue"

import ContactWithChild from "../familyLawMatter/contactWithChild/ContactWithChild.vue";
import AboutContactWithChildOrder from "../familyLawMatter/contactWithChild/AboutContactWithChildOrder.vue";
import ContactWithChildOrder from "../familyLawMatter/contactWithChild/ContactWithChildOrder.vue";
import ContactWithChildBestInterestsOfChild from "../familyLawMatter/contactWithChild/ContactWithChildBestInterestsOfChild.vue";

import GuardianOfChild from "../familyLawMatter/guardianOfChild/GuardianOfChild.vue";
import GuardianOfChildBestInterestsOfChild from "../familyLawMatter/guardianOfChild/GuardianOfChildBestInterestsOfChild.vue";
import IndigenousAncestryOfChild from "../familyLawMatter/guardianOfChild/IndigenousAncestryOfChild.vue";

import SpousalSupport from "../familyLawMatter/spousalSupport/SpousalSupport.vue";
import AboutSpousalSupportOrder from "../familyLawMatter/spousalSupport/AboutSpousalSupportOrder.vue";
import CalculatingSpousalSupport from "../familyLawMatter/spousalSupport/CalculatingSpousalSupport.vue";
import SpousalSupportIncomeAndEarningPotential from "../familyLawMatter/spousalSupport/SpousalSupportIncomeAndEarningPotential.vue";
import ExistingSpousalSupportAgreement from "../familyLawMatter/spousalSupport/ExistingSpousalSupportAgreement.vue";
import ExistingSpousalSupportFinalOrder from "../familyLawMatter/spousalSupport/ExistingSpousalSupportFinalOrder.vue";
import AboutExistingSpousalSupportOrder from "../familyLawMatter/spousalSupport/AboutExistingSpousalSupportOrder.vue";
import ExistingSpousalSupportOrderAgreement from "../familyLawMatter/spousalSupport/ExistingSpousalSupportOrderAgreement.vue";
import UnpaidSpousalSupport from "../familyLawMatter/spousalSupport/UnpaidSpousalSupport.vue";

import FlmAdditionalDocuments from "../familyLawMatter/FlmAdditionalDocuments.vue";


import PreviewFormsRFLM from "./reviewRFLM/PreviewFormsRFLM.vue";
import ReviewYourAnswersRFLM from "./reviewRFLM/ReviewYourAnswersRFLM.vue";

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,  
        RflmQuestionnaire,
        RflmCounterApp,
        RflmBackground,
        RflmChildrenInfo,
        ReplyNewParentingArrangements,
        ReplyNewParentalResponsibilities,
        ReplyNewParentingTime,
        ReplyNewConditionsParentingTime,
        ReplyExistingParentingArrangements,
        ReplyNewChildSupport,
        RelationshipToChild,
        DisagreeChildSupport,
        ReplyExistingChildSupport,
        RflmUnpaidChildSupport,
        DisagreeExistingChildSupport,
        RflmCalculatingChildSupport,
        ReplyNewContactWithChild,
        DisagreeContactWithChild,
        ReplyExistingContactWithChild,
        ReplyAppointingGuardianOfChild,
        DisagreeAppointingGuardianOfChild,
        ReplyCancellingGuardianOfChild,
        DisagreeCancellingGuardianOfChild,
        ReplyNewSpouseSupport,
        RelationshipToOtherParty,        
        DisagreeSpouseSupport,
        RflmSpouseSupportOrder,
        RflmCalculatingSpouseSupport, 
        ReplyExistingSpouseSupport,
        RflmUnpaidSpouseSupport,
        DisagreeExistingSpouseSupport,
        RflmAdditionalDocuments,
        YourApplication,

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
        
        FlmAdditionalDocuments,

        ReviewYourAnswersRFLM,
        PreviewFormsRFLM  
    }
})
export default class ReplyFamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

}

</script>
