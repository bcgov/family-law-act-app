<template>
    <div>
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div class="row mx-1">
            <div style="font-size:15pt;"><b>Family Law Act Reports</b></div>
            <div class="font-italic ml-auto mt-2">
                <b class="mr-2">Between:</b>
                <span class="mr-2">{{results.start_date|beautify-date}}</span> <b>-</b> <span class="ml-2">{{results.end_date|beautify-date}}</span>
            </div>                
        </div>

        <users-info-table class="mt-5" :results="results" />
        <summary-table class="mt-5" :results="results" />
        <ca-table class="mt-5" :results="results"/>
        <cm-table class="mt-5" :results="results"/>
        <enfrc-table class="mt-5" :results="results"/>
        <flm-table class="mt-5" :results="results"/>
        <po-table class="mt-5" :results="results"/>
        <ppm-table class="mt-5" :results="results"/>
        <reloc-table class="mt-5" :results="results"/>
        <rflm-table class="mt-5" :results="results"/>
        <wr-table class="mt-5" :results="results"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersInfoTable from './PdfLayouts/UsersInfoTable.vue';
import SummaryTable from './PdfLayouts/SummaryTable.vue';
import CaTable from './PdfLayouts/CaTable.vue';
import CmTable from './PdfLayouts/CmTable.vue';
import EnfrcTable from './PdfLayouts/EnfrcTable.vue';
import FlmTable from './PdfLayouts/FlmTable.vue';
import PoTable from './PdfLayouts/PoTable.vue';
import PpmTable from './PdfLayouts/PpmTable.vue';
import RelocTable from './PdfLayouts/RelocTable.vue';
import RflmTable from './PdfLayouts/RflmTable.vue';
import WrTable from './PdfLayouts/WrTable.vue';

import { reportInfoType } from '@/types/Common';

@Component({
    components:{       
        UsersInfoTable,
        SummaryTable, 
        CaTable,
        CmTable,
        EnfrcTable,
        FlmTable,   
        PoTable,
        PpmTable,  
        RelocTable,       
        RflmTable,        
        WrTable
    }
})
export default class Report extends Vue {

    @Prop({required:true})
    results!: reportInfoType;
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>