<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()">
        <!-- <b-container class="container home-content" id="terms"> -->
        <b-card class="border-white bg-white">
            <h1>Reply to an application about a family law matter</h1>
            <p style="font-weight: 700;">
                Complete the 
                <a 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa715.pdf?forcedownload=true"
                    target="_blank">Reply to an application about a family law matter
                </a> 
                to reply for an order. 
            </p>
            <p style="font-weight: 700;">
                A 
                <a 
                    href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa715-guidebook.pdf?forcedownload=true"
                    target="_blank">guidebook
                </a> 
                is available to assist you in completing the online version of the form. 
            </p>            
            <p>Further assistance in completing the form is also available at:</p>
            <div>
                <p class="help-header" style="font-weight: 700;">JUSTICE ACCESS CENTRES & FAMILY JUSTICE CENTRES</p>                
                <p> 
                    <a href="https://www2.gov.bc.ca/gov/content/justice/about-bcs-justice-system/jac"
                        target="_blank">Justice Access Centres
                    </a> and 
                    <a href="https://www2.gov.bc.ca/gov/content?id=2E7DCCDAD5A94D61B777A80AE8639ABD"
                        target="_blank">Family Justice Centres
                    </a>
                    across BC have Family Justice Counsellors and Child Support Officers specially trained to 
                    help families resolve their issues about guardianship, parenting arrangements (time and 
                    responsibilities), contact, and child / spousal support. There is no charge for their services.
                </p>
                <p>
                    Services are available whether you are looking to establish or change existing arrangements; 
                    and may include provision of legal information, and information on court processes and options 
                    for resolution, mediation and referrals to services and resources that are available for your 
                    situation.                    
                </p>
            </div>

            <p>
                This service is currently being updated to support the new Application about Enforcement. 
                Please click on the link above to access a fillable PDF document which can be then be printed 
                and filed at the court registry.
            </p>

            <p>
                The page will be temporary until we can complete the Form 6 and will need to be removed.
            </p>

        </b-card>     
    <!-- </b-container> -->
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";
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
export default class FamilyLawManual extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType; 
    
    @applicationState.Action
    public UpdatePathwayCompleted!: (changedpathway) => void
    
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
        this.UpdatePathwayCompleted({pathway:"replyFamilyLawManual", isCompleted:true})
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