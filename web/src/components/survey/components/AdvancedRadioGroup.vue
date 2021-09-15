<template>
    <div v-if="dataReady" class="survey-personname">        
       
        <div>
            <b-form-group >
                <b-form-radio-group style='margin-bottom:1rem' @change="inputChanged" stacked v-model="pendingValue['selected']">
                    <b-form-radio
                        :style="{margin: radioMargins}"
                        v-for="(value,index) in radioOutputValues[0]"                        
                        :key="index"
                        :value="value">
                            <div :style="{margin:textBefore[index].length ==1? '0' :radioTextMargins}">
                                <div v-for="(n,inx) in (textBefore[index].length-1)" :key="inx" style="display:inline;"> 
                                    <div :class="textClass" style="display:inline;" v-html="textBefore[index][inx]" />
                                    <input 
                                        class="form-control"
                                        :style="{display:'inline-block', width:inputWidths[index][inx], margin:'.25rem 0.5rem'}" 
                                        :type="inputTypes[index][inx]" 
                                        :disabled="readOnly"
                                        @change="inputChanged"
                                        v-model="pendingValue[fields[index][inx].name]"
                                        :id="fields[index][inx].id"/>
                                </div>
                                <div :class="textClass" style="display:inline;" v-html="textBefore[index][textBefore[index].length-1]" />
                            </div>
                 
                    </b-form-radio>
                    <b-form-radio v-if="hasOther" value="other"   style="margin:1rem 0;">
                        <div :class="textClass" :style="{display:'inline-block', margin:'0'}">{{otherText}}</div>
                        <textarea v-if="pendingValue['selected']=='other'" type="text" class="form-control"  v-model="pendingValue['otherComment']" @change="inputChanged" />
                    </b-form-radio>
                </b-form-radio-group>                
            </b-form-group>                

        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";
import * as SurveyVue from "survey-vue"; 

@Component
export default class AdvancedRadioGroup extends Vue {
    
    @Prop({required: true})
    question!: Question
 
    textBefore = [];
    inputWidths = [];    
    inputTypes = [];
    inputNames = [];
    radioOutputValues = [];
    textClass = [];
    radioMargins='';
    radioTextMargins='';
    hasOther = false;
    otherText = '';
    
    numberOfRows = 0;

    readOnly = false; 

    pendingValue = {}
    
    fields =[];

    dataReady = false;

    mounted(){ 
        this.dataReady = false ;
        this.radioOutputValues = this.splitData(this.question.radioOutputValues)
        this.textBefore = this.splitData(this.question.textBeforeInputs)
        this.inputWidths = this.splitData(this.question.inputWidths)
        this.inputTypes = this.splitData(this.question.inputTypes)
        this.inputNames = this.splitData(this.question.inputNames)
        this.textClass = this.question.textClass;
        this.radioMargins = this.question.radioMargins;
        this.radioTextMargins = this.question.radioTextMargins;
        this.hasOther = this.question.hasOther || false;
        this.otherText = this.question.otherText || 'Other (describe)';

        this.numberOfRows = this.inputTypes.length
        this.readOnly = this.question.readOnly;
        
        this.fields = this.makeFields()
        this.pendingValue = Object.assign({}, this.question.value)

        this.questionValidator();
        this.dataReady = true
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {
            let row = 2;
            
            if(!this.pendingValue['selected']){
                    return( new SurveyVue.SurveyError("Please select an option"))
            }else if(this.pendingValue['selected'] == 'other'){
                row = this.numberOfRows -1
            }else{
                row = this.radioOutputValues[0].indexOf(this.pendingValue['selected'])
                if(this.textBefore[row].length<2) return null
            }            
            let error = null      
            for (const field of this.fields[row]) {
                const newValue = (this.pendingValue[field.name] || "").trim();

                if (!newValue ||(newValue && !newValue.length)){
                    error = new SurveyVue.SurveyError("Please enter all fields")

                    break;
                }                
            }
            return error
        }
    }

    public splitData(data){
        const dataInput = data.substring(1).slice(0, -1);
        const inputRows = dataInput.split('};{');
        const dataOutput = [];
        for(const inputRow of inputRows)
            dataOutput.push(inputRow.split('},{'))

        return dataOutput
    }

    public inputChanged(){

        const currentVal = this.question.value || {};
        let updatedVal = {};
        let emptyField = true;
        let valueChanged = false;

        for(let j=0; j<this.numberOfRows; j++){
            for (const field of this.fields[j]) {
                const newValue = (updatedVal[field.name] = (this.pendingValue[field.name] || "").trim());
                if (newValue.length) emptyField = false;
                if ((currentVal[field.name] || "") !== newValue) valueChanged = true;
            }
        }
        if (valueChanged) this.question.value = emptyField ? null : updatedVal;

    }

    public makeFields() {

        const fields = []
        const generalId = this.question.inputId;
        for(let j=0; j<this.numberOfRows; j++){
            const fieldRows = [];
            const inputname = this.inputNames[j]
            for(let i=0; i<inputname.length;i++){
                fieldRows.push(
                {
                    name: inputname[i],
                    id: generalId +"-"+inputname[i].toLowerCase() ,                
                })            
            }
            fields.push(fieldRows)
        } 
        const fieldRow = [{name:'selected', id:generalId +'-selected'}];
        if(this.hasOther) fieldRow.push({name:'otherComment', id:generalId +'-other-comment'})
        fields.push(fieldRow)
        this.numberOfRows++; 
        return fields;
    }
            /* Example
            {
              "type": "advancedradiogroup",
              "name": "paymentRequestStartingDate",              
              "title": "When do you want the child support payments to start?",
              "description" : "You need to tell the court .",
              "radioOutputValues":"{ExactDate},{FreeComment}",
              "inputNames":"{startingDate};{lawyerName},{clientName}",
              "inputTypes":"{date};{text},{text}",
              "inputWidths":"{12rem};{10rem},{9rem}",                  
              "textBeforeInputs":"{Enter exact date:},{};{I},{, the lawyer for},{, acknowledge it.}",
              "textClass": "sv_q_title font-weight-bold",
              "radioMargins":"0 0 1rem 0",
              "radioTextMargins":"-0.6rem 0 0 0",
              "hasOther": true,
              "isRequired": true
            },
            */     
}
</script>
