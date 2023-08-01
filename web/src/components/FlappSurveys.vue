<template>
    <div class="fill-body" id="flapp-surveys">
        <main class="app-content">
            <navigation-sidebar />
            <get-started-step v-if="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></get-started-step>
            
            <step-protection-order v-if="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></step-protection-order>
            <common-information-step v-if="getCurrentStepIndex() == 2" v-bind:step="getStep(2)"></common-information-step>
            
            <reply-family-law-step v-if="getCurrentStepIndex() == 3" v-bind:step="getStep(3)"></reply-family-law-step>
            <written-response-step v-if="getCurrentStepIndex() == 4" v-bind:step="getStep(4)"></written-response-step>
            <counter-application-step v-if="getCurrentStepIndex() == 5" v-bind:step="getStep(5)"></counter-application-step>

            <family-law-step v-if="getCurrentStepIndex() == 6" v-bind:step="getStep(6)"></family-law-step>
            <case-management-step v-if="getCurrentStepIndex() == 7" v-bind:step="getStep(7)"></case-management-step>
            <parenting-priority-step v-if="getCurrentStepIndex() == 8" v-bind:step="getStep(8)"></parenting-priority-step>
            <child-relocation-step v-if="getCurrentStepIndex() == 9" v-bind:step="getStep(9)"></child-relocation-step>
            <enforcement-agree-step v-if="getCurrentStepIndex() == 10" v-bind:step="getStep(10)"></enforcement-agree-step>
            <step-connect v-if="getCurrentStepIndex() == 11" v-bind:step="getStep(11)"></step-connect>
            <other-form-step v-if="getCurrentStepIndex() == 12" v-bind:step="getStep(12)"></other-form-step>
            <address-change-step v-if="getCurrentStepIndex() == 13" v-bind:step="getStep(13)"></address-change-step>
            <discontinuance-step v-if="getCurrentStepIndex() == 14" v-bind:step="getStep(14)"></discontinuance-step>
            <intention-proceed-step v-if="getCurrentStepIndex() == 15" v-bind:step="getStep(15)"></intention-proceed-step>

            <electronic-filing-statement-step v-if="getCurrentStepIndex() == 16" v-bind:step="getStep(16)"></electronic-filing-statement-step>
            <step-submit v-if="getCurrentStepIndex() == 17" v-bind:step="getStep(17)"></step-submit>
    
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import NavigationSidebar from "./NavigationSidebar.vue";

import GetStartedStep from "./steps/get-started/GetStartedStep.vue";
import ReplyFamilyLawStep from "./steps/replyFamilyLawMatter/ReplyFamilyLawStep.vue";
import WrittenResponseStep from "./steps/writtenResponse/WrittenResponseStep.vue";
import CounterApplicationStep from "./steps/counterApplication/CounterApplicationStep.vue";
import CommonInformationStep from "./steps/common-information/CommonInformationStep.vue";
import StepProtectionOrder from "./steps/protectionOrder/StepProtectionOrder.vue";
import FamilyLawStep from "./steps/familyLawMatter/FamilyLawStep.vue";
import ParentingPriorityStep from "./steps/priorityParenting/ParentingPriorityStep.vue";
import CaseManagementStep from "./steps/caseMgmt/CaseManagementStep.vue";
import ChildRelocationStep from "./steps/childReloc/ChildRelocationStep.vue";
import EnforcementAgreeStep from "./steps/agreementEnfrc/EnforcementAgreeStep.vue";
import StepConnect from "./steps/connect/StepConnect.vue";
import OtherFormStep from "./steps/otherFamilyForms/OtherFormStep.vue";
import AddressChangeStep from "./steps/addressChange/AddressChangeStep.vue";
import DiscontinuanceStep from "./steps/discontinuance/DiscontinuanceStep.vue";
import IntentionProceedStep from "./steps/intentionProceed/IntentionProceedStep.vue";
import ElectronicFilingStatementStep from "./steps/electronicFilingStatement/ElectronicFilingStatementStep.vue";
import StepSubmit from "./steps/submit/StepSubmit.vue";

import * as surveyEnv from "@/components/survey/survey-glossary";

@Component({
    components: {
        NavigationSidebar,
        StepProtectionOrder,
        CommonInformationStep,
        StepConnect,
        StepSubmit,
        FamilyLawStep,
        ParentingPriorityStep,
        CaseManagementStep,
        ChildRelocationStep,
        EnforcementAgreeStep,
        GetStartedStep,
        ReplyFamilyLawStep,
        WrittenResponseStep,
        CounterApplicationStep,
        OtherFormStep,
        AddressChangeStep,
        DiscontinuanceStep,
        IntentionProceedStep,
        ElectronicFilingStatementStep
    }
})

export default class FlappSurveys extends Vue {
  
    beforeCreate() {    
        surveyEnv.loadGlossary();
    }

    public getCurrentStepIndex() {
        return this.$store.state.Application.currentStep;
    }

    public getStep(stepIndex) {        
        return this.$store.state.Application.steps[stepIndex];
    }

}
</script>
