<template>
    <div class="survey-personname">
       <div :class="textClass" style="display:inline; margin-right:0.5rem;" v-html="bodyText" />
       <input 
            class="form-control" 
            :id="question.inputId" 
            :style="{display:'inline',width:inputWidth}" 
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
 
    bodyText = ''
    inputWidth = ''
    textClass = ''
    readOnly = false    

    mounted(){
        this.readOnly = this.question.readOnly;
        this.bodyText = this.question.bodyText;
        this.inputWidth = this.question.inputWidth;
        this.textClass = this.question.textClass;
    }
}
</script>
