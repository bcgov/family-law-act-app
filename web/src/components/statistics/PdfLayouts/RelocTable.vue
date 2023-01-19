<template>
    <div v-if="dataReady">
        <div 
            style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;">
            Application for Order Prohibiting the Relocation of a Child: 
        </div>
        <b-table            
            :items="relocInfo"
            :fields="fields"
            bordered            
            small 
            responsive="sm">
        </b-table>
        <div style="font-size:10pt; margin-bottom: 0.5rem;">
            <b>Total Number of 'Application for Order Prohibiting the Relocation of a Child' Applications:</b> {{relocInfo[0].total}} 
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formReportInfoType, reportInfoType } from '@/types/Common';

@Component
export default class RelocTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false; 
    relocInfo: formReportInfoType[] = [];
    
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
       this.relocInfo = [this.results.application_details.RELOC];
    }
 
}
</script>