<template>
    <div class="fill-body" id="flapp-surveys">
        <main class="app-content">
            <navigation-sidebar />
            <get-started v-if="getCurrentStepIndex() == 0" v-bind:step="getStep(0)"></get-started>
            <common-information v-if="getCurrentStepIndex() == 1" v-bind:step="getStep(1)"></common-information>
            <protection-order v-if="getCurrentStepIndex() == 2" v-bind:step="getStep(2)"></protection-order>
            <family-law v-if="getCurrentStepIndex() == 3" v-bind:step="getStep(3)"></family-law>
            <case-management v-if="getCurrentStepIndex() == 4" v-bind:step="getStep(4)"></case-management>
            <parenting-priority v-if="getCurrentStepIndex() == 5" v-bind:step="getStep(5)"></parenting-priority>
            <child-relocation v-if="getCurrentStepIndex() == 6" v-bind:step="getStep(6)"></child-relocation>
            <enforcement-agree v-if="getCurrentStepIndex() == 7" v-bind:step="getStep(7)"></enforcement-agree>
        
            <submit v-if="getCurrentStepIndex() == 8" v-bind:step="getStep(8)"></submit>
    
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import NavigationSidebar from "./NavigationSidebar.vue";
import CommonInformation from "./steps/common-information/CommonInformationStep.vue";
import ProtectionOrder from "./steps/protectionOrder/StepProtectionOrder.vue";
import Submit from "./steps/submit/StepSubmit.vue";
import FamilyLaw from "./steps/familyLawMatter/FamilyLawStep.vue";
import ParentingPriority from "./steps/priotityParenting/ParentingPriorityStep.vue";
import CaseManagement from "./steps/caseMgmt/CaseManagementStep.vue";
import ChildRelocation from "./steps/childReloc/ChildRelocationStep.vue";
import EnforcementAgree from "./steps/agreementEnfrc/EnforcementAgreeStep.vue";
import GetStarted from "./steps/get-started/GetStartedStep.vue";
import * as surveyEnv from "@/components/survey/survey-glossary.ts"
@Component({
    components: {
        NavigationSidebar,
        ProtectionOrder,
        CommonInformation,
        Submit,
        FamilyLaw,
        ParentingPriority,
        CaseManagement,
        ChildRelocation,
        EnforcementAgree,
        GetStarted
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
        const step = this.$store.state.Application.steps[stepIndex];
        return step;
    }

};
</script>
