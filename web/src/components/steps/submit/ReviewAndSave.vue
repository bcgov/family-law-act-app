<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        
        <h2 class="mt-4">Review and Save</h2>
        <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            
            <div class="ml-2">
                You have indicated that you will file at the following court registry:
                <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{applicationLocation.name}} </p>
                <a :href="'mailto:'+applicationLocation.email" class="my-0 ml-2 " style="display:block"> {{applicationLocation.email}} </a>

            </div>
            
            <h3 class="mt-5">To prepare the application for filing:</h3>
            
            <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">
                
                <span class="text-primary" style='font-size:1.4rem;'>Review your application:</span>            
                <form-list type="Print" :currentPage="currentPage"/>
               

                <div class="my-4 text-primary" @click="showGetHelpForPDF = true" style="cursor: pointer;border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: If you need to edit any of your answers, go back to the "Review Your Answers" page, edit the answer and return to this page.
                </div>
            </b-card>

            <b-card  style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Additional Documents to Include:</span> 

                <ul class="my-3">
                    <li class="mb-2">Collect any existing orders or agreements, existing protection orders and any exhibits referenced in your application </li>
                    <li>Scan and save an electronic copy of any existing orders or agreements, existing protection orders and any exhibits referenced in your application to your computer</li>
                    <div class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
                        <div style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
                    </div>
                </ul>


                <div v-if="requiredDocuments.length > 0" class="mt-5 h4">The following additional documents are required as part of your filing:</div>
                <ul class="mt-3">
                    <li class="mb-2" v-for="requiredDocument in requiredDocuments" :key="requiredDocument">{{requiredDocument}}</li>
                </ul>

            </b-card>


            
            <b-card  style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Submit Documents:</span>
                <ul class="mt-3">                    
                    <li>Draft and send an email to the registry email address above (<a :href="'mailto:'+applicationLocation.email" class="my-0 ml-2 " >{{applicationLocation.email}} </a> )
                        <br/><b>Subject line:</b> Application About a Protection Order for filing
                        <br/><b>Body of email:</b>
                        <br/>
                        <ul>
                            <li>Specify if you are applying without notice to the other party, or with notice.</li>
                            <li>Provide your name and contact telephone number in case there are problems opening your attachments.</li>
                            <li>Attach the saved application and any existing orders or agreements, existing protection orders and any exhibits referenced in your application to the email</li>             
                        </ul>
                    </li>
                </ul>
            </b-card>

        </b-card>

        <b-modal size="xl" v-model="showGetHelpForPDF" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Opening and Saving PDF forms</h1> 
            </template>
            <get-help-for-pdf/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpForPDF=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpForPDF=false">&times;</b-button>
            </template>
        </b-modal>

        <b-modal size="xl" v-model="showGetHelpScanning" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Scanning Documents</h1> 
            </template>
            <get-help-scanning/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpScanning=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpScanning=false">&times;</b-button>
            </template>
        </b-modal>

    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "@/components/steps/PageBase.vue";

import GetHelpForPdf from "./helpPages/GetHelpForPDF.vue"
import GetHelpScanning from "./helpPages/GetHelpScanning.vue"

import FormList from "./components/FormList.vue"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase,
        GetHelpForPdf,
        GetHelpScanning,
        FormList
    }
})    
export default class ReviewAndSave extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    // @applicationState.State
    // public requiredDocuments!: string[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    currentStep=0;
    currentPage=0;
    error = ""
    showGetHelpForPDF = false;
    showGetHelpScanning = false;
    applicationLocation = {name:'', address:'', cityStatePostcode:'', email:''}
    requiredDocuments: string[] = [];


    mounted(){

        this.currentStep = this.$store.state.Application.currentStep;
        this.currentPage = this.$store.state.Application.steps[this.currentStep].currentPage;
        let progress = this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress
        if(progress==0) progress=50;
        Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, false);
           
        let location = this.$store.state.Application.applicationLocation
        if(!location) location = this.$store.state.Common.userLocation
        //console.log(location)

        if(location == 'Victoria'){
            this.applicationLocation = {name:'Victoria Law Courts', address:'850 Burdett Avenue', cityStatePostcode:'Victoria, B.C.  V8W 9J2', email:'Victoria.CourtScheduling@gov.bc.ca'}
        }else if(location == 'Surrey'){
            this.applicationLocation = {name:'Surrey Provincial Court', address:'14340 - 57 Avenue', cityStatePostcode:'Surrey, B.C.  V3X 1B2', email:'CSBSurreyProvincialCourt.FamilyRegistry@gov.bc.ca'}
        }  

        this.requiredDocuments = [];
        //this.requiredDocuments = Vue.filter('extractRequiredDocuments')(this.getFPOResultData())
    }       
    
    
    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()
    }

    // beforeDestroy() {
    //     const progress = this.$store.state.Application.steps[this.currentStep].pages[this.currentPage].progress
    //     const progress = this.pdfFileOpened? 100:50;
    //     console.log(progress)
    //     Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, progress, true);
    // }

}
</script>