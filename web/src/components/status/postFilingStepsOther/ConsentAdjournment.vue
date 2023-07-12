<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Consent Adjournment</span>
        </p>         

        <p>
            Filing counsel is responsible for providing all other parties or their counsel with a copy of 
            the filed Form with the new appearance date and appearance details provided by the registry.            
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ConsentAdjournment extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
