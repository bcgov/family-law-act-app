<template>
    <div class="survey-personname">
       <div style="display:inline;" v-html="title" />
       <input 
            class="form-control" 
            :id="question.inputId" 
            :style="{display:'inline',width:widthInput}" 
            type="number" 
            v-model="question.value"/>
    </div>
</template>

<script lang="ts">

import { Component, Vue, Prop} from 'vue-property-decorator';
import { Question } from "survey-vue";


@Component
export default class TextBeforeInputNumber extends Vue {
    
    @Prop({required: true})
    question!: Question
 
    title = ''
    widthInput =''
    readOnly = false    

    mounted(){        
        //console.log(this.question)
        this.readOnly = this.question.readOnly;
        this.title = this.question.title;
        this.widthInput = this.question.widthInput
    }
};
</script>
