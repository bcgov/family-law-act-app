<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        
        <h2 class="mt-4">Review and Connect</h2>
        <b-card style="border-radius:10px;" bg-variant="white" class="mt-4 mb-3">            
            
            
            <h3 class="mt-1">To prepare the application for filing:</h3>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Connect with the Director to complete Schedule 1:</span>                

                <div class="mt-3">    
                    Schedule 1 of the application must be completed by a <tooltip title="director" :index="0"/>
                    under the Child, Family and Community Service Act before the application is filed with the court.
                    <ul class="mt-2">
                        <li>
                            Contact the <tooltip title="child welfare worker" :index="0"/> who is working with the child<br><br>
                            If you don’t know how to reach the child welfare worker, contact the Provincial Centralized 
                            Screening team at any time for assistance at 1-800-663-9122 or 604-660-4927 (Lower Mainland 
                            and outside BC). 
                        </li>
                        <li class="mt-3">
                            Provide the child welfare worker with a copy of your application so they can understand what you are applying for
                        </li>
                        <li class="mt-3">
                            Get Schedule 1 completed and returned to you for filing
                        </li>                        
                    </ul>
                </div>
            </b-card>

            <b-card  style="border:1px solid #ddebed;border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Submit your application for filing:</span>
                <p class="mt-3">
                    Once you have received the completed Schedule 1 from the Director, you can file your 
                    Application About a Priority Parenting Matter.
                </p>
                <p>
                    Click Next to choose your filing options and prepare your documents for filing.
                </p>
            </b-card>

        </b-card>

        
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";
import Tooltip from "@/components/survey/Tooltip.vue";

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component({
    components:{
        PageBase,
        Tooltip       
       
    }
})

export default class ReviewAndConnect extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    @applicationState.State
    public types!: string[];    

    error= "";
    currentStep =0;
    currentPage =0;
   
    includesPO = false;    

    showGetHelpForPDF = false;
    applicantLocation = {} as locationsInfoType;
    filingLocation = {} as locationsInfoType;      

    mounted(){

        this.includesPO = this.types.includes("Protection Order") || this.types.includes("New Protection Order") || this.types.includes("Change Protection Order") || this.types.includes("Terminate Protection Order")

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        let progress = this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress
        
        if(progress==0) progress=50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);

        let location = this.$store.state.Application.applicationLocation
        if(!location) location = this.$store.state.Common.userLocation
        
        this.applicantLocation = this.locationsInfo.filter(loc => {if (loc.name == location) return true})[0]
           
        if (this.applicantLocation["filingLocation"]){
            this.filingLocation = this.locationsInfo.filter(loc => {if (loc.id == this.applicantLocation["filingLocation"]) return true})[0]
        } else {
            this.filingLocation = this.applicantLocation;
        }

    }  
    
    public downloaded(){
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, false);
    }

    public onPrev() {
        Vue.prototype.$UpdateGotoPrevStepPage()
    }

    public onNext() {
        Vue.prototype.$UpdateGotoNextStepPage()     
    }

    public navigateToGuide(){
        Vue.filter('scrollToLocation')("pdf-guide");
    }  

}
</script>