<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Attend the Court Appearance</span>
        </p>         

        <p>
            A judge can make decisions based only on the information presented 
            by the parties as evidence. Your evidence includes your application, 
            any additional affidavit(s), and spoken evidence provided in court.
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AttendCourtAppearanceInstructionsOther extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
