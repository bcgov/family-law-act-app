<template>
    <div :class="checkbox" >
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
        <div :style="{display:'inline-block', marginLeft: marginLeft, textIndent: 0 }" v-html="text">{{text}}</div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CheckBox extends Vue {
   
   @Prop({required: true})
    text!: string;

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

    @Prop({default: '1.75rem'})
    marginLeft!: string;

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