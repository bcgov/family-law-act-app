<template>
    <b-card class="mx-5 bg-light border-white">
        <div class="alert alert-danger mt-4" v-if="error">{{error}}</div>
        <h1 class="text-center" >Reports <b-icon-file-earmark-bar-graph font-scale="1.1" /></h1>        
        <b-card class="border-0 w-80 text-center mx-auto"> 
            
            <b-row>
                <b-col cols="2" class="h2 mt-2 mb-n1 text-primary"> 
                    Dates:
                </b-col>
                <b-col cols="5">
                    <date-range-picker :key="updateReport" :reportRange="reportDateRange" @datesAdded="addReportDateRanges"/>
                </b-col>
                <b-col cols="2">
                    <div :class="displayTopUser?'bg-success':'bg-primary'" style="border:1px solid green;border-radius:5px; width: 16rem; height: 100%;">
                        <b-form-checkbox class="ml-2 my-2" v-model="displayTopUser" size="lg" switch>
                            <div class="text-white" style="font-size: 12pt;">{{viewStatus}}</div>
                        </b-form-checkbox>
                    </div>  
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
            <report :results="results" :displayTopUser="displayTopUser"/>
        </b-card>

        <b-card class="text-center bg-light border-0" >
            <b-button
                v-if="!searching && dataLoaded" 
                 
                variant="success"
                @click="onPrintSave()"
                >
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
import { dateRangeInfoType } from '@/types/Common';

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
    reportDateRange: dateRangeInfoType = {startDate:null, endDate:null};

    results;
    searching = false;
    displayTopUser = false; 

    mounted() {  
        this.displayTopUser = false; 
        this.searching = false;
        this.dataLoaded = false;         
    }

    get viewStatus() {
        if(this.displayTopUser) return 'Display Top User';else return 'Hide Top User'
    }

    public find(){   
       
        this.dataLoaded = false;
        this.searching = true;

        const start = this.reportDateRange.startDate? this.reportDateRange.startDate?.slice(0,10) : null
        const end = this.reportDateRange.endDate? this.reportDateRange.endDate?.slice(0,10) : null
        const url = '/statistics/?start_date='+start+
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
            this.error = err.response.data           
        });  
        
    }

    public addReportDateRanges(dateRange){
        this.reportDateRange = dateRange
        this.dataLoaded = false;
        this.updateReport++;
    }

    public onPrintSave() { 
        
        const el= document.getElementById("print");

        const bottomLeftText = `"COURT OF APPEAL FOR BRITISH COLUMBIA                    www.bccourts.ca/Court_of_Appeal/"`;
        const bottomRightText = `" "`;        
        
        const url = '/statistics/'+'/?name=statistics_report' 
        
        const pdfhtml = Vue.filter('printPdf')(el.innerHTML, bottomLeftText, bottomRightText );

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

// @import "~@fortawesome/fontawesome-free/css/all.min.css";

</style>