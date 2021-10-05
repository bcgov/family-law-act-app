<template>
    <b-card no-body bg-variant="white" border-variant="white">           

        <p style="font-weight: 700;">
            Step 1. Requirement for Parenting After Separation Education:
        </p>

        <p>
            The court rules require that you complete the 
            <span 
                style="color:blue; cursor:pointer;" 
                @click="displayParentingAfterSeparation = true;">
                PAS (Parenting After Separation) program
            </span> 
            before you go to Provincial Court to obtain or change an order for child 
            support, guardianship, parenting arrangements or contact with a child. 
        </p>

        <p>
            Note:  In certain circumstances, you may be able to apply for an 
            exemption from this requirement.  For further information or 
            to apply for an exemption: download
            <a 
                href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa740.pdf?forcedownload=true"
                target="_blank"> Form 20
            </a>.    
        </p>

        <b-card 
            v-if="displayParentingAfterSeparation"
            style="border:1px solid; border-radius:5px; height: 400px; overflow-y: auto;" 
            bg-variant="info" 
            class="mt-4 mb-4">
            <div style="width:10rem;  margin:0 auto;">
                <b-button
                    variant="success" 
                    @click='onPrint()'
                    >Save/Print 
                    <span class="ml-2 fa fa-print "/>
                </b-button>
            </div>
            <div>
                <b-button 
                    style="margin-top:-2.45rem; float: right;"
                    variant="dark" 
                    @click='displayParentingAfterSeparation = false;'
                    >x
                </b-button>
            </div>            
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-3 mb-4 container" 
                id="print-parenting-after-separation">
                <parenting-after-separation />                
            </b-card>
        </b-card> 

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';  
import ParentingAfterSeparation from "../files/ParentingAfterSeparation.vue";

@Component({
    components:{
        ParentingAfterSeparation
    }
})
export default class ParentingAfterSeparationInstructions extends Vue {

    @Prop({required: true})
    applicationId!: string;
    
    displayParentingAfterSeparation = false;
    
    public onPrint() { 
        const printId = "print-parenting-after-separation";
        const pdfName = "parenting-after-separation";
        const pdf_type = 'TEMP'; 
        
        const el= document.getElementById(printId);
                
        const bottomLeftText = ``;        
        const bottomRightText = ``;
        
        const url = '/survey-print/'+this.applicationId+'/?name=' + pdfName + '&pdf_type='+pdf_type+'&version=1.0&noDownload=true'
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
                this.onPrintSave(pdfName)
        },err => {
            console.error(err);        
        });
    }

    public onPrintSave(pdfName: string){        
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
            link.download = pdfName;
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