<template>
    <div v-if="dataReady" class="print-block">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Efiling Status: </div>
        <b-table            
            :items="rflmInfo"
            :fields="fields"
            bordered            
            small
            head-variant="light" 
            responsive="sm">
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { eFilingInfoType, reportInfoType } from '@/types/Common';

@Component
export default class EfilingSummaryTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false;
    rflmInfo: eFilingInfoType[] = []; 
    
    fields = [
        {key:"total_applications", label:"Total Number of Packages", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"finalized_efile",    label:"Packages eFiled Successfully",    thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"try_to_efile",       label:"Total Number of Attempts",             thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},        
    ];    
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.rflmInfo = [this.results.efiling_submissions];
    }   
 
}
</script>