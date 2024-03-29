<template>
    <div class="survey-address">
        <div class="row survey-address-line" v-if="selOptions.length">
            <div class="col-sm-6 form-inline">
                <label class="survey-sublabel">Copy from:</label>
                <select
                    v-model="copiedAddress"
                    class="form-control ml-2"
                    ref="copyFrom"
                    @change="copySelected">
                    <option value="">(Select Address)</option>
                    <option
                        v-for="(opt, inx) in selOptions"
                        :key="inx"
                        :value="opt.value"
                        >{{ opt.label }}</option>
                </select>
            </div>
        </div>
        <div class="row survey-address-line">
            <div class="col-sm-12">
                <input
                    class="form-control"
                    placeholder="Street address, for example: 800 Hornby St."
                    data-test-id="address"
                    :id="question.inputId"
                    v-model="pendingValue['street']"
                    @change="updateValue"/>
            </div>
        </div>
        <div class="row survey-address-line">
            <div class="col-sm-6">
                <label class="survey-sublabel" :for="question.inputId + '-city'">City / Town</label>
                <input
                    class="form-control"
                    :id="question.inputId + '-city'"
                    data-test-id="city"
                    v-model="pendingValue['city']"
                    @change="updateValue"/>
            </div>
            <div class="col-sm-6">
                <label class="survey-sublabel" :for="question.inputId + '-state'">Province / State / Region</label>
                <input
                    v-if="displayProvinceInputField"
                    class="form-control"
                    :id="question.inputId + '-state'"
                    data-test-id="state"
                    v-model="pendingValue['state']"
                    @change="updateValue"/>
                <select
                    v-else
                    class="form-control"
                    v-model="pendingValue['state']"
                    data-test-id="state"
                    :id="question.inputId + '-state'"
                    @change="updateValue"
                    >
                    <option value="">(Select)</option>
                    <option
                        v-for="prov of provinceOptions"
                        :key="prov.value"
                        :value="prov.value"
                        >{{ prov.text }}</option>
                </select>                
            </div>
        </div>
        <div class="row survey-address-line pb-1">
            <div class="col-sm-6">
                <label class="survey-sublabel" :for="question.inputId + '-country'">Country</label>
                <select
                    class="form-control"
                    v-model="pendingValue['country']"
                    data-test-id="country"
                    :id="question.inputId + '-country'"
                    @change="updateValue">
                    <option value="">(Select)</option>
                    <option
                        v-for="country of countryOptions"
                        :key="country"
                        :value="country"
                        >{{ country }}</option>
                </select>
            </div>
            <div class="col-sm-6">
                <label class="survey-sublabel" :for="question.inputId + '-postcode'">Postal Code</label>
                <input
                    class="form-control"
                    :id="question.inputId + '-postcode'"
                    data-test-id="postcode"
                    v-model="pendingValue['postcode']"
                    :placeholder="postcodePlaceholder"
                    @change="updateValue"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { Question } from "survey-vue";
import * as UsStatesList from "./UsStatesList.json";
import * as CaProvinceList from "./CaProvinceList.json";
import * as countryList from "./countries.json";
import * as SurveyVue from "survey-vue"; 

@Component
export default class AddressInfo extends Vue {
    
    @Prop({ required: true })
    question!: Question;

    provinceOptions = [];
    USAregionOptions = [];
    CAregionOptions = [];
    countryOptions = [];
    postcodePlaceholder = 'A1A 1A1';
    displayProvinceInputField = false;    

    selOptions = [];
    pendingValue = this.loadValue(this.question.value);

    value = this.question.value;
    copiedAddress = {} as {
        street: any;
        city: any;
        state: any;
        country: any;
        postcode: any;
    };

    mounted() {

        this.USAregionOptions = UsStatesList.states;
        this.CAregionOptions = CaProvinceList.provinces;
        this.countryOptions = countryList.countries;        

        const q = this.question;
        q.valueChangedCallback = () => {
            const pending = this.loadValue(q.value);
            this.pendingValue = pending;
            this.value = q.value;
            this.selOptions = this.prevAddrOptions();
        };
        this.selOptions = this.prevAddrOptions();
        this.displayProvinceInputField = false;

        if (this.value){
            if (this.value.country == "United States") {            
                this.provinceOptions = this.USAregionOptions;
                this.postcodePlaceholder = '12345 or 12345-1234'
            } else if (this.value.country == "Canada") {
                this.provinceOptions = this.CAregionOptions;
                this.postcodePlaceholder = 'A1A 1A1'
            } else {
                this.displayProvinceInputField = true;
                this.provinceOptions = [];
                this.postcodePlaceholder = '';            
            }
        } else {            
            this.provinceOptions = this.CAregionOptions;
            this.pendingValue['country'] = "Canada";
            this.pendingValue['state'] = "BC";
            this.postcodePlaceholder = 'A1A 1A1';          
        }        

        this.questionValidator();
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {
            
            let error = null 
            const address =  Object.assign({}, this.pendingValue);    
            
            if(address?.country =='United States'){
                const index = this.USAregionOptions.findIndex(state=>{return(state.value == address.state)});
                if(index<0)
                    error = new SurveyVue.SurveyError("Please select a 'Province / State / Region'")
                
                if(address.postcode){
                    const postcodeFormat = /(^\d{5}?$)|(^\d{5}\-\d{4}?$)/;                                
                    if(!postcodeFormat.test(address.postcode)) error = new SurveyVue.SurveyError("Postal Code is invalid!")
                }
            }
            else if(address?.country =='Canada'){
                const index = this.CAregionOptions.findIndex(state=>{return(state.value == address.state)});
                if(index<0)
                    error = new SurveyVue.SurveyError("Please select a 'Province / State / Region'")
                
                if(address.postcode){
                    const postcodeFormat = /^[A-Z]\d[A-Z] \d[A-Z]\d?$/;                              
                    if(!postcodeFormat.test(address.postcode)) error = new SurveyVue.SurveyError("Postal Code is invalid!")
                    if(address.postcode?.substring(0,3) == 'A1A' && address.state != 'NL') error = new SurveyVue.SurveyError("Postal Code is invalid for the Province!")
                    if(address.postcode.length != 7 ) error = new SurveyVue.SurveyError("Postal Code is invalid!")
                    
                }
            }
            else {
                
                if(!address.state || address.state.length == 0)
                    error = new SurveyVue.SurveyError("Please select a 'Province / State / Region'")
                
                if(!address.postcode || address.postcode.length == 0)
                    error = new SurveyVue.SurveyError("Please enter the Postal Code!")                    
                
            }

            return error
        }
    }

    public prevAddrOptions() {
        const q = this.question;
        const skipName = q.name;
        const survey = q.survey;
        const addrs = [];
        const seen = {};
        let otherQVal;
        for (const page of survey.pages) {
            for (const otherQ of page["questions"]) {
                
                if ( otherQ.getType() === "address" && otherQ.name !== skipName && (otherQVal = otherQ.value) ) {
                    const parts = [
                        otherQVal.street,
                        otherQVal.city,
                        otherQVal.state,
                        otherQVal.country,
                        otherQVal.postcode
                    ];

                    const lbl = parts
                        .map(p => p.trim())
                        .filter(p => p)
                        .join(", ");

                    if (lbl && !seen[lbl]) {
                        seen[lbl] = 1;
                        addrs.push({
                            name: otherQ.name,
                            label: lbl, // otherQ.referLabel,
                            value: Object.assign({}, otherQ.value)
                        });
                    }
                }
            }
        }
        addrs.sort((a, b) => a.label.localeCompare(b.label));
        return addrs;
    }

    public UpdateRegion() {
        // console.log(this.pendingValue)
        if (this.pendingValue.country == "United States") {
            this.displayProvinceInputField = false;
            this.provinceOptions = this.USAregionOptions;
            this.postcodePlaceholder = '12345 or 12345-1234'
        } else if (this.pendingValue.country == "Canada") {
            this.displayProvinceInputField = false;
            this.provinceOptions = this.CAregionOptions;
            this.postcodePlaceholder = 'A1A 1A1'
        } else {
            this.displayProvinceInputField = true;
            this.provinceOptions = [];
            this.postcodePlaceholder = '';
        }
    }
    
    public updateValue() {

        this.UpdateRegion();

        const value = Object.assign({}, this.pendingValue);
        for (const k in value) {
            if (value[k] !== undefined && value[k].length) {
                this.question.value = value;
                return;
            }
        }
        this.question.value = null;
    }

    public loadValue(val) {
        val = val || {};

        return {
            street: val.street || "",
            city: val.city || "",
            state: val.state || "",
            country: val.country || "",
            postcode: val.postcode || ""
        };       
    }

    public copySelected() {       
        this.pendingValue = this.copiedAddress;
        this.updateValue();
    }
}
</script>
