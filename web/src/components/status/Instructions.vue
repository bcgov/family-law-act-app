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

            <arrange-for-service-cm-ppm-reloc-enfrc-instructions
                v-if="conditionArray[7]"
                v-bind:instructionsStep="instructionsStepArray[7]"
                applicationName="for Case Management Order"
            />

            <wait-for-judge-to-review
                v-if="conditionArray[8]"
                v-bind:instructionsStep="instructionsStepArray[8]"  
            />

            <serve-copy-of-order-on-other-party
                v-if="conditionArray[9]"
                v-bind:instructionsStep="instructionsStepArray[9]"  
            />

            <arrange-for-service-cm-ppm-reloc-enfrc-instructions
                v-if="conditionArray[10]"
                v-bind:instructionsStep="instructionsStepArray[10]"
                applicationName="about Priority Parenting Matter"
            />

            <arrange-for-service-cm-ppm-reloc-enfrc-instructions
                v-if="conditionArray[11]"
                v-bind:instructionsStep="instructionsStepArray[11]"
                applicationName="for Order Prohibiting the Relocation of a Child"
            />

            <arrange-for-service-cm-ppm-reloc-enfrc-instructions
                v-if="conditionArray[12]"
                v-bind:instructionsStep="instructionsStepArray[12]"
                applicationName="about Enforcement"  
            />


            <proof-of-service-instructions
                v-if="conditionArray[13]"
                v-bind:instructionsStep="instructionsStepArray[13]"  
                v-bind:applicationId="applicationId"/>
            
            <attend-court-appearance-instructions
                v-if="conditionArray[14]"
                v-bind:instructionsStep="instructionsStepArray[14]"
                :byConsent="applicationByConsent"  
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

import ArrangeForServiceCmPpmRelocEnfrcInstructions from "./postFilingSteps/ArrangeForServiceCmPpmRelocEnfrcInstructions.vue"
import WaitForJudgeToReview from "./postFilingSteps/WaitForJudgeToReview.vue"
import ServeCopyOfOrderOnOtherParty from "./postFilingSteps/ServeCopyOfOrderOnOtherParty.vue"
import {whichCaseMgmtForm} from "@/components/steps/caseMgmt/reviewCM/RequiredForm"

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
        CompleteEarlyResolutionProcessErpInstructions,
        ArrangeForServiceCmPpmRelocEnfrcInstructions,
        WaitForJudgeToReview,
        ServeCopyOfOrderOnOtherParty
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
    includesPpm = false;
    includesCm = false;
    includesReloc = false;
    includesEnfrc = false;
    includeCmWithoutNotice = false;
    includeCmWithNotice = false;
    applicationByConsent = false;

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
            const stepCM = this.getStepResultByName(applicationData, 'CM');

            if (stepGETSTART?.selectedForms){
                this.listOfselectedForms = stepGETSTART.selectedForms;
            }

            this.includesFlm = this.listOfselectedForms.includes('familyLawMatter'); 
            this.includesPo = this.listOfselectedForms.includes('protectionOrder');
            this.includesPpm = this.listOfselectedForms.includes('priorityParenting'); 
            this.includesCm = this.listOfselectedForms.includes('caseMgmt');
            this.includesReloc = this.listOfselectedForms.includes('childReloc'); 
            this.includesEnfrc = this.listOfselectedForms.includes('agreementEnfrc');
            
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


            // //______TEMPORARY Check_________
            // //______________________________
            // this.includeParentingAfterSeparationStep = false;
            // this.includesFlm = false 
            // this.earlyResolution = false
            // this.includesPo = false
            // this.urgentPO = false

            // this.includesCm = true
            // this.includeCmWithoutNotice = true;
            // this.includesPpm = true
            // this.includesReloc = true
            // this.includesEnfrc = false 

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
            const CMforms = whichCaseMgmtForm(stepCM);
            this.includeCmWithNotice = CMforms?.includes("P10");
            this.includeCmWithoutNotice = CMforms?.includes("P11");
            this.applicationByConsent = this.includesCm && this.includeCmWithNotice;

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

        //arrange-for-service-cm-instructions
        this.conditionArray[7] = this.includesCm && this.includeCmWithNotice;
        this.instructionsStepArray[7] = 0;

        //arrange-for-service-cm-without-notice-instructions
        //wait-for-judge-to-review
            this.conditionArray[8] = this.includesCm && this.includeCmWithoutNotice;
            this.instructionsStepArray[8] = 0;
        //serve-copy-of-order-on-other-party
            this.conditionArray[9] = this.includesCm && this.includeCmWithoutNotice;
            this.instructionsStepArray[9] = 0;

        //arrange-for-service-ppm-instructions
        this.conditionArray[10] = this.includesPpm ;
        this.instructionsStepArray[10] = 0;

        //arrange-for-service-reloc-instructions
        this.conditionArray[11] = this.includesReloc ;
        this.instructionsStepArray[11] = 0;

        //arrange-for-service-enfrc-instructions
        this.conditionArray[12] = this.includesEnfrc ;
        this.instructionsStepArray[12] = 0;

        //proof-of-service-instructions
        this.conditionArray[13] =   (this.includesFlm && !this.includesPo) || 
                                    (this.includesPo && !this.urgentPO)    ||
                                    (this.includesCm && this.includeCmWithNotice) ||
                                    this.includesPpm ||
                                    this.includesReloc ||
                                    this.includesEnfrc;
                                    
        this.instructionsStepArray[13] = 0;
        
        //attend-court-appearance-instructions
        this.conditionArray[14] = this.includesPo ||
                                 (this.includesCm && this.includeCmWithNotice) ||
                                  this.includesPpm ||
                                  this.includesReloc ||
                                  this.includesEnfrc;  
        this.instructionsStepArray[14] = 0;
        
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