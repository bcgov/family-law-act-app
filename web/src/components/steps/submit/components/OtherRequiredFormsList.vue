<template>
    <div>

        <span class="text-primary" style="font-size:1.4rem;">Completed PDF forms to upload:</span> 

        <p>
            You will need to upload the pdf document you completed and then you will be prompted 
            to select the name of the document.  Please ensure that the name of the document 
            selected matches what has populated below.
        </p>

        <div class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
            <div style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
        </div>

        <div class="h4" style="margin:2rem 0.1rem;">
            <ul class="mt-3" v-for="requiredDocument,index in requiredDocumentLists" :key="index" >
                <li class="mb-2">
                    {{requiredDocument.description}}
                </li>                        
            </ul>
        </div>
        <span class="text-primary" style="font-size:1.4rem;">
            Upload the documents below:
        </span>

        <b-modal size="xl" v-model="showGetHelpScanning" header-class="bg-primary text-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 mt-2 ml-4">Get Help Scanning Documents</h1> 
            </template>
            <get-help-scanning/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpScanning=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="primary" class="closeButton" @click="showGetHelpScanning=false">&times;</b-button>
            </template>
        </b-modal>
        
    </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GetHelpScanning from "@/components/steps/submit/helpPages/GetHelpScanning.vue";

import { documentTypesJsonInfoType } from '@/types/Common';

@Component({
    components:{
        GetHelpScanning
    }
})
export default class OtherRequiredFormsList extends Vue {    

    @Prop({required: true})
    requiredDocumentLists!: documentTypesJsonInfoType[];   

    showGetHelpScanning = false;
   
}
</script>


<style lang="scss">
@import "src/styles/common";

.closeButton {
	background-color: transparent !important;
	color: white;
	border: white;
	font-weight: 700;
	font-size: 2rem;
	padding-top: 0;
	margin-top: 0;
}

</style>