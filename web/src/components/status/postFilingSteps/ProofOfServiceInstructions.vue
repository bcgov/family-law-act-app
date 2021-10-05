<template>
    <b-card no-body bg-variant="white" border-variant="white">                           
        
        <p style="font-weight: 700;">
            Step {{step}}. 
            Provide Proof of Service 
        </p>

        <p>
            The court may need proof you had the documents personally served.
            The person serving the documents must complete a 
            <span 
                @click="displayForm7 = true;"
                style="color:blue; cursor:pointer;"> Certificate of Service Form 7
            </span>
             so that you can prove personal service of the 
            documents to the Certificate of Service. Remember to make a 
            copy before the documents are served.
        </p>

        <b-card 
            v-if="displayForm7"
            style="border:1px solid; border-radius:5px; height: 400px; overflow-y: auto;" 
            bg-variant="info" 
            class="mt-4 mb-4">
            <div style="width:10rem; display: block; margin-left: auto; margin-right: auto;">
                <b-button 
                    variant="success" 
                    @click='onPrint()'
                    >Save/Print 
                    <span class="fa fa-print "/>
                </b-button>
            </div>
            <div>
                <b-button 
                    style="margin-top:-2.45rem; float: right;"
                    variant="dark" 
                    @click='displayForm7 = false;'
                    >x
                </b-button>
            </div>  
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-3 mb-4 container" 
                id="print-form7">
                <form-7/>
            </b-card>
        </b-card>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';  
import moment from 'moment';
import Form7 from "../files/Form7.vue";

@Component({
    components:{
        Form7
    }
})
export default class ProofOfServiceInstructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @Prop({required: true})
    step!: string;    
    
    displayForm7 = false;
    
    public onPrint() { 
        const printId = "print-form7";
        const pdfName = "certificate-of-service-form-7";
        const pdf_type = 'TEMP';

        const el= document.getElementById(printId);
        const bottomLeftText = `"PFA 714  `+moment().format("MMMM D, YYYY")+ `\\a              Form 7";`;
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