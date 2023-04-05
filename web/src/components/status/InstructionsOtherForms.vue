<template>
    <div>    
        <b-card v-if="dataReady" no-body bg-variant="white" border-variant="white">

            <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
                            
            <p>
                If your document was accepted and stamped by the registry you will need to 
                complete the following steps as outlined in your checklist:
            </p>        

           
        
        </b-card>
        <loading-spinner v-else waitingText="Waiting for submitted information"/>  
    </div>   
</template>

<script lang="ts">    
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
import { locationsInfoType } from '@/types/Common';
const commonState = namespace("Common");


@Component({
    components:{        
        
    }
})
export default class InstructionsOtherForms extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;


    conditionArray: boolean[] = [];
    instructionsStepArray: number[] = [];

    dataReady = false;

    includesFlm = false;
    includesPo = false;
  
    error = ''

    mounted(){
        this.dataReady = false;
        this.getApplicationInfo(this.applicationId);        
    } 

    public getApplicationInfo(applicationId) { 


        this.includesFlm = false;
        this.includesPo = false;

    
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;
            console.log(applicationData)  
           
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            


            // //______TEMPORARY Check_________
            // //______________________________
            // this.includeParentingAfterSeparationStep = false;
            // this.includesFlm = false; 
            // this.earlyResolution = false;
            // this.includesPo = false;
            // this.urgentPO = false;
            
            // this.includesCm = false;
            // this.includeCmWithoutNotice = false;
            // this.includesPpm = false;
            // this.includesReloc = false;
            // this.includesEnfrc = false;

            // this.includesWr = false;
            // this.includesRflm = false;

            // console.error("_new set__")
            // console.log('Separation',this.includeParentingAfterSeparationStep);
            // console.log('FLM',this.includesFlm); 
            // console.log('earlyResolu',this.earlyResolution);
            // console.log('PO',this.includesPo);
            // console.log('urgentPO',this.urgentPO);

            // console.log('PPM',this.includesPpm)
            // console.log('CM',this.includesCm)
            // console.log('CMwithout',this.includeCmWithoutNotice)
            // console.log('RELOC',this.includesReloc)
            // console.log('ENFRC',this.includesEnfrc)
            // //______________________________ 
            
           

            this.getConditionsSteps();
            Vue.nextTick(()=> this.dataReady = true);
            

        }, err => {
            this.error = err;        
        });
    }

    public getConditionsSteps(){

        //parenting-after-separation-instructions 
        this.conditionArray[0] = false//this.includeParentingAfterSeparationStep;
        this.instructionsStepArray[0] = 0;     

      


        //================Adjust Step Numbers===========
        let stepNum = 1;
        for(let i =0; i<this.conditionArray.length; i++){
            if(this.conditionArray[i]){
                this.instructionsStepArray[i] = stepNum;
                stepNum++;
            }
        }


    }
    
    public getStepResultByName(applicationData, stepName){
        if(applicationData?.steps){
            const steps = applicationData.steps.filter(step => step.name == stepName);
            if(steps.length == 1) return steps[0].result
        }
        return {}
    }
       
//F// Affidavit – General	Form 3
//F// Affidavit of Personal service	Form 48
// Affidavit of Personal Service of Protection Order	Form 49
//F// Certificate of Service	Form 7
// Consent adjournment	PFA920
//F// Consent Order	Form 18
// Consent to an Informal Trial (Kamloops only)	PFA709
// Electronic Filing Statement	Form 51
// Fax Filing Cover Page	Form 52
// Financial Statement	Form 4
// Guardianship Affidavit	Form 5
// Notice of Address Change	Form 46
// Notice of Discontinuance	Form 50
// Notice of Exemption from Parenting Education Program	Form 20
// Notice of Intention to Proceed	Form 2
// Notice of Lawyer for Child	Form 40
// Notice of Lawyer for Party	Form 42
// Notice of Participation	PFA747
// Notice of Removal of Lawyer for Child	Form 41
// Notice of Removal of Lawyer for Party	Form 43
// Order – General	Form 44
// Referral Request	Form 21
// Request for Scheduling	Form 39
// Request for Service of Documents	PFA110
// Request for Service of Family Protection Order	PFA916
// Trial Readiness Statement	Form 22

}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">
   
</style>