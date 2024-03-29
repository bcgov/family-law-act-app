<template>
    <b-card class="mx-5 bg-light border-white">
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
        <h1 class="text-center" >Reports <b-icon-file-earmark-bar-graph font-scale="1.1" /></h1>        
        <b-card class="border-0 w-80 text-center mx-auto"> 
            
            <b-row>
                <b-col cols="2" class="h2 mt-2 mb-n1 text-primary"> 
                    Dates:
                </b-col>
                <b-col cols="1" /> 
                <b-col cols="6">
                    <date-range-picker :key="updateReport" :reportRange="reportDateRange" @datesAdded="addReportDateRanges"/>
                </b-col>
                <b-col cols="1" />   
                <b-col cols="2">
                    <b-button
                        name="search"
                        style="margin-top: 0rem; padding: 0.25rem 2rem; width: 100%;" 
                        :disabled="searching"
                        v-on:keyup.enter="find()"
                        variant="primary"
                        @click="find()"
                        ><spinner color="#FFF" v-if="searching" style="margin:0; padding: 0; height:2rem; transform:translate(0px,-24px);"/>
                        <span style="font-size: 20px;" v-else>Search</span>
                    </b-button>
                </b-col> 
            </b-row>
                   
        </b-card> 

        <loading-spinner color="#000" v-if="searching && !dataLoaded" waitingText="Loading ..." />     

        <b-card v-else-if="!searching && dataLoaded" id="print" style="border:1px solid; border-radius:5px;" bg-variant="white" class="my-4 container" no-body>   
            <report :results="results"/>
        </b-card>

        <b-card class="text-center bg-light border-0" >
            <b-button
                v-if="!searching && dataLoaded" 
                variant="success"
                @click="onPrintSave()">
                Print / Save 
                <b-icon-printer-fill class="mx-1" variant="white" scale="1" ></b-icon-printer-fill>
            </b-button>
        </b-card>
        
    </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';

import Report from "./Report.vue";
import DateRangePicker from './DateRangePicker.vue';
import Spinner from '@/components/utils/Spinner.vue'
import { dateRangeInfoType, reportInfoType } from '@/types/Common';

@Component({
    components:{
        Report,
        DateRangePicker,
        Spinner
    }
})
export default class Statistics extends Vue {

    dataLoaded = false;    
    error = '';
    updated = 0;

    printReady = false;
    updateReport = 0;
    reportDateRange: dateRangeInfoType = {startDate:'', endDate:''};

    results = {} as reportInfoType;
    searching = false;    

    mounted() {
        this.searching = false;
        this.dataLoaded = false;         
    }    

    public find(){   
       
        this.dataLoaded = false;
        this.searching = true;
        this.error = '';

        const start = this.reportDateRange.startDate? this.reportDateRange.startDate?.slice(0,10) : null
        const end = this.reportDateRange.endDate? this.reportDateRange.endDate?.slice(0,10) : null
        const url = '/statistics?start_date='+start+
                    '&end_date='+end+
                    '&tz='+moment().utcOffset();
        
        this.$http.get(url)
        .then((response) => {            
            if(response?.data){
                this.results = response.data;
                this.dataLoaded = true;                    
            }
            this.searching = false;
            
        },(err) => {
            this.searching = false;            
            if(err.response.status==502)
                this.error ="Openshift resource issues were encountered. Please select a shorter date range.";
            else
                this.error = err.response.data;
        });  
        
    }

    public addReportDateRanges(dateRange){
        this.reportDateRange = dateRange
        this.dataLoaded = false;
        this.updateReport++;
    }

    public onPrintSave() { 
        
        const el= document.getElementById("print");
        const time = moment().format("MMM DD YYYY HH:mm")
        const bottomLeftText = `"Family Law Act Reports Printed on `+time+`";`;
        const bottomRightText = `" "`;        
        
        const url = '/statistics?name=statistics_report' 
        const margin = '1.2in 0.7in 0.9in 0.7in'
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText, margin );

        const body = {
            'html':pdfhtml,            
        }       
        
        const options = {
            responseType: "blob",
            headers: {
            "Content-Type": "application/json",
            }
        }  

        this.$http.post(url,body, options)
        .then(res => {                       
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = "StatisticsReport.pdf";
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000); 
        },err => {
            console.error(err);        
        });
    }  

}
</script>
<style scoped lang="scss" src="@/styles/_pdf.scss">


</style>