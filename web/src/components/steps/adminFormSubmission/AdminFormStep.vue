<template>
    <step-base v-bind:step="step">
       
        <administrative-forms v-bind:step="step" v-if="step.currentPage == stPgNo.ADMIN.AdministrativeForms" />
        <administrative-forms-submission v-bind:step="step" v-if="step.currentPage == stPgNo.ADMIN.AdministrativeFormsSubmission" />
        <admin-form-filing-location v-bind:step="step" v-if="step.currentPage == stPgNo.ADMIN.AdminFormFilingLocation" />
  
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import AdminFormFilingLocation from "./AdminFormFilingLocation.vue";
import AdministrativeForms from "./AdministrativeForms.vue";
import AdministrativeFormsSubmission from "./AdministrativeFormsSubmission.vue";


import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages"

@Component({
    components:{
        StepBase,
        AdminFormFilingLocation,
        AdministrativeForms,
        AdministrativeFormsSubmission
    }
})

export default class AdminFormStep extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
}
</script>
