<template>
    <div v-if="dataReady" class="survey-personname">        
        <b-button :class="textClass" @click="inputChanged()" :disabled="readOnly">
            {{buttonText}}
        </b-button>       
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";

@Component
export default class CustomButton extends Vue {
    
    @Prop({required: true})
    question!: Question
 
    textClass = [];   
    buttonText = [];

    clickedNumber = 0;

    readOnly = false; 
    dataReady = false;

    mounted(){ 
        this.dataReady = false ;
        
        this.textClass = this.question.textClass;        
        this.buttonText = this.question.buttonText;
        this.readOnly = this.question.readOnly;
        this.dataReady = true
    }


    public inputChanged(){
        this.clickedNumber++;
        this.question.value = this.clickedNumber;
    }

}
</script>
