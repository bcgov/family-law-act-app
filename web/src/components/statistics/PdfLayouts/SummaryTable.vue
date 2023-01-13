<template>
    <div v-if="dataReady">
        <div style="font-size:12pt; font-weight:600; margin-bottom: 0.5rem;" >Summary: </div>

        <div style="font-size:9pt;">
            <b-table-simple small class="border" striped>
    
                <b-thead>                    
                    <b-tr  style="line-height: 1rem; height:2.5rem;">
                        <b-th>Form Name</b-th>
                        <b-th>Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th>Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th>Number of Applications</b-th>
                        <b-th>Form Name</b-th>
                        <b-th>Number of Applications</b-th>                          
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>                        
                        <b-th>Form 1</b-th>
                        <b-td>{{results.form1.total}}</b-td>
                        <b-th>Form 3</b-th>
                        <b-td>{{results.form3.total}}</b-td>
                        <b-th>Form 6</b-th>
                        <b-td>{{results.form6.total}}</b-td>
                        <b-th>Form 10</b-th>
                        <b-td>{{results.form10.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 11</b-th>
                        <b-td>{{results.form11.total}}</b-td>
                        <b-th>Form 12</b-th>
                        <b-td>{{results.form12.total}}</b-td>
                        <b-th>Form 15</b-th>
                        <b-td>{{results.form15.total}}</b-td>
                        <b-th>Form 16</b-th>
                        <b-td>{{results.form16.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 19</b-th>
                        <b-td>{{results.form19.total}}</b-td>
                        <b-th>Form 26</b-th>
                        <b-td>{{results.form26.total}}</b-td>
                        <b-th>Form 27</b-th>
                        <b-td>{{results.form27.total}}</b-td>
                        <b-th>Form 28</b-th>
                        <b-td>{{results.form28.total}}</b-td>
                    </b-tr>
                    <b-tr>                        
                        <b-th>Form 29</b-th>
                        <b-td>{{results.form29.total}}</b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>
                        <b-td></b-td>                        
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
import { reportInfoType } from '@/types/Common';

@Component
export default class SummaryTable extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
       
    dataReady = false;
    form1_info = []; 
    
    fields = [
        {key:"completed",    label:"Completed (not eFiled)", thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"submitted",    label:"Submitted (eFiled)",     thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"drafted",      label:"Drafted",                thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"unsuccessful", label:"Unsuccessful eFiling",   thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'},
        {key:"users",        label:"Users filing form",      thClass: 'border-bottom align-middle text-center', tdClass:'align-middle text-center'}
    ]; 
   
    mounted(){
        this.dataReady = false;
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       this.form1_info = [this.results.form1];
    }   
 
}
</script>