<template>
    <page-base v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
        
        <h2 class="mt-4">Review and Print</h2>
        <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
            
            <div class="ml-2">
                You have indicated that you will file at the following court registry: 
                <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{applicationLocation.name}} </p>
                <p class="my-0 ml-2 " style="display:block"> {{applicationLocation.address}} </p>
                <p class="my-0 ml-2" style="display:block"> {{applicationLocation.cityStatePostcode}} </p>
            </div>
            
            <h3 class="mt-5">To prepare the application for filing:</h3>

            <b-card style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Review your application:</span>            
            
                <div style="margin:1rem 0; width:23rem;">
                    <b-button                   
                        v-on:click.prevent="onDownload()"
                        variant="success">
                            <span class="fa fa-print btn-icon-left"/>
                            Review and Print Your Application
                    </b-button>
                </div>

                <div class="my-4 text-primary" @click="showGetHelpForPDF = true" style="border-bottom:1px solid; width:20.25rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
                </div>

                <div>    
                    Note: If you need to edit any of your answers, go back to the "Review Your Answers" page, edit the answer and return to this page.
                </div>
            </b-card>

            <b-card  style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Additional Documents to Include:</span> 
                
                <ul class="mt-3">
                    <li class="mb-2">Collect any existing orders or agreements, existing protection orders and any exhibits referenced in your application</li>
                    <li class="mb-2">Print or make copies of all documents, including your application and any supporting documents: one set for you, one set for the court and one set for each other party</li>
                </ul>
 
                <div v-if="requiredDocuments.length > 0" class="mt-4 h4">The following additional documents are required as part of your filing:</div>
                <ul class="mt-3">
                    <li class="mb-2" v-for="requiredDocument in requiredDocuments" :key="requiredDocument">{{requiredDocument}}</li>
                </ul>
            </b-card>

            <b-card  style="borde:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

                <span class="text-primary" style='font-size:1.4rem;'>Submit Documents:</span>
                <ul class="mt-3">                    
                    <li>Bring all copies to the court registry for filing  
                        <br/> 
                        <p class="h4 mt-3 ml-2 mb-1" style="display:block"> {{applicationLocation.name}} </p>
                        <p class="my-0 ml-2 " style="display:block"> {{applicationLocation.address}} </p>
                        <p class="my-0 ml-2" style="display:block"> {{applicationLocation.cityStatePostcode}} </p>                
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
    </page-base>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { stepInfoType } from "@/types/Application";
import PageBase from "../PageBase.vue";

import moment from 'moment-timezone';
import GetHelpForPdf from "./helpPages/GetHelpForPDF.vue"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{
        PageBase,
        GetHelpForPdf
    }
})

export default class ReviewAndPrint extends Vue {
    
    @Prop({required: true})
    step!: stepInfoType;

    // @applicationState.State
    // public requiredDocuments!: string[];

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    error= "";
    currentStep=0;
    currentPage=0;

    showGetHelpForPDF = false;
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
        this.requiredDocuments = Vue.filter('extractRequiredDocuments')(this.getFPOResultData())

    }

    public onPrev() {
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {
        this.UpdateGotoNextStepPage()     
    }

    public onDownload() {

        if(this.checkErrorOnPages()){
            const currentDate = moment().format();
            this.$store.commit("Application/setLastPrinted", currentDate);
            this.loadPdf();
        }
    }

    public checkErrorOnPages(){

        const optionalLabels = ["Next Steps", "Review and Print", "Review and Save", "Review and Submit"]

        for(const step of this.$store.state.Application.steps){
            if(step.active){
                for(const page of step.pages){
                    if(page.active && page.progress!=100 && optionalLabels.indexOf(page.label) == -1){
                        this.$store.commit("Application/setCurrentStep", step.id);
                        this.$store.commit("Application/setCurrentStepPage", {currentStep: step.id, currentPage: page.key });
                        const nextChildGroup = document.getElementById(this.getStepGroupId(step.id));
                        //const currPage = document.getElementById(this.getStepPageId(step.id, page.key));
                        //console.log(nextChildGroup)
                        // if(nextChildGroup){
                        //     if(Number(step.id)==8){
                        //         nextChildGroup.style.display = "none";
                        //         Vue.nextTick(()=>nextChildGroup.style.display = "block")
                        //     }else{
                        //         nextChildGroup.style.display = "block";
                        //     }
                        // }
                        //if(currPage){currPage.style.color="red";}
                        return false;
                    }
                }
            }            
        }
        return true;        
    }

    public getStepId(stepIndex) {
        return "step-" + stepIndex;
    }

    public getStepGroupId(stepIndex) {
        return this.getStepId(stepIndex) + "-group";
    }

    public getStepPageId(stepIndex, pageIndex) {
        return this.getStepId(stepIndex) + "-page-" + pageIndex;
    }

    public loadPdf() {
        const applicationId = this.$store.state.Application.id;
        const url = '/survey-print/'+applicationId+'/?name=application-about-a-protection-order'
        const body = this.getFPOResultData()
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        //console.log(body)
        this.$http.post(url,body, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "fpo.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            this.error = "";
            Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);
        },err => {
            console.error(err);
            this.error = "Sorry, we were unable to print your form at this time, please try again later.";
        });

    }

    public getFPOResultData() {  
        
        var result = this.$store.state.Application.steps[0].result; 
        for(var i=1;i<9; i++){
            const stepResults = this.$store.state.Application.steps[i].result
            for(const stepResult in stepResults){
                console.log(stepResults[stepResult])
                console.log(stepResults[stepResult].data)
                result[stepResult]=stepResults[stepResult].data; 
                //Object.assign(result, result,{$stepResult: stepResults[stepResult].data});  
            }
        }
            //Object.assign(result, result, this.$store.state.Application.steps[i].result); 
            
        //Object.assign(result, result,{yourInformationSurvey: this.$store.state.Application.steps[1].result.yourInformationSurvey.data}); 
        
        var protectedPartyName = {protectedPartyName: this.$store.state.Application.protectedPartyName}
        Object.assign(result, result, protectedPartyName);
        
        var applicationLocation = this.$store.state.Application.applicationLocation;
        var userLocation = this.$store.state.Common.userLocation;
        //console.log(applicationLocation)
        //console.log(userLocation)
        if(applicationLocation)
            Object.assign(result, result,{applicationLocation: applicationLocation}); 
        else
            Object.assign(result, result,{applicationLocation: userLocation});
        console.log(result)
        return result;
    }

    // beforeDestroy() {
    //     Vue.filter('setSurveyProgress')(null, this.currentStep, this.currentPage, 100, true);
    // }

}
</script>