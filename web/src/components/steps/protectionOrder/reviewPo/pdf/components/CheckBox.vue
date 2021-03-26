<template>
    <div >
        <span 
            :style="{position: 'absolute',
            border: '2px solid #000!important',
            width: '1em', 
            transform:'translate('+shift+'px,4px)',           
            height: '1em',           
            fontSize: '1.0em'}">
            <div :style="{transform:'translate('+shiftmark+'px,-6px)'}" v-html="getCheck()"/>
        </span> 
        <div :style="{display:'inline-block', textIndent: getShift() }" v-html="text">{{text}}</div>
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

    @Prop({default: 0})
    shiftmark!: number;

    @Prop({default: 0})
    shift!: number;

    public getCheck(){
        if(this.check) return "&#10003"
        return ""
    }
    public getShift(){
        const temp = 30+Number(this.shift)
        if(this.shift !=0) return  temp+ 'px'
        return '30px'
    }
}
</script>