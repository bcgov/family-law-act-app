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
import { stepInfoType } from '@/types/Application';
const applicationState = namespace("Application");

@Component
export default class ReminderNotes extends Vue {
    
    @Prop({required: true})
    type!: string;

    @applicationState.State
    public requiredDocuments!: requiredDocumentsInfoType;

    @applicationState.State
    public stPgNo!: stepsAndPagesNumberInfoType;

    @applicationState.State
    public steps!: stepInfoType[];

    isReminder = false;
    requiredDocumentLists = [];

    mounted(){
        this.getRequiredDocuments()
    }

    public getRequiredDocuments(){
        this.requiredDocumentLists = [];
        this.isReminder = false;
        const includesOrderActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('applyForOrder');
        const includesReplyActivities = this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedActivity.includes('replyToApplication');
        
        const selectedForms = (includesOrderActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedForms:[];
        const selectedReplyForms = (includesReplyActivities && this.steps[this.stPgNo.GETSTART._StepNo].result?.selectedReplyForms?.length > 0)?this.steps[this.stPgNo.GETSTART._StepNo].result.selectedReplyForms:[];
        
        for (const [key, value] of Object.entries(this.requiredDocuments)){

            if(key && value && (selectedForms.includes(key) || selectedReplyForms.includes(key))  ){
                this.requiredDocumentLists.push({name:Vue.filter('getFullOrderName')(key, ''), required:value['required'], reminder:value['reminder']})            
                if(value['reminder']?.length>0) this.isReminder = true;
            }
        }
    }
}
</script>