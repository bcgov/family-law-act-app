<template>
    <b-card body-class="p-0" id="date-container-range"> 
        <b-button 
            @click="initDates();onShow=true;"
            id="popover-range-button-variant" 
            variant="transparent" 
            class="border-0" 
            style="width:100%; margin:0; padding:0.5rem 1rem;"
            >
            <span v-if="!onShow" v-html="pickedDates">{{pickedDates}}</span> <b-icon-calendar3 font-scale="1.75" style="float:right;"/>
        </b-button>
        <b-popover 
            customClass="pop-range"
            target="popover-range-button-variant"  
            triggers="manual"
            placement="bottomcenter"
            container="date-container-range"
            ref="popover"
            :show.sync="onShow"           
            >
            <div>
                <b-row class="mt-1" style="font-size:13pt; font-weight:600;" >
                    <b-col cols="5 text-center bg-select border ml-4 py-2">
                        <span v-if="dates[1]<dates[0]"><b class="text-danger">From: </b>{{dates[1]|beautify-date-full-no-weekday}}</span>
                        <span v-else><b class="text-danger">From: </b>{{dates[0]|beautify-date-full-no-weekday}}</span>
                    </b-col>
                    <b-col cols="1" />
                    <b-col cols="5 text-center bg-select border ml-2 py-2">
                        <span v-if="dates[0]>dates[1]"><b class="text-danger">To: </b>{{dates[0]|beautify-date-full-no-weekday}}</span>
                        <span v-else ><b class="text-danger">To: </b>{{dates[1]|beautify-date-full-no-weekday}}</span>
                    </b-col>
                </b-row>
                <b-row class="py-0" style="margin-top:1rem;">
                    <b-col cols="6">
                        <div class="vuetify">
                            <v-app style="height:24rem; padding:0; margin:-0.5rem 0 0.5rem 0;">                        
                                <v-date-picker
                                    class="calendar-left"
                                    v-model="dates"
                                    color="success" 
                                    :allowed-dates="allowedDates"                        
                                    range                                
                                    :picker-date.sync="pickerDateL"
                                ></v-date-picker>                            
                            </v-app>
                        </div>
                    </b-col>
                    <b-col cols="6">
                        <div class="vuetify">
                            <v-app style="height:24rem; padding:0; margin:-0.5rem 0 0.5rem 0;">                                                    
                                <v-date-picker
                                    class="calendar-right"
                                    v-model="dates"
                                    color="success"
                                    :allowed-dates="allowedDates" 
                                    range
                                    :picker-date.sync="pickerDateR"                                
                                ></v-date-picker>                                                        
                            </v-app>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <b-row style="margin-top:-2.25rem;">
                <b-col>
                    <b-button @click="setDatesToday" size="sm" style="width:8rem;" variant="primary">Today</b-button>
                </b-col>
                <b-col>
                    <b-button @click="setDatesOneWeek" size="sm" style="width:8rem;" variant="primary">Last Week</b-button>
                </b-col>
                <b-col>
                    <b-button @click="setDatesTwoWeeks" size="sm" style="width:8rem;" variant="primary">Last Two Weeks</b-button>
                </b-col>
                <b-col>
                    <b-button @click="setDatesOneMonth" size="sm" style="width:8rem;" variant="primary" >Last Month</b-button>
                </b-col>
            </b-row>

            <b-row class="border rounded mx-0 py-1" style="margin-top:1rem; box-shadow: 0px 0px 6px 3px #DDD;">
                <b-col>
                    <b-button @click="focusSearchButton();onShow=false" class="border" variant="white" style="width:7rem;" >Cancel</b-button>
                </b-col>
                <b-col>
                    <b-button @click="clearDates" class="border" variant="warning">Clear selection</b-button>
                </b-col>
                <b-col>
                    <b-button @click="AddDates" class="px-4" variant="success" style="float:right; width:7rem;">Apply</b-button>
                </b-col>
            </b-row>
        </b-popover>

    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment-timezone'

import * as _ from 'underscore';
import { dateRangeInfoType } from '@/types/Common';

@Component
export default class DateRangePicker extends Vue {
    
    @Prop({required: true})
    reportRange!: dateRangeInfoType;

    onShow= false
    dates = []

    pickedDates=""
    pickerDateL=""
    pickerDateR=""

    @Watch('pickerDateL')
    monthChange(newValue){
        this.pickerDateR = moment(newValue).add(1,'months').format("YYYY-MM")
    }

    @Watch('pickerDateR')
    monthChangeR(newValue){
        this.pickerDateL = moment(newValue).add(-1,'months').format("YYYY-MM")
    }

    mounted(){
        this.initDates()
    }

    public clearDates(){ 
        this.dates=[null,null]
        // this.AddDates()
    }

    public initDates(){
        this.dates = []
     
        this.dates.push(this.reportRange.startDate?.slice(0,10))
        this.dates.push(this.reportRange.endDate?.slice(0,10))
        this.getDatesText(_.sortBy(this.dates))

        if(this.reportRange.startDate?.slice(0,7)){
            if(this.reportRange.startDate?.slice(0,7) == this.reportRange.endDate?.slice(0,7))
                this.pickerDateR = this.reportRange.startDate.slice(0,7)
            else
                this.pickerDateL = this.reportRange.startDate.slice(0,7)
        }
        else
            this.pickerDateR = moment().format("YYYY-MM")
    }

    public getDatesText(reportDate){

        if(!reportDate[1] || !reportDate[0])
            this.pickedDates ='<b>All dates<b>'
        else
            this.pickedDates ='<b class="mr-1 h3">From </b><span style="font-size:14pt;">'+  moment(reportDate[0]).format("MMM DD, YYYY") + '</span> '+
                              '<b class="ml-3 mr-1 h3">  To </b><span style="font-size:14pt;">'+  moment(reportDate[1]).format("MMM DD, YYYY")+ '</span> ';      
    }

    public AddDates(){
        if(!this.dates[1] || !this.dates[0])
            this.dates=['','']
        this.dates = _.sortBy(this.dates)
        this.getDatesText(this.dates)
        const dateRange: dateRangeInfoType = {
            startDate:moment(this.dates[0]).toISOString() ,
            endDate:moment(this.dates[1]).toISOString()
        }
        this.$emit('datesAdded',dateRange)
        this.onShow= false
    }

    public focusSearchButton(){
        Vue.nextTick(()=>{
            const el = document.getElementsByName("search")[0];
            if(el) el.focus();
        })        
    }

    public allowedDates(date){
        const today = moment().format()
        if(date > today) return false
        else 
            return true
    }

    public setDatesToday(){
        const today = moment().format("YYYY-MM-DD")        
        this.dates=[today, today]
        this.pickerDateR = moment().format("YYYY-MM")
    }

    public setDatesOneWeek(){
        const today = moment().format("YYYY-MM-DD")
        const nextWeek = moment().add(-6,'days').format("YYYY-MM-DD")        
        this.dates=[today, nextWeek]
        this.pickerDateR = moment().format("YYYY-MM")
    }

    public setDatesTwoWeeks(){
        const today = moment().format("YYYY-MM-DD")
        const twoWeek = moment().add(-13,'days').format("YYYY-MM-DD")
        this.dates=[today, twoWeek]
        this.pickerDateR = moment().format("YYYY-MM")
    }

    public setDatesOneMonth(){
        const today = moment().format("YYYY-MM-DD")
        const oneMonth = moment(today).add(-1,'month').format("YYYY-MM-DD")       
        this.dates=[today, oneMonth]
    }
}
</script>

<style scoped lang="scss" >
    ::v-deep .vuetify{
        @import "@/styles/vuetify.scss";
        @import "@/styles/_custom_vuetify.scss";
        overflow: hidden;
    
    
        .calendar-left .v-date-picker-header button[aria-label="Next month"]{
                display: none;
        }

        .calendar-right .v-date-picker-header button[aria-label="Previous month"]{
            display: none;
        }
    }

    .popover{
        border-radius: 10px;
        border:1px solid #EEE;
        height: 33rem;
        width: 40rem;
        max-width: 40rem;
        margin:0 -.5rem;
        padding: 0;
        box-shadow: 3px 3px 6px 6px #DDD;
    }
</style>