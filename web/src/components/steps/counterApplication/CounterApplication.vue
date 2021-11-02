<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card class="border-white bg-white">
            <h1>Reply to Counter Application</h1>
            <p style="font-weight: 700;">
                Complete the 
                <a 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa716.pdf?forcedownload=true"
                    target="_blank">Reply to a Counter Application Form 8
                </a> 
                to reply to a counter application about a family law matter. A reply to a counter 
                application must be filed within 30 days of you being <tooltip title="served" :index="0"/> 
                with the Reply to an Application About a Family Law Matter with Counter Application.
            </p>
            <p>
                A party who receives a counter application may do any of the following:
                <ul>
                    <li>agree to one or more of the orders requested in the counter application</li>
                    <li>
                        disagree with any order requested in the counter application, stating your 
                        reason for disagreement and proposing a new order
                    </li>                    
                </ul>                
            </p>
            <p>
                If you need more time to prepare your reply, you can ask the court for an extension 
                of the time by filing an 
                <a
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa718.pdf?forcedownload=true"
                    target="_blank">Application for Case Management Order without Notice or Attendance Form 11
                </a>. You can complete this form by selecting “Apply for an Order” at the beginning of this service.
            </p>           

            <p>
                This service does not currently support the completion of the Reply to Counter 
                Application Form 8. Please click on the link above to access a fillable PDF 
                document which can then be printed and filed at the court registry.
            </p>

        </b-card>     

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class"; 
import * as _ from 'underscore';  
import "@/store/modules/application";
const applicationState = namespace("Application");

import Tooltip from "@/components/survey/Tooltip.vue";
import PageBase from "../PageBase.vue";
import { stepInfoType } from "@/types/Application";
import {stepsAndPagesNumberInfoType} from "@/types/Application/StepsAndPages";

@Component({
    components:{
        PageBase,
        Tooltip
    }
})
export default class CounterApplication extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;     
    
    currentStep = 0;
    currentPage = 0;
    showDifferentAttendanceMethod = false;

    mounted(){        
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        const progress = 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
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