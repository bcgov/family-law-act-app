<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Affidavit of Personal Service of Protection Order</span>
        </p>         

        <p>
            If your document was accepted and stamped by the registry you have met the requirement 
            in Section 183(1) of the Provincial Court Family Rules.            
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AffidavitOfPersonalServiceOfProtection extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
