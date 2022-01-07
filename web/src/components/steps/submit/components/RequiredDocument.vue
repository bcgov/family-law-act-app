<template>
    <div>

        <span class="text-primary" style='font-size:1.4rem;'>{{title}}</span> 
        
        <ul class="mt-3">            
            <div class="mb-2" v-if="type=='Print'">Print or make copies of all documents, including your application and any supporting documents: one set for you, one set for the court and one set for each other party</div>
            <div v-if="type!='Print'" class="my-3 text-primary" @click="showGetHelpScanning = true" style="cursor: pointer;border-bottom:1px solid; width:15.7rem;">
                <div style='font-size:1.2rem;' class="fa fa-question-circle" /> Get help scanning documents 
            </div>
        
        </ul>

        <div v-if="isRequiredDocument" class="h4" style="margin:2rem 0.1rem;">
            <ul>
                <li><b class="text-danger"> The following additional documents are required as part of your filing:</b> </li>                   
                <ul class="mt-3" v-for="requiredDocument,index in requiredDocumentLists" :key="index" >
                    <li v-if="requiredDocument.required.length>0"  class="mb-2">
                        {{requiredDocument.text}} {{requiredDocument.article}} {{requiredDocument.name}} :
                        <ul class="mt-3" v-for="requiredDoc,inx in requiredDocument.required" :key="inx">
                            <li class="mb-2 font-weight-normal" v-html="requiredDoc" >{{requiredDoc}}</li>
                        </ul>
                    </li>                        
                </ul>
            </ul>                 
        </div>
        
        <ul v-if="type=='Submit'" class="mt-3">
            <li>Upload the documents below:</li>
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
import { requiredDocumentsInfoType } from '@/types/Common';
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
    public requiredDocuments!: requiredDocumentsInfoType;

    showGetHelpScanning = false;
    isRequiredDocument = false;
    requiredDocumentLists = [];

    mounted(){
        Vue.filter('replaceRequiredDocuments')()
        this.getRequiredDocuments()
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        this.isRequiredDocument = false;
        for (const [key, value] of Object.entries(this.requiredDocuments)){           
            if(key && value &&  (this.$store.state.Application.steps[0].result?.selectedForms?.includes(key) || this.$store.state.Application.steps[0].result?.selectedForms?.includes(key.slice(0,-2)))){
                const name = Vue.filter('getFullOrderName')(key, '');
                const vowelCondituion = ['A','E','I','O','U'].includes(name.substring(0,1))?'an':'a';
                this.requiredDocumentLists.push({
                    name:name, 
                    required:value['required'], 
                    reminder:value['reminder'],
                    text:key.includes('agreementEnfrc2')?'For the Request to':'For the Application About',
                    article:key.includes('agreementEnfrc2')? '':vowelCondituion
                })
                if(value['required']?.length>0) this.isRequiredDocument = true;
            }
        }        
    }
}
</script>