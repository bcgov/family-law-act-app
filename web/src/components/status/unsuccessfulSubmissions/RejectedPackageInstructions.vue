<template>
    <div>    
        <b-card v-if="dataReady" bg-variant="white" border-variant="white" class="text-justify mr-1">

            <b-row class="m-0">
                <p>
                    There are issues with the document(s) that you submitted for filing.   
                    Below is the list of document(s) you submitted along with the status of the document(s).
                </p>
            </b-row>

            <b-row class="m-0">
                <p>
                    Please review this                 
                    <a style='display:inline' class="text-danger mx-1" @click="downloadNotice()">                        
                        <u style="font-size:18px; font-weight:600; cursor:pointer; display:inline" >REGISTRY NOTICE
                            <spinner v-if="loadingData" color="#FE9595" diameter="10" class="" style="margin:-4rem -2rem -3rem -1.5rem; display:inline-block; padding: 0;" />
                            <span v-else style="font-size:22px; padding:0; transform:translate(6px,2px);" class="far fa-file-pdf btn-icon-left text-danger"/>
                        </u>
                    </a>
                    which will display the comments made by registry staff 
                    identifying where additional information or corrections are required.
                </p>
            </b-row>

            <b-row class="m-0">
                <p>
                    If you are not certain how to correct your application, you may want to get some 
                    legal advise before you submit your corrected document(s) for filing.
                </p>
            </b-row>

            <b-row class="m-0">
                <div class="m-1 text-primary" @click="showLegalAssistance= !showLegalAssistance" style="border-bottom:1px solid; width:19rem;">
                    <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                    <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                    <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                </div>
                <legal-assistance-faq v-if="showLegalAssistance"/>
            </b-row>

            <b-row>
                <b-table
                    :items="submissionResults"
                    :fields="submissionFields"
                    style="width:98%;"
                    class="mt-5 mx-auto"
                    borderless
                    head-variant="dark"
                    >
                    <template v-slot:cell(status)="row">
                        <b v-if="row.value=='Filed'" class="text-success">{{row.value}}</b>
                        <b v-else-if="row.value=='Rejected'" class="text-danger">{{row.value}}</b>
                        <b v-else class="text-dark">{{row.value}}</b>
                    </template> 
                    <template v-slot:cell(attachment)="row">
                        <b-icon-check2 v-if="!row.value" />
                    </template>

                </b-table>
            </b-row>

            <h2 class="mt-4 ml-n2 text-primary">OPTIONS:</h2> 

            <ol class="ml-n2">
                <li>
                    
                    <p v-if="generatedRejected"> <!-- 1 -->
                        If you wish to proceed to correct the document(s) requiring action, 
                        you can click the "Correct Application" button to edit the existing information in the 
                        document and then proceed to resubmit the document(s) for filing.
                    </p>
                    <p v-else> <!-- 1 diff -->
                        If you wish to proceed to correct the document(s) requiring action, 
                        you  will need to make the necessary changes and then click on the 
                        "Correct Application" button to upload and submit them.                        
                    </p>

                    <p style="margin: .5rem 0rem 1.5rem 3rem; text-indent:-3.2rem;">
                        <i><b>NOTE:</b></i>  When you resubmit your document, it will be assigned 
                        a new package number that you will need to note to track the 
                        status of your resubmitted document.
                    </p>
                </li>
                
                <li>
                    <p v-if="generatedRejected"><!-- 2 -->
                        You can opt to start your document(s) over again but note that you 
                        will need to re-enter all information into the form.
                    </p>
                    <p v-else><!-- 2 diff -->
                        You can opt to start a new submission if you prefer or can file 
                        manually at the court registry.                        
                    </p>
                    
                </li>

                <!-- display the last option only if there are also attached documents with issues -->
                <li v-if="generatedRejected && attachedRejected">
                    Some documents identified were not generated by this application, 
                    so you will need to correct those documents and upload them with 
                    any other documents.  You can do this during the submit process.
                </li>
            </ol> 

            <b-button 
                style="display: block;"
                class="ml-auto mr-0 mt-n1 mb-2 bg-success"
                size="md" 
                variant="success" 
                @click="correctApplication()">
                Correct Application
                <b-icon-pencil-fill scale="1" variant="white"/>
            </b-button>         
        
        </b-card>
        <loading-spinner v-else waitingText="Waiting for submitted information"/>  
    </div>   
</template>

<script lang="ts">    
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import Spinner from "@/components/utils/Spinner.vue";

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");
import moment from "moment-timezone";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";


@Component({
    components:{  
        LegalAssistanceFaq,
        Spinner
    }
})
export default class RejectedPackageInstructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @Prop({required: true})
    packageId!: string;

    @Prop({required: true})
    packageResults!: any;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

  

    dataReady = false;
    showLegalAssistance = false;
    generatedRejected = false;
    attachedRejected = false;

    loadingData = false;
    submissionResults = [];
    courtFileNumber = ''
    courtFileLocation = ''
    onlyAttachments = true
    error = ''

    submissionFields = [
        { key: 'name',        label: 'File',        sortable:false,  tdClass: '', thStyle:'width:25%;'},
        { key: 'attachment',  label: 'Attachment',  sortable:false,  tdClass: 'text-center', thStyle:'width:10%;'},
        { key: 'type',        label: 'Type',        sortable:false,  tdClass: '', thStyle:'width:8%;'},
        { key: 'description', label: 'Description', sortable:false,  tdClass: '', thStyle:'width:45%;'},        
        { key: 'status',      label: 'Status',      sortable:false,  tdClass: '', thStyle:'width:12%;'},       
    ]

    mounted(){
        this.dataReady = false;
        this.loadingData = false;
        this.showLegalAssistance = false;

        this.extractResults() 
        Vue.nextTick(()=> this.dataReady = true);
    } 

    public downloadNotice(){
        
        if(!this.packageId || this.loadingData) return        
        this.loadingData = true;
        const url = `/efiling/${this.applicationId}/rejection/${this.packageId}/`
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }
        this.$http.get(url, options)
        .then(res => {
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "registry_notice.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);           
            this.loadingData = false;
        },err => {
            console.error(err);
            this.loadingData = false;
        });

    }

    public extractResults(){
        this.submissionResults = [];
        
        if(this.packageResults?.documents){
            for(const doc of this.packageResults.documents){
                this.submissionResults.push({
                    name: doc.documentProperties?.name?.replace('_generated',''),
                    type: doc.documentProperties?.type,
                    status: doc.status?.description,
                    description: doc.description,
                    attachment: doc.documentProperties?.name?.includes('_generated')
                })
                   
                if(doc.documentProperties?.name?.includes('_generated') && doc.status?.code?.toUpperCase().includes('REJ')){
                    this.generatedRejected = true;
                    this.onlyAttachments = false;
                }

                if(!doc.documentProperties?.name?.includes('_generated') && doc.status?.code?.toUpperCase().includes('REJ'))
                    this.attachedRejected = true;
            }
        }        
        this.courtFileLocation = this.packageResults?.court?.location? this.packageResults.court.location: ''
        this.courtFileNumber = this.packageResults?.court?.fileNumber? this.packageResults.court.fileNumber: ''
    }

    public correctApplication(){
        const url = `/efiling/${this.applicationId}/rejection/${this.packageId}/`
        
        const body ={            
            lastUpdate: moment().format(),
            previousApp:{
                packageResults: this.submissionResults,
                courtFileNo: this.courtFileNumber,
                courtFileLocation: this.courtFileLocation,
                onlyAttachments: this.onlyAttachments
            }            
        }
        const header = {
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
            }
        }
        this.$http.post(url, body, header)
        .then((response) => {
            if(response.data.app_id)
                this.$emit('resumeApp', response.data.app_id)

        }, err => {
            this.error = err;        
        });
    }

}
</script>

<style scoped lang="scss">

    .help-header {
        color: #036;
    }
   
</style>