<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Consent to an Informal Trial – Kamloops Only</span>
        </p>         

        <ul>
            <li>Complete the Consent to an Informal Trial form</li>
            <li>File the Consent to an Informal Trial form at the Kamloops Registry</li>
            <li>Schedule your trial with the Judicial Case Manager or as directed by the Judge</li>
        </ul>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ConsentToInformalTrialKamloops extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
