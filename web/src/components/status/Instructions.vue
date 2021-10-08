<template>
    <div>    
        <b-card v-if="dataReady" no-body bg-variant="white" border-variant="white">

            <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
                            
            <p>
                If your document was accepted and stamped by the registry you will need to 
                complete the following steps as outlined in your checklist:
            </p>        

            <parenting-after-separation-instructions 
                v-if="conditionArray[0]"
                v-bind:instructionsStep="instructionsStepArray[0]"
                v-bind:applicationId="applicationId"
            />

            <arrange-for-service-flm-instructions 
                v-if="conditionArray[1]"
                v-bind:instructionsStep="instructionsStepArray[1]"  
                v-bind:applicationId="applicationId"
                v-bind:earlyResolution="earlyResolution"
                v-bind:applicationLocationInfo="applicationLocationInfo"
            />

            <give-filed-copy-of-notice-erp-instructions
                v-if="conditionArray[2]"
                v-bind:instructionsStep="instructionsStepArray[2]"  
            />

            <complete-early-resolution-process-erp-instructions
                v-if="conditionArray[3]"
                v-bind:instructionsStep="instructionsStepArray[3]"  
                v-bind:applicationId="applicationId"
                v-bind:earlyResolution="earlyResolution"
                v-bind:applicationLocationInfo="applicationLocationInfo"
            />    

            <arrange-for-service-po-instructions 
                v-if="conditionArray[4]"
                v-bind:instructionsStep="instructionsStepArray[4]"  
            />

            <review-stamped-document-po-instructions 
                v-if="conditionArray[5]"
                v-bind:instructionsStep="instructionsStepArray[5]"  
            />

            <complete-provide-for-registry-po-instructions 
                v-if="conditionArray[6]"
                v-bind:instructionsStep="instructionsStepArray[6]"  
            />

            <proof-of-service-instructions
                v-if="conditionArray[7]"
                v-bind:instructionsStep="instructionsStepArray[7]"  
                v-bind:applicationId="applicationId"/>
            
            <attend-court-appearance-instructions
                v-if="conditionArray[8]"
                v-bind:instructionsStep="instructionsStepArray[8]"  
            />
        
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

import ParentingAfterSeparationInstructions from "./postFilingSteps/ParentingAfterSeparationInstructions.vue";
import ProofOfServiceInstructions from "./postFilingSteps/ProofOfServiceInstructions.vue";
import ArrangeForServiceFlmInstructions from "./postFilingSteps/ArrangeForServiceFlmInstructions.vue";
import GiveFiledCopyOfNoticeErpInstructions from "./postFilingSteps/GiveFiledCopyOfNoticeErpInstructions.vue";
import CompleteEarlyResolutionProcessErpInstructions from "./postFilingSteps/CompleteEarlyResolutionProcessErpInstructions.vue"
import ArrangeForServicePoInstructions from "./postFilingSteps/ArrangeForServicePoInstructions.vue";
import ReviewStampedDocumentPoInstructions from "./postFilingSteps/ReviewStampedDocumentPoInstructions.vue";
import CompleteProvideForRegistryPoInstructions from "./postFilingSteps/CompleteProvideForRegistryPoInstructions.vue";
import AttendCourtAppearanceInstructions from "./postFilingSteps/AttendCourtAppearanceInstructions.vue";

@Component({
    components:{        
        ArrangeForServiceFlmInstructions,
        ProofOfServiceInstructions,
        ParentingAfterSeparationInstructions,
        ArrangeForServicePoInstructions,
        ReviewStampedDocumentPoInstructions,
        CompleteProvideForRegistryPoInstructions,
        AttendCourtAppearanceInstructions,
        GiveFiledCopyOfNoticeErpInstructions,
        CompleteEarlyResolutionProcessErpInstructions
    }
})
export default class Instructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;
    listOfselectedForms: string[] = [];
    urgentPO = false;
    earlyResolution = false;

    conditionArray: boolean[] = [];
    instructionsStepArray: number[] = [];

    dataReady = false;
    includeParentingAfterSeparationStep = false;
    includesFlm = false;
    includesPo = false;
    error = ''

    mounted(){
        this.dataReady = false;
        this.getApplicationInfo(this.applicationId);        
    } 

    public getApplicationInfo(applicationId) { 

        this.includeParentingAfterSeparationStep = false;
        this.includesFlm = false; 
        this.earlyResolution = false;
        this.includesPo = false;
        this.urgentPO = false;     
    
        this.$http.get('/app/'+ applicationId + '/')
        .then((response) => {

            const applicationData = response.data;  
           
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            const stepPO = this.getStepResultByName(applicationData, 'PO');
            const stepCOMM = this.getStepResultByName(applicationData, 'COMMON');

            if (stepGETSTART?.selectedForms){
                this.listOfselectedForms = stepGETSTART.selectedForms;
            }

            this.includesFlm = this.listOfselectedForms.includes('familyLawMatter'); 
            this.includesPo = this.listOfselectedForms.includes('protectionOrder');
            
            if(this.includesPo && stepPO?.urgencySurvey?.data?.PORNoNotice ){
                this.urgentPO = stepPO.urgencySurvey.data.PORNoNotice == "y";
            } else {
                this.urgentPO = false;
            }

            const applicationLocationName = applicationData.applicationLocation?applicationData.applicationLocation:'';

            if (this.includesFlm 
                    && Vue.filter('includedInRegistries')(applicationLocationName, 'early-resolutions')
                    && (stepCOMM?.filingLocationSurvey?.data?.MetEarlyResolutionRequirements == 'n')){
                this.earlyResolution = true;
            } else {
                this.earlyResolution = false;
            }

            
            this.applicationLocationInfo = this.locationsInfo.filter(locationInfo => locationInfo.name == applicationLocationName)[0];
            this.includeParentingAfterSeparationStep = this.includesFlm && (   
                   Vue.filter('includedInRegistries')(applicationLocationName, 'early-resolutions')
                || Vue.filter('includedInRegistries')(applicationLocationName, 'parenting-education')
                || Vue.filter('includedInRegistries')(applicationLocationName, 'family-justice')
                );


            //______TEMPORARY Check_________
            //______________________________
            // this.includeParentingAfterSeparationStep = true;
            // this.includesFlm = true 
            // this.earlyResolution = true
            // this.includesPo = false
            // this.urgentPO = false

            // console.log("_new set__")
            // console.log(this.includeParentingAfterSeparationStep);
            // console.log(this.includesFlm); 
            // console.log(this.earlyResolution);
            // console.log(this.includesPo);
            // console.log(this.urgentPO);

            this.getConditionsSteps();
            Vue.nextTick(()=> this.dataReady = true);
            

        }, err => {
            this.error = err;        
        });
    }

    public getConditionsSteps(){

        //parenting-after-separation-instructions 
        this.conditionArray[0] = this.includeParentingAfterSeparationStep;
        this.instructionsStepArray[0] = 0;     

        //arrange-for-service-flm-instructions 
        this.conditionArray[1] = this.includesFlm && !this.earlyResolution ;
        this.instructionsStepArray[1] = 0;

        //give-filed-copy-of-notice-erp-instructions
        this.conditionArray[2] =  this.includesFlm && this.earlyResolution;
        this.instructionsStepArray[2] = 0; 

        //complete-early-resolution-process-erp-instructions        
        this.conditionArray[3] =  this.includesFlm && this.earlyResolution;
        this.instructionsStepArray[3] = 0; 
               
        //arrange-for-service-po-instructions 
        this.conditionArray[4] =  this.includesPo && !this.urgentPO;
        this.instructionsStepArray[4] = 0;

        //review-stamped-document-po-instructions 
        this.conditionArray[5] = this.includesPo && this.urgentPO;
        this.instructionsStepArray[5] = 0;

        //complete-provide-for-registry-po-instructions 
        this.conditionArray[6] = this.includesPo && this.urgentPO;
        this.instructionsStepArray[6] = 0;

        //proof-of-service-instructions
        this.conditionArray[7] = (this.includesFlm && !this.includesPo) || (this.includesPo && !this.urgentPO);
        this.instructionsStepArray[7] = 0;
        
        //attend-court-appearance-instructions
        this.conditionArray[8] = this.includesPo 
        this.instructionsStepArray[8] = 0;
        
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
                
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">
   
</style>