<template>
    <div style="display:inline-block;">
        <div v-if="beforetext" style="display:inline-block; margin-right:0.5rem;"> {{beforetext}} </div>
        <div style="display:inline-block">
            <div :style="{position: 'absolute', marginTop:'-22px', fontSize: '12pt', color:'#000000', minWidth: textwidth, textAlign: 'center'}">{{text}}</div> 
            <div :style="{borderBottom: '0.7px solid #313132', minWidth: textwidth}"></div>            
            <div style="position: absolute; margin-top:-1px; font-size: 8pt; color:#313132;"><i>{{hint}}</i></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UnderlineForm extends Vue {
    @Prop({required: true})
    beforetext!: string;
    @Prop({required: true})
    text!: string;
    @Prop({required: true})
    hint!: string;
    @Prop({required: true})
    textwidth!: string;
}
</script>