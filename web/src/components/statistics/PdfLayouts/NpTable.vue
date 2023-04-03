<template>
    <div v-if="dataReady" class="print-block">
        <div 
            style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;">
            Notice of Participation: 
        </div>
        <b-table            
            :items="npInfo"
            :fields="fields"
            bordered            
            small
            head-variant="light" 
            responsive="sm">
        </b-table>
        <div style="font-size:9pt; margin-bottom: 0.5rem;">
            <b>Total Number of 'Notice of Participation' Applications:</b> <span style="font-size:11pt;" class="text-primary">{{npInfo[0].total}} </span>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formReportInfoType, reportInfoType } from '@/types/Common';

@Component
export default class NpTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false; 
    npInfo: formReportInfoType[] = [];
    
    fields = [
        {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"efiled",       label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"draft",        label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"started",      label:"Started",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}        
    ];    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.npInfo = [this.results.application_details.NP];
    }
 
}
</script>