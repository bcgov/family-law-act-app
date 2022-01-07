<template>
    <div :class="checkbox" style="margin-left: 2rem;">
        <div
            style="display: inline; position: absolute; margin-left: -2.5rem;">{{order}}.</div>
        <div 
            :style="{position: 'absolute',
            margin:'0 0 0 '+ boxMargin,
            display: inline,
            border: '1px solid #000!important',             
            width: '1em', 
            transform:'translate('+shift+'px,4px)',           
            height: '1em',           
            fontSize: '1.0em'}">
            <div :style="{transform:'translate('+shiftmark+'px,-4px)'}" v-html="getCheck()"/>
        </div> 
        <div :style="{display:'inline-block', margin:'0 0 0 1rem', textIndent: 0 }" v-html="text">{{text}}</div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class OrderedCheckBox extends Vue {
   
   @Prop({required: true})
    text!: string;

    @Prop({required: true})
    order!: number;

    @Prop({required: true})
    check!: string;

    @Prop({default: 18})
    shiftmark!: number;

    @Prop({default: 0})
    shift!: number;

    @Prop({default: ''})
    inline!: string;

    @Prop({default: '-1rem'})
    boxMargin!: string;

    @Prop({default: 'checkbox'})
    checkbox!: string;


    public getCheck(){
        if(this.check=='?') return "&#63"
        else if(this.check) return "&#10003"
        return ""
    }
    public getShift(){
        const temp = -10+Number(this.shift)
        if(this.shift !=0) return  temp+ 'px'
        return '-10px'
    }
}
</script>