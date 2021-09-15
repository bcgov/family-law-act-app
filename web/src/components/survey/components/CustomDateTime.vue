<template>
    <div class="form-inline date-select">
        <div class="row">
            <div class="col-sm-12 pb-1"> 
                <div  class="text-primary h4 d-inline" >Date:</div>                
                <select
                    ref="year"
                    class="form-control date-select-year mx-1"
                    :disabled="readOnly"
                    :id="question.inputId"
                    data-test-id="year"
                    v-model="pendingValue['year']"
                    @change="update('year')"
                    >
                        <option value="">(Year)</option>
                        <option v-for="year of yearOptions" :key="year" :value="year">
                            {{year}}
                        </option>
                </select>
                <select
                    ref="month"
                    class="form-control date-select-month mr-1"
                    :disabled="readOnly"
                    :id="question.inputId + '-month'"
                    data-test-id="month"
                    v-model="pendingValue['month']"
                    @change="update('month')"
                    >
                        <option value="">(Month)</option>
                        <option
                            v-for="(monthname, monthidx) of monthOptions"
                            :key="monthidx"
                            :value="'' + (monthidx + 1)"
                            >{{ monthname }}
                        </option>
                </select>
                <select
                    ref="day"
                    class="form-control date-select-day mr-1"
                    :disabled="readOnly"
                    :id="question.inputId + '-day'"
                    data-test-id="day"
                    v-model="pendingValue['day']"
                    @change="update('day')"
                    >
                        <option value="">(Day)</option>
                        <option v-for="day of dayOptions" :key="day" :value="day">
                            {{day}}
                        </option>
                </select>
                <div class="text-primary h4 d-inline ml-3" >Time:</div>
                <select
                    ref="hour"                    
                    class="form-control date-select-hour m-0 mx-1"
                    :disabled="readOnly"
                    :id="question.inputId + '-hour'"
                    data-test-id="hour"
                    v-model="pendingValue['hour']"
                    @change="update('hour')"
                    >
                        <option value="">(Hour)</option>
                        <option v-for="hour of hourOptions " :key="hour" :value="hour">
                            {{hour}}
                        </option>                        
                </select>
                <div class="text-primary h4 d-inline mr-1">:</div>
                <select
                    ref="minute"
                    class="form-control date-select-minute mr-1"
                    :disabled="readOnly"
                    :id="question.inputId + '-minute'"
                    data-test-id="hour"
                    v-model="pendingValue['min']"
                    @change="update('min')"
                    >
                        <option value="">(Minute)</option>
                        <option v-for="minute of minuteOptions " :key="minute" :value="minute">
                            {{minute}}
                        </option>
                </select>
                <select
                    ref="ampm"                    
                    class="form-control date-select-ampm m-0 mx-1"
                    :disabled="readOnly"
                    :id="question.inputId + '-ampm'"
                    data-test-id="ampm"
                    v-model="pendingValue['ampm']"
                    @change="update('ampm')"
                    >                        
                        <option v-for="ampm of ampmOptions " :key="ampm" :value="ampm">
                            {{ampm}}
                        </option>                        
                </select>                

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";

@Component
export default class CustomDateTime extends Vue {
    
    @Prop({required: true})
    question!: Question

    readOnly = false; 
    dataReady = false;

    pendingValue = {year:'', month:'', day:'', hour:'', min:'', ampm:'AM'};
	value;
	monthOptions = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]

    timeZoneOptions = [
        "PST",
        "MST",
        "CST",
        "EST",
        "AST"
    ]

    ampmOptions = [
        "AM","PM"
    ]

    hourOptions: string[] = []
    minuteOptions: string[] = []

	mounted(){ 
        
        this.dataReady = false ;               
        this.value = this.question.value;        
        this.readOnly = this.question.readOnly;
        
        const q = this.question;
        this.pendingValue =this.parseValue(q.value);

        q.valueChangedCallback = () => {
            const pending = this.parseValue(q.value);
            if (pending.year) {
                this.pendingValue = pending;
            }
            this.value = pending;
        };
        
        this.hourOptions = this.getNumbers(13).splice(1)
        this.minuteOptions = this.getNumbers(60)
        this.dataReady = true;
    }

    public getNumbers(maxNum){
        const result = []
        for(let i=0; i<maxNum; i++){
            result.push(String(i).padStart(2, '0'));
        }
        return result
    }

    public parseValue(val) {
		const pending = { year: "", month: "", day: "", hour: "", min: "", ampm:"AM" };
        //console.log(val)
		if (val) {
			const m = ("" + val).match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{2}):(\d{2}):(\d{2})$/);

            const dt = m ? new Date(m[0]) : null;
			if (dt) {
                pending.year = "" + dt.getFullYear();
                pending.month = "" + (dt.getMonth() + 1);
                pending.day = "" + dt.getDate();                
                pending.hour = this.convertTimeToAMPM(m[4]).hour;
                pending.min =  m[5];
                pending.ampm = this.convertTimeToAMPM(m[4]).ampm
                               
			}
		}
        //console.log(pending)
		return pending;
    }


    public update(field) {        
        const p = this.pendingValue;
        if (p.day && this.dayOptions.indexOf(p.day) === -1) p.day = "";
        if (p.year && p.month && p.day && p.hour && p.min) {
            let dt = "" + p.year + "-";
            dt += (p.month.length < 2 ? "0" : "") + p.month;
            dt += "-" + (p.day.length < 2 ? "0" : "") + p.day;

            const hour = (p.hour == '12')? '00':p.hour
            if(p.ampm=='PM')
                dt += "T" + (Number(hour)+12)+":"+p.min+":00"
            else    
                dt += "T" + (hour)+":"+p.min+":00"

            //console.log(dt)
            this.question.value = dt;
        } else {
            this.question.value = null;
            if (field === "year") (this.$refs.month as HTMLElement).focus();
            else if (field === "month") (this.$refs.day as HTMLElement).focus();
            else if (field === "day") (this.$refs.hour as HTMLElement).focus();
            else if (field === "hour") (this.$refs.minute as HTMLElement).focus();
        }

    }

    public convertTimeToAMPM(time){
        let hour12 = String(Number(time.substr(0,2)) % 12 || 12 )
        
        if(hour12.length<2) hour12 = '0'+hour12;

        if (Number(time.substr(0,2))<12) {
            return {hour:hour12, ampm:'AM'}
        } else {
            return {hour:hour12, ampm:'PM'}
        }  
    }

  
    get yearOptions() {
        const q = this.question;
        let curYear = new Date().getFullYear();
        const firstYear = curYear - (q.dateYearsBehind || 0);
        curYear += q.dateYearsAhead || 0;
        const opts = [];
        for (let yr = curYear; yr >= firstYear; yr--) {
            opts.push("" + yr);
        }
        return opts;
    }

    get dayOptions() {
        const p = this.pendingValue;
        const opts = [];
        if (p && p.year && p.month) {
            const lastDay = new Date(
            parseInt(p.year, 10),
            parseInt(p.month, 10),
            0
            ).getDate();
            for (let day = 1; day <= lastDay; day++) {
            opts.push("" + day);
            }
        }
        return opts;
    }
  

   
  
}
</script>