<template>
    <div v-if="dataReady" class="survey-personname">        
       
        <div>
            <b-form-group >
                <b-form-radio-group size="sm" style='margin-bottom:1rem; ' @change="inputChanged" stacked v-model="pendingValue">
                    <b-form-radio 
                        style="margin:0.25rem 0;font-size:14pt;"                       
                        v-for="(option,index) in choices"                        
                        :key="'custom-radio-group-'+index"
                        :value="option.value">
                        <div style="margin:-0.25rem 0 0 0.5rem;">{{option.text}}</div>
                    </b-form-radio>
                    <b-form-radio v-if="hasOther" value="other"   style="margin:0.25rem 0;font-size:14pt;">
                        <div :class="textClass" :style="{margin:'-0.25rem 0 0 0.5rem'}">{{otherText}}</div>
                        <textarea v-if="pendingValue=='other'" :maxlength="maxChar" type="text" class="form-control"  v-model="pendingComment" @change="inputChanged" />
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
export default class CustomRadioGroup extends Vue {
    
    @Prop({required: true})
    question!: Question
 

    textClass = [];

    hasOther = false;
    otherText = '';

    maxChar=0;
    
    numberOfRows = 0;

    readOnly = false; 

    pendingValue = "";
    pendingComment = ""

    choices = [];
    
    fields =[];

    dataReady = false;

    mounted(){ 
        this.dataReady = false ;
        
        this.textClass = this.question.textClass;
        this.maxChar = this.question.maxChar || 10000;

        this.choices = this.question.choices || [];
        this.hasOther = this.question.hasOther || false;
        this.otherText = this.question.otherText || 'Other (describe)';

        this.readOnly = this.question.readOnly;
        
        this.fields = [this.question.name, this.question.name+'Comment']
   
        if(this.question.comment.length>this.maxChar){
            this.question.comment = this.question.comment.slice(0,this.maxChar)
        }
        
        this.pendingValue = this.question.value
        this.pendingComment = this.question.comment

        this.questionValidator();
        this.dataReady = true
        console.log(this.question)
    }

    public questionValidator(){
        this.question.validateValueCallback = () => {            
            
            if(!this.pendingValue)
                return( new SurveyVue.SurveyError("Please select an option"))
            else if(this.pendingValue == 'other' && this.pendingComment.trim().length==0)
                return( new SurveyVue.SurveyError("Please describe other"))
            else
                return null
        }
    }

    public inputChanged(){
        this.question.value = this.updateValue(this.question.value, this.pendingValue)
        this.question.comment = this.updateValue(this.question.comment, this.pendingComment)
    }

    public updateValue(value, pendingValue)
    {
        const currentVal = value || "";
        let updatedVal = "";
        let emptyField = true;
        let valueChanged = false;

        const newValue = (updatedVal = (pendingValue || "").trim());
        if (newValue.length) emptyField = false;
        if ((currentVal || "") !== newValue) valueChanged = true;
                
        if (valueChanged) value = emptyField ? null : updatedVal;
        return value
    }

            /* Example
            {
              "type": "customradiogroup",
              "name": "existingResponsibilityType",
              "title": "Select the option that best describes.",
              "visible": false,
              "visibleIf": "{existingType} = 'ExistingOrder'",
              "isRequired": true,
              "hasOther": true,
              "maxChar": 60,
              "choices": [
                {
                  "value": "payor",
                  "text": "I am required to make payments"
                },
                {
                  "value": "payee",
                  "text": "I am to be paid"
                }
              ]
            },
            */     
}
</script>
