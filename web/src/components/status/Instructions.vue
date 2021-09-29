<template>
    <b-card v-if="dataReady" no-body bg-variant="white">

        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
                           
        <p>
            If your document was accepted and stamped by the registry you will need to 
            complete the following steps as outlined in your checklist:
        </p>

        <p v-if="includeParentingAfterSeparationStep" style="font-weight: 700;">
            Step 1. Requirement for Parenting After Separation Education:
        </p>

        <p v-if="includeParentingAfterSeparationStep">
            The court rules require that you complete the 
            <span 
                style="color:blue; cursor:pointer;" 
                @click="displayParentingAfterSeparation = true;">
                PAS (Parenting After Separation) program
            </span> 
            before you go to Provincial Court to obtain or change an order for child 
            support, guardianship, parenting arrangements or contact with a child. 
        </p>

        <p v-if="includeParentingAfterSeparationStep">
            Note:  In certain circumstances, you may be able to apply for an 
            exemption from this requirement.  For further information or 
            to apply for an exemption: download
            <a 
                href="https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/courthouse-services/court-files-records/court-forms/family/pfa740.pdf?forcedownload=true"
                target="_blank"> Form 20
            </a>.    
        </p>

        <b-card 
            v-if="includeParentingAfterSeparationStep && displayParentingAfterSeparation"
            style="border:1px solid; border-radius:5px; height: 400px; overflow-y: auto;" 
            bg-variant="info" 
            class="mt-4 mb-4">
            <div style="width:10rem; display: block; margin-left: auto; margin-right: auto;">
                <b-button 
                    variant="success" 
                    @click='onPrint("print-parenting-after-separation", "parenting-after-separation")'
                    >Save/Print 
                    <span class="fa fa-print "/>
                </b-button>
            </div>
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-4 mb-4" 
                id="print-parenting-after-separation">
                <parenting-after-separation />                
            </b-card>
        </b-card>

        <p style="font-weight: 700;">
            Step 
            <span v-if="includeParentingAfterSeparationStep">2. </span>
            <span v-else>1. </span>
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
                    @click='onPrint("print-instructions", "instructions-for-filing-a-reply")'
                    >Save/Print 
                    <span class="fa fa-print "/>
                </b-button>
            </div>
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-4 mb-4" 
                id="print-instructions">
                <family-law-matter-instructions 
                    v-if="listOfPdfs.includes('NTRF')" 
                    :locationInfo='applicationLocationInfo' 
                    :earlyResolution='true'/>
                <family-law-matter-instructions 
                    v-if="listOfPdfs.includes('FLC')" 
                    :locationInfo='applicationLocationInfo' 
                    :earlyResolution='false'/>
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

        <p style="font-weight: 700;">
            Step
            <span v-if="includeParentingAfterSeparationStep">3. </span>
            <span v-else>2. </span>
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
                    @click='onPrint("print-form7", "certificate-of-service-form-7")'
                    >Save/Print 
                    <span class="fa fa-print "/>
                </b-button>
            </div>
            <b-card
                style="border:1px solid; border-radius:5px;" 
                bg-variant="white" 
                border-variant="white"
                class="mt-4 mb-4" 
                id="print-form7">
                <form-7/>
            </b-card>
        </b-card>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';  

import { namespace } from "vuex-class";

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");

import FamilyLawMatterInstructions from "./files/FamilyLawMatterInstructions.vue";
import Form7 from "./files/Form7.vue";
import ParentingAfterSeparation from "./files/ParentingAfterSeparation.vue";


@Component({
    components:{        
        FamilyLawMatterInstructions,
        Form7,
        ParentingAfterSeparation
    }
})
export default class Instructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @Prop({required: true})
    listOfPdfs!: string[];

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;

    dataReady = false;
    includeParentingAfterSeparationStep = false;

    displayInstructionsFile = false;
    displayParentingAfterSeparation = false;
    displayForm7 = false;
    error = ''

    mounted(){
        this.dataReady = false;
        this.getApplicationInfo(this.applicationId);
        Vue.nextTick(()=> this.dataReady = true);
    }    


    public getApplicationInfo(applicationId) {      
    
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;           
            
            const applicationLocationName = applicationData.applicationLocation?applicationData.applicationLocation:'';
            this.applicationLocationInfo = this.locationsInfo.filter(locationInfo => locationInfo.name == applicationLocationName)[0];
            this.includeParentingAfterSeparationStep = Vue.filter('includedInRegistries')(applicationLocationName, 'early-resolutions')
                                                        || Vue.filter('includedInRegistries')(applicationLocationName, 'parenting-education')
                                                        || Vue.filter('includedInRegistries')(applicationLocationName, 'family-justice');  
            

        }, err => {
            this.error = err;        
        });
    }  
    
    public onPrint(printId: string, pdfName: string) { 
        const pdf_type = 'TEMP'; 
        const el= document.getElementById(printId);
        const bottomLeftTextCondition = (printId == 'print-parenting-after-separation')?``:`"Ministry of Attorney General Court Services Branch  ";`;
        const bottomLeftText = (printId == 'print-form7')?`"PFA 714    05/2021 \\a           Form 7";`:bottomLeftTextCondition;
        const bottomRightTextCondition = (printId == 'print-parenting-after-separation')?``:`"Mailing address: \\a           Victoria"` //+ this.applicationLocationInfo.name + `", \\a"`;// + this.applicationLocationInfo.address;
        const bottomRightText = (printId == 'print-form7')?``:bottomRightTextCondition;
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

<style scoped>   
    .card {
        border: white;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
   
</style>
