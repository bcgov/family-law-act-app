<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;">
            Step {{step}}.             
            Arrange for service of the Application About a Family Law Matter on each other party
        </p>  

        <p>
            Normally, each other party named in the Application About a Family 
            Law Matter must be given a copy of the following documents by 
            personal service:
            <ul>
                <li>
                    The filed copy of your Application About a Family Law Matter;    
                </li>
                <li @click="displayInstructionsFile = true;"  style="color:blue; cursor:pointer;">
                    Instructions about how to file a reply and 
                    obtaining Form 6 for filing a reply, and;                    
                </li>                
                <li>
                    Any other documents you filed with the 
                    Application About a Family Law Matter, 
                    including a Financial Statement if applicable.                    
                </li>
            </ul>
        </p>        

        <b-card 
            v-if="displayInstructionsFile"
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
                    @click='displayInstructionsFile = false;'
                    >x
                </b-button>
            </div>       
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-3 mb-4 container" 
                id="print-instructions">
                <family-law-matter-instructions                    
                    :locationInfo='applicationLocationInfo' 
                    :earlyResolution='earlyResolution'/>               
            </b-card>
        </b-card>

        <p>
            Personal service requires that an adult (at least 19 years old) 
            who is not a party hand-deliver the documents to the party to be served.
        </p>

        <p>    
            <b>Note:</b> 
            If your application is to change, cancel, set aside or replace a written 
            agreement about child support or spousal support that is filed with the 
            Director of Maintenance Enforcement, you must serve a copy of the application 
            on the director. The Director of Maintenance Enforcement can be served by 
            mailing the documents to the postal address provided by the director. 
            Contact the Family Maintenance Enforcement Program to find out how best to serve them.
        </p>
        


    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

import { locationsInfoType } from '@/types/Common';
import FamilyLawMatterInstructions from "../files/FamilyLawMatterInstructions.vue";

@Component({
    components:{        
        FamilyLawMatterInstructions        
    }
})
export default class ArrangeForServiceFlmInstructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @Prop({required: true})
    earlyResolution!: boolean;

    @Prop({required: true})
    step!: string;
    
    @Prop({required: true})
    applicationLocationInfo!: locationsInfoType;

    displayInstructionsFile = false;    
    
    public onPrint() {
        const printId = "print-instructions";
        const pdfName = "instructions-for-filing-a-reply"; 
        const pdf_type = 'TEMP'; 
        const el= document.getElementById(printId);
        
        const bottomLeftText = `"Ministry of Attorney General \\a     Court Services Branch  ";`;
        const bottomRightText = `"Mailing address: ` + this.applicationLocationInfo.name +  `\\a ` + this.applicationLocationInfo.address +`\\a  "`;
        
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