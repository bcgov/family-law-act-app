<template>
    <div>        
        <div class="row">
            <div
                class="col-sm-6"
                :class="{ 'pb-1': !field.desc }"
                v-for="field of fields"
                :key="field.name"
            >
                <label class="survey-sublabel" :for="field.id">{{ field.label }}</label>
                <input
                    class="form-control"
                    :id="field.id"
                    :data-test-id="field.name"
                    v-model="pendingValue[field.name]"
                    @change="updateValue"
                    @input="acceptNumber"
                />
                <p v-if="field.desc" class="survey-desc small">{{ field.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { Question } from "survey-vue";
import * as SurveyVue from "survey-vue"; 

@Component
export default class ContactInfo extends Vue {
    
    @Prop({ required: true })
    question!: Question;
 
    fields = this.makeFields();
    pendingValue = Object.assign({}, this.question.value);
    value = this.question.value;

    mounted() {

        this.fields = this.makeFields();
        this.pendingValue = Object.assign({}, this.question.value);
        this.value = this.question.value

        const q = this.question;
        q.valueChangedCallback = () => {
            if (q.value) {
                this.pendingValue = Object.assign({}, q.value);
            }
            this.value = q.value;
        };
        this.questionValidator();
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {

            let error = null 
            const contact =  Object.assign({}, this.pendingValue);    
            const phoneFormat = /^\([0-9]{3}\) [0-9]{3}\-[0-9]{4}?$/;
            
            if(contact.phone){                
                if(!phoneFormat.test(contact.phone)) error = new SurveyVue.SurveyError("Phone Number is invalid!");
            }
            if(contact.fax){                
                if(!phoneFormat.test(contact.fax)) error = new SurveyVue.SurveyError("Fax Number is invalid!");
            }
            if(contact.email){ 
                const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;               
                if(!emailFormat.test(contact.email)) error = new SurveyVue.SurveyError("Email format is invalid!");
            }


            return error
        };
    }
  
    public makeFields() {
        const q = this.question;
        const fields = [
            {
                name: "phone",
                label: q.labelPhone || "Phone",
                id: q.inputId,
                desc: q.descPhone
            },
            {
                name: "email",
                label: q.labelEmail || "Email",
                id: q.inputId + "-email",
                desc: q.descEmail
            },
            // {
            //     name: "fax",
            //     label: q.labelFax || "Fax",
            //     id: q.inputId + "-fax",
            //     desc: q.descFax
            // }            
        ];
        return fields;
    }

    public updateValue() {

        const val = Object.assign({}, this.pendingValue);
        const currentVal = this.question.value || {};
        let updatedVal = {};
        let empty = true;
        let changed = false;
        for (const field of this.fields) {
            const v = (updatedVal[field.name] = (val[field.name] || "").trim());
            if (v.length) empty = false;
            if ((currentVal[field.name] || "") !== v) changed = true;
        }
        if (this.question.isRequired && !updatedVal["phone"]) empty = true; // require phone number
        if (changed) this.question.value = empty ? null : updatedVal;
    }

    public acceptNumber() {
        if(this.pendingValue['phone']){
            var dgt = this.pendingValue['phone'].replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            let thirdDigitCondition = dgt[3] ? '-' + dgt[3] : ''       
            this.pendingValue['phone'] = !dgt[2] ? dgt[1] : '(' + dgt[1] + ') ' + dgt[2] + thirdDigitCondition;
        }
        if(this.pendingValue['fax']){
            var faxDgt = this.pendingValue['fax'].replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/); 
            let thirdFaxDigitCondition = faxDgt[3] ? '-' + faxDgt[3] : '';      
            this.pendingValue['fax'] = !faxDgt[2] ? faxDgt[1] : '(' + faxDgt[1] + ') ' + faxDgt[2] + thirdFaxDigitCondition;
        }
    }
}
</script>
