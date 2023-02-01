<template>
    <div v-if="dataReady" class="print-block">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Written Response to Application: </div>
        <b-table            
            :items="wrInfo"
            :fields="fields"
            bordered            
            small
            head-variant="light" 
            responsive="sm">
        </b-table>
        <div style="font-size:9pt; margin-bottom: 0.5rem;">
            <b>Total Number of 'Written Response to Application' Applications:</b> <span style="font-size:11pt;" class="text-primary">{{wrInfo[0].total}} </span>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formReportInfoType, reportInfoType } from '@/types/Common';

@Component
export default class WrTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false; 
    wrInfo: formReportInfoType[] = [];
    
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
       this.wrInfo = [this.results.application_details.WR];
    }
 
}
</script>