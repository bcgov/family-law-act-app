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
        
        <reply-new-property-division               v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyNewPropertyDivision"/>        
        <animal-relationship-to-other-party        v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.AnimalRelationshipToOtherParty"/>
        <disagree-property-division                v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreePropertyDivision"/>
        <property-division-order                   v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.PropertyDivisionOrder"/>
        <reply-existing-property-division          v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReplyExistingPropertyDivision"/>
        <disagree-existing-property-division-order v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.DisagreeExistingPropertyDivisionOrder"/>
        
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

        <property-division-companion-animal           v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.PropertyDivisionCompanionAnimal"/>        
        <companion-animal-facts                       v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.CompanionAnimalFacts"/>
        <companion-animal-existing-agreement          v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.CompanionAnimalExistingAgreement"/>

        <flm-additional-documents v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.FlmAdditionalDocuments"/>


        <review-your-answers-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.ReviewYourAnswersRFLM"/>
        <preview-forms-r-f-l-m v-bind:step="step" v-if="step.currentPage == stPgNo.RFLM.PreviewFormsRFLM"/> 
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

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

import ReplyNewPropertyDivision from "./companionAnimal/ReplyNewPropertyDivision.vue";
import AnimalRelationshipToOtherParty from "./companionAnimal/AnimalRelationshipToOtherParty.vue";
import DisagreePropertyDivision from "./companionAnimal/DisagreePropertyDivision.vue";
import PropertyDivisionOrder from "./companionAnimal/PropertyDivisionOrder.vue";
import ReplyExistingPropertyDivision from "./companionAnimal/ReplyExistingPropertyDivision.vue";
import DisagreeExistingPropertyDivisionOrder from "./companionAnimal/DisagreeExistingPropertyDivisionOrder.vue";
import YourApplication from './YourApplication.vue';

import ParentingArrangements from "./counterFlm/parentingArrangements/ParentingArrangements.vue";
import ParentalResponsibilities from "./counterFlm/parentingArrangements/ParentalResponsibilities.vue";
import ParentingTime from "./counterFlm/parentingArrangements/ParentingTime.vue";
import OtherParentingArrangements from "./counterFlm/parentingArrangements/OtherParentingArrangements.vue";
import ParentingOrderAgreement from "./counterFlm/parentingArrangements/ParentingOrderAgreement.vue";
import AboutParentingArrangements from "./counterFlm/parentingArrangements/AboutParentingArrangements.vue";
import ParentingArrangementChanges from "./counterFlm/parentingArrangements/ParentingArrangementChanges.vue";
import BestInterestsOfChild from "./counterFlm/parentingArrangements/BestInterestsOfChild.vue";

import ChildSupport from "./counterFlm/childSupport/ChildSupport.vue";
import ChildSupportCurrentArrangements from "./counterFlm/childSupport/ChildSupportCurrentArrangement.vue"
import IncomeAndEarningPotential from "./counterFlm/childSupport/IncomeAndEarningPotential.vue"
import AboutChildSupportOrder from "./counterFlm/childSupport/AboutChildSupportOrder.vue"
import ChildSupportOrderAgreement from "./counterFlm/childSupport/ChildSupportOrderAgreement.vue"
import AboutExistingChildSupport from "./counterFlm/childSupport/AboutExistingChildSupport.vue"
import CalculatingChildSupport from "./counterFlm/childSupport/CalculatingChildSupport.vue"
import UndueHardship from "./counterFlm/childSupport/UndueHardship.vue"
import SpecialAndExtraordinaryExpenses from "./counterFlm/childSupport/SpecialAndExtraordinaryExpenses.vue"
import AboutChildSupportChanges from "./counterFlm/childSupport/AboutChildSupportChanges.vue"
import UnpaidChildSupport from "./counterFlm/childSupport/UnpaidChildSupport.vue"

import ContactWithChild from "./counterFlm/contactWithChild/ContactWithChild.vue";
import AboutContactWithChildOrder from "./counterFlm/contactWithChild/AboutContactWithChildOrder.vue";
import ContactWithChildOrder from "./counterFlm/contactWithChild/ContactWithChildOrder.vue";
import ContactWithChildBestInterestsOfChild from "./counterFlm/contactWithChild/ContactWithChildBestInterestsOfChild.vue";

import GuardianOfChild from "./counterFlm/guardianOfChild/GuardianOfChild.vue";
import GuardianOfChildBestInterestsOfChild from "./counterFlm/guardianOfChild/GuardianOfChildBestInterestsOfChild.vue";
import IndigenousAncestryOfChild from "./counterFlm/guardianOfChild/IndigenousAncestryOfChild.vue";

import SpousalSupport from "./counterFlm/spousalSupport/SpousalSupport.vue";
import AboutSpousalSupportOrder from "./counterFlm/spousalSupport/AboutSpousalSupportOrder.vue";
import CalculatingSpousalSupport from "./counterFlm/spousalSupport/CalculatingSpousalSupport.vue";
import SpousalSupportIncomeAndEarningPotential from "./counterFlm/spousalSupport/SpousalSupportIncomeAndEarningPotential.vue";
import ExistingSpousalSupportAgreement from "./counterFlm/spousalSupport/ExistingSpousalSupportAgreement.vue";
import ExistingSpousalSupportFinalOrder from "./counterFlm/spousalSupport/ExistingSpousalSupportFinalOrder.vue";
import AboutExistingSpousalSupportOrder from "./counterFlm/spousalSupport/AboutExistingSpousalSupportOrder.vue";
import ExistingSpousalSupportOrderAgreement from "./counterFlm/spousalSupport/ExistingSpousalSupportOrderAgreement.vue";
import UnpaidSpousalSupport from "./counterFlm/spousalSupport/UnpaidSpousalSupport.vue";

import PropertyDivisionCompanionAnimal from "./counterFlm/companionAnimal/PropertyDivisionCompanionAnimal.vue";
import CompanionAnimalFacts from "./counterFlm/companionAnimal/CompanionAnimalFacts.vue";
import CompanionAnimalExistingAgreement from "./counterFlm/companionAnimal/CompanionAnimalExistingAgreement.vue"

import FlmAdditionalDocuments from "./FlmAdditionalDocuments.vue";

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
        YourApplication,
        ReplyNewPropertyDivision,
        AnimalRelationshipToOtherParty,
        DisagreePropertyDivision,
        PropertyDivisionOrder,
        ReplyExistingPropertyDivision,
        DisagreeExistingPropertyDivisionOrder,
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

        ReviewYourAnswersRFLM,
        PreviewFormsRFLM  
    }
})
export default class ReplyFamilyLawStep extends Vue {

    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public rflmRequiredDocsRequests!: any[];

     @applicationState.State
    public rflmRequiredDocsRequestsUpdateCounter!: number;


    showRequiredDocumentsPage = false

    @Watch('rflmRequiredDocsRequestsUpdateCounter')
    evaluateRequiredDocumentsPage(){
       
        const requiredDocsStep =  this.stPgNo.RFLM._StepNo
        const requiredDocsPage =  this.stPgNo.RFLM.FlmAdditionalDocuments

        for(const request of this.rflmRequiredDocsRequests){
            const pageActive = (request.step==0 &&request.page==0)? true: this.$store.state.Application.steps[request.step].pages[request.page].active
            if(request.toggle && pageActive){
                
                this.$store.commit("Application/setPageActive", {currentStep: requiredDocsStep, currentPage: requiredDocsPage, active: true }); 
                if(  (this.$store.state.Application.steps[requiredDocsStep].currentPage<requiredDocsPage)
                  && (this.$store.state.Application.steps[requiredDocsStep].pages[requiredDocsPage].progress==100)){
                        Vue.filter('setSurveyProgress')(null, requiredDocsStep, requiredDocsPage, 50, false);
                }

                return
            }
        }
        this.$store.commit("Application/setPageActive", {currentStep: requiredDocsStep, currentPage: requiredDocsPage, active: false }); 
                
    }

}

</script>
