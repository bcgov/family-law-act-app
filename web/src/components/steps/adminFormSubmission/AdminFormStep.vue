<template>
    <step-base v-bind:step="step">
       
        <administrative-forms v-bind:step="step" v-if="step.currentPage == stPgNo.ADMIN.AdministrativeForms" />
        <admin-form-filing-location v-bind:step="step" v-if="step.currentPage == stPgNo.ADMIN.AdminFormFilingLocation" />
  
    </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { namespace } from "vuex-class";   

import StepBase from "../StepBase.vue";
import AdminFormFilingLocation from "./AdminFormFilingLocation.vue";
import AdministrativeForms from "./AdministrativeForms.vue";

import "@/store/modules/application";
const applicationState = namespace("Application");

import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";
import { stepInfoType } from "@/types/Application";

@Component({
    components:{
        StepBase,
        AdminFormFilingLocation,
        AdministrativeForms
    }
})

export default class AdminFormStep extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;
    
}
</script>
