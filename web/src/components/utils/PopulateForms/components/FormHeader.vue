<template>
    <!-- <HEADER> -->
        <div  style="display: flex; flex-direction: row; flex-wrap: no-wrap; gap: 4px; justify-content: space-between;">
            <div style="width: 30%">
                <div style="font-size:14pt;"><b>Application About a Family Law Matter</b></div>
                <div style="font-size:10pt;"><b>FORM 3</b></div>
                <div>Provincial Court Family Rules (Rule 24)</div>
            </div>
            <div style="width: 33%">
                <CourtStamp></CourtStamp>
            </div>
            <div style="width: 38%; font-size: 7pt; font-weight: bold;">
                <b-table
                    :items="tableItems"
                    :fields="[{key:'name',tdClass:'name'},{key:'value',tdClass:'value text-center align-middle'}]"
                    small
                    borderless
                    thead-class="d-none">
                        <template v-slot:cell(name)="data">
                            <div style="margin:.1rem 0;">
                                {{data.value}}
                                <br> 
                                <span style="font-weight: 400">{{data.item.subtitle}}</span>
                            </div>                                           
                        </template>
                        <template v-slot:cell(value)="data" style="color:#000; background: #ddd;">
                            <div >{{data.value ?? '&nbsp;'}}</div>                                           
                        </template>
                </b-table>                
            </div>
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
        background: #eee; 
    }
</style>