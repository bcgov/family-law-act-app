<template>
    <b-card v-if="mountedData" style="width:60rem; padding:0 5rem; margin:0 auto; border:1px solid; border-radius:10px;" bg-variant="white" class="mt-4 mb-3">
        <h2 :class="'mt-4 text-center '+headerColor">{{headerText}}</h2>
        <div class="my-2 font-weight-bold">{{message}}</div>
        <div v-if="packageNumber">
            <div class="mb-2"> Your CSO Online Package # is <b class="text-success"> {{packageNumber}} </b></div>
        
            <div>
                You can view the following items at any time:
            </div>

            <ul style="margin-top:.25rem">
                <li><a :href="packageUrl" target="_blank">Your eFiling Receipt</a> on the CSO eFiling Hub</li>
                <li><a :href="packageUrl" target="_blank">The package of all documents</a> you have submitted for filing</li>
            </ul>
            

            <div style="font-size:19px; font-weight:normal;">
                If you have any questions, concerns or mistakes about your initial filing, please contact CSO Online Support at <a href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca</a> and include 
                <span class="text-primary">your Online Package #{{packageNumber}}</span>.
            </div>

            <div class="mt-5">
                <h3>What happens at the Court Registry?</h3>
                <ul>
                    <li class="mb-2">The court registry staff will check your documents to make sure they’ve been completed properly.</li>
                
                    <li class="mb-2">
                        If you are filing your application by email and you are asking for a protection order in your application, you will need to be prepared to <tooltip title="swear or affirm" index="0" /> the information in your application during your court appearance.
                    </li>
                    <li class="mb-2">
                        Once your application is complete, the registry staff will stamp the document, assign a court file number (if there isn’t already one), schedule the court appearance, and return a copy of the application to you.
                    </li>
                    <li class="mb-2">
                        You will receive a date and time for your court appearance and information about how to appear. These appearances are usually happening by telephone or videoconference.
                    </li>
                    <li>
                        You will need a safe, quiet place where you can call into the court appearance.
                    </li>
                </ul>                
            </div>

            <div class="mt-5" style="font-style:italic">
                <h4 style="margin:0 0 0.5rem 1.5rem;">WHAT ARE MY NEXT STEPS WHEN MY DOCUMENTS ARE FILED?</h4>
                <ul>
                    <li>Have a viewable and printable checklist for users</li>
                    <li>Multiple pathways – checklist forms for each pathway and titled.</li>
                </ul>
            </div>

            <div class="mt-2">
                <p>
                    Once your document has been processed by the registry you will receive a notification advising you that the document has been processed.  You will return to this application and can retrieve your filed document.  In addition, you need to complete the next steps outlined in the checklist(s) below.
                </p>
                <p>
                    Please review and print the checklist(s) below so you understand the next steps:
                </p>
                <div v-if="applicationDocumentTypes.includes('FLC')" @click="checklist=true;checklistType='FLM';" style="color:blue; cursor:pointer;">
                    Checklist for Application About a Family Law Matter
                </div>
                <div v-if="applicationDocumentTypes.includes('AAP')" @click="checklist=true;checklistType='PO';" style="color:blue; cursor:pointer;">
                    Checklist for Application About a Protection Order
                </div>
                <div v-if="applicationDocumentTypes.includes('NTRF')" @click="checklist=true;checklistType='RFC';" style="color:blue; cursor:pointer;">
                    Checklist for Notice to Resolve Family Claim
                </div>
            </div>           

            <div class="mt-5">
                <h3>What happens if the Court Registry does not accept my package?</h3>
                <div class="mb-3">
                    If the documents you submitted required correction, you will be notified by an email notification and be able to review the <tooltip title="registry notice" index="0"/>. 
                </div>
                <div>
                    If you are not sure whether you’ve completed your application properly, you may want to get some legal advice before you submit your documents again for filing.
                </div>

                <div> 
                    <div class="m-4 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                        <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                        <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                        <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                    </div>
                    <legal-assistance-faq v-if="showLegalAssistance"/>
                </div>

            </div>

            <div class="mt-5">
                <h3>Haven’t Heard Back?</h3>
                If you don’t hear back within 1 week from the court registry. Please contact CSO Online Support at <a href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca</a> and include your <tooltip title="Court File Number" index="0"/> / Filing Location or <span class="text-primary">Online Package Number (<strong>{{packageNumber}}</strong>)</span>.
            </div>

        </div>
        <b-row class="mt-5">
            <b-button style="margin-left:1rem;" v-on:click="viewStatus()" variant="primary">Back to the Application Page</b-button>
            <b-button style="margin-left:auto;margin-right:1rem;" v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
        </b-row>

        <b-modal size="lg" v-model="checklist" header-class="bg-white border-0" no-close-on-backdrop hide-footer>
            <checklists :checklistType='checklistType' :applicationId='applicationId'/>            
            <template v-slot:modal-header>                
                <b-button style="margin-left:auto; height:2rem; padding:0 0.65rem;" variant="dark" @click="checklist=false;">x</b-button>
            </template>
        </b-modal>

    </b-card>  
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator"

import { SessionManager } from "@/components/utils/utils";
import Tooltip from "@/components/survey/Tooltip.vue";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import Checklists from "./checklists/Checklists.vue"


@Component({
    components:{        
        Tooltip,
        LegalAssistanceFaq,
        Checklists,
    }
})
export default class ResultPage extends Vue {

    packageNumber = "";
    packageUrl="";
    message= "";
    headerText = "";
    headerColor= "";
    error = ""; 
    mountedData = false;
    showLegalAssistance = false

    checklist = false;
    checklistType='';
    applicationId = '';
    applicationDocumentTypes = [];
        
    public viewStatus() {
        this.$router.push({ name: "applicant-status" });
    }
    
    public exitApplication() {
        window.open('http://www.google.ca');
        SessionManager.logoutAndRedirect(this.$store);
    }
    
    mounted(){
        this.mountedData = false;
        this.error = "";

        const result = this.$route.params.result;
        this.applicationId = this.$route.params.id;        
        
        if (result == "success"){
            this.message = "You’ve successfully submitted your initial filing with the Court Registry."
            this.headerText = "Success";
            this.headerColor="text-success";
            
            const packageRef = this.$route.query.packageRef

            this.packageUrl = atob(String(packageRef))

            const urlParams = new URLSearchParams(this.packageUrl.split('?')[1]);

            this.packageNumber = urlParams.get('packageNo')

            this.saveApplication(this.applicationId, this.packageNumber, this.packageUrl);

        } else if (result == "error") {
            const packageMessage = String(this.$route.query.message)
            this.message = packageMessage? packageMessage: "An error occured while submitting your application, ...."
            this.headerText = "Failed";
            this.headerColor="text-danger";
            this.mountedData = true;
        } else if (result == "cancel") {
            this.message = "Submission of your application has been canceled."
            this.headerText = "Canceled";
            this.headerColor="text-secondary";
            this.mountedData = true;
        }
        
        
    }

    public saveApplication(id, packagenumber, packageurl) {
        
        const data = {
            packageNumber: packagenumber,
            packageUrl: packageurl 
        } 

        const url = "/efiling/"+id+"/submit/";

        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }

        this.$http.put(url, data, header)
        .then(res => {                            
            this.error = "";
            this.getApplicationTypes(id);
        }, err => {
            console.error(err);
            this.error = err;
        });    
    }

    public getApplicationTypes(applicationId: string) {

        const url = "/app-list/";

        this.$http.get(url)
        .then((response) => {

            const preparedPdfs = response.data.filter(application=>application.id == applicationId)[0].prepared_pdfs;
            // const preparedPdfs = [{"id":1,"pdf_type":"AAP","version":"1.0","created_date":"2021-09-24T20:29:05.601841Z"}];
            // console.log(preparedPdfs)

            for (const pdf of preparedPdfs){
                this.applicationDocumentTypes.push(pdf.pdf_type);
            } 
            
            //this.applicationDocumentTypes = ["AAP", "NTRF", "FLC"]
            
            this.mountedData = true;       
        },(err) => {
            this.mountedData = true;
            this.error = err;        
        });
   
    }

}
</script>
