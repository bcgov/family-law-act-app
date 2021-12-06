<template>
    <div style="display:inline-block;">
        <div v-if="beforetext" style="display:inline-block; margin-right:.25rem;" v-html="beforetext"> {{beforetext}} </div>
        <div style="display:inline-block">
            <div :style="{position: 'absolute', marginTop:marginTop, fontSize: '11pt', color:'#000000', minWidth: textwidth, textAlign: 'center'}">{{text}}</div> 
            <div :style="{borderBottom: '0.7px solid #313132', minWidth: textwidth}"></div>            
            <div :style="{position: 'absolute', marginTop:'-1px', fontSize: hintFontSize, color:'#313132'}">
               <i v-if="italicHint"> {{hint}} </i>
               <span v-else > {{hint}} </span> 
            </div>
        </div>
        <div v-if="aftertext" style="display:inline-block; margin-left:.1rem;" v-html="aftertext"> {{aftertext}} </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UnderlineForm extends Vue {
    @Prop({required: true})
    beforetext!: string;

    @Prop({required: false, default:''})
    aftertext!: string;

    @Prop({required: true})
    text!: string;

    @Prop({required: true})
    hint!: string;

    @Prop({required: true})
    textwidth!: string;

    @Prop({required: false, default:'6pt'})
    hintFontSize!: string;
    
    @Prop({required:false, default:false})
    italicHint!: boolean;

    @Prop({default: '-20px'})
    marginTop!: string;
}
</script>