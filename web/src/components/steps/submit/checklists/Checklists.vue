<template>
    <div v-if="dataReady"> 
        <div style="width:10rem; margin:-2.5rem auto; transform:translate(0, -1.85rem);">
            <b-button variant="success" @click='onPrint()'>Save/Print <span class="ml-2 fa fa-print "/></b-button>
        </div>
        <b-card id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="mt-3 mb-4 container" no-body>
            <flm-checklist v-if="checklistType=='FLM'" :applicationId='applicationId'/>
            <po-checklist v-else-if="checklistType=='PO'" :applicationId='applicationId'/>
            <EarlyResolutionsChecklist v-else-if="checklistType=='RFC'" :applicationId='applicationId'/>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import moment from 'moment';
import PoChecklist from "./PoChecklist.vue";
import FlmChecklist from "./FlmChecklist.vue";
import EarlyResolutionsChecklist from "./EarlyResolutionsChecklist.vue";

@Component({
    components:{        
        PoChecklist,
        FlmChecklist,
        EarlyResolutionsChecklist
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
        {name:'RFC', title:'Notice to Resolve Family Claim', pdfName:'Checklist_for_Notice_To_Resolve_Family_Claim.pdf'}
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