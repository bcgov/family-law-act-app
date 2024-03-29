<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" >
        
        <h2 class="mt-4">Review and Print</h2>
        <b-card style="border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            
            <div class="ml-2">
                You have indicated that you will file at the following court registry: 
                <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{applicantLocation.name}} </p>                
            </div>

            <div class="info-section mt-4 mb-5" style="background: #f6e4e6; border-color: #e6d0c9; color: #5a5555; border-radius:10px;">
                <div class="row justify-content-center text-warning">
                    <p class="bg-primary py-0 px-2 mt-2 " style="border-radius: 10px; font-size: 20px;">SAFETY CHECK</p>
                </div>
                <div style="font-size: 18px;" class="mx-3 mb-1 pb-3">
                    By clicking on the 'Review and Print' button next to the document, a PDF version of the application
                     will download or open. Depending on your browser settings, your PDF might save the form to your 
                     computer or it will open in a new tab or window. For more information about opening and saving 
                     PDF forms, click on <span @click="navigateToGuide" class="text-primary" ><span style='font-size:1.2rem;' class="fa fa-question-circle" /> 
                     Get help opening and saving PDF forms</span> below. If you are concerned about 
                     having a copy saved to your computer, may want to review and print from a safe computer, tablet 
                     or device, for example a computer, tablet or device of a trusted friend, at work, a library, 
                     school or an internet café.                    
                </div>
            </div>
            
            <h3 class="mt-5">To prepare the application for filing:</h3>

            <b-card style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Review your application:</span>  
                <form-list @downloaded="downloaded" type="Print" :currentPage="currentPage"/>

                <div name="pdf-guide" class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: If you need to edit any of your answers, go back to the "Review Your Answers" page, edit the answer and return to this page.
                </div>
            </b-card>

            <b-card  style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
                <required-document type="Print" />
            </b-card>

            <reminder-notes type="Print" />

            <b-card  style="border:1px solid #ddebed;border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Submit Documents:</span>
                <ul class="mt-3">                    
                    <li>Bring all copies to the court registry for filing  
                        <br/> 
                        <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{filingLocation.name}} </p>
                        <p class="my-0 ml-2 " style="display:block"> {{filingLocation.address}} </p>
                        <p class="my-0 ml-2" style="display:block"> {{filingLocation.postalCode}} </p>                
                    </li>
                </ul>
            </b-card>

        </b-card>

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="primary" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import GetHelpForPdf from "./helpPages/GetHelpForPDF.vue"

import FormList from "./components/FormList.vue"
import RequiredDocument from "./components/RequiredDocument.vue"
import ReminderNotes from "./components/ReminderNotes.vue"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component({
    components:{
        PageBase,
        GetHelpForPdf,
        FormList,
        RequiredDocument,
        ReminderNotes
    }
})

export default class ReviewAndPrint extends Vue {
    
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

<style lang="scss">
@import "src/styles/common";

.closeButton {
	background-color: transparent !important;
	color: white;
	border: white;
	font-weight: 700;
	font-size: 2rem;
	padding-top: 0;
	margin-top: 0;
}

</style>