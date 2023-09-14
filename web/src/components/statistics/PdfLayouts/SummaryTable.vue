<template>
    <div v-if="dataReady" class="print-block">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Applications' Summary: </div>

        <div style="font-size:9pt;">
            <b-table-simple small class="border">
    
                <b-thead style="background:#e9ecef">                    
                    <b-tr style="line-height: 1.75rem; height:2.1rem; text-align: center; font-size:11pt;">
                        <b-th class="text-left">Form Name</b-th>
                        <b-th>Number of Applications</b-th>                        
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>                        
                        <b-th>Reply to an Application About a Family Law Matter with Counter Application</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.CA.total}}</b-td>
                    </b-tr>
                    <b-tr> 
                        <b-th>Case Management</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.CM.total}}</b-td>
                    </b-tr>
                    <b-tr>    
                        <b-th>Application About Enforcement</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.ENFRC.total}}</b-td>
                    </b-tr>
                    <b-tr> 
                        <b-th>Family Law Matter</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.FLM.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Protection Order</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.PO.total}}</b-td>
                    </b-tr>
                    <b-tr> 
                        <b-th>Priority Parenting Matter</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.PPM.total}}</b-td>
                    </b-tr>
                    <b-tr>
                        <b-th>Application for Order Prohibiting the Relocation of a Child</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.RELOC.total}}</b-td>
                    </b-tr>
                    <b-tr> 
                        <b-th>Reply to an Application About a Family Law Matter</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.RFLM.total}}</b-td>
                    </b-tr>                    
                    <b-tr>                        
                        <b-th>Written Response to Application</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.WR.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Address Change</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NCD.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Discontinuance</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NDT.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Intention to Proceed</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NPR.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                                                             
                        <b-th>Request for Scheduling</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.RQS.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Trial Readiness Statement</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.TRIS.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Lawyer for Child</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NLC.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Removal of Lawyer for Child</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NLCR.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Notice of Lawyer for Party</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.NLP.total}}</b-td>                                          
                    </b-tr>
                    <b-tr>                        
                        <b-th>Other Applications</b-th>
                        <b-td class="text-center">{{applicationDetailsInfo.OTHER.total}}</b-td>                                          
                    </b-tr>
                    
                </b-tbody>
                <!-- <b-tfoot>
                    <b-tr>
                        <b-td variant="secondary" class="text-right">
                        Total Applications: <b>5</b>
                        </b-td>
                    </b-tr>
                </b-tfoot> -->
            </b-table-simple>
        </div>       
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { applicationDetailsInfoType, reportInfoType } from '@/types/Common';

@Component
export default class SummaryTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false;
    applicationDetailsInfo = {} as applicationDetailsInfoType; 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
        this.applicationDetailsInfo = this.results.application_details;
    }   
 
}
</script>

<style scoped>

.table td {
    text-align: center;
}
</style>