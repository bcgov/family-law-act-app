<template>
    <div class="report">
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div class="court-header">
            <div class="row m-0" style="border-bottom:1px solid #AAAAAA">
                <div style="width:8%" >
                    <img :src="src" alt="B.C. Gov"/>
                </div>
                <div style="width:3%;"/>
                <div style="margin-top:1rem; width:50%; font-size:15pt;"><b>Family Law Act Reports</b></div>
                <div style="margin-top:1.45rem; width:38%;" class="font-italic text-right">
                    <b class="mr-2">Between:</b>
                    <span class="mr-2">{{results.start_date|beautify-date}}</span> <b>-</b> <span class="ml-2">{{results.end_date|beautify-date}}</span>
                </div>                
            </div>
        </div>

        <users-info-table class="court-header-after" :results="results" />
        <efiling-summary-table class="mt-5" :results="results" />
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

        <other-forms-table class="mt-5" :results="results"/>
        <ncd-table class="mt-5" :results="results"/>
        <ndt-table class="mt-5" :results="results"/>
        <npr-table class="mt-5" :results="results"/> 
        <rqs-table class="mt-5" :results="results"/>
        <tris-table class="mt-5" :results="results"/>
        <nlc-table class="mt-5" :results="results"/>
        <nlcr-table class="mt-5" :results="results"/>
        <nlp-table class="mt-5" :results="results"/>
        <nlpr-table class="mt-5" :results="results"/>
        <aff-table class="mt-5" :results="results"/>
        <ga-table class="mt-5" :results="results"/>
        <aps-table class="mt-5" :results="results"/>
        <apsp-table class="mt-5" :results="results"/>
        <csv-table class="mt-5" :results="results"/>
        <efsp-table class="mt-5" :results="results"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersInfoTable from './PdfLayouts/UsersInfoTable.vue';
import SummaryTable from './PdfLayouts/SummaryTable.vue';
import EfilingSummaryTable from './PdfLayouts/EfilingSummaryTable.vue';


import CaTable from './PdfLayouts/CaTable.vue';
import CmTable from './PdfLayouts/CmTable.vue';
import EnfrcTable from './PdfLayouts/EnfrcTable.vue';
import FlmTable from './PdfLayouts/FlmTable.vue';
import PoTable from './PdfLayouts/PoTable.vue';
import PpmTable from './PdfLayouts/PpmTable.vue';
import RelocTable from './PdfLayouts/RelocTable.vue';
import RflmTable from './PdfLayouts/RflmTable.vue';
import WrTable from './PdfLayouts/WrTable.vue';

import OtherFormsTable from './PdfLayouts/OtherFormsTable.vue'
import NcdTable from './PdfLayouts/NcdTable.vue';
import NdtTable from './PdfLayouts/NdtTable.vue';


import AffTable from './PdfLayouts/AffTable.vue';
import ApspTable from './PdfLayouts/ApspTable.vue';
import ApsTable from './PdfLayouts/ApsTable.vue';
import CiftTable from './PdfLayouts/CiftTable.vue';
import ConaTable from './PdfLayouts/ConaTable.vue';
import CorTable from './PdfLayouts/CorTable.vue';
import CsvTable from './PdfLayouts/CsvTable.vue';
import EfspTable from './PdfLayouts/EfspTable.vue';
import FfTable from './PdfLayouts/FfTable.vue';
import FsTable from './PdfLayouts/FsTable.vue';
import GaTable from './PdfLayouts/GaTable.vue';
import NlcrTable from './PdfLayouts/NlcrTable.vue';
import NlcTable from './PdfLayouts/NlcTable.vue';
import NlprTable from './PdfLayouts/NlprTable.vue';
import NlpTable from './PdfLayouts/NlpTable.vue';
import NprTable from './PdfLayouts/NprTable.vue';
import NpTable from './PdfLayouts/NpTable.vue';
import OrdTable from './PdfLayouts/OrdTable.vue';
import PaseTable from './PdfLayouts/PaseTable.vue';


import RefTable from './PdfLayouts/RefTable.vue';

import RfsTable from './PdfLayouts/RfsTable.vue';
import RpsTable from './PdfLayouts/RpsTable.vue';
import RqsTable from './PdfLayouts/RqsTable.vue';
import TrisTable from './PdfLayouts/TrisTable.vue';


import {srcFile} from './logo'

import { reportInfoType } from '@/types/Common';

@Component({
    components:{       
        UsersInfoTable,
        SummaryTable, 
        AffTable,
        ApspTable,
        ApsTable,
        CaTable,
        CiftTable,
        CmTable,
        ConaTable,
        CorTable,
        CsvTable,
        EfspTable,
        FfTable,
        EnfrcTable,
        FsTable,        
        FlmTable,  
        GaTable, 
        NcdTable,
        NdtTable,
        NlcrTable,
        NlcTable,
        NlprTable,
        NlpTable,
        NprTable,
        NpTable,
        OrdTable,
        PaseTable,
        PoTable,
        PpmTable,  
        RefTable,
        RelocTable,       
        RflmTable,   
        RfsTable,
        RpsTable,
        RqsTable,
        TrisTable,     
        WrTable,
        EfilingSummaryTable,
        OtherFormsTable,
    }
})
export default class Report extends Vue {

    @Prop({required:true})
    results!: reportInfoType;

    src =""
    mounted(){        
        this.src = srcFile;
    }
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>