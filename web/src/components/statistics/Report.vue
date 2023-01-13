<template>
    <div v-if="dataReady">
        <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b>
        <div class="row mx-1">
            <!-- <b style="color:#FFF; font-size:1px; width:0.1rem; height:0.1rem; margin:0; padding:0;">i</b> -->
            <div style="font-size:15pt;"><b>Court of Appeal Reports</b></div>
            <div class="font-italic ml-auto mt-2"><b class="mr-2">Between:</b><span class="mr-2">{{results.start_date|beautify-date}}</span> <b>-</b> <span class="ml-2">{{results.end_date|beautify-date}}</span></div>                
        </div>

        <users-info-table class="mt-5" :results="results" />
        <summary-table class="mt-5" :results="results" />
        <manual-submission-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-1-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-3-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-6-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-10-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-11-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-12-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-15-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-16-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-19-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-26-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-27-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-28-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        <form-29-table class="mt-5" :results="results" :displayTopUser="displayTopUser"/>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersInfoTable from './PdfLayouts/UsersInfoTable.vue';
import SummaryTable from './PdfLayouts/SummaryTable.vue';
import ManualSubmissionTable from './PdfLayouts/ManualSubmissionTable.vue';
import Form1Table from './PdfLayouts/Form1Table.vue';
import Form3Table from './PdfLayouts/Form3Table.vue';
import Form6Table from './PdfLayouts/Form6Table.vue';
import Form10Table from './PdfLayouts/Form10Table.vue';
import Form11Table from './PdfLayouts/Form11Table.vue';
import Form12Table from './PdfLayouts/Form12Table.vue';
import Form15Table from './PdfLayouts/Form15Table.vue';
import Form16Table from './PdfLayouts/Form16Table.vue';
import Form19Table from './PdfLayouts/Form19Table.vue';
import Form26Table from './PdfLayouts/Form26Table.vue';
import Form27Table from './PdfLayouts/Form27Table.vue';
import Form28Table from './PdfLayouts/Form28Table.vue';
import Form29Table from './PdfLayouts/Form29Table.vue';
import { reportInfoType } from '@/types/Common';

@Component({
    components:{       
        UsersInfoTable,
        SummaryTable,
        ManualSubmissionTable,
        Form1Table,        
        Form3Table,       
        Form6Table,        
        Form10Table,
        Form11Table,
        Form12Table,       
        Form15Table,    
        Form16Table,    
        Form19Table,
        Form26Table,
        Form27Table,
        Form28Table,
        Form29Table
    }
})
export default class Report extends Vue {

    @Prop({required:true})
    results!: reportInfoType;

    @Prop({required:true})
    displayTopUser!: boolean;
       
    dataReady = false;       
   
    mounted(){
        this.dataReady = false;        
        this.extractInfo();       
        this.dataReady = true;
    }    

    public extractInfo(){
       //console.log(this.results)       
    }
   
 
}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">

</style>