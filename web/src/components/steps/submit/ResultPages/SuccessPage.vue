<template>
    <b-card 
        v-if="mountedData" 
        style="width:60rem; padding:0 5rem; margin:0 auto; border:1px solid; border-radius:10px;" 
        bg-variant="white" 
        class="mt-4 mb-3">
        <h2 class="mt-4 text-center text-success">Success</h2>
        <div class="my-2 font-weight-bold">You’ve successfully submitted your initial filing with the Court Registry.</div>
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
                If you have any questions, concerns or mistakes about your initial filing, 
                please contact CSO Online Support at 
                <a 
                    href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca
                </a> and include 
                <span class="text-primary">your Online Package #{{packageNumber}}</span>.
            </div>

            <div class="mt-5">
                <h3>What happens at the Court Registry?</h3>
                <ul>
                    <li class="mb-2">
                        The court registry staff will check your documents to make sure they’ve been completed properly.
                    </li>                
                    <li class="mb-2">
                        If you are filing your application by email and you are asking for a protection order in your 
                        application, you will need to be prepared to <tooltip title="swear or affirm" index="0" /> the 
                        information in your application during your court appearance.
                    </li>
                    <li class="mb-2">
                        Once your application is complete, the registry staff will stamp the document, assign a court 
                        file number (if there isn’t already one), schedule the court appearance, and return a copy 
                        of the application to you.
                    </li>
                    <li class="mb-2">
                        You will receive a date and time for your court appearance and information about how to 
                        appear. These appearances are usually happening by telephone or videoconference.
                    </li>
                    <li>
                        You will need a safe, quiet place where you can call into the court appearance.
                    </li>
                </ul>                
            </div>

            <div class="mt-5">
                <h3>What are my next steps when my documents are filed?</h3>                
            </div>

            <div class="mt-2">
                <p>
                    Once your document has been processed by the registry you will receive a notification 
                    advising you that the document has been processed.  You will return to this application 
                    and can retrieve your filed document.  In addition, you need to complete the next steps 
                    outlined in the checklist(s) below.
                </p>
                <p>
                    Please review and print the checklist(s) below so you understand the next steps:
                </p>
                <div 
                    v-if="applicationDocumentTypes.includes('FLC')" 
                    @click="checklist=true;checklistType='FLM';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About a Family Law Matter
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('AAP')" 
                    @click="checklist=true;checklistType='PO';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About a Protection Order
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('NTRF')" 
                    @click="checklist=true;checklistType='RFC';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Notice to Resolve Family Claim
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('AXP')" 
                    @click="checklist=true;checklistType='PPM';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About Priority Parenting Matter
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('APRC')" 
                    @click="checklist=true;checklistType='RELOC';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Order Prohibiting the Relocation of a Child
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('ACMO')" 
                    @click="checklist=true;checklistType='ACMO';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application for Case Management Order
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('ACMW')" 
                    @click="checklist=true;checklistType='ACMW';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application for Case Management Order without Notice or Attendance
                </div>

                <div 
                    v-if="applicationDocumentTypes.includes('AFET')" 
                    @click="checklist=true;checklistType='AFET';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About Enforcement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RFA')" 
                    @click="checklist=true;checklistType='RFA';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File an Agreement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RDET')" 
                    @click="checklist=true;checklistType='RDET';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File a Determination of Parenting Coordinator
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RORD')" 
                    @click="checklist=true;checklistType='RORD';" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File an Order
                </div>
            </div>           

            <div class="mt-5">
                <h3>What happens if the Court Registry does not accept my package?</h3>
                <div class="mb-3">
                    If the documents you submitted required correction, you will be notified by an email 
                    notification and be able to review the <tooltip title="registry notice" index="0"/>. 
                </div>
                <div>
                    If you are not sure whether you’ve completed your application properly, you may want 
                    to get some legal advice before you submit your documents again for filing.
                </div>

                <div> 
                    <div 
                        class="m-4 text-primary" 
                        @click="showLegalAssistance= !showLegalAssistance" 
                        style="border-bottom:1px solid; width:19rem;">
                        <span style='font-size:1.2rem;' class="fa fa-question-circle" /> Where can I get legal assistance? 
                        <span v-if="showLegalAssistance" class='ml-2 fa fa-chevron-up'/>
                        <span v-if="!showLegalAssistance" class='ml-2 fa fa-chevron-down'/>
                    </div>
                    <legal-assistance-faq v-if="showLegalAssistance"/>
                </div>

            </div>

            <div class="mt-5">
                <h3>Haven’t Heard Back?</h3>
                If you don’t hear back within 1 week from the court registry. Please contact CSO Online Support at 
                <a href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca</a> 
                and include your <tooltip title="Court File Number" index="0"/> / Filing Location or 
                <span class="text-primary">Online Package Number (<strong>{{packageNumber}}</strong>)</span>.
            </div>

        </div>
        <b-row class="mt-5">
            <b-button style="width:12rem; margin-left:1rem;" v-on:click="viewStatus()" variant="primary">Back to the Application Page</b-button>
            <b-button style="width:12rem; margin-left:auto;margin-right:1rem;" v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
        </b-row>

        <b-modal size="lg" v-model="checklist" header-class="bg-white border-0" no-close-on-backdrop hide-footer>
            <checklists :checklistType='checklistType' :applicationId='applicationId'/>            
            <template v-slot:modal-header>                
                <b-button style="margin-left:auto; height:2rem; padding:0 0.65rem; font-weight: 700; font-size: 1.25rem;" variant="primary" @click="checklist=false;">&times;</b-button>
            </template>
            
        </b-modal>

    </b-card>  
</template>

<script lang="ts">

import {Component, Vue, Prop} from "vue-property-decorator";

import { SessionManager } from "@/components/utils/utils";
import Tooltip from "@/components/survey/Tooltip.vue";
import LegalAssistanceFaq from "@/components/utils/LegalAssistanceFaq.vue";
import Checklists from "./checklists/Checklists.vue";

import {whichCaseMgmtForm} from "@/components/steps/caseMgmt/reviewCM/RequiredForm"
import {whichAgreementEnfrcForm} from '@/components/steps/agreementEnfrc/reviewAE/RequiredFormEnfrc'

@Component({
    components:{        
        Tooltip,
        LegalAssistanceFaq,
        Checklists
    }
})
export default class SuccessPage extends Vue {
    
    @Prop({required: true})
    packageInfo!: any;

    packageNumber = "";
    packageUrl="";

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
        this.applicationId = this.packageInfo.fileNumber;
        this.packageUrl = this.packageInfo.eFilingUrl;
        this.packageNumber = this.packageInfo.packageNumber;

        this.saveApplication(this.applicationId, this.packageNumber, this.packageUrl);
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
            this.getApplicationTypes(id);
        }, err => {
            console.error(err);
        });    
    }

    public getApplicationTypes(applicationId: string) {

        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            const stepCOMM = this.getStepResultByName(applicationData, 'COMMON');
            const stepCM = this.getStepResultByName(applicationData, 'CM');
            const stepENFRC = this.getStepResultByName(applicationData, 'ENFRC');

            let pathways: string[] = [];

            if (stepGETSTART?.selectedForms){
                pathways = stepGETSTART.selectedForms;
            }

            const includesFlm = pathways.includes('familyLawMatter');
            const includesEnfrc = pathways.includes('agreementEnfrc');
            const includesCm = pathways.includes('caseMgmt');

            if (pathways.includes('protectionOrder')){
                this.applicationDocumentTypes.push('AAP')
            }

            if (pathways.includes('priorityParenting')){
                this.applicationDocumentTypes.push('AXP')
            }

            if (pathways.includes('childReloc')){
                this.applicationDocumentTypes.push('APRC')
            }

            if (includesFlm){

                const applicationLocationName = applicationData.applicationLocation?applicationData.applicationLocation:'';

                if (Vue.filter('includedInRegistries')(applicationLocationName, 'early-resolutions')
                    && (stepCOMM?.filingLocationSurvey?.data?.MetEarlyResolutionRequirements == 'n')){

                    this.applicationDocumentTypes.push('NTRF');

                } else {

                    this.applicationDocumentTypes.push('FLC');

                }
            }

            if (includesCm){
                const CMforms = whichCaseMgmtForm(stepCM);
                if(CMforms?.includes("P10")) this.applicationDocumentTypes.push('ACMO');
                if(CMforms?.includes("P11")) this.applicationDocumentTypes.push('ACMW');
            }

            if (includesEnfrc){
                const EnfrcForm = whichAgreementEnfrcForm(stepENFRC);
                if(EnfrcForm?.includes('P29')) this.applicationDocumentTypes.push('AFET');
                if(EnfrcForm?.includes('P26')) this.applicationDocumentTypes.push('RFA');
                if(EnfrcForm?.includes('P27')) this.applicationDocumentTypes.push('RDET');
                if(EnfrcForm?.includes('P28')) this.applicationDocumentTypes.push('RORD');
            }            

            this.mountedData = true;

        }, err => {
            this.mountedData = true;        
        });        
   
    }

    public getStepResultByName(applicationData, stepName){
        if(applicationData?.steps){
            const steps = applicationData.steps.filter(step => step.name == stepName);
            if(steps.length == 1) return steps[0].result
        }
        return {}
    }

}
</script>