<template>
    <b-card no-body bg-variant="white" border-variant="white">        
 
        <p style="font-weight: 700;" class="mt-3">
            Step {{instructionsStep}}.
            <span>Affidavit of Personal Service</span>
        </p>         

        <p>
            If your document was accepted and stamped by the registry you will 
            need to ensure that you print or download the filed copy for your 
            records.            
        </p>

    </b-card>    
</template>

<script lang="ts">
    
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AffidavitOfPersonalService extends Vue {    

    @Prop({required: true})
    instructionsStep!: string;
    
}
</script>
