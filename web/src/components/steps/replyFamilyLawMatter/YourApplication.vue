<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card class="border-white bg-white">
                <h1>Your Application</h1>
                <p>
                    At the beginning of this step, you selected that you want to make a counter 
                    application about the following family law matter(s):
                    <ul>
                        <li  v-for="(appType,inx) in selectedCounterApplications" :key="inx">{{appType}}</li>                        
                    </ul>
                </p>
                <p>
                    Your counter application is used to raise a matter that isn’t already before the court 
                    on the other party’s Application About a Family Law Matter. The rest of this pathway 
                    will ask questions to better understand the order you are applying for and will complete 
                    the required part of the form to include a counter application with your Reply to an 
                    Application About a Family Law Matter.
                </p>
                <p>
                    If you want to ask for something different, go back to the Counter Application sub-step to make changes.                
                </p>
               
                <p>
                    Click “Next” to complete your counter application for the matters listed above.
                </p>
               
        </b-card>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as _ from 'underscore';
import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import PageBase from "../PageBase.vue";
import { stepInfoType } from "@/types/Application";


@Component({
    components:{
        PageBase
    }
})
export default class RflmQuestionnaire extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    currentStep = 0;
    currentPage = 0;

    selectedCounterApplications = []; 

    mounted(){
        this.selectedCounterApplications = [];
        this.reloadPageInformation();        
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        if (this.step.result?.selectedCounterApplications) {
            this.selectedCounterApplications = this.getSelectedCounterApplicationNames(this.step.result?.selectedCounterApplications)           
        } else {
            this.selectedCounterApplications = [];
        }
        
        const progress = 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
    }   

    public getSelectedCounterApplicationNames(selectedApps){
        
        let result = []
        
        for(const form of selectedApps){
            if(form=='newParentingArrangements')   result.push('New Parenting Arrangements');
            if(form=='newChildSupport')            result.push('New Child Support');
            if(form=='newContactWithChild')        result.push('New Contact With a Child');
            if(form=='guardianOfChild')            result.push('Guardian Of a Child');
            if(form=='newSpousalSupport')          result.push('New Spousal Support');
            if(form=='existingParentingArrangements')   result.push('Existing Parenting Arrangements');
            if(form=='existingChildSupport')            result.push('Existing Child Support');
            if(form=='existingContactWithChild')        result.push('Existing Contact With a Child');
             if(form=='existingSpousalSupport')          result.push('Existing Spousal Support');
        }       
        
        return result;
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage();
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage();       
    }
    
    beforeDestroy() {
        const progress = 100;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    }
}
</script>

<style lang="scss">
@import "../../../styles/survey";

</style>
