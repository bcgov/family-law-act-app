<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <b-card class="border-white bg-white">
            <h1>Reply to Family Law Matter</h1>
            <p style="font-weight: 700;">
                Complete the 
                <a href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa715.pdf?forcedownload=true"
                target="_blank">Reply to an Application About a Family Law Matter Form 6</a> 
                to reply to an Application About a Family Law Matter.
            </p>
            <p style="font-weight: 700;">
                A reply must be filed within 30 days of you being <tooltip title="served" :index="0"/> 
                with the Application About a Family Law Matter. If you do not file a reply to the 
                Application About a Family Law Matter within the 30 days, the case can go ahead without 
                you. This means that the other party may get a court order without your involvement and 
                then enforce that order against you. If you do not reply, you will not be entitled to 
                receive notice of any part of the case, including any conference, court appearance, 
                hearing or trial and orders may be made against you without your knowledge.
            </p>

            <p>
                Use this form to:
                <ul>
                    <li>agree with one or more of the orders applied for in the Application About a Family Law Matter;</li>
                    <li>
                        disagree with one or more of the orders applied for in the Application About a Family Law Matter, 
                        give the reason you disagree, and ask that a different order be made
                    </li>
                    <li>
                        include a counter application to apply for an order about a different family law matter that was 
                        not included in the Application About a Family Law Matter
                    </li>
                </ul>
                If you need more time to prepare your reply, or to complete the early resolution requirements if your 
                case is in an early resolution registry, you can ask the court for an extension of the time by filing an 
                <a 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa718.pdf?forcedownload=true"
                    target="_blank">
                    Application for Case Management Order without Notice or Attendance Form 11
                </a>. You can complete this form by selecting “Apply for an Order” at the beginning of this service.
            </p>
            <p>
                <b>Is your case filed at an early resolution registry?</b> If so, you must have met the following 
                early resolution requirements before you can file your reply:
                <ul>
                    <li>Needs Assessment</li>
                    <li>Parenting Education Program</li>
                    <li>Consensual Dispute Resolution</li>
                </ul>
                You have met these requirements if you have participated in a needs assessment, parenting education 
                course and consensual dispute resolution OR if you were exempt by the needs assessor or the court 
                from participating in any of these.
            </p>
            <p>
                If you still need to complete one or more of these processes to meet your early resolution 
                requirements, contact the 
                <a href="https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F"
                   target="_blank">Justice Access Centre
                </a>
                identified on the Notice to Resolve a Family Law Matter to find out more about meeting 
                the early resolution requirements.
            </p>
            <p>
                This service does not currently support the completion of the Reply to an Application 
                About a Family Law Matter Form 6. Please click on the link above to access a fillable 
                PDF document which can then be printed and filed at the court registry.
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
export default class ReplyToFlmApplication extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;     
    
    currentStep = 0;
    currentPage = 0;

    mounted(){        
        this.reloadPageInformation();
    }

    public reloadPageInformation() {   
        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        
        const progress = 100;        
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
        this.UpdatePathwayCompleted({pathway:"replyFlm", isCompleted:true})
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