<template>
    <div v-if="dataReady"> 
        <div style="width:10rem; margin:-2.5rem auto; transform:translate(0, -1.85rem);">
            <b-button variant="success" @click='onPrint()'>Save/Print <span class="ml-2 fa fa-print "/></b-button>
        </div>
        <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-3 mb-4 container" no-body>
            <flm-checklist v-if="checklistType=='FLM'" :applicationId='applicationId'/>
            <po-checklist v-else-if="checklistType=='PO'" :applicationId='applicationId'/>
            <early-resolutions-checklist v-else-if="checklistType=='RFC'" :applicationId='applicationId'/>
            <ppm-checklist v-else-if="checklistType=='PPM'" :applicationId='applicationId'/>
            <reloc-checklist v-else-if="checklistType=='RELOC'" :applicationId='applicationId'/>
            <cm-without-notice-checklist v-else-if="checklistType=='ACMW'" :applicationId='applicationId'/>
            <cm-with-notice-checklist v-else-if="checklistType=='ACMO'" :applicationId='applicationId'/>
            <enfrc-file-agreement-checklist v-else-if="checklistType=='RFA'" :applicationId='applicationId'/>
            <enfrc-checklist v-else-if="checklistType=='AFET'" :applicationId='applicationId'/>
            <enfrc-file-determination-of-parenting-coordinator-checklist v-else-if="checklistType=='RDET'" :applicationId='applicationId'/>
            <enfrc-file-order-checklist v-else-if="checklistType=='RORD'" :applicationId='applicationId'/>
            <wr-checklist v-else-if="checklistType=='WRA'" :applicationId='applicationId'/>
            <rflm-checklist v-if="checklistType=='RFLM'" :applicationId='applicationId'/>
            <stnd-checklist v-if="otherFormType" :applicationId='applicationId' :checklistInfo="checklist"/>
            <fs-checklist v-if="checklistType=='FS'" :applicationId='applicationId'/>
            <npr-checklist v-if="checklistType=='NPR'" :applicationId='applicationId'/>
            <rqs-checklist v-if="checklistType=='RQS'" :applicationId='applicationId'/>
            <tris-checklist v-if="checklistType=='TRIS'" :applicationId='applicationId'/>
            <aff-checklist v-if="checklistType=='AFF'" :applicationId='applicationId'/>
            <aps-checklist v-if="checklistType=='APS'" :applicationId='applicationId'/>
            <apsp-checklist v-if="checklistType=='APSP'" :applicationId='applicationId'/>
            <csv-checklist v-if="checklistType=='CSV'" :applicationId='applicationId'/>
            <cona-checklist v-if="checklistType=='CONA'" :applicationId='applicationId'/>
            <cift-checklist v-if="checklistType=='CIFT'" :applicationId='applicationId'/>
            <efsp-checklist v-if="checklistType=='EFSP'" :applicationId='applicationId'/>
            <pase-checklist v-if="checklistType=='PASE'" :applicationId='applicationId'/>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import moment from 'moment';
import PoChecklist from "./PoChecklist.vue";
import FlmChecklist from "./FlmChecklist.vue";
import RflmChecklist from "./RflmChecklist.vue";
import PpmChecklist from "./PpmChecklist.vue";
import RelocChecklist from "./RelocChecklist.vue";
import CmWithNoticeChecklist from "./CmWithNoticeChecklist.vue";
import CmWithoutNoticeChecklist from "./CmWithoutNoticeChecklist.vue";
import EnfrcFileAgreementChecklist from "./EnfrcFileAgreementChecklist.vue";
import EnfrcChecklist from "./EnfrcChecklist.vue";
import EnfrcFileDeterminationOfParentingCoordinatorChecklist from "./EnfrcFileDeterminationOfParentingCoordinatorChecklist.vue";
import EnfrcFileOrderChecklist from "./EnfrcFileOrderChecklist.vue";
import EarlyResolutionsChecklist from "./EarlyResolutionsChecklist.vue";
import WrChecklist from "./WrChecklist.vue";
import StndChecklist from "./StndChecklist.vue";
import FsChecklist from "./FsChecklist.vue";
import NprChecklist from "./NprChecklist.vue";
import TrisChecklist from "./TrisChecklist.vue";
import RqsChecklist from "./RqsChecklist.vue";
import AffChecklist from "./AffChecklist.vue";
import ApsChecklist from "./ApsChecklist.vue";
import ApspChecklist from "./ApspChecklist.vue";
import CsvChecklist from "./CsvChecklist.vue";
import ConaChecklist from "./ConaChecklist.vue";
import CiftChecklist from "./CiftChecklist.vue";
import EfspChecklist from "./EfspChecklist.vue";
import PaseChecklist from "./PaseChecklist.vue";

@Component({
    components:{        
        PoChecklist,
        FlmChecklist,
        RflmChecklist,
        PpmChecklist,
        RelocChecklist,
        CmWithNoticeChecklist,
        CmWithoutNoticeChecklist,
        EnfrcFileAgreementChecklist,
        EnfrcChecklist,
        EnfrcFileDeterminationOfParentingCoordinatorChecklist,
        EnfrcFileOrderChecklist,
        EarlyResolutionsChecklist,
        WrChecklist,
        StndChecklist,
        FsChecklist,
        NprChecklist,
        TrisChecklist,
        RqsChecklist,
        AffChecklist,
        ApsChecklist,
        ApspChecklist,
        CsvChecklist,
        ConaChecklist,
        CiftChecklist,
        EfspChecklist,
        PaseChecklist
    }
})
export default class Checklists extends Vue {

    @Prop({required: true})
    applicationId!: string;
    
    @Prop({required: true})
    checklistType!: string;

    @Prop({required: false})
    otherFormType!: boolean;

    dataReady = false;
    checklist;

    checklists=[
        {name:'FLM',    title:'Application About a Family Law Matter',                              pdfName:'Checklist_for_Family_Law_Matter.pdf'},
        {name:'PO',     title:'Application about a Protection Order',                               pdfName:'Checklist_for_Protection_Order.pdf'},
        {name:'RFC',    title:'Notice to Resolve Family Claim',                                     pdfName:'Checklist_for_Notice_To_Resolve_Family_Claim.pdf'},
        {name:'PPM',    title:'Application About Priority Parenting Matter',                        pdfName:'Checklist_for_Priority_Parenting_Matter.pdf'},
        {name:'RELOC',  title:'Application for Order Prohibiting the Relocation of a Child',        pdfName:'Checklist_for_Order_Prohibiting_the_Relocation_of_a_Child.pdf'},
        {name:'ACMW',   title:'Application for Case Management Order Without Notice or Attendance', pdfName:'Checklist_for_Case_Management_Order_Without_Notice_or_Attendance.pdf'},
        {name:'ACMO',   title:'Application for Case Management Order',                              pdfName:'Checklist_for_Application_for_Case_Management_Order.pdf'},        
        {name:'RFA',    title:'Request to File an Agreement',                                       pdfName:'Checklist_for_Request_to_File_an_Agreement.pdf'},
        {name:'AFET',   title:'Application About Enforcement',                                      pdfName:'Checklist_for_Application_About_Enforcement.pdf'},
        {name:'RDET',   title:'Request to File a Determination of Parenting Coordinator',           pdfName:'Checklist_for_Request_to_File_a_Determination_of_Parenting_Coordinator.pdf'},
        {name:'RORD',   title:'Request to File an Order',                                           pdfName:'Checklist_for_Request_to_File_an_Order.pdf'},
        {name:'WRA',    title:'Request to File an Order',                                           pdfName:'Checklist_for_Written_Response_to_Application.pdf'},
        {name:'RFLM',   title:'Reply to Application About a Family Law Matter',                     pdfName:'Checklist_for_Reply_to_Family_Law_Matter.pdf'},
        {name:'OTHER',  title:'Other Forms',                                                        pdfName:'Checklist_for_Other_Forms.pdf'},        
        {name:'FS',     title:'Financial Statement',                                                pdfName:'Checklist_for_Financial_Statement.pdf'},
        {name:'NPR',    title:'Notice of Intention to Proceed',                                     pdfName:'Checklist_for_Notice_of_Intention_to_Proceed.pdf'},
        {name:'RQS',    title:'Request for Scheduling',                                             pdfName:'Checklist_for_Request_for_Scheduling.pdf'},
        {name:'TRIS',   title:'Trial Readiness Statment',                                           pdfName:'Checklist_for_Trial_Readiness_Statment.pdf'},
        {name:'NCD',    title:'Notice of Address Change',                                           pdfName:'Checklist_for_Notice_of_Address_Change.pdf'},
        {name:'NDT',    title:'Notice of Discontinuance',                                           pdfName:'Checklist_for_Notice_of_Discontinuance.pdf'},
        {name:'NLC',    title:'Notice of Lawyer for Child',                                         pdfName:'Checklist_for_Notice_of_Lawyer_for_Child.pdf'},
        {name:'NLP',    title:'Notice of Lawyer for Party',                                         pdfName:'Checklist_for_Notice_of_Lawyer_for_Party.pdf'},
        {name:'NP',     title:'Notice of Participation',                                            pdfName:'Checklist_for_Notice_of_Participation.pdf'},
        {name:'NLCR',   title:'Notice of Removal of Lawyer for Child',                              pdfName:'Checklist_for_Notice_of_Removal_of_Lawyer_for_Child.pdf'},
        {name:'NLPR',   title:'Notice of Removal of Lawyer for Party',                              pdfName:'Checklist_for_Notice_of_Removal_of_Lawyer_for_Party.pdf'},
        {name:'ORD',    title:'Order – General',                                                    pdfName:'Checklist_for_Order_General.pdf'},
        {name:'REF',    title:'Referral Request',                                                   pdfName:'Checklist_for_Referral_Request.pdf'},
        {name:'RFS',    title:'Request for Service of Documents',                                   pdfName:'Checklist_for_Request_for_Service_of_Documents.pdf'},
        {name:'RPS',    title:'Request for Service of Family Protection Order',                     pdfName:'Checklist_for_Request_for_Service_of_Family_Protection_Order.pdf'},
        {name:'AFF',    title:'Affidavit – General',                                                pdfName:'Checklist_for_Affidavit_General.pdf'},
        {name:'APS',    title:'Affidavit of Personal Service',                                      pdfName:'Checklist_for_Affidavit_of_Personal_Service.pdf'},
        {name:'APSP',   title:'Affidavit of Personal Service of Protection Order',                  pdfName:'Checklist_for_Affidavit_of_Personal_Service_of_Protection_Order.pdf'},
        {name:'CSV',    title:'Certificate of Service',                                             pdfName:'Checklist_for_Certificate_of_Service.pdf'},
        {name:'CONA',   title:'Consent adjournment',                                                pdfName:'Checklist_for_Consent_Adjournment.pdf'},
        {name:'CIFT',   title:'Consent to an Informal Trial (Kamloops only)',                       pdfName:'Checklist_for_Consent_to_an_Informal_Trial_(Kamloops_only).pdf'},
        {name:'EFSP',   title:'Electronic Filing Statement',                                        pdfName:'Checklist_for_Electronic_Filing_Statement.pdf'},
        {name:'PASE',   title:'Notice of Exemption from Parenting Education Program',               pdfName:'Checklist_for_Notice_of_Exemption_from_Parenting_Education_Program.pdf'},
    
    ]    

    mounted(){       
        this.dataReady = false;
        this.checklist = this.checklists.filter(checklist=>checklist.name ==this.checklistType)[0];
        Vue.nextTick(()=> this.dataReady = true)
    }

    public onPrint() { 
        const pdf_type = 'TEMP'  
        const pdf_name = "application-about-a-protection-order";  
        const el= document.getElementById("print");
        const bottomLeftText = `"Checklist for the `+this.checklist.title+`,   `+moment().format("MMMM D, YYYY")+` ";`;
        const bottomRightText = `" "`
        const url = '/survey-print/'+this.applicationId+'/?name=' + pdf_name + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );
        
        const body = {
            'html':pdfhtml,
            'json_data':null
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  

        this.$http.post(url,body, options)
        .then(res => {
                this.onPrintSave()
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(){        
        const url = '/survey-print/'+this.applicationId+'/?pdf_type=TEMP'
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
            link.download = this.checklist.pdfName;
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);            
        },err => {
            console.error(err);
        });
    }


}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>