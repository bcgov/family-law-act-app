<template>
    <!-- <HEADER> -->
        <div  style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px; justify-content: space-between;">
            <div style="width: 30%">
                <div style="font-size:14pt;"><b>Application About a Family Law Matter</b></div>
                <div style="font-size:10pt;"><b>FORM 3</b></div>
                <div>Provincial Court Family Rules (Rule 24)</div>
            </div>
            <div style="width:200px;">
                <CourtStamp></CourtStamp>
            </div>
            <div style="width: 40%; font-size: 8pt;">
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 45%; padding: 2px;text-align:right;"> Registry location:&nbsp; </div>
                    <div style="float: left; background-color: #d6d6d6; width: 55%; padding: 2px;"> {{ tableItems[0].value }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 45%; padding: 2px;text-align:right;"> Court file number:&nbsp; </div>
                    <div style="float: left; background-color: #d6d6d6; width: 55%; padding: 2px;"> {{  tableItems[1].value }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 45%; padding: 2px;text-align:right;">Last names of parties:&nbsp;<br/><span style="color:#626262;font-style:italic">Party 1/ Party 2&nbsp;</span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 55%; padding: 2px;line-height: 35px;"> {{  tableItems[2].value ?  tableItems[2].value : '&nbsp;' }} </div>
                </div>
                <div style="width: 100%; display: inline-block;">
                    <div style="float: left; width: 45%; padding: 2px;text-align:right;"> Document number:&nbsp;<br/><span style="color:#626262;font-style:italic">For registry use only&nbsp; </span></div>
                    <div style="float: left; background-color: #d6d6d6; width: 55%; padding: 2px;line-height: 35px;"> {{ '&nbsp;' }} </div>
                </div>
            </div>
             <!-- <div style="width: 38%; font-size: 7pt; font-weight: bold;">
                <b-table
                    :items="tableItems"
                    :fields="[{key:'name',tdClass:'name'},{key:'value',tdClass:'value text-center align-middle'}]"
                    small
                    borderless
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="margin:.1rem 0">
                                {{data.value}}
                                <br> 
                                <span style="font-weight: 400">{{data.item.subtitle}}</span>
                            </div>                                           
                        </template>
                        <template v-slot:cell(value)="data" style="color:#000;">
                            <div style="background-color: #d6d6d6; padding: 2px;line-height: 15px;">{{data.value}}</div>                                           
                        </template>
                </b-table>                
            </div> -->
            
        </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CourtStamp from './CourtStamp.vue';

@Component({
    components: {
        CourtStamp
    }
})
export default class FormHeader extends Vue {
    @Prop({required: true})
    tableItems!: any;

}
</script>
<style>
    .table-borderless td.name {
        text-align: right;
    }
    .table-borderless td.value {
        border: 2px solid #fff;
        background-color: #d6d6d6 !important;
    }
</style>