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
            <stnd-checklist v-if="checklistType=='STND'" :applicationId='applicationId'/>
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
        StndChecklist
    }
})
export default class Checklists extends Vue {

    @Prop({required: true})
    applicationId!: string;
    
    @Prop({required: true})
    checklistType!: string;

    dataReady = false;
    checklist;

    checklists=[
        {name:'FLM', title:'Application About a Family Law Matter', pdfName:'Checklist_for_Family_Law_Matter.pdf'},
        {name:'PO', title:'Application about a Protection Order', pdfName:'Checklist_for_Protection_Order.pdf'},
        {name:'RFC', title:'Notice to Resolve Family Claim', pdfName:'Checklist_for_Notice_To_Resolve_Family_Claim.pdf'},
        {name:'PPM', title:'Application About Priority Parenting Matter', pdfName:'Checklist_for_Priority_Parenting_Matter.pdf'},
        {name:'RELOC', title:'Application for Order Prohibiting the Relocation of a Child', pdfName:'Checklist_for_Order_Prohibiting_the_Relocation_of_a_Child.pdf'},
        {name:'ACMW', title:'Application for Case Management Order Without Notice or Attendance', pdfName:'Checklist_for_Case_Management_Order_Without_Notice_or_Attendance.pdf'},
        {name:'ACMO', title:'Application for Case Management Order', pdfName:'Checklist_for_Application_for_Case_Management_Order.pdf'},        
        {name:'RFA', title:'Request to File an Agreement', pdfName:'Checklist_for_Request_to_File_an_Agreement.pdf'},
        {name:'AFET', title:'Application About Enforcement', pdfName:'Checklist_for_Application_About_Enforcement.pdf'},
        {name:'RDET', title:'Request to File a Determination of Parenting Coordinator', pdfName:'Checklist_for_Request_to_File_a_Determination_of_Parenting_Coordinator.pdf'},
        {name:'RORD', title:'Request to File an Order', pdfName:'Checklist_for_Request_to_File_an_Order.pdf'},
        {name:'WRA', title:'Request to File an Order', pdfName:'Checklist_for_Written_Response_to_Application.pdf'},
        {name:'RFLM', title:'Reply to Application About a Family Law Matter', pdfName:'Checklist_for_Reply_to_Family_Law_Matter.pdf'},
        {name:'STND', title:'Standalone', pdfName:'Checklist_for_Standalone.pdf'}
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