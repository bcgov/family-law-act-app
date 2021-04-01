<template>
  <step-base v-bind:step="step">
    <flm-sub-path-selection v-bind:step="step" v-if="step.currentPage == 0"></flm-sub-path-selection>
    <flm-background v-bind:step="step" v-if="step.currentPage == 1"></flm-background>
    <children-info v-bind:step="step" v-if="step.currentPage == 2"></children-info>    
    <parenting-arrangements v-bind:step="step" v-if="step.currentPage == 3"></parenting-arrangements> 
    <child-support v-bind:step="step" v-if="step.currentPage == 4"></child-support> 
    <contact-with-child v-bind:step="step" v-if="step.currentPage == 5"></contact-with-child>  
    <guardian-of-child v-bind:step="step" v-if="step.currentPage == 6"></guardian-of-child>  
    <spousal-support v-bind:step="step" v-if="step.currentPage == 7"></spousal-support>   
    <family-form v-bind:step="step" v-if="step.currentPage == 8"></family-form>
    <preview-forms v-bind:step="step" v-if="step.currentPage == 9"/>
  </step-base>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import StepBase from "../StepBase.vue";
import { stepInfoType } from "@/types/Application";

import FlmSubPathSelection from "./FlmSubPathSelection.vue";
import FlmBackground from "./FlmBackground.vue";
import ChildrenInfo from "./childComponent/ChildrenInfo.vue";
import ParentingArrangements from "./ParentingArrangements.vue";
import ChildSupport from "./ChildSupport.vue";
import ContactWithChild from "./ContactWithChild.vue";
import GuardianOfChild from "./GuardianOfChild.vue";
import SpousalSupport from "./SpousalSupport.vue";
import FamilyForm  from "./FamilyForm.vue"

import PreviewForms from "./reviewFLM/PreviewForms.vue"


@Component({
    components:{
      StepBase,      
      FlmSubPathSelection,
      ChildSupport,     
      FlmBackground,
      PreviewForms,
      ChildrenInfo,
      ParentingArrangements,       
      ContactWithChild,
      GuardianOfChild,
      SpousalSupport,    
      FamilyForm
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
