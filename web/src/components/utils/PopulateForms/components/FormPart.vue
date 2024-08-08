<template>
    
    <div>
        <p style="background-color: #333; color: white; font-size: 12pt; font-weight: bold;">
            Part {{ part }} | {{title}}  
            <span v-if="subtitle"> - 
                <span style="font-size: 9pt; font-weight: 400;">{{ subtitle  }}</span>
            </span>
        </p>
        
        <slot></slot> 
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FormPart extends Vue {
    @Prop({required: true})
    part!: number;

    @Prop({required: true})
    title!: string;

    @Prop({required: false})
    subtitle?: string;

}
</script>
