<template>
    <b-card v-if="isReminder" style="border:1px solid #ddebed; border-radius:10px;" bg-variant="white" class="mt-4 mb-2">

        <span class="text-primary" style='font-size:1.4rem;'>Please Note:</span> 

        <ul class="mt-3" v-for="requiredDocument,index in requiredDocumentLists" :key="index" >
            <li v-if="requiredDocument.reminder.length>0" class="mb-2 h4"> For the {{requiredDocument.name}} Application:
                <ul class="mt-3" v-for="reminder,inx in requiredDocument.reminder" :key="inx">
                    <li style="line-height: 1.5;" class="mb-2 font-weight-normal" v-html="reminder" >{{reminder}}</li>
                </ul>
            </li>                        
        </ul> 
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { namespace } from "vuex-class";   
import "@/store/modules/application";
import { requiredDocumentsInfoType } from '@/types/Common';
import { stepsAndPagesNumberInfoType } from '@/types/Application/StepsAndPages';
const applicationState = namespace("Application");

@Component
export default class ReminderNotes extends Vue {
    
    @Prop({required: true})
    type!: string;

    @applicationState.State
    public requiredDocuments!: requiredDocumentsInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    isReminder = false;
    requiredDocumentLists = [];

    mounted(){
        this.getRequiredDocuments()
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        this.isReminder = false;
        const includesOrderActivities = this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        
        for (const [key, value] of Object.entries(this.requiredDocuments)){

            if(key && value && includesOrderActivities && this.$store.state.Application.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.includes(key)){
                this.requiredDocumentLists.push({name:Vue.filter('getFullOrderName')(key, ''), required:value['required'], reminder:value['reminder']})            
                if(value['reminder']?.length>0) this.isReminder = true;
            }
        }
    }
}
</script>