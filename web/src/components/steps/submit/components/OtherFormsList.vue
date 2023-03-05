<template>
    <div>

        <span class="text-primary" style="font-size:1.4rem;">Completed PDF forms to upload:</span> 

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

        <b-modal size="xl" v-model="showGetHelpScanning" header-class="bg-white">
            <template v-slot:modal-title>
                <h1 class="mb-0 text-primary">Get Help Scanning Documents</h1> 
            </template>
            <get-help-scanning/>        
            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showGetHelpScanning=false">Close</b-button>
            </template>            
            <template v-slot:modal-header-close>                 
                <b-button variant="outline-dark" class="closeButton" @click="showGetHelpScanning=false">&times;</b-button>
            </template>
        </b-modal>
        
    </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { documentTypesJsonInfoType } from '@/types/Common';

@Component
export default class OtherFormsList extends Vue {    

    @Prop({required: true})
    requiredDocumentLists!: documentTypesJsonInfoType[];   

    showGetHelpScanning = false;
   
}
</script>