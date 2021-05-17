<template>
    <div>

        <span class="text-primary" style='font-size:1.4rem;'>{{title}}</span> 
        
        <ul class="mt-3">
            <li class="mb-2">Collect any existing orders or agreements, existing protection orders and any exhibits referenced in your application</li>
            <li class="mb-2">Print or make copies of all documents, including your application and any supporting documents: one set for you, one set for the court and one set for each other party</li>
            <div v-if="type!='Print'" class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
                <div style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
            </div>
        
        </ul>

        <div v-if="isRequiredDocument" class="h4" style="margin:2rem 0.1rem;">
            <ul>
                <li><b class="text-danger"> The following additional documents are required as part of your filing:</b> </li>                   
                <ul class="mt-3" v-for="requiredDocument,index in requiredDocumentLists" :key="index" >
                    <li v-if="requiredDocument.required.length>0"  class="mb-2"> For the {{requiredDocument.name}} Application:
                        <ul class="mt-3" v-for="requiredDoc,inx in requiredDocument.required" :key="inx">
                            <li class="mb-2 font-weight-normal" v-html="requiredDoc" >{{requiredDoc}}</li>
                        </ul>
                    </li>                        
                </ul>
            </ul>                 
        </div>
        
        <ul v-if="type=='Submit'" class="mt-3">
            <li>Upload the documents bellow:</li>
        </ul>

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
import { Component, Vue, Prop } from 'vue-property-decorator';

import GetHelpScanning from "../helpPages/GetHelpScanning.vue"

import { namespace } from "vuex-class";   
import "@/store/modules/application";
const applicationState = namespace("Application");

@Component({
    components:{        
        GetHelpScanning,
    }
}) 
export default class RequiredDocument extends Vue {
    
    @Prop({required: true})
    type!: string;

    @Prop({required: false, default:'Additional Documents to Include:'})
    title!: string;

    @applicationState.State
    public requiredDocuments!: any

    showGetHelpScanning = false;
    isRequiredDocument = false;
    requiredDocumentLists = [];

    mounted(){
        this.getRequiredDocuments()
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        this.isRequiredDocument = false;
        for (const [key, value] of Object.entries(this.requiredDocuments)){
            // console.log(key)
            // console.log(value)
            this.requiredDocumentLists.push({name:Vue.filter('getFullOrderName')(key, ''), required:value['required'], reminder:value['reminder']})
            if(value['required'].length>0) this.isRequiredDocument = true;
        }
        // console.log(this.requiredDocumentLists)
    }
}
</script>