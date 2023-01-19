<template>
    <div v-if="dataReady">
        <div 
            style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >
            Reply to an Application About a Family Law Matter with Counter Application: 
        </div>
        <b-table            
            :items="caInfo"
            :fields="fields"
            bordered            
            small 
            responsive="sm">
        </b-table>
        <div 
            style="font-size:10pt; margin-bottom: 0.5rem;" >
            <b>Total Number of 'Reply to an Application About a Family Law Matter with Counter Application' Applications:</b> {{caInfo[0].total}} 
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formReportInfoType, reportInfoType } from '@/types/Common';

@Component
export default class CaTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;    
       
    dataReady = false; 
    caInfo: formReportInfoType[] = [];
    
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
       this.caInfo = [this.results.application_details.CA];
    }   
 
}
</script>