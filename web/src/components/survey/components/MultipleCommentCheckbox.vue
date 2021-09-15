<template>
    <div v-if="dataReady" class="survey-personname"> 
            
        <div  v-for="(choice,inx) in choices" :key="inx" style="padding-left: 0.5em;">
            <label class="m-0 p-0">
                <input 
                    type="checkbox" 
                    :id="fields[inx].id" 
                    style="display:inline;" 
                    @change="inputChanged"
                    v-model="checked[inx]"/> 

                <div    
                    v-for="txt,index in choice.text"
                    :key="index"
                    style="cursor:pointer; display:inline; padding-left: .75em; font-size: 110%; font-weight: normal; transform: translate(0,-2px) " 
                    >
                    <tooltip style="display:inline; margin:0 -0.65rem;" v-if="txt.tooltip" :title="txt.text" :index="index" placement="top"/>
                    <div style="display:inline;" v-else v-html="txt.text">{{txt.text}}</div>
                </div>                         
            </label>
            <textarea 
                v-if="checked[inx] && choice.comment"
                class="form-control"
                :style="{display:'block', margin:'0.5rem'}" 
                type="text" 
                :disabled="readOnly"
                @change="inputChanged"
                v-model="pendingValue[fields[inx].name]"              
                />
        </div>
            
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";
import * as SurveyVue from "survey-vue"; 
import Tooltip from "@/components/survey/Tooltip.vue";

@Component({
    components:{
        Tooltip
    }
})

export default class MultipleCommentCheckbox extends Vue {
    
    @Prop({required: true})
    question!: Question
 
    choices = []
    checked = []

    readOnly = false; 

    pendingValue = {}
    value = {}
    
    fields =[];

    dataReady = false;

    mounted(){ 
        this.dataReady = false ;
        
        this.choices = JSON.parse(JSON.stringify(this.question.choices));
        this.readOnly = this.question.readOnly;
        
        this.pendingValue = Object.assign({}, this.question.value)
        this.fields = this.makeFields();
       
        this.questionValidator();
        this.dataReady = true;
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {
          
            let error = null      
            for (const field of this.fields) {
                const newValue = (this.pendingValue[field.name] || "");
               
                if (!newValue.length && field.hasComment && this.pendingValue['checked'] && this.pendingValue['checked'].includes(field.value)){
                    error = new SurveyVue.SurveyError("Please enter all fields")
                    break;
                }                
            }
            return error
        }
    }

    public inputChanged(){
        const checkedChoices = [];
        for(const choiceInx in this.choices){             
            if(this.checked[choiceInx]){
                checkedChoices.push(this.choices[choiceInx].value)
            }
        }
        this.pendingValue['checked'] = checkedChoices;

        const currentVal = this.question.value || {};
        let updatedVal = {};
        let emptyField = true;
        let valueChanged = false;

        for (const field of this.fields) {       
                     
            let newValue = ''          
            if(this.pendingValue[field.name]){  
                updatedVal[field.name] = this.pendingValue[field.name];
                newValue = this.pendingValue[field.name];
                emptyField = false;
            }                          
            
            if ((currentVal[field.name] || "") !== newValue) valueChanged = true;            
            
        }
        if (valueChanged) this.question.value = emptyField ? null : updatedVal;

    }

    public makeFields() {
        
        const fields = []
        for(const choiceInx in this.choices){
            const choice = this.choices[choiceInx]
           
            this.addTooltip(choiceInx)            

            fields.push(
            {                
                name: choice.value+'Comment',
                hasComment: choice.comment,
                value: choice.value,
                id: this.question.inputId +"-"+ choice.value.toLowerCase()
            })
            if(this.pendingValue['checked'] && this.pendingValue['checked'].includes(choice.value))this.checked.push(true)
            else  this.checked.push(false)           
        }
        fields.push(
        {                
            name: 'checked',
            hasComment: false,
            value: 'checked',
            id: this.question.inputId +"-checked"
        })   

        return fields;
    }

    public addTooltip(choiceInx){

        const text = this.choices[choiceInx].text
        const splitedText = text.split('`')
        const allTexts = []
        for(const part in splitedText){            
            if(Number(part)%2 == 1)
                allTexts.push({text:splitedText[part], tooltip:true})
            else
                allTexts.push({text:splitedText[part], tooltip:false})
        }
        this.choices[choiceInx].text = allTexts
    }
    /*
        {
            "type": "multiplecommentcheckbox",
            "name": "changesSinceOrderList",
            "title": "Explain to the court what has changed that makes the existing order no longer appropriate.",
            "description": "Select each option that fits your situation and provide the additional detail as required.",   
            "choices": [
            {"value":"myFinancialChanged",    "comment":false,  "text":"My financial situation has changed"},
            {"value":"partyFinancialChanged", "comment":false,  "text":"I believe the other party’s financial situation has changed"},
            {"value":"myEmploymentChanged",   "comment":true,  "text":"My employment, training, health and/or ability to work have changed"},
            {"value":"partyEmploymentChanged","comment":true,  "text":"I believe the other party’s employment, training, health and/or ability to work have changed"},
            {"value":"myHouseholdChanged",    "comment":true,  "text":"My household expenses have changed"},
            {"value":"newInformation",        "comment":true,  "text":"Information has become available that was not available when the order was made"},
            {"value":"other",                 "comment":true,  "text":"Other changes or circumstances"}
            ],
            "isRequired": true
        },
    */
}
</script>
