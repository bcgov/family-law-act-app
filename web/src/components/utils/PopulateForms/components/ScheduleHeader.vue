<template>
    <div style="
        display: flex; 
        flex-direction: row; 
        flex-wrap: no-wrap; 
        align-items: flex-end; 
        background-color: #5d5d5d;
        color: #fff;
    ">
        <div style="flex-basis: 240px; border-right: 4px solid #fff; font-size: 22pt; font-weight: bold; padding: 4px;"> {{ scheduleNumber }} </div>
        <div style="border-right: 4px solid #fff; font-size: 14pt; font-weight: bold; padding: 4px;"> {{ scheduleTitle }} </div>
        <div style="padding: 4px;"> {{ scheduleDescription }} </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleHeader extends Vue {
    @Prop({required: true})
    scheduleNumber!: string;

    @Prop({required: true})
    scheduleTitle!: string;

    @Prop({required: true})
    scheduleDescription!: string;
}
</script>