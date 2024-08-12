<template>

    <div :style="{'background-color': '#d6d6d6', padding: '8px', 'font-size': fontSize, 'border-radius': borderRadius, border: border}">
       <slot></slot> 
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NoteBox extends Vue {
    @Prop({required: false, default: '8pt'})
    fontSize?: string;

    @Prop({required: false, default: '0px'})
    borderRadius?: string;

    @Prop({required: false, default: '0px'})
    border?: string;
}
</script>