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
            <div class="ml-2"> 
                Collect any existing orders or agreements, existing protection orders and any exhibits referenced in your application
                <ul class="mt-3">
                    <li class="mb-2">Print or make copies of all documents, including your application and any supporting documents: one set for you, one set for the court and one set for each other party</li>
                    <li>Bring all the copies to the court registry for filing</li>
                </ul>
            </div>
            
            <div style="margin:3rem 0; width:19rem;">
                <b-button                   
                    v-on:click.prevent="onDownload()"
                    variant="success">
                        <span class="fa fa-print btn-icon-left"/>
                        Review and Print Your Application
                </b-button>
            </div>

            
            <div class="my-4 text-primary" @click="showGetHelpForPDF=true" style="border-bottom:1px solid; width:20.25rem;">
                <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help opening and saving PDF forms 
            </div>

            <div>    
                Note: If you need to edit any of your answers, go back to the question in Step 3, edit the answer and return to this page.
            </div>

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

    @applicationState.Action
    public UpdateGotoPrevStepPage!: () => void

    @applicationState.Action
    public UpdateGotoNextStepPage!: () => void

    error= "";

    showGetHelpForPDF = false;
    applicationLocation = {name:'', address:'', cityStatePostcode:'', email:''}

    mounted(){
        let location = this.$store.state.Application.applicationLocation
        if(!location) location = this.$store.state.Common.userLocation
        //console.log(location)

        if(location == 'Victoria'){
            this.applicationLocation = {name:'Victoria Law Courts', address:'850 Burdett Avenue', cityStatePostcode:'Victoria, B.C.  V8W 9J2', email:'Victoria.CourtScheduling@gov.bc.ca'}
        }else if(location == 'Surrey'){
            this.applicationLocation = {name:'Surrey Provincial Court', address:'14340 - 57 Avenue', cityStatePostcode:'Surrey, B.C.  V3X 1B2', email:'CSBSurreyProvincialCourt.FamilyRegistry@gov.bc.ca'}
        }            

    }

    public onPrev() {
        //this.$store.dispatch("application/gotoPrevStepPage");
        this.UpdateGotoPrevStepPage()
    }

    public onNext() {        
        //this.$store.dispatch("application/gotoNextStepPage");
        this.UpdateGotoNextStepPage()     
    }

    public onDownload() {
        //console.log("downloading")
        const currentDate = moment().format();
        this.$store.commit("Application/setLastPrinted", currentDate); 
        const application = this.$store.state.Application;
        
        const applicationId = application.id;

        this.loadPdf();
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
        },err => {
            console.error(err);
            this.error = "Sorry, we were unable to print your form at this time, please try again later.";
        });

    }

    public getFPOResultData() {  
        
        var result = this.$store.state.Application.steps[0].result; 
        for(var i=1;i<9; i++)
            Object.assign(result, result, this.$store.state.Application.steps[i].result); 
        
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

}
</script>