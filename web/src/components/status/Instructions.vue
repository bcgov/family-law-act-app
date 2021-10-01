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
            v-bind:listOfPdfs="listOfselectedForms"
            v-bind:applicationLocationInfo="applicationLocationInfo"/>

        <arrange-for-service-po-instructions 
            v-if="listOfselectedForms.includes('AAP')" 
            v-bind:step='stepNumPoService'  
        />

        <proof-of-service-instructions 
            v-bind:step="stepNumProofOfService"  
            v-bind:applicationId="applicationId"/>
        
        <attend-court-appearance-instructions
            v-if="listOfselectedForms.includes('AAP')" 
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
import ArrangeForServicePoInstructions from "./postFilingSteps/ArrangeForServicePoInstructions.vue"
import AttendCourtAppearanceInstructions from "./postFilingSteps/AttendCourtAppearanceInstructions.vue"

@Component({
    components:{        
        ArrangeForServiceFlmInstructions,
        ProofOfServiceInstructions,
        ParentingAfterSeparationInstructions,
        ArrangeForServicePoInstructions,
        AttendCourtAppearanceInstructions
    }
})
export default class Instructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;
    listOfselectedForms = ['AAP','FLC'];

    stepNumPoService = 0
    stepNumProofOfService = 0
    stepNumPoAttend = 0
    stepNumFlmService = 0

    dataReady = false;
    includeParentingAfterSeparationStep = false;
    includesFlm = false;
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
            
            console.log(applicationData)
            const stepGETSTART = this.getStepResultByName(applicationData, 'GETSTART');
            const stepFLM = this.getStepResultByName(applicationData, 'FLM');
            
            console.log(stepGETSTART)
            console.log(stepFLM)
            // if(stepGETSTART.selectedForms)
            //     this.listOfselectedForms = stepGETSTART.selectedForms;
            this.includesFlm = this.listOfselectedForms.includes('FLC') 
                || this.listOfselectedForms.includes('NTRF');
            const applicationLocationName = applicationData.applicationLocation?applicationData.applicationLocation:'';
            this.applicationLocationInfo = this.locationsInfo.filter(locationInfo => locationInfo.name == applicationLocationName)[0];
            this.includeParentingAfterSeparationStep = (   
                   Vue.filter('includedInRegistries')(applicationLocationName, 'early-resolutions')
                || Vue.filter('includedInRegistries')(applicationLocationName, 'parenting-education')
                || Vue.filter('includedInRegistries')(applicationLocationName, 'family-justice')
                ) && this.includesFlm;

            if (!this.includesFlm
                && this.listOfselectedForms.includes('AAP')){// only po
                    this.stepNumPoService = 1;
                    this.stepNumProofOfService = 2;
                    this.stepNumPoAttend = 3;
            } else if (this.includesFlm
                && !this.listOfselectedForms.includes('AAP')){// only flm
                    
                    if (this.includeParentingAfterSeparationStep){
                        this.stepNumFlmService = 2;
                        this.stepNumProofOfService = 3;
                    } else {
                        this.stepNumFlmService = 1;
                        this.stepNumProofOfService = 2;
                    }

            } else if (this.includesFlm
                && this.listOfselectedForms.includes('AAP')){// inludes po and flm

                if (this.includeParentingAfterSeparationStep){
                        this.stepNumFlmService = 2;
                        this.stepNumPoService = 3
                        this.stepNumProofOfService = 4;
                        this.stepNumPoAttend = 5;
                    } else {
                        this.stepNumFlmService = 1;
                        this.stepNumPoService = 2;
                        this.stepNumProofOfService = 3;
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
 
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
   
</style>
