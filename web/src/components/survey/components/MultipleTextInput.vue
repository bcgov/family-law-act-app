<template>
    <div v-if="dataReady" class="survey-personname">        
        <div v-for="(n,inx) in (textBefore.length-1)" :key="inx" style="display:inline;"> 
            <div :class="textClass" style="display:inline;" v-html="textBefore[inx]" />
            <input 
                class="form-control"
                :style="{display:'inline-block', width:inputWidths[inx], margin:'0.5rem'}" 
                :type="inputTypes[inx]" 
                :disabled="readOnly"
                @change="inputChanged"
                v-model="pendingValue[fields[inx].name]"
                :id="fields[inx].id"/>
        </div>
        <div :class="textClass" style="display:inline;" v-html="textBefore[textBefore.length-1]" />
        
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";
import * as SurveyVue from "survey-vue"; 

@Component
export default class MultipleTextInput extends Vue {
    
    @Prop({required: true})
    question!: Question
 
    textBefore = [];
    inputWidths = [];
    textClass = [];
    inputTypes = [];
    inputNames = [];

    readOnly = false; 

    pendingValue = {}
    value = {}
    
    fields =[];

    dataReady = false;

    mounted(){ 
        this.dataReady = false ;

        this.textBefore = this.splitData(this.question.textBeforeInputs)
        this.inputWidths = this.splitData(this.question.inputWidths)
        this.inputTypes = this.splitData(this.question.inputTypes)
        this.inputNames = this.splitData(this.question.inputNames)
        this.textClass = this.question.textClass;        
        
        this.readOnly = this.question.readOnly;
                
        this.fields = this.makeFields()
        this.pendingValue = Object.assign({}, this.question.value)

        this.questionValidator();
        this.dataReady = true
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {
            
            let error = null      
            for (const field of this.fields) {
                const newValue = (this.pendingValue[field.name] || "").trim();
            
                if (!newValue.length){
                    error = new SurveyVue.SurveyError("Please enter all fields")
                    break;
                }                
            }
            return error
        }
    }

    public splitData(data){
        const dataInput = data.substring(1).slice(0, -1);
        return dataInput.split('},{');
    }

    public inputChanged(){

        const currentVal = this.question.value || {};
        let updatedVal = {};
        let emptyField = true;
        let valueChanged = false;

        for (const field of this.fields) {
            const newValue = (updatedVal[field.name] = (this.pendingValue[field.name] || "").trim());

            if (newValue.length) emptyField = false;
            if ((currentVal[field.name] || "") !== newValue) valueChanged = true;
        }
        if (valueChanged) this.question.value = emptyField ? null : updatedVal;

    }

    public makeFields() {

        const fields = []
        for(let i=0; i<this.textBefore.length-1;i++){
            fields.push(
            {
                name: this.inputNames[i],
                label: "Input"+i,
                id: this.question.inputId +"-"+this.inputNames[i].toLowerCase() ,
                desc: "inputDesc"+i
            })            
        }

        return fields;
    }
}
</script>
