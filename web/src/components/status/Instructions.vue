<template>
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
            v-if="includeParentingAfterSeparationStep" 
            v-bind:step="'2'"  
            v-bind:applicationId="applicationId"
            v-bind:listOfPdfs="listOfPdfs"
            v-bind:applicationLocationInfo="applicationLocationInfo"/>
        <arrange-for-service-flm-instructions 
            v-else v-bind:step="'1'"  
            v-bind:applicationId="applicationId"
            v-bind:listOfPdfs="listOfPdfs"
            v-bind:applicationLocationInfo="applicationLocationInfo"/>


        <proof-of-service-instructions 
            v-if="includeParentingAfterSeparationStep" 
            v-bind:step="'3'"  
            v-bind:applicationId="applicationId"/>
        <proof-of-service-instructions 
            v-else 
            v-bind:step="'2'" 
            v-bind:applicationId="applicationId"/>

    </b-card>    
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

@Component({
    components:{        
        ArrangeForServiceFlmInstructions,
        ProofOfServiceInstructions,
        ParentingAfterSeparationInstructions
    }
})
export default class Instructions extends Vue {

    @Prop({required: true})
    applicationId!: string;

    @Prop({required: true})
    listOfPdfs!: string[];

    @Prop({required: true})
    includePO!: boolean;

    @Prop({required: true})
    includeFlm!: boolean;

    @commonState.State
    public locationsInfo!: locationsInfoType[];

    applicationLocationInfo = {} as locationsInfoType;

    dataReady = false;
    includeParentingAfterSeparationStep = false;
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
}
</script>

<style scoped lang="scss" src="@/styles/_pdf.scss">
 
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
   
</style>
