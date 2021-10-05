<template>
    <div>    
        <b-card v-if="dataReady" no-body bg-variant="white" border-variant="white">

            <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>                           
                            
            <p>
                If your document was accepted and stamped by the registry you will need to 
                complete the following steps as outlined in your checklist:
            </p>        

            <parenting-after-separation-instructions 
                v-if="includeParentingAfterSeparationStep" 
                v-bind:applicationId="applicationId"/>

            <arrange-for-service-flm-instructions 
                v-if="includesFlm" 
                v-bind:step="stepNumFlmService"  
                v-bind:applicationId="applicationId"
                v-bind:earlyResolution="earlyResolution"
                v-bind:applicationLocationInfo="applicationLocationInfo"/>

            <arrange-for-service-po-instructions 
                v-if="includesPo && !urgentPO" 
                v-bind:step='stepNumPoService'  
            />

            <review-stamped-document-po-instructions 
                v-if="includesPo && urgentPO" 
                v-bind:step='stepNumReviewStampedDocument'  
            />

            <complete-provide-for-registry-po-instructions 
                v-if="includesPo && urgentPO" 
                v-bind:step='stepNumProvideForRegistryPo'  
            />

            <proof-of-service-instructions
                v-if="!includesPo || (includesPo && !urgentPO)" 
                v-bind:step="stepNumProofOfService"  
                v-bind:applicationId="applicationId"/>
            
            <attend-court-appearance-instructions
                v-if="includesPo" 
                v-bind:step='stepNumPoAttend'  
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
        AttendCourtAppearanceInstructions
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

    stepNumPoService = 0;
    stepNumReviewStampedDocument = 0;
    stepNumProofOfService = 0;
    stepNumProvideForRegistryPo = 0;
    stepNumPoAttend = 0;
    stepNumFlmService = 0;

    dataReady = false;
    includeParentingAfterSeparationStep = false;
    includesFlm = false;
    includesPo = false;
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

            if (!this.includesFlm
                && this.includesPo){// only po
                this.stepNumPoService = 1;
                this.stepNumReviewStampedDocument = 1;
                this.stepNumProofOfService = 2;
                this.stepNumProvideForRegistryPo = 2;
                this.stepNumPoAttend = 3;
            } else if (this.includesFlm
                && !this.includesPo){// only flm
                    
                if (this.includeParentingAfterSeparationStep){
                    this.stepNumFlmService = 2;
                    this.stepNumProofOfService = 3;
                } else {
                    this.stepNumFlmService = 1;
                    this.stepNumProofOfService = 2;
                }

            } else if (this.includesFlm
                && this.includesPo){// inludes po and flm

                if (this.includeParentingAfterSeparationStep){
                    this.stepNumFlmService = 2;
                    this.stepNumPoService = 3;
                    this.stepNumReviewStampedDocument = 3;
                    this.stepNumProofOfService = 4;
                    this.stepNumProvideForRegistryPo = 4;
                    this.stepNumPoAttend = 5;
                } else {
                    this.stepNumFlmService = 1;
                    this.stepNumPoService = 2;
                    this.stepNumReviewStampedDocument = 2;
                    this.stepNumProofOfService = 3;
                    this.stepNumProvideForRegistryPo = 3;
                    this.stepNumPoAttend = 4;
                }
            }

        }, err => {
            this.error = err;        
        });
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