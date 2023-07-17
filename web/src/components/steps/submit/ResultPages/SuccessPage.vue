<template>
    <b-card 
        v-if="mountedData" 
        style="width:60rem; padding:0 5rem; margin:0 auto; border:1px solid; border-radius:10px;" 
        bg-variant="white" 
        class="mt-4 mb-3">
        <h2 class="mt-4 text-center text-success">Success</h2>
        <div class="my-2 font-weight-bold">You've successfully submitted your initial filing with the Court Registry.</div>
        <div v-if="packageNumber">
            <div class="mb-2"> Your CSO Online Package # is <b class="text-success"> {{packageNumber}} </b></div>
        
            <div>
                You can view the following items at any time:
            </div>

            <ul style="margin-top:.25rem">
                <li><a :href="packageUrl" target="_blank">Your eFiling Receipt</a> on the CSO eFiling Hub</li>
                <li><a :href="packageUrl" target="_blank">The package of all documents</a> you have submitted for filing</li>
            </ul>
            

            <div style="font-size:19px; font-weight:normal;">
                If you have any questions, concerns or mistakes about your initial filing, 
                please contact CSO Online Support at 
                <a 
                    href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca
                </a> and include 
                <span class="text-primary">your Online Package #{{packageNumber}}</span>.
            </div>

            <div class="mt-5">
                <h3>What happens at the Court Registry?</h3>
                <ul>
                    <li class="mb-2">
                        The court registry staff will check your documents to make sure they’ve been completed properly.
                    </li>                
                    <li class="mb-2">
                        If you are filing your application by email and you are asking for a protection order in your 
                        application, you will need to be prepared to <tooltip title="swear or affirm" index="0" /> the 
                        information in your application during your court appearance.
                    </li>
                    <li class="mb-2">
                        Once your application is complete, the registry staff will stamp the document, assign a court 
                        file number (if there isn't already one), schedule the court appearance, and return a copy 
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
                    @click="checklist=true;checklistType='FLM';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About a Family Law Matter
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('AAP')" 
                    @click="checklist=true;checklistType='PO';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About a Protection Order
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('NTRF')" 
                    @click="checklist=true;checklistType='RFC';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Notice to Resolve Family Claim
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('AXP')" 
                    @click="checklist=true;checklistType='PPM';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About Priority Parenting Matter
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('APRC')" 
                    @click="checklist=true;checklistType='RELOC';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Order Prohibiting the Relocation of a Child
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('ACMO')" 
                    @click="checklist=true;checklistType='ACMO';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application for Case Management Order
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('ACMW')" 
                    @click="checklist=true;checklistType='ACMW';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application for Case Management Order without Notice or Attendance
                </div>

                <div 
                    v-if="applicationDocumentTypes.includes('AFET')" 
                    @click="checklist=true;checklistType='AFET';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Application About Enforcement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RFA')" 
                    @click="checklist=true;checklistType='RFA';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File an Agreement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RDET')" 
                    @click="checklist=true;checklistType='RDET';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File a Determination of Parenting Coordinator
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RORD')" 
                    @click="checklist=true;checklistType='RORD';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request to File an Order
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('WRA')" 
                    @click="checklist=true;checklistType='WRA';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Written Response to Application
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RFLM')" 
                    @click="checklist=true;checklistType='RFLM';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Reply to a Family Law Matter
                </div>
                <div>
                    <div v-for="(docType, docIndex) in applicationDocumentTypes"           
                         v-bind:key="docIndex">
                        <div 
                            v-if="otherApplicationTypes.includes(docType)" 
                            @click="checklist=true;checklistType=docType;includesOtherForms=true;" 
                            style="color:blue; cursor:pointer;">
                            Checklist for {{ otherApplicationTypesInfo.filter(appType => appType.name == docType)[0].title }}
                        </div>
                    </div>
                </div>
                
                <div 
                    v-if="applicationDocumentTypes.includes('FS')" 
                    @click="checklist=true;checklistType='FS';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Financial Statement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('NPR')" 
                    @click="checklist=true;checklistType='NPR';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Notice of Intention to Proceed
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('RQS')" 
                    @click="checklist=true;checklistType='RQS';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Request for Scheduling
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('TRIS')" 
                    @click="checklist=true;checklistType='TRIS';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Trial Readiness Statment
                </div>     
                <div 
                    v-if="applicationDocumentTypes.includes('AFF')" 
                    @click="checklist=true;checklistType='AFF';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Affidavit – General
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('APS')" 
                    @click="checklist=true;checklistType='APS';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Affidavit of Personal Service
                </div>  
                <div 
                    v-if="applicationDocumentTypes.includes('APSP')" 
                    @click="checklist=true;checklistType='APSP';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Affidavit of Personal Service of Protection Order
                </div>    
                <div 
                    v-if="applicationDocumentTypes.includes('CSV')" 
                    @click="checklist=true;checklistType='CSV';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Certificate of Service
                </div>    
                <div 
                    v-if="applicationDocumentTypes.includes('CONA')" 
                    @click="checklist=true;checklistType='CONA';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Consent Adjournment
                </div>    
                <div 
                    v-if="applicationDocumentTypes.includes('CIFT')" 
                    @click="checklist=true;checklistType='CIFT';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Consent to an Informal Trial (Kamloops only)
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('EFSP')" 
                    @click="checklist=true;checklistType='EFSP';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Electronic Filing Statement
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('PASE')" 
                    @click="checklist=true;checklistType='PASE';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Notice of Exemption from Parenting Education Program
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('GA')" 
                    @click="checklist=true;checklistType='GA';includesOtherForms=false;"
                    style="color:blue; cursor:pointer;">
                    Checklist for Guardianship Affidavit
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('FF')" 
                    @click="checklist=true;checklistType='FF';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Fax Filing Cover Page
                </div>
                <div 
                    v-if="applicationDocumentTypes.includes('COR')" 
                    @click="checklist=true;checklistType='COR';includesOtherForms=false;" 
                    style="color:blue; cursor:pointer;">
                    Checklist for Consent Orders
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
                        <span style="font-size:1.2rem;" class="fa fa-question-circle" /> Where can I get legal assistance? 
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
                and include your <tooltip title="Court File Number" index="0"/> / Filing Location or
                <span class="text-primary">Online Package Number (<strong>{{packageNumber}}</strong>)</span>.
            </div>

        </div>
        <b-row class="mt-5">
            <b-button style="width:12rem; margin-left:1rem;" v-on:click="viewStatus()" variant="primary">Back to the Application Page</b-button>
            <b-button style="width:12rem; margin-left:auto;margin-right:1rem;" v-on:click="exitApplication()" variant="secondary">Exit Application</b-button>
        </b-row>

        <b-modal size="lg" v-model="checklist" header-class="bg-white border-0" no-close-on-backdrop hide-footer>
            <checklists :checklistType='checklistType' :applicationId='applicationId' :otherFormType="includesOtherForms"/>            
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
    showLegalAssistance = false;

    checklist = false;
    checklistType='';
    applicationId = '';
    applicationDocumentTypes = [];
    otherApplicationTypes = ['NCD', 'NDT', 'NLC', 'NLP', 'NP', 'NLCR', 'NLPR', 'ORD', 'REF', 'RFS', 'RPS'];
    includesOtherForms = false;

    otherApplicationTypesInfo = [        
        {name:'NCD',    title:'Notice of Address Change'},
        {name:'NPR',    title:'Notice of Intention to Proceed'},
        {name:'NDT',    title:'Notice of Discontinuance'},
        {name:'NLC',    title:'Notice of Lawyer for Child'},
        {name:'NLP',    title:'Notice of Lawyer for Party'},
        {name:'NP',     title:'Notice of Participation'},
        {name:'NLCR',   title:'Notice of Removal of Lawyer for Child'},
        {name:'NLPR',   title:'Notice of Removal of Lawyer for Party'},
        {name:'ORD',    title:'Order – General'},
        {name:'REF',    title:'Referral Request'},
        {name:'RFS',    title:'Request for Service of Documents'},
        {name:'RPS',    title:'Request for Service of Family Protection Order'}
    ];  
        
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
        this.includesOtherForms = false;

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

            const includesOrderActivities = stepGETSTART?.selectedActivity.includes('applyForOrder');
            const includesReplyActivities = stepGETSTART?.selectedActivity.includes('replyToApplication');

            const selectedForms = (includesOrderActivities && stepGETSTART?.selectedForms)?stepGETSTART.selectedForms:[];

            const selectedReplyForms = (includesReplyActivities && stepGETSTART?.selectedReplyForms)?stepGETSTART.selectedReplyForms:[];
         
            pathways = selectedForms.concat(selectedReplyForms);              

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

            if (pathways.includes('writtenResponse')){
                this.applicationDocumentTypes.push('WRA')
            }

            if (pathways.includes('replyFlm')){
                this.applicationDocumentTypes.push('RFLM')
            }

            //TODO: may need to remove this

            if (pathways.includes('noticeDiscontinuance')){
                this.applicationDocumentTypes.push('NDT')
            }

            //TODO: adjust based on new file types            

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
            
            if (pathways.length == 0 && stepGETSTART?.otherForms){                
                this.applicationDocumentTypes = stepGETSTART?.submittedPdfList;
                // this.includesOtherForms = this.otherApplicationTypes.some(otherAppType => this.applicationDocumentTypes.includes(otherAppType))
                
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