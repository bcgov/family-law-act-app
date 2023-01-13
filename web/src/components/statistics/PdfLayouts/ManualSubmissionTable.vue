<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Manual Submissions: </div>
        <b-table            
            :items="manual_submission_info"
            :fields="fields"            
            bordered            
            small 
            responsive="sm">
            <template v-slot:cell(form_type)="row">                  
                <span class="text-dark px-1">{{row.value | getDocumentTypeName}}</span>
            </template>
        </b-table>
        <div 
            style="font-size:10pt; margin-bottom: 0.5rem;" >
            <b>Total Number of Files:</b> {{total}} 
        </div>
        <div 
            v-if="displayTopUser" 
            style="font-size:10pt;  margin-bottom: 0.25rem;" >
            Top User: 
        </div>
        <b-table   
            style="font-size:8pt; margin: 0 1rem;"
            v-if="displayTopUser"         
            :items="topUser_info"
            :fields="topUserFields"
            bordered                       
            small 
            responsive="sm">
            <template v-slot:cell(total)="row">                  
                <span class="text-dark px-1">{{row.item.forms.length}}</span>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/common";
import { documentTypesJsonInfoType, reportInfoType } from '@/types/Common';
const commonState = namespace("Common");

@Component
export default class ManualSubmissionTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;

    @Prop({required:true})
    displayTopUser!: boolean;

    @commonState.State
    public documentTypesJson: documentTypesJsonInfoType[]
       
    dataReady = false; 
    manual_submission_info =[];
    topUser_info = []; 
    total = 0;
    
    fields = [
        {key:"form_type", label:"Form Name", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted_count", label:"Number of Submitted Forms",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ];

    topUserFields = [
        {key:"display_name", label:"Full Name", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"submitted",    label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"drafted",      label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        // {key:"unsuccessful", label:"Unsuccessful eFiling",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"total",        label:"Total Forms", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ];    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.manual_submission_info = this.results.manual_submission_info.forms;
       
        // this.manual_submission_info = [{"form_type":"MCT","submitted_count":1},{"form_type":"AFF","submitted_count":1},{"form_type":"NAA","submitted_count":1}]
        this.total = this.results.manual_submission_info.forms.length;
        this.topUser_info = [this.results.manual_submission_info.top_user];

        // this.topUser_info = [{
        //     "forms": [
        //         {
        //         "form_type": "MCT",
        //         "submitted_count": 1
        //         },
        //         {
        //         "form_type": "AFF",
        //         "submitted_count": 1
        //         },
        //         {
        //         "form_type": "NAA",
        //         "submitted_count": 1
        //         }
        //     ],
        //     "total": 1,
        //     "first_name": "Han",
        //     "last_name": "",
        //     "display_name": "Han Solo"
        //     }
        //         ];
    }
   
 
}
</script>